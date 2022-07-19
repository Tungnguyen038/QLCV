import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import DashboardContainer from '../components/dashboard/DashboardContainer';
import Sidebar from '../components/sidebar/Sidebar'
import { BASE_URL, KEY_SHOW_TOUR, KEY_USER_LOGIN } from '../util/constants';
import createTourGuide from '../util/createTourGuide';
import Tour from 'reactour';

const tourConfig = [
    {
        selector: '[data-tut="tut-dashboard-main"]',
        content: () => createTourGuide('Main interface', "This is a main interface of dashboard")
    },
    {
        selector: '[data-tut="tut-dashboard-chart"]',
        content: () => createTourGuide('Chart', "Chart that groups issues by stage in a given timeline and shows you visually")
    },
    {
        selector: '[data-tut="tut-dashboard-type"]',
        content: () => createTourGuide('Select type', "Choose the type for the chart, there are three types of charts: Archive Chart, Column Chart and Doughnut Chart")
    },
    {
        selector: '[data-tut="tut-dashboard-timeline"]',
        content: () => createTourGuide('Change duration', "Choose the time period of the issues")
    },
    {
        selector: '[data-tut="tut-dashboard-date"]',
        content: () => createTourGuide('Choose date', "Change the duration of the issues here, Note: you need to choose custom to be able to interact")
    },
    {
        selector: '[data-tut="tut-dashboard-export"]',
        content: () => createTourGuide('Export chart', "You can export the chart as an image by clicking here")
    },
]

function DashboardPage() {
    const [currentProject, setCurrentProject] = useState();
    const { projects } = useSelector(state => state.projects);
    const keyProject = useParams('key').key;
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
            setShowTour(!!userGet.isFirstLogin && !showTours?.dashboard);
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
            localStorage.setItem(KEY_SHOW_TOUR, JSON.stringify({ ...showTours, dashboard: true }))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = 'Marvic-Dashboard'
        const currPro = projects.find(item => item.key === keyProject);

        if (currPro) {
            setCurrentProject(currPro);
        }
    }, [projects, keyProject])
    console.log("projects", projects);
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
                    <Sidebar nameProject={currentProject?.name}></Sidebar>
                </div>
                <div className='basis-[80%] h-main-backlog'>
                    <DashboardContainer project={currentProject} />
                </div>
            </div>
        </>
    )
}

export default DashboardPage