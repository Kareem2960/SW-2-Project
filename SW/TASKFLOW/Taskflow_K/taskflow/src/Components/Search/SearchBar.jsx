import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchBar = ({ onSearch = () => {}, placeholder, style, size = "middle" }) => {
  return (
    <Search
      placeholder={placeholder || "Search by name, email, or ID"}
      allowClear
      enterButton={<SearchOutlined />}
      size={size}
      style={style}
      onSearch={onSearch}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
