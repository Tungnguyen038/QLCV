import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useLoading from '../../hooks/useLoading'

const TestItem = ({ TestItem }) => {
  const [isLoading] = useLoading();
  const navigate = useNavigate();
  console.log("TestItem", TestItem);
  const handleNavigate = () => {
    navigate(`/test/${TestItem.id}/${TestItem.name}`);
  };
  return (
    <>
      {
        isLoading ?
          <div
            onClick={handleNavigate}
            className="w-[27%] h-[65px] my-[18px] mx-[14px]"
          >
            <Skeleton style={{ backgroundColor: '#f4f5f7', borderRadius: 4 }} variant='rectangular' width='100%' height='100%' animation='wave' />
          </div> :
          <div
            onClick={handleNavigate}
            className="w-[27%] py-8 px-4 flex justify-center button1 type1 transition-all font-semibold"
          >
            <h2>{TestItem.name}</h2>
          </div>
      }
    </>
  );
};

export default TestItem;
