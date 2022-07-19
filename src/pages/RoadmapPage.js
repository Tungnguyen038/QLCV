import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ContainerRoadmap from "../components/containers/ContainerRoadmap";
// import Roadmap from "../components/roadmap/Roadmap";
import Sidebar from "../components/sidebar/Sidebar";
import { OpenIssueProvider } from "../contexts/openChildIssueContext";
import { ModalProvider } from "../contexts/modalContext";
import Tour from "reactour";
import { BASE_URL, KEY_SHOW_TOUR, KEY_USER_LOGIN } from "../util/constants";
import axios from 'axios'
import createTourGuide from "../util/createTourGuide";

const tourConfig = [
  {
    selector: '[data-tut="tut-roadmap-main"]',
    content: () => createTourGuide('Main interface', "This is a main interface of roadmap")
  },
  {
    selector: '[data-tut="tut-roadmap-progress"]',
    content: () => createTourGuide('Progress bar', "The progress bar shows the completion of the issues in the epic")
  },
  {
    selector: '[data-tut="tut-roadmap-timeline"]',
    content: () => createTourGuide('Calendar', "The calendar shows the start and end dates visually, making it easy to manage the progress of your project")
  },
]

function RoadmapPage() {
  const { key } = useParams();
  const { projects } = useSelector((state) => state.projects);
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
      setShowTour(!!userGet.isFirstLogin && !showTours?.roadmap);
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
      localStorage.setItem(KEY_SHOW_TOUR, JSON.stringify({ ...showTours, roadmap: true }))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    document.title = "Marvic-roadmap";
    const currProject = projects.find((item) => item?.key === key);
    if (Object.entries(currProject).length > 0) {
      setCurrentProject(currProject);
    }
  }, [projects]);

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
      <OpenIssueProvider>
        <ModalProvider>
          <div className="flex overflow-hidden h-main-backlog">
            <div className="basis-[20%] h-main-backlog">
              <Sidebar nameProject={currentProject.name}></Sidebar>
            </div>
            <div className="basis-[80%] h-main-backlog">
              <ContainerRoadmap
                project={currentProject}
              ></ContainerRoadmap>
            </div>
          </div>
        </ModalProvider>
      </OpenIssueProvider>
    </>
  );
}

export default RoadmapPage;
