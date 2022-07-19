import axios from "axios";
import React, { memo, useMemo, useRef } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import { v4 } from "uuid";
import { useListIssueContext } from "../../contexts/listIssueContext";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import { BASE_URL } from "../../util/constants";
import TaskItemComponent from "./TaskItemComponent";

function WrapperTask({ members, project, sprint, issues = [] }) {
  const [, dispatch] = useListIssueContext();
  const [{ issueEpics, issueNormals }] = useListIssueContext();
  const nodeRef = useRef();

  if (issues.length === 0) {
    issues = issueNormals.filter(item => item.id_Sprint === sprint?.id);
  }

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
          const { payload } = dropResult;
          const resp = await axios.patch(`${BASE_URL}/api/Issue/ChangeIssueSprint`, {
            "idIssue": payload.id,
            "idSprint": idSprint
          });
          if (resp && resp.status === 200) {
            fetchIssue(project.id, dispatch);
          }
          // const { payload: issueUpdate } = dropResult;
          // issueUpdate.id_Sprint = idSprint;
          // await updateIssues(issueUpdate, dispatch);
        }
      };
      handleDrop(nodeRef.current);
    }
  };

  return (
    <div ref={nodeRef} className="min-h-[40px] bg-white">
      <Container
        orientation="vertical"
        onDrop={onCardDrop}
        getChildPayload={(index) => issues[index]}
        getGhostParent={(index) => issues[index]}
        groupName="sprint"
        dragClass="card-ghost"
        dropClass="card-ghost-drop"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "cards-drop-preview",
        }}
      >
        {issues?.length > 0 &&
          issues.map((item) => (
            <Draggable key={v4()}>
              <TaskItemComponent
                members={members}
                project={project}
                issueEpics={issueEpics}
                issue={item}
                sprint={sprint}
              />
            </Draggable>
          ))}
      </Container>
    </div>
  );
}

export default memo(WrapperTask);
