import React, { useEffect, useMemo, useRef, useState } from 'react'
import '../board/Column.scss'
import { useBoardContext } from '../../contexts/boardContext';
import { useLabelContext } from '../../contexts/labelContext';
import { useSprintContext } from '../../contexts/sprintContext';
import { useStageContext } from '../../contexts/stageContext';
import { CHANGE_FILTER_EPIC_BOARD } from '../../reducers/actions';
import { fetchBoard } from '../../reducers/boardReducer';
import { fetchLabel } from '../../reducers/labelReducer';
import { fetchSprint } from '../../reducers/sprintReducer';
import { fetchStage } from '../../reducers/stageReducer';
import { KEY_FILTER_EPIC } from '../../util/constants';
import Board from '../board/Board';
import TopDetailBoard from '../project-detail/TopDetailBoard';
import './ContainerBoard.scss'
import { v4 } from 'uuid';
import { Skeleton } from '@mui/material';
import useLoading from '../../hooks/useLoading';

function ContainerBoard({ project }) {
    const { state: { sprints }, dispatch } = useSprintContext();
    const [{ boards }, dispatchBoard] = useBoardContext();
    const [{ stages }] = useStageContext();
    const [, dispatchStage] = useStageContext();
    const [, dispatchLabel] = useLabelContext();
    // xu ly loading start
    const [isLoading] = useLoading();
    // xu ly loading end

    const currentSprint = useMemo(() => {
        const result = sprints.find(item => item.is_Started === 1);
        return result;
    }, [sprints])
    const epicFilterStorage = localStorage.getItem(KEY_FILTER_EPIC);

    useEffect(() => {
        if (project && project.id) {
            fetchSprint(project?.id, dispatch);
            fetchLabel(project.id, dispatchLabel);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project.id, dispatch, dispatchLabel])
    useEffect(() => {
        if (currentSprint) {
            if (epicFilterStorage) {
                dispatchBoard({
                    type: CHANGE_FILTER_EPIC_BOARD,
                    payload: epicFilterStorage
                })
            }
            localStorage.removeItem(KEY_FILTER_EPIC);
            const dataGet = {
                idSprint: currentSprint.id,
                idEpic: null,
                type: 0
            }
            fetchBoard(dataGet, dispatchBoard);
        }
    }, [currentSprint, dispatchBoard, epicFilterStorage])
    useEffect(() => {
        if (project && project.id) {
            fetchStage(project.id, dispatchStage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project.id, dispatchStage])

    return (
        <div className='container-board'>
            <TopDetailBoard currentSprint={currentSprint} project={project} />
            <div className="bottom have-y-scroll">
                {
                    isLoading ?
                        (
                            <div className='w-full h-full flex gap-x-[10px]'>
                                {
                                    Array(3).fill(0).map(() => (
                                        <div key={v4()} style={{ backgroundColor: 'transparent' }} className='column'>
                                            <div className='w-full h-full bg-gray-main p-3 pt-[50px]'>
                                                <div className='flex flex-col justify-between w-full h-full bg-white p-2 rounded-md'>
                                                    {
                                                        Array(4).fill(0).map(() => (
                                                            <div key={v4()} className="w-full h-[78px]">
                                                                <Skeleton style={{ borderRadius: 6, backgroundColor: '#f4f5f7' }} variant='rectangular' animation='wave' width='100%' height='100%' />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ) :
                        (
                            <>
                                {
                                    boards.length > 0 ?
                                        boards.map((item) => (
                                            <Board key={v4()} board={item} currentSprint={currentSprint} project={project} />
                                        )) :
                                        <div className="flex w-full h-full gap-x-2">
                                            {
                                                stages.length > 0 &&
                                                stages.map(item => (
                                                    <div key={item.id} className='column'>
                                                        <div className="header header-selector">
                                                            <span className='stage-name'>{item.stage_Name}</span>
                                                        </div>
                                                        <div className="container-issue">
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default ContainerBoard