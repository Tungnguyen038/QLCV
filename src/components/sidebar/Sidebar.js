import React, { useState } from "react";
import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import { KEY_CURRENT_PROJECT } from "../../util/constants";
import { Typography } from "@mui/material";

function Sidebar({ nameProject = "Name of project" }) {
  const [show, setShow] = useState(true);

  const keyCurrentProject = localStorage.getItem(KEY_CURRENT_PROJECT);
  return (
    <div className="sidebar">
      <div className="name">
        <img
          src="https://media.istockphoto.com/photos/abstract-cloud-computing-technology-concept-picture-id1316144933?b=1&k=20&m=1316144933&s=170667a&w=0&h=jQa0mn3U1ePZMYdTY7zisheCQqUItm2_itt_Jq5UZmU="
          alt=""
        />
        <Typography variant='h6' color='primary.main'>{nameProject}</Typography>
      </div>
      <p className="text-sm font-semibold pl-[10px] flex gap-x-2 items-center cursor-default select-none group">
        {show ? (
          <svg
            onClick={() => setShow((prev) => !prev)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 opacity-0 cursor-pointer group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            onClick={() => setShow((prev) => !prev)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 opacity-0 cursor-pointer group-hover:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
        <span className="text-sm font-semibold">PLANNING</span>
      </p>
      {show && (
        <div className="wrap-link">
          <NavLink to={`/projects/dashboard/${keyCurrentProject}`}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to={`/projects/roadmap/${keyCurrentProject}`}>
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <path
                  d="M6 2h10a3 3 0 010 6H6a3 3 0 110-6zm0 2a1 1 0 100 2h10a1 1 0 000-2H6zm4 5h8a3 3 0 010 6h-8a3 3 0 010-6zm0 2a1 1 0 000 2h8a1 1 0 000-2h-8zm-4 5h6a3 3 0 010 6H6a3 3 0 010-6zm0 2a1 1 0 000 2h6a1 1 0 000-2H6z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
            <span>Roadmap</span>
          </NavLink>
          <NavLink to={`/projects/backlog/${keyCurrentProject}`}>
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <g fill="currentColor">
                  <path d="M5 19.002C5 19 17 19 17 19v-2.002C17 17 5 17 5 17v2.002zm-2-2.004C3 15.894 3.895 15 4.994 15h12.012c1.101 0 1.994.898 1.994 1.998v2.004A1.997 1.997 0 0117.006 21H4.994A1.998 1.998 0 013 19.002v-2.004z"></path>
                  <path d="M5 15h12v-2H5v2zm-2-4h16v6H3v-6z"></path>
                  <path d="M7 11.002C7 11 19 11 19 11V8.998C19 9 7 9 7 9v2.002zM5 8.998C5 7.894 5.895 7 6.994 7h12.012C20.107 7 21 7.898 21 8.998v2.004A1.997 1.997 0 0119.006 13H6.994A1.998 1.998 0 015 11.002V8.998z"></path>
                  <path d="M5 5v2h12V5H5zm-2-.002C3 3.894 3.895 3 4.994 3h12.012C18.107 3 19 3.898 19 4.998V9H3V4.998z"></path>
                </g>
              </svg>
            </span>
            <span>Backlog</span>
          </NavLink>
          <NavLink to={`/projects/board/${keyCurrentProject}`}>
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <g fill="currentColor">
                  <path d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18zM2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0120.01 20H3.99A1.994 1.994 0 012 18.006V5.994z"></path>
                  <path d="M8 6v12h2V6zm6 0v12h2V6z"></path>
                </g>
              </svg>
            </span>
            <span>Board</span>
          </NavLink>
          <NavLink to={`/projects/archive/${keyCurrentProject}`}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </span>
            <span>Archive</span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
