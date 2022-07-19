import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/layouts/Main";
import { ToastContainer } from "react-toastify";
import BoardPageEpic from "./pages/BoardPageEpic";
import YourWorkPage from "./pages/YourWorkPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import RoadmapPage from "./pages/RoadmapPage";
import BacklogPage from "./pages/BacklogPage";
import BoardPage from "./pages/BoardPage";
import ArchivePage from "./pages/ArchivePage";
import ViewTestPage from "./pages/ViewTestPage";
import TestListPage from "./pages/TestListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TestPage from "./pages/TestPage";
import TutorialPage from "./pages/TutorialPage";
import TutorialTest from "./pages/TutorialTest";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      ></ToastContainer>
      <Routes>
        <Route path="/" element={<Main></Main>}>
          <Route path="/" element={<YourWorkPage></YourWorkPage>}></Route>
          <Route
            path="/projects"
            element={<ProjectsPage></ProjectsPage>}
          ></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path="/projects/dashboard/:key"
            element={<DashboardPage />}
          ></Route>
          <Route
            path="/projects/roadmap/:key"
            element={<RoadmapPage></RoadmapPage>}
          ></Route>
          <Route
            path="/projects/backlog/:key"
            element={<BacklogPage></BacklogPage>}
          ></Route>
          <Route
            path="/projects/board/:key"
            element={<BoardPage></BoardPage>}
          ></Route>
          <Route
            path="/projects/board/epic/:key"
            element={<BoardPageEpic></BoardPageEpic>}
          ></Route>
          <Route
            path="/projects/archive/:key"
            element={<ArchivePage></ArchivePage>}
          ></Route>
          <Route path="/test-results" element={<ViewTestPage />}></Route>
          <Route
            path="/testlist"
            element={<TestListPage></TestListPage>}
          ></Route>
          <Route
            path="/tutorial"
            element={<TutorialTest></TutorialTest>}
          ></Route>
        </Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/test/:id/:name" element={<TestPage></TestPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
