import React from 'react';
import './styles.css';

function Select({ options, handleChange, valueSelected }) {
  return (
    <select
      className="select"
      onChange={handleChange}
      value={valueSelected.value}
    >
      {options.map(({ value, label, id }) => (
        <option key={`${value}-${id}`} data-label={label} value={id}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Select;
