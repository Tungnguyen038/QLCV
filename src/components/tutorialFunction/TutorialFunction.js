import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TutorialOverview from "./TutorialOverview";
import TutorialWorkflow from "./TutorialWorkflow";
import TutorialRole from "./TutorialRole";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
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
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TutorialFunction = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={`${classes.root}  ml-[-20px] mt-[-12px] `}>
      <h2 className="text-2xl font-bold text-blue-800 uppercase heading-test animate__animated animate__rollIn animate__delay-1s">
        function, design, how to design
      </h2>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Overview" wrapped {...a11yProps("one")} />
          <Tab value="two" label="Workflow" {...a11yProps("two")} />
          <Tab
            value="three"
            label="Functions of each Role"
            {...a11yProps("three")}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <TutorialOverview />
      </TabPanel>
      <TabPanel value={value} index="two">
        <TutorialWorkflow />
      </TabPanel>
      <TabPanel value={value} index="three">
        <TutorialRole />
      </TabPanel>
    </div>
  );
};

export default TutorialFunction;
