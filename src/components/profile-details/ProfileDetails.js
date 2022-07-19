import React, { useEffect, useRef, useState } from "react";
import createToast from "../../util/createToast";

const ProfileDetails = ({
  valueFullName,
  label,
  handleSubmit,
  initialText = "",
  type
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [text, setText] = useState(valueFullName);
  const nodeRef = useRef(null);
  const handleFocusEdit = () => {
    setShowEdit(true);
  };
  useEffect(() => {
    function handleClickOutSide(e) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches("input")
      ) {
        setShowEdit(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      handleSubmit(text);
    } else {
      handleSubmit(text);
    }
    setShowEdit(false);
    createToast("success", "Update user successfully!");
  };
  const handleCloseEdit = ()=>{
    setShowEdit(false);
    setText(valueFullName)
    
  }
  return (
    <form onSubmit={onSubmit} className="mb-5">
      <div className="flex items-center justify-around">
        <div className="relative flex flex-col input2">
          <label
            htmlFor=""
            className="text-base font-semibold ml-[14px] text-slate-500"
          >
            {label}
          </label>
          <input
            ref={nodeRef}
            type={type}
            className="px-4 py-2 transition-all rounded-lg outline-blue-500 w-[300px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={handleFocusEdit}
            required
          />
          {showEdit && (
            <div className="cursor-pointer" ref={nodeRef}>
              <button
                type="submit"
                className="absolute z-10 right-[28px] flex items-center justify-center rounded-lg w-7 h-7 bg-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <div
                onClick={handleCloseEdit}
                className="absolute right-0 z-10 flex items-center justify-center rounded-lg w-7 h-7 bg-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col select-none">
          <span className="text-sm font-normal">
            Ai có thể nhìn thấy nội dung này
          </span>
          <span className="flex items-center text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clipRule="evenodd"
              />
            </svg>
            <p>Bất kỳ ai</p>
          </span>
        </div>
      </div>
    </form>
  );
};

export default ProfileDetails;
