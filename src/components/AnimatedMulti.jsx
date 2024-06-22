
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

// eslint-disable-next-line react/prop-types
const AnimatedMulti = ({ options, value, onChange, onBlur }) => {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default AnimatedMulti;
