import React, { useRef, useEffect } from "react";
import Tippy from '@tippyjs/react';

function Search({ setIsSearchFocus }) {
  const searchRef = useRef();

  useEffect(() => {
    const searchRefCopy = searchRef;
    const handleSearchFocus = () => {
      setIsSearchFocus(true);
    };
    const handleSearchBlur = () => {
      setIsSearchFocus(false);
    };
    searchRefCopy.current.addEventListener("focus", handleSearchFocus);
    searchRefCopy.current.addEventListener("blur", handleSearchBlur);
  }, []);

  return (
    <>
      <Tippy content='search'>
        <input ref={searchRef} type="text" placeholder="Search"></input>
      </Tippy>
    </>
  );
}
export default Search;
