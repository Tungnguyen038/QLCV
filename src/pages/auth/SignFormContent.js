import React from "react";

const SignFormContent = ({ Children }) => {
  return (
    <div className="relative inset-0 flex items-center w-full h-full signup-right">
      {Children}
    </div>
  );
};

export default SignFormContent;
