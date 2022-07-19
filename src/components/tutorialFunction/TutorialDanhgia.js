import React from "react";

const TutorialDanhgia = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 uppercase heading-test animate__animated animate__rollIn animate__delay-1s">
        Comparative assessment: strengths and weaknesses, what is not perfect
      </h2>
      <div className="">
        <h2 className="text-xl font-semibold">1. Strength: </h2>
        <div className="ml-5">
          <p>
            • Provide new users with a tool to approach the management model
            Agile management, encapsulates the most important functions in a
            single application using the Scrum method.{" "}
          </p>
          <p>
            • To make it more accessible to newcomers, the app makes it possible
            for users to Simultaneous use of multiple accounts, for testing 3
            scrums roles from that understand the overview of managing a project
            according to Scrum.
          </p>
        </div>
      </div>
      <div className="mt-7">
        <h2 className="text-xl font-semibold">2. Weakness: </h2>
        <div className="ml-5">
          <p>• Can't integrate more utilities from 3rd party.</p>
          <p>
            • Can't develop functions with complex business to support big
            enterprise.
          </p>
          <p>
            • Extended and customized functions cannot be provided to users yet
            Advanced
          </p>
          <p>• Some components can't work in realtime yet.</p>
          <p>• There are no continuous user support functions yet.</p>
        </div>
      </div>
    </div>
  );
};

export default TutorialDanhgia;
