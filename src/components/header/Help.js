import Tippy from "@tippyjs/react";
import React from "react";
import { Link } from "react-router-dom";

function Help() {
  return (
    <>
      <Tippy content="Help">
        <Link to="/tutorial">
          <div data-tut="tut-help" className="help header-right-option">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
      </Tippy>
    </>
  );
}

export default Help;
