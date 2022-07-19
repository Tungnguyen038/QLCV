import React, { memo } from "react";
import { v4 } from "uuid";
import { useListIssueContext } from "../../contexts/listIssueContext";
import TaskItemComponent from "../backlog/TaskItemComponent";
// import TaskItemComponent from "./TaskItemComponent";

function WrapperTask({ members, project, issueCollect }) {
  const [{ issueEpics, issueNormals }] = useListIssueContext();
  console.log("wrapper task render");
  return (
    <>
      {issueCollect.length > 0 &&
        issueCollect.map((item) => (
          <TaskItemComponent
            isRoadmap
            members={members}
            key={v4()}
            project={project}
            issueEpics={issueEpics}
            issue={item}
          />
        ))}
    </>
  );
}

export default memo(WrapperTask);
