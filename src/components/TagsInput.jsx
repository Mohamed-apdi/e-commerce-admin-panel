import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const TagsInput = ({ options, value, onChange }) => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export default TagsInput;
