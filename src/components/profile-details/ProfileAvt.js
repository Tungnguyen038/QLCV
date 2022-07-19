import React, { useRef } from "react";
// import avtUser from "../../images/avt-user.png";
import { BASE_URL } from "../../util/constants";
import avtUser from "../../images/avt-user.png";

import createToast from "../../util/createToast";
const ProfileAvt = ({ user, avt, setAvt }) => {
  const showPriview = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvt(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    e.target.submit();
    createToast("success", "Upload avatar successfully!");
  };
  console.log("avt", avt);
  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      action={`${BASE_URL}/api/User/UploadAvatar`}
      encType="multipart/form-data"
    >
      <div className="w-full h-[270px]  rounded-lg header-avt  border-slate-500 border-2">
        <div className="h-[110px] header-avt-top  p-10 flex ">
          <div className="items-center w-[105px] mt-5">
            <img src={avt} alt="avt-user" className="img-avt" />
          </div>
          <div className="flex items-center mt-8 justify-between w-full">
            <div className="mt-8 ml-10 ">
              <h3 className="text-2xl font-semibold text-blue-500">
                {user.fullName}
              </h3>
              <span className="text-base text-slate-600">{user.email}</span>
            </div>
            <div className=" flex text-base  flex-col items-center w-[50px] h-[50px] rounded-full bg-white text-black font-semibold justify-center shadow-md">
              {user.scores}
              <span className="text-xs font-bold mt-[-5px]">scores</span>
            </div>
          </div>
        </div>

        <div className="mt-10 ml-5">
          <input
            type="file"
            name="file"
            id="input-avt"
            accept="image/*"
            className="cursor-pointer "
            onChange={showPriview}
          />
          <input
            type="text"
            name="url"
            id="input-avt"
            accept="image/*"
            className="cursor-pointer "
            hidden
            value={window.location.href}
            onChange={() => {}}
          />
          <div className="inline-block px-2 py-1 mt-4 text-white transition-all bg-blue-500 rounded-lg cursor-pointer hover:opacity-90 hover: label-avt">
            <label
              htmlFor="input-avt"
              className="flex items-center cursor-pointer image-upload"
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Chọn ảnh đại diện
            </label>
          </div>
        </div>
        <div className="flex justify-between p-4 ml-[3px]">
          <button
            disabled={avt === avtUser}
            type="submit"
            className={`px-3 py-2 mr-4 text-base disabled:bg-slate-500 text-white bg-blue-500 rounded-lg hover:bg-blue-600`}
          >
            Đăng ảnh đại diện
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileAvt;
