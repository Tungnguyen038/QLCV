import React, { useEffect, useState } from "react";
import { BASE_URL } from "../util/constants";
import axios from "axios";
import TestItem from "../components/test-list/TestItem";
import { v4 } from "uuid";
import "../components/test-list/TestItem.scss";
import { Link } from "react-router-dom";

const TestListPage = () => {
  const [getTest, setGetTest] = useState();
  const getTestList = async () => {
    await axios
      .get(`${BASE_URL}/api/TestResults/GetTests`)
      .then((res) => {
        setGetTest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    document.title = "Test-result";
    getTestList();
  }, []);
  return (
    <div className="w-[1320px] mx-auto p-4">
      <div className="wrapper">
        <h2 className="heading-test font-semibold">
          List of tests ({getTest?.length})
        </h2>
        <Link to='/test-results' className="view-link">View done</Link>
      </div>
      <div className="">
        {getTest && getTest.length > 0 ? (
          <div className="border-2 shadow-md flex flex-wrap gap-10 mt-8 bg-slate-300 ">
            {getTest.map((item) => (
              <TestItem key={v4()} TestItem={item}></TestItem>
            ))}
          </div>
        ) : (
          <div className="flex justify-center text-xl font-semibold items-center w-full">
            you don't have any test
          </div>
        )}
      </div>
    </div>
  );
};

export default TestListPage;
