import React, { useMemo, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useListIssueContext } from "../../contexts/listIssueContext";
import "./Roadmap.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KEY_CURRENT_PROJECT, KEY_FILTER_EPIC } from "../../util/constants";
import useHover from "../../hooks/useHover";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = momentLocalizer(moment);
const TooltipContent = ({ event, issueEpics, projects }) => {
  const navigate = useNavigate();
  console.log("event", event);
  // console.log("event", event);
  const ToBoard = issueEpics.find((isEpic) => isEpic.summary === event.title);
  // const keyToBoard = projects.find(
  //   (project) => project.id === ToBoard.id_Project
  // );

  console.log("ToBoard", ToBoard);
  // console.log("projects", projects);
  const handleClickName = (key) => {
    localStorage.setItem(KEY_FILTER_EPIC, key);
    navigate(`/projects/board/${localStorage.getItem(KEY_CURRENT_PROJECT)}`);
  };
  return (
    <div
      onClick={() => handleClickName(ToBoard.id)}
      className="absolute top-0 left-0 z-50 inline-block text-blue-900 rounded-lg hover:bg-slate-300 bg-slate-100"
    >
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
          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

function Event(event) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [{ issueEpics }] = useListIssueContext();
  const projects = useSelector((state) => state.projects.projects);
  return (
    <div className="">
      <span className="relative" onClick={() => setShowTooltip(!showTooltip)}>
        {event.title}
        {showTooltip && (
          <TooltipContent
            projects={projects}
            issueEpics={issueEpics}
            event={event}
          />
        )}
      </span>
    </div>
  );
}

const Roadmap = ({ issueEpics, epicSelected, setEpicSelected }) => {
  // const [{ issueEpics }] = useListIssueContext();
  // console.log("epicSelected", epicSelected);

  const epicTimelines = useMemo(() => {
    if (epicSelected.filter.length > 0) {
      return epicSelected.issues
        .filter((item) => epicSelected.filter.includes(item.id))
        .reduce((initialState, item) => {
          return [
            ...initialState,
            {
              title: item.summary,
              start: new Date(item.dateStarted),
              end: new Date(item.dateEnd),
            },
          ];
        }, []);
    } else {
      return epicSelected.issues.reduce((initialState, item) => {
        return [
          ...initialState,
          {
            title: item.summary,
            start: new Date(item.dateStarted),
            end: new Date(item.dateEnd),
          },
        ];
      }, []);
    }
  }, [epicSelected]);
  return (
    <div data-tut='tut-roadmap-timeline' className="items-center w-full p-8">
      <Calendar
        tooltipAccessor={null}
        components={{ event: Event }}
        localizer={localizer}
        events={epicTimelines}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Roadmap;
