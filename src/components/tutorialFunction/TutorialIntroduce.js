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
const TutorialIntroduce = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={`${classes.root}  ml-[-20px] mt-[-12px] `}>
      <h2 className="text-2xl font-bold text-blue-800 uppercase heading-test animate__animated animate__rollIn animate__delay-1s">
        Concepts used in the application
      </h2>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="one"
            label="Project Management Lifecycle"
            wrapped
            {...a11yProps("one")}
          />
          <Tab value="two" label="Stages in a project" {...a11yProps("two")} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <span className="ml-5 animate__animated animate__lightSpeedInLeft">
          • Project Management Life Cycle is a series activities that are
          essential to the accomplishment of the objectives or targets of the
          project. It is a pattern consisting of stages for turning an idea
          reality. Projects can vary in scope and difficulty, but they can be
          applied to the Project Management lifecycle structure project,
          regardless of the size of the project.
        </span>
      </TabPanel>
      <TabPanel value={value} index="two">
        <div className="overflow-y-auto have-y-scroll h-[400px] animate__animated animate__lightSpeedInLeft">
          <h4 className="ml-5 font-semibold">
            Process of the Project Management life cycle is divided into 5 main
            part:
          </h4>
          <div className="ml-10">
            <p className="text-blue-600">A. The Initiation Phase:</p>
            <ul>
              <li>
                • Xác định những quy trình cần thiết để bắt đầu một dự án mới.
              </li>
              <li>• Identify the processes required to start a new project.</li>
              <li>• Develop Project Charter</li>
              <li>• Identify stakeholders</li>
            </ul>
            <p className="mt-2 ">
              All information related to the project is noted in the Project
              Charter judgments and minutes of related parties. When the project
              charter is approved, the project is officially started by the
              Project Owner.
            </p>
          </div>
          <div className="mt-3 ml-10">
            <p className="text-blue-600">
              B. Project Planning Stage: The Project Planning Stage The project
              plan covers about 50% of the entire process.
            </p>
            <ul>
              <li>• Define the scope (scope) of the project</li>
              <li>• Define project goals.</li>
              <li>
                • Conduct a brainstorm to list all the tasks by category
                milestone/ sprint.
              </li>
              <li>• Engage all members in the brainstorming session</li>
              <li>
                • Write down the case diagram of the tasks also known as WBS
                (structure job analysis)
              </li>
              <li>• Estimate costs and time accordingly.</li>
            </ul>
          </div>
          <div className="mt-3 ml-10">
            <p className="text-blue-600">C. Execution phase</p>
            <ul>
              <li>
                • Team leaders and project managers are put into action to build
                Build products, be the one to help the customer, fulfill the
                mission services, execute processes, and more. The communication
                on All parts of the project are necessary and important to the
                success of the project project success.
              </li>
              <li>
                • Things needed for the implementation phase:
                <ul className="ml-5 ">
                  <li>
                    i. Regular meetings:
                    <p className="ml-5">
                      Always fully update information to Members through
                      pre-scheduled online meetings based on the current Sprint
                      being worked on. Job Guarantee timely and clear
                      communication, fewer blind spots, work group better and
                      have the best response plan.
                    </p>
                  </li>
                  <li className="mt-3">
                    ii. transparent:
                    <p className="ml-5">
                      Avoid working without knowing the general context of the
                      project, so that when encountering obstacles, they can be
                      easily solved decide. Clearly define who is responsible
                      for the task with detailed descriptions for Issue.
                    </p>
                  </li>
                  <li className="mt-3">
                    iii.Conflict Management
                    <p className="ml-5">
                      Problems are bound to happen. Minimize incidents by Each
                      Issue has an Assignee to complete the task and 1 the
                      person responsible for checking the progress and
                      effectiveness of the that work to be able to voice and
                      raise concerns, congestion or anything that can cause
                      weakness in Chain.
                    </p>
                  </li>
                  <li className="mt-3">
                    iv.Progress reports
                    <p className="ml-5">
                      Regular updates are shared in a Stand-up Meeting, with
                      statistical graphs of resolved Issues within a certain
                      period of time (usually weeks) or month).
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mt-3 ml-10">
            <p className="text-blue-600">D.Test phase</p>
            <ul>
              <li>
                • If the project workload cannot be measured, cannot be managed
                in the best way. This stage requires Check to make sure
                everything is in agreement most before. What are the key related
                metrics? Need to do what to meet deadlines and related
                parameters there?
              </li>
              <li>
                • Hold online meetings with responsible people key for
                performance test scores, evaluations and reports Regular.{" "}
              </li>
            </ul>
          </div>
          <div className="mt-3 ml-10">
            <p className="text-blue-600">E. Project Closure</p>
            <ul>
              <li>
                • Finishing a project is just as important as starting it. Also
                called the “monitoring” phase, this is the time when the project
                is completed The city is ready to be released to the public. The
                main focus here is product release and distribution.
              </li>
              <li>
                • It is important for the project manager to evaluate the round
                project life from start to finish by:
                <ul className="ml-5 ">
                  <li>
                    i. Investigate project performance
                    <p className="ml-5">
                      Are all members achieving their stated goals? Was the
                      project completed within budget and on time? are not? Did
                      the project solve any problems? Prize Addressing these
                      questions will help assess whether the project is
                      successful or not.
                    </p>
                  </li>
                  <li className="mt-3">
                    ii. Review team performance
                    <p className="ml-5">
                      Performance of team members can be drilled down more on
                      the individual to measure success in the group. Quality
                      checks, KPIs and effective online meetings The app
                      provides clearer insights into performance.
                    </p>
                  </li>
                  <li className="mt-3">
                    iii. Evaluation and finalization of the project
                    <p className="ml-5">
                      A thorough presentation that includes supporting documents
                      show the development of the project from its inception to
                      properly completed guaranteed delivery to the customer and
                      related parties.
                    </p>
                  </li>
                  <li className="mt-3">
                    iv. Request a review
                    <p className="ml-5">
                      The final evaluation of the project provides a more
                      in-depth look on strengths and weaknesses, from start to
                      finish. Find out information information and learn lessons
                      for the next time.
                    </p>
                  </li>
                  <li className="mt-3">
                    v. Over budget
                    <p className="ml-5">
                      Can accurately determine the state of budget loss as well
                      as underutilized resources for better understanding on
                      success (or failure) and help manage waste.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </TabPanel>
    </div>
  );
};

export default TutorialIntroduce;
