import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Sidebar from '../components/sidebar/Sidebar'
import ContainerBacklog from '../components/containers/ContainerBacklog'
import axios from 'axios'
import { BASE_URL, KEY_SHOW_TOUR, KEY_USER_LOGIN } from '../util/constants'
import Tour from 'reactour'
import createTourGuide from '../util/createTourGuide'

const tourConfig = [
  {
    selector: '[data-tut="tut-container-backlog"]',
    content: () => createTourGuide('Main backlog', "This is where all the project's sprints are displayed")
  },
  {
    selector: '[data-tut="tut-backlog-issue"]',
    content: () => createTourGuide('Issue', "You can drag and drop issues between sprints, Click on an empty area to open the edit issue popup")

  },
  {
    selector: '[data-tut="tut-backlog-issue-info"]',
    content: () => createTourGuide('Basic infomation', "This is where the basic information of the issue is displayed")
  },
  {
    selector: '[data-tut="tut-backlog-issue-action"]',
    content: () => createTourGuide('Quick edit', "This is the place to help you quickly edit issues")
  },
]

function BacklogPage() {
  const { key } = useParams();
  const { projects } = useSelector(state => state.projects);
  const [currentProject, setCurrentProject] = useState({});
  const [userGet, setUserGet] = useState({});
  const [showTour, setShowTour] = useState(!!userGet?.isFirstLogin);
  const handleCloseTour = () => {
    setShowTour(false);
  }
  useEffect(() => {
    const getUserLogin = async () => {
      try {
        const resp = await axios.get(`${BASE_URL}/api/User/GetLoginUser`);
        if (resp && resp.status === 200) {
          setUserGet(resp.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserLogin();
  }, [])
  useEffect(() => {
    if (Object.entries(userGet).length > 0) {
      const showTours = JSON.parse(localStorage.getItem(KEY_SHOW_TOUR));
      localStorage.setItem(KEY_USER_LOGIN, JSON.stringify(userGet.isFirstLogin));
      setShowTour(!!userGet.isFirstLogin && !showTours?.backlog);
    }
  }, [userGet]);
  // handle before close
  const handleBeforeClose = async () => {
    try {
      const dataPut = {
        ...userGet,
        isFirstLogin: 0
      }
      const showTours = JSON.parse(localStorage.getItem(KEY_SHOW_TOUR)) || {};
      if (Object.entries(showTours).length >= 5) {
        await axios.put(`${BASE_URL}/api/User/Update`, dataPut);
      }
      localStorage.setItem(KEY_SHOW_TOUR, JSON.stringify({ ...showTours, backlog: true }))
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    document.title = 'Marvic-backlog';
    const currProject = projects.find(item => item?.key === key);
    if (Object.entries(currProject).length > 0) {
      setCurrentProject(currProject);
    }
  }, [projects])


  return (
    <>
      <Tour
        style={{
          maxWidth: 450
        }}
        disableInteraction={true}
        onRequestClose={handleCloseTour}
        steps={tourConfig}
        isOpen={showTour}
        showNavigationNumber={false}
        onBeforeClose={handleBeforeClose}
        rounded={5}
      />
      <div className="flex overflow-hidden h-main-backlog">
        <div className='basis-[20%] h-main-backlog'>
          <Sidebar nameProject={currentProject.name}></Sidebar>
        </div>
        <div className='basis-[80%] h-main-backlog'>
          <ContainerBacklog project={currentProject}></ContainerBacklog>
        </div>
      </div>

    </>
  )
}

export default BacklogPage