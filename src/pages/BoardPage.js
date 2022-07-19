import React, { useEffect, useState } from 'react'
import ContainerBoard from '../components/containers/ContainerBoard'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidebar from '../components/sidebar/Sidebar';
import { BoardProvider } from '../contexts/boardContext';
import { ModalProvider } from '../contexts/modalContext';
import axios from 'axios';
import { BASE_URL, KEY_ROLE_USER, KEY_SHOW_TOUR, KEY_USER_LOGIN } from '../util/constants';
import Tour from 'reactour';
import createTourGuide from '../util/createTourGuide';

const tourConfig = [
  {
    selector: '[data-tut="tut-board-searchissue"]',
    content: () => createTourGuide('Filter by name', 'Enter a name to search for the issue')
  },
  {
    selector: '[data-tut="tut-members"]',
    content: () => createTourGuide('Members', 'The place to manage all members of your project')

  },
  {
    selector: '[data-tut="tut-filter-issue-board"]',
    content: () => createTourGuide('Filter', 'This is where you can filter issues by epic, type and label')

  },
  {
    selector: '[data-tut="tut-btn-refresh"]',
    content: () => createTourGuide('Refrsh board', "You can update the board's latest status by clicking here")

  },
  {
    selector: '[data-tut="tut-container-board"]',
    content: () => createTourGuide('Main board', "This is the main interface of board")

  },
  {
    selector: '[data-tut="tut-column"]',
    content: () => createTourGuide('Column', "You can drag and drop columns back and forth in the board")

  },
  {
    selector: '[data-tut="tut-issueboard"]',
    content: () => createTourGuide('Issue', "Issue belongs to which column, the stage of the issue is that column, you can drag and drop issues back and forth between columns")
  },
]

function BoardPage() {
  const key = useParams().key;
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
      setShowTour(!!userGet.isFirstLogin && !showTours?.board);
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
      localStorage.setItem(KEY_SHOW_TOUR, JSON.stringify({ ...showTours, board: true }))
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    document.title = 'Marvic-Board';
    const currProject = projects.find(item => item.key === key);
    setCurrentProject(currProject);
  }, [projects, key]);
  useEffect(() => {
    const setRole = async () => {
      if (currentProject?.id) {
        const resp = await axios.get(`${BASE_URL}/api/Project/SetUserRoleByIdProject?idProject=${currentProject?.id}`);
        if (resp && resp.status === 200) {
          localStorage.setItem(KEY_ROLE_USER, JSON.stringify(resp.data.value));
        }
      }
    }
    setRole();
  }, [currentProject?.id])

  return (
    <BoardProvider>
      <ModalProvider project={currentProject}>
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
        <div className="flex">
          <div className='w-[20%] shrink-0'>
            <Sidebar nameProject={currentProject.name}></Sidebar>
          </div>
          <div className='w-[80%]'>
            <ContainerBoard project={currentProject}></ContainerBoard>
          </div>
        </div>
      </ModalProvider>
    </BoardProvider>
  )
}

export default BoardPage