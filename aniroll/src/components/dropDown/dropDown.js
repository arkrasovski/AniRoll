import { useState } from "react";
import "./dropDown.sass";
import { IoMdArrowDropdown } from "react-icons/io";

function DropDown({ selected, setSelected, options, specialClass }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`dropdown ${specialClass}`}>
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <IoMdArrowDropdown />
      </div>

      <div
        className={isActive ? "dropdown-content active" : "dropdown-content"}
      >
        {options.map((option, i) => (
          <div
            key={i}
            className="dropdown-item"
            onClick={(e) => {
              if (option !== selected) {
                setSelected(option);
              }

              setIsActive(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}
export default DropDown;
