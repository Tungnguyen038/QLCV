import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useStageContext } from "../../contexts/stageContext";
import { useListIssueContext } from "../../contexts/listIssueContext";
import { fetchIssue, updateIssues } from "../../reducers/listIssueReducer";
import createToast from "../../util/createToast";
import { v4 } from "uuid";
import axios from "axios";
import { BASE_URL } from "../../util/constants";
import { useSelector } from "react-redux";


function Stages({ stage, issue, project }) {
  const { currentUser } = useSelector(state => state.auth.login);
  const [{ stages }] = useStageContext();
  const [, dispatch] = useListIssueContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // handle chooose stage
  const handleChooseStage = async (idStage) => {
    // const dataPut = { ...issue };
    // dataPut.id_Stage = idStage;
    // await updateIssues(dataPut, dispatch);
    const dataPut = {
      "idUpdator": currentUser.id,
      "idIssue": issue.id,
      "idStage": idStage,
      "order": issue.order
    }
    const resp = await axios.put(`${BASE_URL}/api/Issue/ChangeIssueStage`, dataPut);
    if (resp && resp.status === 200) {
      await fetchIssue(project.id, dispatch);
      createToast('success', 'Update stage successfully!');
    }
  }

  return (
    <>
      <Button
        onClick={handleClick}
        variant='contained'
        endIcon={<KeyboardArrowDownIcon style={{ fontSize: 14 }} />}
        sx={{
          backgroundColor: '#ccc',
          fontSize: 10,
          padding: '2px 6px',
          color: '#000',
          fontWeight: 550,
          marginLeft: 5,
          '&:hover': {
            backgroundColor: '#0052cc',
            color: 'white'
          }
        }}
      >
        {stage?.stage_Name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {
          stages.map(item => {
            return (
              item?.id !== stage?.id ?
                <MenuItem key={v4()}>
                  <div onClick={() => handleChooseStage(item.id)} className='uppercase cursor-pointer text-[12px]'>{item.stage_Name}</div>
                </MenuItem> :
                null
            )
          })
        }
      </Menu>
    </>
  );
}

export default Stages;
