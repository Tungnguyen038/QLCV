import React, { memo, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { v4 } from "uuid";
import { useListIssueContext } from "../../contexts/listIssueContext";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import TaskItemComponent from "./TaskItemComponent";

function WrapperTask({ members, project, issues }) {
  const [, dispatch] = useListIssueContext();
  const [{ issueEpics }] = useListIssueContext();
  const nodeRef = useRef();

  // handle card drop
  const onCardDrop = (dropResult) => {
    if (dropResult.addedIndex !== null) {
      // get parent
      const handleDrop = async (node) => {
        const parent = node.parentNode;
        if (!parent.matches(".backlog-item")) {
          node = parent;
          handleDrop(node);
        } else {
          const idSprint = parent.dataset.id;
          const { payload: issueUpdate } = dropResult;
          issueUpdate.id_Sprint = idSprint;
          await updateIssues(issueUpdate, dispatch);
          fetchIssue(project.id, dispatch);
        }
      };
      handleDrop(nodeRef.current);
    }
  };

  return (
    <div ref={nodeRef} className="bg-white ">
      {issues?.length > 0 &&
        issues.map((item) => (
          <TaskItemComponent
            key={item.id}
            members={members}
            project={project}
            issueEpics={issueEpics}
            issue={item}
          />
        ))}
    </div>
  );
}

export default memo(WrapperTask);
