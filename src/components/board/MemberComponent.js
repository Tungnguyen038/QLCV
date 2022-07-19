import React, { memo, useEffect, useState } from "react";
import "../../../src/index.scss";
import { NIL } from "uuid";
import { useListIssueContext } from "../../contexts/listIssueContext";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import createToast from "../../util/createToast";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Tippy from '@tippyjs/react'
import { Menu, MenuItem } from "@mui/material";
import { KEY_ROLE_USER } from "../../util/constants";

function stringToColor(string) {
  if (!string) return;
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  if (!name) return;
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function MemberComponent({ project, members, issue }) {
  const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
  const [assignee, setAssignee] = useState();
  const [, dispatch] = useListIssueContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (roleUser === 3) return;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle Unassignee
  const handleChooseAssignee = async (idMember) => {
    const issueUpdate = { ...issue };
    if (idMember) {
      issueUpdate.id_Assignee = idMember;
    } else {
      issueUpdate.id_Assignee = NIL;
    }
    issueUpdate.updateDate = new Date();
    await updateIssues(issueUpdate, dispatch);
    await createToast("success", "Change assignee successfully");
    fetchIssue(project.id, dispatch);
  };

  useEffect(() => {
    if (members?.length > 0) {
      if (
        issue.id_Assignee &&
        issue.id_Assignee !== "00000000-0000-0000-0000-000000000000"
      ) {
        const result = members.find((item) => item.id === issue.id_Assignee);
        result ? setAssignee(result) : setAssignee(null);
      }
    }
  }, [members]);

  return (
    <>
      <div
        style={
          roleUser === 3 ? { cursor: 'not-allowed' } : {}
        }
        onClick={handleClick}
        className="wrap-assignee relative z-10 wrap-member mr-2 ml-[5px]"
      >
        {assignee ? (
          <>
            {
              assignee.avatar_Path ?
                <Tippy content={assignee.fullName}>
                  <Avatar sx={{ width: 24, height: 24 }} alt={assignee.userName} src={assignee.avatar_Path} />
                </Tippy>
                :
                <Tippy content={assignee.fullName}>
                  <Avatar style={{ width: 24, height: 24, fontSize: 10 }} {...stringAvatar(assignee.fullName)} />
                </Tippy>
            }
          </>
        ) : (
          <Tippy content='No assignee'>
            <Avatar sx={{ width: 24, height: 24 }}><PersonIcon fontSize='small' /></Avatar>
          </Tippy>
        )}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <div className="max-h-[170px] overflow-auto have-y-scroll">
          {
            issue.id_Assignee && issue.id_Assignee !== NIL &&
            <MenuItem>
              <div onClick={() => handleChooseAssignee(null)}
                className='w-full flex items-center gap-x-4 cursor-pointer'>
                <Avatar style={{ width: 24, height: 24 }}>
                  <PersonIcon fontSize='small' />
                </Avatar>
                Unassigneed
              </div>
            </MenuItem>
          }
          {
            members?.length > 0 &&
            members.map(item => (
              <MenuItem
                style={
                  item.id === issue.id_Assignee ?
                    { backgroundColor: '#f4f5f7', cursor: 'default' } :
                    null
                }
                key={item.id}
              >
                <div
                  onClick={() => handleChooseAssignee(item.id)}
                  className={`w-full flex gap-x-4 items-center cursor-pointer ${item.id === issue.id_Assignee ? 'font-semibold pointer-events-none cursor-default' : ''}`}
                >
                  {
                    item.avatar_Path ?
                      <Avatar style={{ width: 24, height: 24, fontSize: 10 }} alt={item.userName} src={item.avatar_Path} /> :
                      <Avatar style={{ width: 24, height: 24, fontSize: 10 }} {...stringAvatar(item.fullName)} />
                  }
                  <div className="flex flex-col">
                    <span>{item.fullName}</span>
                    <span className="opacity-60">{item.userName}</span>
                  </div>
                </div>
              </MenuItem>
            ))
          }
        </div>
      </Menu>
    </>
  );
}
export default memo(MemberComponent);
