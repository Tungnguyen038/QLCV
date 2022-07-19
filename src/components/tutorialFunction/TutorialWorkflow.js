import React from "react";

import imgregisterusecase from "../../img/registerusecase.png";
import imgloginusecase from "../../img/loginusecase.png";
import imglogin from "../../img/login.png";
import imgloginlandau from "../../img/loginlandau.png";
import imgforgotpass from "../../img/forgotpass.png";
import imgyourworkflow from "../../img/yourworkflow.png";

import imgyourwork from "../../img/yourwork.png";
import imgassign from "../../img/assign.png";
import imgstarred from "../../img/starred.png";
import imgcreateproject from "../../img/createproject.png";
import imgviducreate from "../../img/viducreate.png";
import imgproject from "../../img/project.png";
import imgcreateepic from "../../img/createepic.png";
import imgtaoepic from "../../img/taoepic.png";
import imgcreateissue from "../../img/createissue.png";
import imgchonthuoctinh from "../../img/chonthuoctinh.png";
import imgdattenissue from "../../img/dattenissue.png";
import imgenterissue from "../../img/enterissue.png";
import imgaddlabel from "../../img/addlabel.png";
import imgdattenlabel from "../../img/dattenlabel.png";
import imgtaolabel from "../../img/taolabel.png";
import imgtaoralabel from "../../img/taoralabel.png";
import imgtaoralabel1 from "../../img/taoralabel1.png";
import imgaddmember from "../../img/addmember.png";
import imgcuasomember from "../../img/cuasomember.png";
import imgviduaddmember from "../../img/viduaddmember.png";
import imgthemnhieumember from "../../img/themnhieumember.png";
import imgketquamember from "../../img/ketquamember.png";
import imgcreatesprint from "../../img/createsprint.png";
import imgcreatesprint1 from "../../img/createsprint1.png";
import imgreplacesprint from "../../img/replacesprint.png";
import imgeditsprint from "../../img/editsprint.png";
import imgkeotha from "../../img/keotha.png";
import imgchonis from "../../img/chonis.png";
import imgnhomdt from "../../img/nhomdt.png";
import imgisthaotac from "../../img/isthaotac.png";
import imgnhomdetail from "../../img/nhomdetail.png";
import imgstartsprint from "../../img/startsprint.png";
import img122 from "../../img/122.png";
import img131 from "../../img/131.png";
import img132 from "../../img/132.png";
import img1321 from "../../img/1321.png";
import img1322 from "../../img/1322.png";
import img1331 from "../../img/1331.png";
import img1332 from "../../img/1332.png";
import img13331 from "../../img/13331.png";
import img13332 from "../../img/13332.png";
import img90 from "../../img/90.png";
import img91 from "../../img/91.png";
import img92 from "../../img/92.png";

const TutorialWorkflow = () => {
  return (
    <div className="overflow-y-auto have-y-scroll h-[400px] animate__animated animate__lightSpeedInLeft pb-3">
      <div>
        <h2 className="text-xl font-semibold">1. register</h2>
        <div>
          <div className="">
            <img src={imgregisterusecase} className="img-tutorial" alt="" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">2. Login</h2>
        <div>
          <ul className="ml-2">
            <li>
              <h3>
                <strong className="text-blue-800">A Use Case diagram: </strong>
              </h3>
              <img src={imgloginusecase} className="img-tutorial" alt="" />
            </li>
            <li className="mt-4">
              <h3>
                <strong className="text-blue-800">
                  B After the user registers an account:
                </strong>
              </h3>
              <img src={imglogin} alt="" className="img-tutorial" />
            </li>
            <li className="mt-4">
              <h3>
                <strong className="text-blue-800">
                  C Log in for the first time:{" "}
                </strong>{" "}
              </h3>
              <img src={imgloginlandau} className="img-tutorial" alt="" />
              <span className="mt-4">
                <strong> Note:</strong>
                If you log in for the 2nd time or later, the user will be
                redirected to Your Work interface.
              </span>
            </li>
            <li className="mt-4">
              <h3>
                <strong className="text-blue-800">D Forgot Password:</strong>{" "}
              </h3>
              <img src={imgforgotpass} className="img-tutorial" alt="" />
            </li>
            <li className="mt-4">
              <h3>
                <strong className="text-blue-800">E Your Work:</strong>{" "}
              </h3>
              <img src={imgyourworkflow} className="img-tutorial" alt="" />
              <span className="mt-4">
                There will be display options about{" "}
                <strong>Worked on, Assigned to me, Starred.</strong>
              </span>

              <ul className="ml-4">
                <li>
                  <h3>
                    <strong className="text-blue-800"> • Worked on:</strong> The
                    jobs in which the user is engaged can be assignee, reporter.
                  </h3>
                  <img src={imgyourwork} alt="" />
                </li>
                <li className="mt-2">
                  <h3>
                    <strong className="text-blue-800"> • Assignee:</strong>
                    Paralysis List the tasks that the user is responsible for
                    solving.
                  </h3>
                  <img src={imgassign} alt="" />
                </li>
                <li className="mt-2">
                  <h3>
                    <strong className="text-blue-800"> • Starred: </strong>{" "}
                    Paralysis list important projects and are marked with an
                    asterisk.
                  </h3>
                  <img src={imgstarred} alt="" />
                </li>
              </ul>
              <span className="mt-4">
                <strong> Note:</strong>
                If the user has not joined any Project, the default is 4 screens
                This will be blank.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">3. Create project</h2>
        <div>
          <div className="flex justify-around">
            <img src={imgcreateproject} className="img-tutorial-mini" alt="" />
            <div className="mt-8">
              <h2 className="text-base text-blue-800">
                Users create Project by
              </h2>
              <ul className="mt-4">
                <li>o To name</li>
                <li className="mt-3">o Specify the start and end time</li>
                <li className="mt-3">
                  o Project access (Public, Private, Limited)
                </li>
                <li className="mt-3">
                  o Project's keyword (abbreviated name).
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="ml-5 text-xl font-semibold">For example: </h3>
            <img src={imgviducreate} className="img-tutorial-mini" alt="" />
            <ul>
              <li>
                • After fully determining the information of Project. Click
                Create to create Project or Cancle to cancel.
              </li>
              <li>
                •After clicking Create
                <div>
                  <img src={imgproject} className="" alt="" />
                </div>
              </li>
              <li>
                •Here users can attach or remove the Project star for
                convenience follow.
              </li>
              <li>
                •Or click on Project so that the system leads the user to the
                Board of the Project just clicked.
              </li>
              <li>
                <strong> Note</strong>
                <ul>
                  <li>
                    • If no Project Sprint has been created and started yet
                    Board will be empty.
                  </li>
                  <li>
                    • By default, when the Project is created, there will be 3
                    stages available (Todo, Inprogress, Done).
                  </li>
                  <li>
                    • The creator of the Project, will initially be the person
                    holding the position Leader and system will mark this as
                    creator to help activity history tracking.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          4. Create Epic for the project
        </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Click on
            “Epic” and select “Create Epic”
          </p>
          <img src={imgcreateepic} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> Name for
            Epic
          </p>
          <img src={imgtaoepic} className="" alt="" />
          <p>• Can be named arbitrarily (Example: Epic Create Project)</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          5. Create Issue for Project in Backlog section.
        </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Click on
            “Create Issue”
          </p>
          <img src={imgcreateissue} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> Select
            belong properties of the Issue (Story, Task, Bug) and naming.
          </p>
          <img src={imgchonthuoctinh} className="" alt="" />
          <img src={imgdattenissue} className="" alt="" />
          <p>• Can be named arbitrarily (Example: Epic Create Project)</p>
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 3:</span> After
            select properties and name them, press Enter to let the system
            proceed to create Issue
          </p>
          <img src={imgenterissue} className="" alt="" />
          <ul className="ml-4">
            <li>
              • After the Issue is created successfully, the system will be
              automatically generated Move to the container named “Backlog”.
            </li>
            <li>
              • Once an Issue is created, the user can click on it and execute
              it Now fill in the details for the Issue such as:
              <ul className="ml-8">
                <li>o Issue belongs to which Epic.</li>
                <li>o Description of Issue.</li>
                <li>o Attach any File to Issue.</li>
                <li>o Attach Label to Issue.</li>
                <li>o Attach sub issue.</li>
                <li>o Attach related issue.</li>
                <li>o Attach Assignee (doer).</li>
                <li>o Attach Reporter (who is reported by Assignee).</li>
                <li>o Assign points to Issue.</li>
                <li>o Issue's expected start and end date.</li>
                <li>
                  o Comment on Issue to help exchange information between
                  members pellets.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          6. Create Label for Project (optional)
        </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Click on
            “Label” and select “Add Label”
          </p>
          <img src={imgaddlabel} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> Name for
            Labels and press Enter.
          </p>
          <img src={imgdattenlabel} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 3:</span>Creation
            results Label
          </p>
          <img src={imgtaolabel} className="" alt="" />
          <ul className="ml-4">
            <li>
              •After the user creates a Label, it is possible to assign a Label
              to one or Multiple Issues and can filter Issues by Label for easy
              checking control when the number of Issues increases. Filter by
              clicking on the square before Label
              <img src={imgtaoralabel} className="" alt="" />
            </li>
            <li>
              • Here there are 2 Issues and 1 of 2 is labeled "Back Office"
              <img src={imgtaoralabel1} className="" alt="" />
            </li>
            <li>
              • After filtering Issues by Label "Back Office", 2 Issues ban At
              first, the user will see 1 Issue remaining on the screen.
            </li>
            <li>
              • This will display the number of Labels selected. Quantity
              displayed displayed on the right of the Label (on the picture is
              the number “1”)
            </li>
            <li>
              •After using 1 or more filters, the “Clear filter” button will
              appear, makes it easier for people to get rid of multiple filters
              use.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          7. Add members to the project.
        </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span>Click on
            icon as shown below.
          </p>
          <img src={imgaddmember} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> A window
            will appear
          </p>
          <img src={imgcuasomember} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 3:</span> : Enter
            name of the member you want to add to the Project.
          </p>
          <p>
            <strong>Note:</strong>
            Because the manager has all the information of the members in
            advance, so you will know the exact account names of the people you
            want to add Project.
          </p>
          <p>
            <strong>Note:</strong>
            Add a person with the name "Nguyen Duy Khanh", account "KhanhND"
          </p>
          <img src={imgviduaddmember} className="" alt="" />
          <ul className="ml-4">
            <li>
              • During the import process, the system will assist in searching
              for your account members are needed to add to the Project.
            </li>
            <li>
              • Can add multiple members at the same time.
              <img src={imgthemnhieumember} className="" alt="" />
            </li>
            <li>• Enter the account name of the next member (optional).</li>
            <li>
              • Click the “Add” button to complete the process of adding
              members.
            </li>
            <li>
              • After using 1 or more filters, the “Clear filter” button will
              appear, makes it easier for people to get rid of multiple filters
              use.
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 4:</span> Click on
            icon as shown below to view members in Project.
          </p>
          <img src={imgketquamember} className="" alt="" />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">8.Create Sprint for Project.</h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> At tab
            “Backlog”, click “Create sprint” button
          </p>
          <img src={imgcreatesprint} className="" alt="" />
          <ul className="ml-4">
            <li>
              • A Sprint with a system-generated default name
              <img src={imgcreatesprint1} className="" alt="" />
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> Change the
            name of the newly created Sprint (optional)
          </p>
          <img src={imgreplacesprint} className="" alt="" />
          <ul className="ml-4">
            <li>
              • Click on the 3-dot icon, the options will appear.
              <img src={imgcreatesprint1} className="" alt="" />
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 3:</span> Select
            “Edit” sprint”
          </p>

          <ul className="ml-4">
            <li>• A window will appear.</li>
            <li>
              • Here users can:
              <ul className="ml-4">
                <li>o Change name for Sprint</li>
                <li>o Set desired start and end dates.</li>
                <img src={imgeditsprint} className="" alt="" />
              </ul>
            </li>
            <li>
              • Click “Update” to finish editing or “Cancle” to cancel cancel.
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          9. Add Issues to be resolved during Sprint.
        </h2>
        <div className="ml-5">
          <p>Drag and drop Issue to be done in Sprint</p>
          <img src={imgkeotha} className="" alt="" />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          10. Assign the Issue to the implementer.
        </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Select
            Issue need to operate, a window will appear
          </p>
          <img src={imgchonis} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> At the
            group “Detail”, do select Assignee by clicking on the icon like
            picture below
          </p>
          <img src={imgnhomdt} className="" alt="" />
          <p className="ml-4">
            The list and members of the Project will appear, choose a person
            with responsible for implementing this Issue.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          11.Assign Issue already with Assignee to the person to be reported.
        </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Select
            Issue need to operate, a window will appear
          </p>
          <img src={imgisthaotac} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span>At the group
            “Detail”, do select Reporter by clicking on the icon like picture
            below
          </p>
          <img src={imgnhomdetail} className="" alt="" />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">12. Start Sprint </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Click on
            button “Start Sprint” and a window will appear.
          </p>
          <img src={imgstartsprint} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> Enter the
            information for Sprint
          </p>
          <ul className="ml-4">
            <li>• Enter a new name for the Sprint (optional).</li>
            <li>
              • Set the start and end dates for the Sprint. Note: End time
              Sprint end must be after the start time and both must be within
              the length of time the Project is still active.
              <img src={img122} className="" alt="" />
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 3:</span> Click the
            button “Start” to start Sprint or “Cancle” to cancel
          </p>
          <p className="ml-4">
            • Now users can manipulate the Project's Board.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          13. Members update the progress of Issue in Sprint.{" "}
        </h2>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Go to Board
            of Project.
          </p>
          <img src={img131} className="" alt="" />
          <p className="ml-4">
            {" "}
            <strong>• Note: </strong>Only if in Project there is 1 Sprint is
            captured At first, the new Board works and displays information.
          </p>
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> Perform
            Update progress by dragging and dropping to the status columns.
          </p>
          <img src={img132} className="" alt="" />
          <ul className="ml-4">
            <li>
              • Manager can add, edit or delete Stages (TO DO, IN PROGRESS,
              DONE) to match the way Project currently works in.
            </li>
            <li>
              • Doing:
              <ul className="ml-6">
                <li>
                  o Add Stage:
                  <ul className="ml-6">
                    <li>
                      <p>
                        <span className="text-base text-blue-900">Step 1:</span>{" "}
                        Click on the title “ADD STAGE”
                      </p>
                      <img src={img1321} className="" alt="" />
                    </li>
                    <li>
                      <p>
                        <span className="text-base text-blue-900">Step 2:</span>{" "}
                        Name the Stage and press Enter to finish
                      </p>
                      <img src={img1322} className="" alt="" />
                    </li>
                    <li>
                       The order of the Stages can be arranged by dragging and
                      drop.
                    </li>
                  </ul>
                </li>

                <li>
                  o Edit Name for Stage:
                  <ul className="ml-6">
                    <li>
                      <p>
                        <span className="text-base text-blue-900">Step 1:</span>{" "}
                        Click on the name of the Stage you want to edit
                      </p>
                      <img src={img1331} className="" alt="" />
                    </li>
                    <li>
                      <p>
                        <span className="text-base text-blue-900">Step 2:</span>{" "}
                        Type a new name for the Stage and press Enter to finish.
                      </p>
                      <img src={img1332} className="" alt="" />
                    </li>
                  </ul>
                </li>
                <li>
                  o Delete Stage:
                  <ul className="ml-6">
                    <li>
                      <p>
                        <span className="text-base text-blue-900">Step 1:</span>{" "}
                        Specify the Stage to delete.
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="text-base text-blue-900">Step 2:</span>{" "}
                        Click the "x" next to the left of the Stage's name to
                        open a window showing up
                      </p>
                      <img src={img13331} className="" alt="" />
                    </li>
                    <li>
                      <p>
                        <span className="text-base text-blue-900">Step 3:</span>{" "}
                        Select New Stage for Deleted and Completed Stage Issues
                        socks
                      </p>
                      <img src={img13332} className="" alt="" />
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 3:</span> Click the
            button “Start” to start Sprint or “Cancle” to cancel
          </p>
          <p className="ml-4">
            • Now the user can manipulate the Board of the Project.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">14 End of Sprint </h2>
        <div className="mt-3 ml-4">
          <p>
            <strong>Note:</strong>If all Issues in Sprint are completed faster
            than expected (the end of the Sprint):
          </p>
        </div>
        <div>
          <p>
            <span className="text-base text-blue-900">Step 1:</span> Move in
            Backlog of the current Project.
          </p>
          <img src={img90} className="" alt="" />
        </div>
        <div className="mt-4">
          <p>
            <span className="text-base text-blue-900">Step 2:</span> Determined
            Sprint needs to end and click “Complete Sprint” and done.
          </p>
          <img src={img91} className="" alt="" />
          <ul className="mt-3 ml-4">
            <span>Note</span>
            <li>
              o In both cases, if there is a Sprint, there is still an issue
              that has not been completed If successful, the system will allow
              the user to choose another Sprint or location of the “Backlog”
              (Issue does not belong to any Sprint) to contain the This
              unfinished issue.
            </li>
            <li>
              o If the Sprint period ends, the Sprint will automatically Move to
              Project's repository.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          15 Kiểm tra tiến độ của dự án tại Roadmap{" "}
        </h2>
        <img src={img92} className="" alt="" />
      </div>
    </div>
  );
};

export default TutorialWorkflow;
