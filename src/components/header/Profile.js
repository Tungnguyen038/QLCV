import React, { useEffect, useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { logOut } from "../../redux/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import avtUser from "../../images/avt-user.png";
import axios from "axios";
import { BASE_URL } from "../../util/constants";
import Tippy from "@tippyjs/react";
function Profile() {
  const { show, setShow, nodeRef } = useClickOutSide();
  const [user, setUser] = useState([]);
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut(dispatch, navigate, id);
  };

  const getUserDetails = async () => {
    const resp = await axios.get(`${BASE_URL}/api/User/GetLoginUser`);
    if (resp && resp.status === 200) {
      setUser(resp.data);
    } else {
      throw new Error("Error when fetch user details");
    }
  };
  useEffect(() => {
    document.title = "Lý lịch | Marvic";
    getUserDetails();
  }, []);
  return (
    <>
      {user ? (
        <div data-tut="tut-info" className="relative">
          <div
            className="user header-right-option"
            onClick={() => setShow(!show)}
          >
            <Tippy content="Your profile and settings">
              <span ref={nodeRef}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </Tippy>
          </div>
          {show && (
            <div
              className={`absolute user-profile bg-white shadow-lg  w-[310px] right-0 p-4 rounded-lg flex text-slate-600 border  items-center flex-col z-50`}
            >
              <div className="flex justify-center w-full border-b-2">
                <h2 className="pb-2 text-[#5e6c84] text-xl  ml-auto select-none">
                  Tài Khoản
                </h2>
                <span className="ml-auto cursor-pointer">
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
                </span>
              </div>
              <div className="flex items-center w-full py-4 border-b-2">
                <div className="flex">
                  <div className="avt-user">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={user.avatar_Path || avtUser}
                      alt=""
                    />
                  </div>
                  <div className="items-center ml-5">
                    <h3 className="text-base text-[#172b4d]">
                      <strong>{user.fullName}</strong>
                    </h3>
                    <span className="text-sm text-[#B3BAC5] w-full">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="items-center w-full py-4 border-b-2">
                <Link to="/profile">
                  <div className="px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200">
                    <span className="text-[#172b4d]">Hồ sơ và hiển thị</span>
                  </div>
                </Link>
                <div className="px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200">
                  <span className="text-[#172b4d]">Hoạt động</span>
                </div>
                <div className="px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200">
                  <span className="text-[#172b4d]">Thẻ</span>
                </div>
                <div className="px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200">
                  <span className="text-[#172b4d]">Cài đặt</span>
                </div>
              </div>
              <div className="items-center w-full py-4 border-b-2">
                <div className="px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200">
                  <span className="text-[#172b4d]">Trợ giúp</span>
                </div>
                <div className="px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200">
                  <span className="text-[#172b4d]">Phím tắt</span>
                </div>
              </div>
              <div className="items-center w-full py-4 border-b-2">
                <div
                  className="px-2 py-1 rounded-md cursor-pointer hover:bg-slate-200"
                  onClick={handleLogOut}
                >
                  <span className="text-[#172b4d]">Đăng xuất</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="px-6 py-3 mr-5 text-sm text-white bg-blue-500 rounded-lg">
            Login
          </button>
        </Link>
      )}
    </>
  );
}

export default Profile;
