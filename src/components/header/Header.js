import React, { useEffect, useState } from "react";
import "./header.scss";
import CustomLink from "./CustomLink";
import Button from "../button/Button";
import Search from "./Search";
import Notification from "./Notification";
import Help from "./Help";
import Test from "./Test";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import useModal from "../../hooks/useModal";
import CreateProjectPopup from "../popup/CreateProjectPopup";



function Header() {
  const navigate = useNavigate();
  const [isShowProjectPopup, setIsShowProjectPopup, handleCloseProjectPopup] =
    useModal();
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  useEffect(() => { }, []);

  return (
    <>
      <div className="header-wrapper">
        <header className="header">
          <div className="header-left">
            <div onClick={() => navigate("/")} className="cursor-pointer logo">
              <svg
                height="50"
                width="50"
                fill="none"
                viewBox="0 0 185 180"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M58.086 39.6001H55.2226C52.3106 39.6001 49.95 41.8969 49.95 44.7302V113.132C49.95 115.965 52.3106 118.262 55.2226 118.262H58.086C60.998 118.262 63.3586 115.965 63.3586 113.132V44.7302C63.3586 41.8969 60.998 39.6001 58.086 39.6001Z"
                  fill="#34568B"
                />
                <path
                  d="M82.0301 51.4417H79.1667C76.2547 51.4417 73.894 53.7385 73.894 56.5718V113.132C73.894 115.965 76.2547 118.262 79.1667 118.262H82.0301C84.9421 118.262 87.3027 115.965 87.3027 113.132V56.5718C87.3027 53.7385 84.9421 51.4417 82.0301 51.4417Z"
                  fill="#8777D9"
                />
                <path
                  d="M105.974 64.1289H103.111C100.199 64.1289 97.838 66.4257 97.838 69.259V113.132C97.838 115.965 100.199 118.262 103.111 118.262H105.974C108.886 118.262 111.247 115.965 111.247 113.132V69.259C111.247 66.4257 108.886 64.1289 105.974 64.1289Z"
                  fill="#63BA3C"
                />
                <path
                  d="M129.918 80.1997H127.055C124.143 80.1997 121.782 82.4965 121.782 85.3298V113.132C121.782 115.965 124.143 118.262 127.055 118.262H129.918C132.83 118.262 135.191 115.965 135.191 113.132V85.3298C135.191 82.4965 132.83 80.1997 129.918 80.1997Z"
                  fill="#4BADE8"
                />
                <path
                  d="M69.0013 122.886V140.4H66.0487V128.405L60.5579 140.4H58.5118L52.9951 128.405V140.4H50.0425V122.886H53.2282L59.5478 136.62L65.8415 122.886H69.0013ZM71.8978 133.394C71.8978 132 72.1914 130.765 72.7784 129.69C73.3828 128.615 74.1942 127.783 75.213 127.195C76.249 126.59 77.3886 126.288 78.6318 126.288C79.7542 126.288 80.7297 126.506 81.5585 126.943C82.4045 127.363 83.0779 127.892 83.5787 128.531V126.515H86.5572V140.4H83.5787V138.334C83.0779 138.989 82.396 139.535 81.5326 139.972C80.6692 140.409 79.685 140.627 78.58 140.627C77.354 140.627 76.2318 140.324 75.213 139.72C74.1942 139.098 73.3828 138.241 72.7784 137.149C72.1914 136.04 71.8978 134.789 71.8978 133.394ZM83.5787 133.445C83.5787 132.487 83.3715 131.656 82.9571 130.95C82.5599 130.244 82.0334 129.707 81.3772 129.337C80.721 128.968 80.0132 128.783 79.2534 128.783C78.4936 128.783 77.7858 128.968 77.1296 129.337C76.4734 129.69 75.9382 130.219 75.5238 130.925C75.1266 131.614 74.9281 132.437 74.9281 133.394C74.9281 134.352 75.1266 135.192 75.5238 135.914C75.9382 136.637 76.4734 137.191 77.1296 137.578C77.803 137.947 78.511 138.132 79.2534 138.132C80.0132 138.132 80.721 137.947 81.3772 137.578C82.0334 137.208 82.5599 136.67 82.9571 135.965C83.3715 135.243 83.5787 134.402 83.5787 133.445ZM93.388 128.531C93.8196 127.825 94.3894 127.279 95.0974 126.893C95.8226 126.49 96.6773 126.288 97.6615 126.288V129.262H96.9104C95.7536 129.262 94.873 129.547 94.2686 130.118C93.6816 130.69 93.388 131.681 93.388 133.092V140.4H90.4354V126.515H93.388V128.531ZM105.892 137.83L109.933 126.515H113.066L107.627 140.4H104.105L98.6919 126.515H101.852L105.892 137.83ZM116.8 124.675C116.265 124.675 115.816 124.499 115.454 124.146C115.091 123.793 114.91 123.356 114.91 122.836C114.91 122.315 115.091 121.878 115.454 121.525C115.816 121.172 116.265 120.996 116.8 120.996C117.318 120.996 117.759 121.172 118.121 121.525C118.484 121.878 118.665 122.315 118.665 122.836C118.665 123.356 118.484 123.793 118.121 124.146C117.759 124.499 117.318 124.675 116.8 124.675ZM118.251 126.515V140.4H115.298V126.515H118.251ZM121.143 133.445C121.143 132.017 121.437 130.765 122.024 129.69C122.628 128.598 123.457 127.758 124.51 127.17C125.564 126.582 126.772 126.288 128.136 126.288C129.863 126.288 131.287 126.691 132.41 127.498C133.549 128.287 134.318 129.421 134.715 130.9H131.529C131.27 130.211 130.856 129.673 130.286 129.287C129.716 128.9 129 128.707 128.136 128.707C126.928 128.707 125.961 129.127 125.235 129.967C124.528 130.79 124.173 131.95 124.173 133.445C124.173 134.94 124.528 136.108 125.235 136.948C125.961 137.788 126.928 138.208 128.136 138.208C129.846 138.208 130.977 137.477 131.529 136.015H134.715C134.3 137.426 133.523 138.552 132.384 139.392C131.244 140.215 129.828 140.627 128.136 140.627C126.772 140.627 125.564 140.333 124.51 139.745C123.457 139.14 122.628 138.3 122.024 137.225C121.437 136.133 121.143 134.873 121.143 133.445Z"
                  fill="url(#paint0_linear_66_861)"
                />
                <path
                  d="M92.5 171C138.478 171 175.75 134.735 175.75 90C175.75 45.2649 138.478 9 92.5 9C46.5223 9 9.25 45.2649 9.25 90C9.25 134.735 46.5223 171 92.5 171Z"
                  stroke="url(#paint1_linear_66_861)"
                  strokeWidth="10"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_66_861"
                    gradientUnits="userSpaceOnUse"
                    x1="92.3786"
                    x2="92.3786"
                    y1="120.996"
                    y2="140.627"
                  >
                    <stop stopColor="#344C8B" />
                    <stop offset="1" stopColor="#8777D9" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_66_861"
                    gradientUnits="userSpaceOnUse"
                    x1="92.5"
                    x2="92.5"
                    y1="8.1"
                    y2="180"
                  >
                    <stop stopColor="#34568B" />
                    <stop offset="0.980533" stopColor="#8777D9" />
                  </linearGradient>
                </defs>
              </svg>
              <span>Marvic</span>
            </div>
            <ul className="options">
              <li className="option">
                <CustomLink to="/">Your work</CustomLink>
              </li>
              <li className="option">
                <CustomLink to="/projects">Projects</CustomLink>
              </li>
            </ul>
            <Button data-tut='tut-btn-createproject' handleClick={() => setIsShowProjectPopup(true)}>
              Create project
            </Button>
            {isShowProjectPopup && (
              <CreateProjectPopup
                setIsShowProjectPopup={setIsShowProjectPopup}
                onClose={handleCloseProjectPopup}
                visible={isShowProjectPopup}
              ></CreateProjectPopup>
            )}
          </div>
          <div className={`header-right ${isSearchFocus ? "grow" : ""}`}>
            <div
              className={`search-wrapper border-2 ${isSearchFocus ? "border-primary" : "border-[#ccc]"
                }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 icon"
                viewBox="0 0 20 20"
                fill="#ccc"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              <Search setIsSearchFocus={setIsSearchFocus}></Search>
            </div>
            <Notification></Notification>
            <Help></Help>
            <Test></Test>
            <Profile></Profile>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
