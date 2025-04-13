import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ onColorChange }) => {
  const [color, setColor] = useState("#F5F5F5");
  const [showPicker, setShowPicker] = useState(false);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    onColorChange(color); // 부모 컴포넌트로 색 전달
  };

  const togglePicker = (event) => {
    event.preventDefault(); // form 제출 기본 동작 방지
    setShowPicker(!showPicker);
  };

  return (
    <div className="colorPickerContainer">
      <button className="colorButton" onClick={togglePicker}>
        Pick a Color
      </button>
      {showPicker && (
        <div className="pickerContainer">
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
