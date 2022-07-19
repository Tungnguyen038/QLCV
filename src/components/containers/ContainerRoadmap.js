import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./ContainerRoadmap.scss";
import { fetchIssue } from "../../reducers/listIssueReducer";
import CreateComponent from "../CreateComponent";

import { useListIssueContext } from "../../contexts/listIssueContext";
import { v4 } from "uuid";
import RoadmapItem from "./RoadmapItem";
import Roadmap from "../roadmap/Roadmap";
import { useMembersContext } from "../../contexts/membersContext";
import { fetchMembers } from "../../reducers/membersReducer";
import { fetchStage } from "../../reducers/stageReducer";
import { useStageContext } from "../../contexts/stageContext";
import TopDetail from "../project-detail/TopDetail";
import { fetchLabel } from "../../reducers/labelReducer";
import { useLabelContext } from "../../contexts/labelContext";
import useLoading from "../../hooks/useLoading";
import { Skeleton } from "@mui/material";

const ContainerRoadmap = ({ project }) => {
  const [isLoading] = useLoading();
  const [
    {
      issueEpics,
    },
    dispatchIssue,
  ] = useListIssueContext();

  const { dispatch: dispatchMember } = useMembersContext();
  const [, dispatchStage] = useStageContext();
  const [, dispatchLabel] = useLabelContext();

  useEffect(() => {
    if (project && project.id) {
      fetchStage(project.id, dispatchStage);
    }
  }, [project]);
  useEffect(() => {
    if (project && project.id) {
      fetchMembers(project.id, dispatchMember);
    }
  }, [project]);
  const [epicSelected, setEpicSelected] = useState({
    issues: issueEpics,
    filter: [],
  });

  useEffect(() => {
    setEpicSelected((pre) => {
      return { ...pre, issues: issueEpics };
    });
  }, [issueEpics]);

  useEffect(() => {
    if (project && Object.entries(project).length > 0) {
      fetchIssue(project.id, dispatchIssue);
      fetchLabel(project.id, dispatchLabel);
    }
  }, [project]);

  return (
    <div className="container">
      <TopDetail project={project} />
      <div data-tut='tut-roadmap-main' className="flex overflow-x-auto have-y-scroll w-full  h-[470px]">
        <div className="border-2 overflow-y-auto have-y-scroll  border-slate-200  outline-none out basis-[30%]">
          <div className=" w-full epic-dropdown have-y-scroll p-2  have-y-scroll  overflow-y-auto mx-4 bg-white rounded-[5px] flex items-center flex-col">
            <div className="flex justify-between w-full px-4 py-2 border-b-2 border-slate-200">
              <span className="text-lg font-bold text-slate-600">Epic</span>
            </div>
            {
              isLoading ?
                (
                  <div className="w-full flex flex-col pr-4">
                    {
                      Array(3).fill(0).map(() => (
                        <div key={v4()} className="w-full h-[60px] mt-2">
                          <Skeleton style={{ backgroundColor: '#f4f5f7', borderRadius: 4 }} variant='rectangular' animation='wave' width='100%' height='100%' />
                        </div>
                      ))
                    }
                    <div className="w-[60%] h-[20px] mt-2">
                      <Skeleton style={{ backgroundColor: '#f4f5f7', borderRadius: 4 }} variant='rectangular' animation='wave' width='100%' height='100%' />
                    </div>
                  </div>
                ) :
                (
                  <>
                    {issueEpics.length > 0 &&
                      issueEpics.map((item) => (
                        <RoadmapItem
                          epicSelected={epicSelected}
                          setEpicSelected={setEpicSelected}
                          key={v4()}
                          project={project}
                          epic={item}
                        />
                      ))}
                    <CreateComponent
                      idIssueType={1}
                      project={project}
                      createWhat={"epic"}
                    />
                  </>
                )
            }
          </div>
        </div>
        <div className="basis-[70%] relative">
          <Roadmap epicSelected={epicSelected} issueEpics={issueEpics} />
        </div>
      </div>
    </div>
  );
};

export default ContainerRoadmap;
