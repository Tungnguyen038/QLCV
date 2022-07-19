import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../header/Header'
import { SprintProvider } from '../../contexts/sprintContext'
import { ListIssueProvider } from '../../contexts/listIssueContext'
import { MembersProvider } from '../../contexts/membersContext'
import { StageProvider } from '../../contexts/stageContext'
import { BoardProvider } from '../../contexts/boardContext'
import { LabelProvider } from '../../contexts/labelContext'

function Main() {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.auth.login);
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return
    }
  }, [])
  if (currentUser === null) return null
  return (
    <>
      <SprintProvider>
        <ListIssueProvider>
          <MembersProvider>
            <StageProvider>
              <BoardProvider>
                <LabelProvider>
                  <Header></Header>
                  <Outlet></Outlet>
                </LabelProvider>
              </BoardProvider>
            </StageProvider>
          </MembersProvider>
        </ListIssueProvider>
      </SprintProvider>
    </>
  )
}

export default Main