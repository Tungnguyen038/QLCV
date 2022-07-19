import React from 'react'
import { Avatar, AvatarGroup, Badge, Box, IconButton, Menu, MenuItem, styled } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import Tippy from '@tippyjs/react'
import { v4 } from 'uuid';
import axios from 'axios';
import { BASE_URL, KEY_ROLE_USER } from '../../util/constants';
import { fetchMembers } from '../../reducers/membersReducer';
import { useMembersContext } from '../../contexts/membersContext';
import createToast from '../../util/createToast';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    if (string) {
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
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
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
    };
}
const SmallScore = styled(Box)(({ theme }) => ({
    width: 20,
    height: 20,
    borderRadius: '50%',
    color: 'white',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    border: `1px solid ${theme.palette.background.paper}`,
}));

function AllMember({ project, members, handleDeleteMember }) {
    // get role user
    const roleUser = JSON.parse(localStorage.getItem(KEY_ROLE_USER));
    const { dispatch: dispatchMember } = useMembersContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // handle change active
    const handleChangeActive = async (idMember) => {
        if (roleUser === 3) return;
        try {
            const resp = await axios.patch(`${BASE_URL}/api/Project/ChangeStatusMember`,
                {
                    "idUser": idMember,
                    "idProject": project?.id
                }
            )
            if (resp && resp.status === 200) {
                if (resp.data !== 0 && resp.data !== 1) {
                    createToast('warn', resp.data);
                } else {
                    createToast('success', 'Change active successfully!');
                    fetchMembers(project.id, dispatchMember);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <AvatarGroup style={{ cursor: "pointer" }} onClick={handleClick} max={3}>
                {
                    members?.length > 0 &&
                    members.map(item => (
                        <Tippy key={v4()} content={item.fullName}>
                            {
                                item.avatar_Path ?
                                    <Avatar alt="Remy Sharp" src={item.avatar_Path} /> :
                                    <Avatar {...stringAvatar(item.fullName)} />
                            }
                        </Tippy>
                    ))
                }
            </AvatarGroup>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <div className='max-h-[250px] overflow-auto have-y-scroll'>
                    {
                        members?.length > 0 &&
                        members.map(item => (
                            <MenuItem
                                key={v4()}
                                style={{ backgroundColor: 'white' }}
                            >
                                <div className='flex items-center min-w-[250px]'>
                                    {
                                        item.avatar_Path ?
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={
                                                    <Tippy content='Score'>
                                                        <SmallScore>{item.scores}</SmallScore>
                                                    </Tippy>
                                                }
                                            >
                                                <Avatar style={{ width: 40, height: 40, fontSize: 12 }} alt="Remy Sharp" src={item.avatar_Path} />
                                            </Badge> :
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                badgeContent={
                                                    <Tippy content='Score'>
                                                        <SmallScore>{item.scores}</SmallScore>
                                                    </Tippy>
                                                }
                                            >
                                                <Avatar style={{ width: 40, height: 40, fontSize: 12 }} {...stringAvatar(item.fullName)} />
                                            </Badge>
                                    }
                                    <div className='ml-3 flex flex-col justify-between'>
                                        <span className='text-[12px] font-semibold'>{item.fullName}</span>
                                        <span className='text-[12px] opacity-80 text-gray-500'>{item.userName}</span>
                                    </div>
                                    <div className='flex gap-x-1 ml-auto'>
                                        {
                                            item.isActive ?
                                                <Tippy content='Active'>
                                                    <Switch style={roleUser === 3 ? { cursor: 'not-allowed' } : {}} onChange={() => handleChangeActive(item.id)} checked={!!item.isActive} size='small' />
                                                </Tippy> :
                                                <Tippy content='No active'>
                                                    <Switch style={roleUser === 3 ? { cursor: 'not-allowed' } : {}} onChange={() => handleChangeActive(item.id)} checked={!!item.isActive} size='small' />
                                                </Tippy>

                                        }
                                        <Tippy content='Delete'>
                                            <IconButton
                                                onClick={() => handleDeleteMember(item.id)}
                                                style={roleUser === 3 ? { padding: 0, cursor: 'not-allowed' } : { paddig: 0 }}
                                                aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tippy>
                                    </div>
                                </div>
                            </MenuItem>
                        ))
                    }
                </div>
            </Menu>
        </>
    )
}

export default AllMember

// <Avatar style={{ width: 25, height: 25, fontSize: 12 }} {...stringAvatar(item.fullName)} />