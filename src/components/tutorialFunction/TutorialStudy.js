import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
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
const TutorialStudy = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={`${classes.root}  ml-[-20px] mt-[-12px] `}>
      <h2 className="text-2xl font-bold text-blue-800 uppercase heading-test animate__animated animate__rollIn animate__delay-1s">
        Study the current status of apps in the same segment
      </h2>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Jira" wrapped {...a11yProps("one")} />
          <Tab value="two" label="Monday" {...a11yProps("two")} />
          <Tab value="three" label="Trello" {...a11yProps("three")} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <div className="overflow-y-auto have-y-scroll h-[400px] animate__animated animate__lightSpeedInLeft">
          <div>
            <h2 className="text-xl font-semibold">1. Strength</h2>
            <ul className="mt-1 ml-5">
              <li>• Fully functional for professional users</li>
              <li>• Smooth drag and drop operations</li>
              <li>• Easy to find issues</li>
              <li>
                • The notification function helps users not to miss information.
              </li>
              <li>• Stay on schedule with a timeline.</li>
              <li>
                • Supporting businesses to coordinate multiple projects at the
                same time.
              </li>
              <li>• Good user customization.</li>
              <li>
                • There is an ecosystem that supports many products, helping
                users to operate synchronized with other applications.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mt-4 text-xl font-semibold">2. Weakness</h2>
            <ul className="mt-1 ml-5">
              <li>
                • There are many versions over the years, forcing users to spend
                plenty of time to get used to the big changes.
              </li>
              <li>
                •Due to continuous development, it is inevitable that users was
                using the stable version suddenly got renewed and problems
                occurred error occurred.
              </li>
              <li>
                • Instructions may be outdated due to continuous development by
                Jira.
              </li>
              <li>• The majority of users need to take one or more courses.</li>
              <li>
                • There is too much information on the interface. Easy to make
                users suffer confused when using it.
              </li>
              <li>
                • Does not support people who are new to the Agile concept
                (which is management model used by Jira) is used in multiple
                roles in a project judgment.
              </li>
              <li>• Limited many functions when using it for free.</li>
              <li>
                • The cost is high, after 7 days of trial, the more businesses
                have The larger the scale, the more it costs: $10 per month for
                up to 10 accounts; from 11-100 accounts is $7/account/month
              </li>
              <li>
                • It takes a lot of time and effort to set up, so it can only be
                maximized effective for large projects, not suitable for small
                and medium projects (under 3 months)
              </li>
              <li>• Complex workflow that requires thorough understanding</li>
            </ul>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index="two">
        <div className="overflow-y-auto have-y-scroll h-[400px] animate__animated animate__lightSpeedInLeft">
          <div>
            <h2 className="text-xl font-semibold">1. Strength</h2>
            <ul className="mt-1 ml-5">
              <li>
                • There is a discussion feature on each job, a conference is
                possible internally but can also discuss back and forth with
                customers.{" "}
              </li>
              <li>• Modern interface.</li>
              <li>• Can integrate with 3rd service providers.</li>
            </ul>
          </div>
          <div>
            <h2 className="mt-4 text-xl font-semibold">2. Weakness</h2>
            <ul className="mt-1 ml-5">
              <li>• The interface is not simple or sophisticated.</li>
              <li>
                • Lack of Quick Helps to help users get used to it quickly than.
              </li>
              <li>• High fees</li>
            </ul>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index="three">
        <div className="overflow-y-auto have-y-scroll h-[400px] animate__animated animate__lightSpeedInLeft">
          <div>
            <h2 className="text-xl font-semibold">1. Strength</h2>
            <ul className="mt-1 ml-5">
              <li>
                <h3 className="text-base text-blue-800">A. Easy to use</h3>
                Trello has an extremely friendly working interface, the
                operations are not too much complex. You just create a list, add
                a cool to-do card Adding members is as simple as adding an email
                or sending access link. In addition, there are many board
                templates available on Trello with different themes quite
                diverse and beautiful.
              </li>
              <li>
                <h3 className="text-base text-blue-800">B. Free</h3>Trello
                currently offering the product as Freemium, ie users can use the
                basic features for free. With the Advanced features, you have to
                pay extra from 5$ a month /People. However, the basic tasks
                should be enough to help you manage your work.
              </li>
              <li>
                <h3 className="text-base text-blue-800">C. Visual tracking</h3>
                Trello is designed based on the Kanban project management
                methodology, so the work stages will be divided into categories
                books as to-do lists. And just look at the interface, are you
                Immediately grasp the project progress in the most intuitive
                way.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">2. Weakness</h2>
            <ul className="mt-1 ml-5">
              <li>
                <h3 className="text-base text-blue-800">
                  A. Poor interaction between members
                </h3>
                Taking revenge in the cards, members can exchange with each
                other but missing 1 mailbox or interface for exchange members
                about the whole project. Commenting in the card is also not
                friendly good, you can't comment quickly with enter key, you
                have to press It's quite inconvenient to save.
              </li>
              <li>
                <h3 className="text-base text-blue-800">
                  B. Not suitable for time management{" "}
                </h3>
                With only one interface spread horizontally, Trello makes it
                difficult difficult for users in the correct time management of
                jobs. The cards are designed independently, hindering the
                management manage the relationship between tasks (e.g. you
                hardly know the job What to do first, what to do later, what has
                to be done then can do something else). To optimize these
                factors, you will need the extensions - integration with the
                Gantt . app chart (in the paid version of Trello).
              </li>
              <li>
                <h3 className="text-base text-blue-800">
                  C. Missing work report
                </h3>
                Trello can be a pretty cool tool for teamwork, but but lacks
                many essential features for the role of a the Manager
                (Project/Team manager); including the fact that newspaper. This
                application does not have an interface that allows
                administrators Immediately track how much work has been
                completed than expected, which individuals are ensuring the
                progress of the work? assignment,...)
              </li>
            </ul>
          </div>
        </div>
      </TabPanel>
    </div>
  );
};

export default TutorialStudy;
