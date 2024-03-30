import React, { Component } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";

const SearchBar = ({
  className,
  async,
  style,
  container_className,
  cacheOptions,
  setSearch,
  checkbox,
  label,
  onChange,
  loadOptions,
  placeholder,
  noarrow,
  options,
  menu_height,
  id,
  white,
  value,
  paese,
  dropdownClassname,
}) => {
  const DropdownIndicator = (props) => {
    return (
      <img
        className={dropdownClassname || "mr-8"}
        src="/media/icon/triangle_down.svg"
      />
    );
  };

  var getDocument = () => {
    if (process.browser) return document.body;
  };

  const PaeseIndicator = () => {
    return (
      <img
        className={dropdownClassname || "mr-16"}
        src="/media/icon/paese_select_icon.svg"
      />
    );
  };
  return (
    <>
      {label && <label className="bold">{label}</label>}
      <div className={className || ""} style={style || { height: "40px" }}>
        <Select
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            menu: (base) => ({
              ...base,
              minHeight: "100px",
              maxHeight: menu_height ? menu_height : "200px",
            }),
            menuList: (base) => ({
              ...base,
              minHeight: "100px",
              maxHeight: menu_height ? menu_height : "200px",
            }),
            control: (base) => ({
              ...base,
              whiteSpace: "nowrap",
              background: white ? "white" : "rgba(224, 224, 221, 0.16);",
            }),
          }}
          components={{
            DropdownIndicator: noarrow
              ? null
              : paese
              ? PaeseIndicator
              : DropdownIndicator,
          }}
          menuPortalTarget={getDocument()}
          classNamePrefix="async-select"
          className="async-select"
          placeholder={
            placeholder ||
            (label
              ? "Seleziona " + label.toLowerCase() + "..."
              : "Seleziona un'opzione...")
          }
          onChange={onChange}
          options={options}
          id={id}
          value={value || null}
        />
      </div>
    </>
  );
};

export default SearchBar;
