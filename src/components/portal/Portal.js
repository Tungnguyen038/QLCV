import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./Portal.scss";

// create portalWrapper function
const createPortalWrapper = () => {
  const element = document.createElement("div");
  element.id = "portal-wrapper";
  return element;
};
const portalWrapperElm = createPortalWrapper();

function Portal({
  containerclassName = "",
  bodyClassName = "",
  onClose = () => { },
  overlay = true,
  containerStyle,
  bodyStyle,
  children,
}) {
  useEffect(() => {
    document.body.appendChild(portalWrapperElm);
  }, []);
  const renderContent = (
    <div
      onClick={onClose}
      className={`${containerclassName}`}
      style={containerStyle}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black overlay bg-opacity-20"></div>
      )}
      <div
        style={bodyStyle}
        className={`content content-modal w-fit ${bodyClassName}`}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(renderContent, portalWrapperElm);
}
Portal.propTypes = {
  containerclassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  onClose: PropTypes.func,
  containerStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  children: PropTypes.node,
  overlay: PropTypes.bool,
};

export default Portal;
