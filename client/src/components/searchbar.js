import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';  

const SearchBar = (props) => {
  const { placeholder, field, onChange } = props
  const onSearch = value => {
    onChange(field, value);
  };

  return (
    <Input.Search 
      placeholder={placeholder}
      allowClear
      onSearch={onSearch}
    />
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  field: PropTypes.string,
  onChange: PropTypes.func
}

export default SearchBar;