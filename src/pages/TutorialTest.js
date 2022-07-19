import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "../scss/TutorialTestPage.scss";
import TutorialFunction from "../components/tutorialFunction/TutorialFunction";
import TutorialIntroduce from "../components/tutorialFunction/TutorialIntroduce";
import TutorialStudy from "../components/tutorialFunction/TutorialStudy";
import TutorialDanhgia from "../components/tutorialFunction/TutorialDanhgia";
import TutorialKetLuan from "../components/tutorialFunction/TutorialKetLuan";

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
        <Box p={3}>
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
    height: 546,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "300px",
  },
}));
const TutorialTest = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="w-[1320px] mx-auto">
        <div className="mt-5 mb-5">
          <h1 class="jt --debug">
            <span class="jt__row">
              <span class="jt__text text-4xl">WELCOME MARVIC APP</span>
            </span>
            <span class="jt__row jt__row--sibling" aria-hidden="true">
              <span class="jt__text text-4xl">WELCOME MARVIC APP</span>
            </span>
            <span class="jt__row jt__row--sibling" aria-hidden="true">
              <span class="jt__text text-4xl">WELCOME MARVIC APP</span>
            </span>
            <span class="jt__row jt__row--sibling" aria-hidden="true">
              <span class="jt__text text-4xl">WELCOME MARVIC APP</span>
            </span>
          </h1>
        </div>
        <div className={`${classes.root}  border-2 p-2 rounded-lg mt-2 pb-5`}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Overview Introduction" {...a11yProps(0)} />
            <Tab
              label="Study the current status of apps in the same segment. "
              {...a11yProps(1)}
            />
            <Tab label="Function" {...a11yProps(2)} />
            <Tab label=" Comparative Review" {...a11yProps(3)} />
            <Tab label=" 	Conclusion" {...a11yProps(4)} />
          </Tabs>
          <TabPanel value={value} index={0} className="w-[1000px] h-[500px] ">
            <>
              <TutorialIntroduce />
            </>
          </TabPanel>
          <TabPanel value={value} index={1} className="w-[1000px] h-[500px]">
            <TutorialStudy />
          </TabPanel>
          <TabPanel value={value} index={2} className="w-[1000px] h-[500px]">
            <TutorialFunction />
          </TabPanel>
          <TabPanel value={value} index={3} className="w-[1000px] h-[500px]">
            <TutorialDanhgia />
          </TabPanel>
          <TabPanel value={value} index={4} className="w-[1000px] h-[500px]">
            <TutorialKetLuan />
          </TabPanel>
        </div>
      </div>
    </>
  );
};

export default TutorialTest;
