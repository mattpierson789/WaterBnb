import React, { useState, useEffect, useRef, createContext } from 'react';
import ReactDOM from 'react-dom';
import './Popup.css';
import {useContext} from 'react';

const PopupContext = createContext();

export function PopupContainer({ children }) {
  const containerRef = useRef();
  const [contextValue, setContextValue] = useState();

  useEffect(() => {
    setContextValue(containerRef.current);
  }, [])

  return (
    <>
      <PopupContext.Provider value={contextValue}>
        {children}
      </PopupContext.Provider>
      <div ref={containerRef} />
    </>
  );
}

export function Popup({ onClose, children }) {
  const popupNode = useContext(PopupContext);
  if (!popupNode) return null;

  return ReactDOM.createPortal(
    <div id="popup">
      <div id="popup-content">
        {children}
      </div>
    </div>,
    popupNode
  );
}

export default Popup;
