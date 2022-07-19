import React, { useEffect, useMemo, useState } from "react";
import useTooltip from "../../hooks/useTooltip";
import useModal from "../../hooks/useModal";
import NotificationBoard from "../selectbox/NotificationBoard";
import {
  BASE_URL,
  documentHeight,
  KEY_CURRENT_PROJECT,
} from "../../util/constants";
import axios from "axios";
import { ModalProvider } from "../../contexts/modalContext";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";

const secondThirdScreen = (documentHeight * 2) / 3;

function Notification() {
  const { isHover, coord, nodeRef } = useTooltip();
  const [coordNotify, setCoorNotify] = useState({});
  const [show, setShow, handleClose] = useModal();
  const [notifyData, setNotifyData] = useState({});
  const { projects } = useSelector((state) => state.projects);
  const keyProject = localStorage.getItem(KEY_CURRENT_PROJECT);
  const currentProject = useMemo(() => {
    return projects.find((item) => item.key === keyProject);
  }, [projects, keyProject]);
  // handle click
  const handleClick = () => {
    const bounding = nodeRef.current.getBoundingClientRect();
    if (bounding) {
      setCoorNotify(bounding);
      setShow(true);
    }
  };
  useEffect(() => {
    const loadNotification = async () => {
      const resp = await axios.get(`${BASE_URL}/api/Notifications/Get`);
      if (resp.status === 200) {
        setNotifyData(resp.data);
      }
    };
    loadNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {show && (
        <ModalProvider project={currentProject}>
          <NotificationBoard
            bodyStyle={{
              top:
                coordNotify.bottom <= secondThirdScreen
                  ? coordNotify.bottom + 10
                  : null,
              right: window.innerWidth - coordNotify.right,
              bottom:
                coordNotify.bottom > secondThirdScreen
                  ? documentHeight - coordNotify.top
                  : null,
            }}
            onClose={handleClose}
            notifyData={notifyData}
          />
        </ModalProvider>
      )}
      <Tippy content="Notifications">
        <div
          data-tut="tut-notification"
          onClick={handleClick}
          // ref={nodeRef}
          className="notifications header-right-option"
        >
          <svg
            ref={nodeRef}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          {Object.entries(notifyData).length > 0 &&
            notifyData?.countUnView > 0 && (
              <span className="notify-count">{notifyData?.countUnView}</span>
            )}
        </div>
      </Tippy>
    </>
  );
}

export default Notification;
