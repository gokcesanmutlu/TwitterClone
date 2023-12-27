import React, { useRef } from "react";

const DropDown = ({ handleDelete, setIsEditMode }) => {
  const checkboxRef = useRef(null);

  return (
    <label class="popup">
      <input ref={checkboxRef} type="checkbox" />
      <div class="burger" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav class="popup-window">
        <legend>Actions</legend>
        <ul>
          <li>
            <button
              onClick={() => {
                setIsEditMode(true),
                  //inputun checked değerini false yapcaz kapanması için
                  (checkboxRef.current.checked = false);
              }}
            >
              <img src={"/edit.svg"} alt="" />
              <span>Edit</span>
            </button>
          </li>
          <hr />
          <li>
            <button onClick={handleDelete}>
              <img src="/delete.svg" alt="" />
              <span>Delete</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default DropDown;
