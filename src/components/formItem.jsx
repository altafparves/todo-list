import React from "react";
import PropTypes from "prop-types";

export default function FormItem({ label, placeholder, onChange, inputRef, rows = 1, ...props }) {
  return (
    <div className="form w-full flex-col flex items-start" {...props}>
      <label className="text-secondary-text text-14-700 mb-[8px]">{label}</label>
      <input
        rows={rows}
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="text"
        className="appearance-none rounded-[12px] w-full bg-button p-[14px] text-grey leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  rows: PropTypes.number,
};

