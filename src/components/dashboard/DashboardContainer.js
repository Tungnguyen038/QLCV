import React, { useEffect, useMemo, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./Dashboard.scss";
import BarChartArea from "../chart/BarChartArea";
import BarChartColumn from "../chart/BarChartColumn";
import BarChartDoughnut from "../chart/BarChartDoughnut";
import { timeLines } from "../../util/constants";
import createPadStart from "../../util/createPadStart";
import BreadcrumbsComp from "../project-detail/Breadcrumbs";

function DashboardContainer({ project }) {
  const [timeLine, setTimeLine] = useState("project");
  const [chart, setChart] = useState("area");
  const [period, setPeriod] = useState({ dateStart: "", dateEnd: "" });
  // date start
  const dateStarted = useMemo(() => {
    let today, day, month, year;
    switch (timeLine) {
      case "project":
        const dateStartedProject = new Date(project?.dateStarted);
        return `${dateStartedProject.getFullYear()}-${String(
          dateStartedProject.getMonth() + 1
        ).padStart(2, "0")}-${String(dateStartedProject.getDate()).padStart(
          2,
          "0"
        )}`;
      case "week":
        today = new Date();
        day = createPadStart(today.getDate() - 7);
        month = createPadStart(today.getMonth() + 1);
        year = today.getFullYear();
        return `${year}-${month}-${day}`;
      case "month":
        today = new Date();
        day = "01";
        month = createPadStart(today.getMonth() + 1);
        year = today.getFullYear();
        return `${year}-${month}-${day}`;
      case "year":
        today = new Date();
        day = "01";
        month = "01";
        year = today.getFullYear();
        return `${year}-${month}-${day}`;
      case "custom":
        return period.dateStart;
      default:
        return;
    }
  }, [timeLine, project, period]);
  // date end
  const dateEnd = useMemo(() => {
    let today, day, month, year;
    switch (timeLine) {
      case "project":
        const dateEndProject = new Date(project?.dateEnd);
        return `${dateEndProject.getFullYear()}-${String(
          dateEndProject.getMonth() + 1
        ).padStart(2, "0")}-${String(dateEndProject.getDate()).padStart(
          2,
          "0"
        )}`;
      case "week":
        today = new Date();
        day = createPadStart(today.getDate());
        month = createPadStart(today.getMonth() + 1);
        year = today.getFullYear();
        return `${year}-${month}-${day}`;
      case "month":
        today = new Date();
        day = 30;
        month = today.getMonth() + 1;
        if (month === 2) {
          day = 29;
        } else if (month < 8 && month % 2 === 1) {
          day = 31;
        } else if (month >= 8 && month % 2 === 0) {
          day = 31;
        }
        month = createPadStart(month);
        year = today.getFullYear();
        return `${year}-${month}-${day}`;
      case "year":
        today = new Date();
        day = 31;
        month = 12;
        year = today.getFullYear();
        return `${year}-${month}-${day}`;
      case "custom":
        return period.dateEnd;
      default:
        return;
    }
  }, [timeLine, project, period]);
  // handle change period
  const handleChangePeriod = (e) => {
    setPeriod((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    if (project) {
      const dateStartedProject = new Date(project.dateStarted);
      const dateEndProject = new Date(project.dateEnd);
      setPeriod((prev) => {
        return {
          ...prev,
          dateStart: `${dateStartedProject.getFullYear()}-${String(
            dateStartedProject.getMonth() + 1
          ).padStart(2, "0")}-${String(dateStartedProject.getDate()).padStart(
            2,
            "0"
          )}`,
          dateEnd: `${dateEndProject.getFullYear()}-${String(
            dateEndProject.getMonth() + 1
          ).padStart(2, "0")}-${String(dateEndProject.getDate()).padStart(
            2,
            "0"
          )}`,
        };
      });
    }
  }, [project]);

  return (
    <div data-tut='tut-dashboard-main' className="container-dashboard">
      <BreadcrumbsComp />
      <h2 className="title">Dashboard</h2>
      <div data-tut='tut-dashboard-chart' className="chart-container">
        {chart === "area" && (
          <BarChartArea
            project={project}
            dateStarted={dateStarted}
            dateEnd={dateEnd}
          />
        )}
        {chart === "column" && (
          <BarChartColumn
            project={project}
            dateStarted={dateStarted}
            dateEnd={dateEnd}
          />
        )}
        {chart === "doughnut" && (
          <BarChartDoughnut
            project={project}
            dateStarted={dateStarted}
            dateEnd={dateEnd}
          />
        )}
        <div className="mt-auto flex items-center gap-x-2 pb-5">
          <select
            data-tut='tut-dashboard-type'
            onChange={(e) => setChart(e.target.value)}
            value={chart}
            className="p-2 mt-3 border-2 border-blue-400 rounded-md cursor-pointer outline-blue-600"
          >
            <option value="area">Archive Chart</option>
            <option value="column">Column Chart</option>
            <option value="doughnut">Doughnut Chart</option>
          </select>
          <select
            data-tut='tut-dashboard-timeline'
            value={timeLine}
            onChange={(e) => setTimeLine(e.target.value)}
            className="p-2 mt-3 capitalize border-2 border-blue-400 rounded-md cursor-pointer outline-blue-600"
          >
            {timeLines.map((item) => (
              <option key={item} className="capitalize" value={item}>
                {item}
              </option>
            ))}
          </select>
          <div
            style={
              timeLine !== "custom"
                ? { backgroundColor: "#ccc", opacity: 0.5 }
                : null
            }
            className="flex p-1 ml-5 transition-all border-l-2 rounded-md animate__animated animate__backInLeft gap-x-2 "
          >
            <Tippy
              disabled={timeLine === "custom"}
              content="Select custom to edit date"
            >
              <div data-tut='tut-dashboard-date' className="flex flex-col gap-y-1">
                <label>Date start:</label>
                <input
                  disabled={timeLine !== "custom"}
                  value={dateStarted}
                  onChange={handleChangePeriod}
                  name="dateStart"
                  type="date"
                  className={`px-2 py-1 border-2 rounded outline-none cursor-pointer border-primary ${timeLine !== "custom" ? "opacity-50" : ""
                    }`}
                />
              </div>
            </Tippy>
            <Tippy
              disabled={timeLine === "custom"}
              content="Select custom to edit date"
            >
              <div className="flex flex-col gap-y-1">
                <label>Date end:</label>
                <input
                  disabled={timeLine !== "custom"}
                  value={dateEnd}
                  onChange={handleChangePeriod}
                  name="dateEnd"
                  type="date"
                  className={`px-2 py-1 border-2 rounded outline-none cursor-pointer border-primary ${timeLine !== "custom" ? "opacity-50" : ""
                    }`}
                />
              </div>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;
