import React, { useEffect, useRef, useState } from 'react'
import ListProject from '../components/projects/ListProject';
import { getProjects } from '../redux/apiRequest';
import { useSelector, useDispatch } from 'react-redux'
import { changeFilters } from '../redux/projectsSlice';
import Tour from 'reactour';
import axios from 'axios';
import { BASE_URL, KEY_SHOW_TOUR, KEY_USER_LOGIN } from '../util/constants';
import createTourGuide from '../util/createTourGuide';

const tourConfig = [
  {
    selector: '[data-tut="tut-filter-projectname"]',
    content: () => createTourGuide('Filter name', 'This is the search box to filter project by name')
  },
  {
    selector: '[data-tut="tut-listproject"]',
    content: () => createTourGuide('All projects', 'This is where all your project are displayed')

  },
  {
    selector: '[data-tut="tut-projectitem"]',
    content: () => createTourGuide('Go to board', 'Click on an empty area to go to the board of project')
  },
  {
    selector: '[data-tut="tut-btn-editproject"]',
    content: () => createTourGuide('Edit', 'Click here to show edit project popup')

  },
  {
    selector: '[data-tut="tut-btn-deleteproject"]',
    content: () => createTourGuide('Delete', 'Click here to delete project')

  },
  {
    selector: '[data-tut="tut-btn-startproject"]',
    content: () => createTourGuide('Star', 'Star show the priority of the project')
  },
]

function ProjectsPage() {
  const timerRef = useRef();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { projects, error } = useSelector(state => state.projects);
  const { currentUser } = useSelector(state => state.auth.login);
  const inputRef = useRef();
  const [isFocusInput, setIsFocusInput] = useState(false);
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
      setShowTour(!!userGet.isFirstLogin && !showTours?.projects);
    }
  }, [userGet])


  useEffect(() => {
    timerRef.current = setTimeout(() => {
      dispatch(changeFilters({ name: search }))
      getProjects(dispatch, currentUser.id);
    }, 1000);
    return () => clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  useEffect(() => {
    document.title = 'Marvic-Projects'
    const inputRefCopy = inputRef.current;
    const handleFoucs = e => {
      setIsFocusInput(true);
    }
    const handleBlur = e => {
      setIsFocusInput(false);
    }
    inputRefCopy.addEventListener('focus', handleFoucs);
    inputRefCopy.addEventListener('blur', handleBlur);
    return () => {
      inputRefCopy.removeEventListener('focus', handleFoucs);
      inputRefCopy.removeEventListener('blur', handleBlur);
    }
  }, []);
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
      localStorage.setItem(KEY_SHOW_TOUR, JSON.stringify({ ...showTours, projects: true }))
    } catch (error) {
      console.log(error);
    }
  }

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
      <div className='w-[100vw] flex justify-center'>
        <div className="projects-wrapper w-[1320px] h-10">
          <div className="projects-top p-5 flex justify-between">
            <div className="projects-top-left flex flex-col gap-y-[30px]">
              <h2 className='text-3xl font-semibold'>Projects</h2>
              <div className={`flex items-center search-wrapper border-2 ${isFocusInput ? 'border-primary' : 'border-[#ccc]'} rounded-[4px] pr-1 transition-all`}>
                <input
                  data-tut='tut-filter-projectname'
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  ref={inputRef}
                  className='w-[200px] p-[5px] rounded-[4px] outline-none border-none'
                  type="text"
                  placeholder='Search project'
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#ccc">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="projects-bottom">
            {
              error ? <p className='text-center text-3xl opacity-50 py-10 text-red-500'>Error when get projects</p> :
                (projects.length === 0 ?
                  <p className='text-center text-3xl opacity-50 py-10'>You don't have any projects yet</p> :
                  <ListProject></ListProject>)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectsPage