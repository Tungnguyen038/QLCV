import React from "react";
import useHover from "../../hooks/useHover";

const UserYourWork = ({ user }) => {
  return (
    <>
      <h2 className="px-3 py-1 rounded-lg hover:bg-slate-200">
        {user.userName}
      </h2>
    </>
  );
};

export default UserYourWork;
