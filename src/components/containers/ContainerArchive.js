import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../util/constants";
import ArchiveSprint from "../archive/ArchiveSprint";
import TopDetail from "../project-detail/TopDetail";
import "./ContainerArchive.scss";
import { v4 } from "uuid";
import nullImg from "../../images/null.png";
import BreadcrumbsComp from "../project-detail/Breadcrumbs";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={7}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    border: "1px solid #ccc",
    height: "400px",
    borderRadius: "16px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const ContainerArchive = ({ project }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [archive, setArchive] = useState([]);
  useEffect(() => {
    const getArchive = async () => {
      await axios
        .get(`${BASE_URL}/api/Issue/GetIssuesArchive/${project.id}`)
        .then((res) => {
          setArchive(res.data);
        });
    };
    if (project && Object.entries(project).length > 0) {
      getArchive();
    }
  }, [project]);

  console.log("archive", archive);
  return (
    <div className="p-[40px] ">
      <div className="flex flex-col w-full">
        <BreadcrumbsComp />
        <h2 className="flex justify-center text-4xl font-semibold text-blue-500">
          Archive
        </h2>
        <div className="overflow-y-auto archive-main pt-4 have-y-scroll h-[430px] bg-slate-300 pl-4 pr-4 rounded-[16px]  mt-5 ">
          {archive && archive.length > 0 ? (
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                {archive.map((item, index) => (
                  <Tab
                    key={v4()}
                    label={`${item.sprintName} (${item.issues.length})`}
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
              {archive.map((item, index) => (
                <div className="p-[-20px]">
                  <h2 className="flex justify-center mt-4 text-xl font-semibold text-blue-700">{`${item.sprintName} (${item.issues.length})`}</h2>
                  <TabPanel
                    key={v4()}
                    value={value}
                    index={index}
                    className="mt-[-50px]"
                  >
                    <ArchiveSprint
                      project={project}
                      key={v4()}
                      ArchiveSprint={item}
                    ></ArchiveSprint>
                  </TabPanel>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center w-full">
              <h2 className="text-xl font-semibold">
                No issues have been archived yet
              </h2>
              <div className="w-full flex  justify-center h-[100vh] ">
                <img
                  className="w-[200px] h-[200px] my-[40px] items-center"
                  src={nullImg}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContainerArchive;
