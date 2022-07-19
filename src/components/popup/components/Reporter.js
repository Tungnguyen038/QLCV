import { useEffect, useMemo, useRef, useState } from "react";
import { useListIssueContext } from "../../../contexts/listIssueContext";
import { KEY_ROLE_USER } from "../../../util/constants";
import { NIL } from 'uuid'
import { fetchIssue, updateIssues } from "../../../reducers/listIssueReducer";
import createToast from "../../../util/createToast";
import { Avatar } from "@material-ui/core";
import PersonIcon from '@mui/icons-material/Person';
import { Tooltip } from "@mui/material";

function stringToColor(string) {
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
    return {
        style: {
            backgroundColor: stringToColor(name),
            width: 24,
            height: 24,
            fontSize: 12
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function Reporter({ members, project, issue }) {
    const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
    const [, dispathIssue] = useListIssueContext();
    const [show, setShow] = useState(false);

    // current assignee
    const currentReporter = useMemo(() => {
        return members.find((item) => item.id === issue.id_Reporter);
    }, [members, issue]);
    // toggle
    const toggle = (e) => {
        if (roleUser === 3) return;
        setShow((prev) => !prev);
    };
    // handle select member
    const handleSelectMember = async (member) => {
        if (member === null) {
            issue.id_Reporter = NIL;
        } else {
            issue.id_Reporter = member.id;
        }
        await updateIssues(issue, dispathIssue);
        fetchIssue(project.id, dispathIssue);
        createToast('success', 'Change assignee sucessfully');
    }

    return (
        <div
            style={
                roleUser === 3 ? { cursor: 'not-allowed' } : {}
            }
            className="relative z-10 w-6 h-6 bg-white rounded-full cursor-pointer toggle"
        >
            {
                currentReporter ?
                    <Tooltip title={currentReporter.fullName}>
                        <Avatar onClick={toggle} {...stringAvatar(currentReporter?.fullName)} />
                    </Tooltip> :
                    <Tooltip title='No assignee'>
                        <Avatar onClick={toggle} style={{ width: 24, height: 24, fontSize: 12 }}>
                            <PersonIcon fontSize="small" />
                        </Avatar>
                    </Tooltip>

            }
            {show && <SelectReporter setShow={setShow} members={members} handleSelectMember={handleSelectMember} issue={issue} />}
        </div>
    );
}
export default Reporter;

function SelectReporter({ members, handleSelectMember, issue, setShow }) {
    const nodeRef = useRef();
    const renderRef = useRef(0);
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (!nodeRef.current?.contains(e.target) && renderRef.current > 0) {
                setShow(false);
            }
            renderRef.current++;
        }
        document.addEventListener('click', handleClickOutSide);
        return () => document.removeEventListener('click', handleClickOutSide);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div
            ref={nodeRef}
            style={{ transform: "translateX(-25%)" }}
            className="absolute top-[105%] left-0 shadow-md bg-white max-h-[150px] overflow-auto have-y-scroll"
        >
            <div
                onClick={() => handleSelectMember(null)}
                className="flex items-center p-2"
            >
                Unassignee
            </div>
            {members.length > 0 &&
                members.map((item) => (
                    <div
                        onClick={() => handleSelectMember(item)}
                        key={item.id}
                        className={`p-2 flex items-center hover:bg-gray-main ${issue.id_Assignee === item.id
                            ? "bg-orange-500 text-white pointer-events-none"
                            : ""
                            }`}
                    >
                        {item.userName}
                    </div>
                ))}
        </div>
    )
}