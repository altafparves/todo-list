import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

export default function PasswordForm({ label, placeholder, onChange, inputRef, rows = 1, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    onChange && onChange(event);
  };

  return (
    <div className="form w-full flex-col flex items-start gap-[8px]" {...props}>
      <label className="text-black text-14-700">{label}</label>
      <div className="relative w-full">
        <input
          rows={rows}
          ref={inputRef}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          className="appearance-none rounded-[12px] w-full bg-secondary p-[14px] text-grey leading-tight focus:outline-none focus:shadow-outline"
        />
        <button type="button" className="absolute top-1/2 right-4 transform -translate-y-1/2" onClick={handleTogglePasswordVisibility}>
          {showPassword ?   <IoEyeSharp /> :  <IoEyeOffSharp />}
        </button>
      </div>
    </div>
  );
}

PasswordForm.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["text", "password"]),
  rows: PropTypes.number,
};
