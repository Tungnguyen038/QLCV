import { useState, useEffect, useRef } from "react";

const useTooltip = () => {
  const [isHover, setIsHover] = useState(false);
  const [coord, setCoord] = useState({});
  const nodeRef = useRef();
  useEffect(() => {
    const nodeRefCopy = nodeRef;
    const handleMouseOver = () => {
      const bounding = nodeRefCopy.current.getBoundingClientRect();
      setIsHover(true);
      setCoord(bounding);
    };
    const handleMouseLeave = () => {
      setIsHover(false);
      setCoord({});
    };
    nodeRefCopy.current.addEventListener("mouseover", handleMouseOver);
    nodeRefCopy.current.addEventListener("mouseleave", handleMouseLeave);
    // return () => {
    //   nodeRefCopy.current.addEventListener("mouseover", handleMouseOver);
    //   nodeRefCopy.current.addEventListener("mouseleave", handleMouseLeave);
    // };
  }, []);
  return { isHover, coord, nodeRef };
};
export default useTooltip;
