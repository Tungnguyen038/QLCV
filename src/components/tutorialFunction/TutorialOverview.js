import React from "react";
import imgyourwork from "../../img/yourwork.png";
import imgassign from "../../img/assign.png";
import imgstarred from "../../img/starred.png";
import imgproject from "../../img/project.png";
import imgbacklog from "../../img/backlog.png";
import imgsprint from "../../img/sprint.png";
import imgboard from "../../img/board.png";
import imgroadmap from "../../img/roadmap.png";
import imgarchive from "../../img/archive.png";
import imgthongke from "../../img/thongke.png";

const TutorialOverview = () => {
  return (
    <div className="overflow-y-auto have-y-scroll h-[400px] animate__animated animate__lightSpeedInLeft pb-3">
      <div>
        <h2 className="text-xl font-semibold">1. Your Work</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgyourwork} alt="" />
          </div>
          <p className="ml-4">
            As a tool for users to quickly access their work myself on different
            projects to make the operation simple and fast. This tool will show
            the policy members have responsibility to participate, the work
            belongs to which project.{" "}
          </p>
        </div>
        <div className="mt-2 ml-4">
          <h3 className="text-base font-semibold">
            Here the user can see 3 elements:
          </h3>
          <div>
            <ul className="ml-2">
              <li>
                <h3>
                  <strong className="text-blue-800">A Worked on:</strong> These
                  the job the user is engaged in can be assignee, reporter.
                </h3>
                <img src={imgyourwork} alt="" />
              </li>
              <li className="mt-2">
                <h3>
                  <strong className="text-blue-800"> B Assignee:</strong>Listed
                  tasks that the user is responsible for solving.
                </h3>
                <img src={imgassign} alt="" />
              </li>
              <li className="mt-2">
                <h3>
                  <strong className="text-blue-800">C Starred: </strong> Listing
                  projects are important and are starred.
                </h3>
                <img src={imgstarred} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">2. Project</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgproject} alt="" />
          </div>
          <p className="ml-4">
            As a tool for users to quickly access their work myself on different
            projects to make the operation simple and fast. This tool will show
            the policy members have responsibility to participate, the work
            belongs to which project.{" "}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">3. Backlog</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgbacklog} alt="" />
          </div>
          <p className="ml-4">
            Where the Product Owner will create tasks and manage the job
            according to the type of work. Work can be Epic, Story or Task, each
            type of work will have its own meaning.
          </p>
        </div>
        <div className="mt-2 ml-4">
          <div>
            <ul className="ml-2">
              <li>
                <h3>
                  <strong className="text-blue-800">A Epic</strong> As public
                  part Will the most complex work be done in a quarter or many
                  months.
                </h3>
              </li>
              <li className="mt-2">
                <h3>
                  <strong className="text-blue-800"> B Story:</strong>Is public
                  having a complexity behind Epic. Story is made to share Small
                  number of tasks that must be completed to satisfy stated
                  requirements by Epic. An Epic can have one or more Stories.
                </h3>
              </li>
              <li className="mt-2">
                <h3>
                  <strong className="text-blue-800">C Task: </strong> Is public
                  That's after Story complexity. Different tasks can of varying
                  complexity depending on the manager's judgment. Tasks are
                  created to break down the tasks that must be completed in
                  order to satisfy the requirements set forth by the Story. One
                  Story can have one or more Tasks.
                </h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">4. Sprint</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgsprint} alt="" />
          </div>
          <p className="mt-2 ml-4">
            <ul>
              <li>
                •Where will receive jobs from Backlog, these jobs will be
                selected by the members and make decisions that will give
                priority solved before the rest. That will make sure Important
                tasks are always dealt with first. Person Manager can start and
                end Sprint at intervals reasonable (usually a Sprint will take
                place in 2 weeks).
              </li>
              <li className="mt-1">
                • Only one Sprint can be started at a time in the Project. After
                When the Sprint in progress ends, the user can start another
                Sprint.
              </li>
              <li className="mt-1">
                • If the Sprint ends and there is still unfinished business,
                then This job will be created by the system 1 new Sprint (if
                Sprint currently the only Sprint of the project) and move the
                jobs from Sprint to Sprint, or if there are already created
                Sprints users can choose where to go to one of these Sprints or
                move to the section where the work does not belong to any
                Sprint. The completed work will be moved to the Archive of the
                project judgment.
              </li>
            </ul>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">5. Board</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgboard} alt="" />
          </div>
          <p className="mt-2 ml-4">
            Where the project's Stages and the project's 3 default Stages (To
            do, In Progress, Done) and after any Sprint is started Jobs will be
            listed on Stage To do, manager can create more Or remove the stage
            to fit your project best. All of The project's developer can
            manipulate the assigned work, and move transfer the work assigned to
            you to the appropriate Stage. For example when Work in progress
            Developer will move to Stage In Progress and when the job is
            completed, it will be Developer move to Stage Done
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">6. Roadmap</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgroadmap} alt="" />
          </div>
          <p className="mt-2 ml-4">
            A roadmap that includes a list of features, ideas, things to do,
            from small projects to big projects and even bigger ones effort must
            be achieved. Of course, everything has a deadline complete. So
            everyone can do their job Follow the Product Roadmap and don't have
            to worry about what to do next follow. Roadmap is a powerful tool to
            describe how a product How long can the product be developed, and
            what are the goals of each phase? paragraph.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">7. Archive</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgarchive} alt="" />
          </div>
          <p className="mt-2 ml-4">
            A place to store completed jobs. Full expression of works each
            Sprint has been completed.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">8. Statistical</h2>
        <div>
          <div className="cursor-pointer hover:scale-150">
            <img src={imgthongke} alt="" />
          </div>
          <p className="mt-2 ml-4">
            The system will calculate the number of scheduled jobs based on
            User-specified time period, can be 1 week, 1 month or 1 five. Or the
            number of completed jobs in the Archive. Generation The system will
            display the data through a graph and the user can Select the chart
            (Column, Pie, Area). Furthermore users can Export charts to aid in
            visual reporting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverview;
