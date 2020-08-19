import React from 'react';
import propTypes from 'prop-types';
import { unique } from '../utils';

function createInput({ type, getValue, id, name, testId }) {
  return (
    <input
      name={name || ''}
      data-testid={testId || ''}
      id={id || ''}
      type={type || 'text'}
      onChange={({ target }) => getValue(target.value)}
    />
  );
}

function createTextArea({ getValue, cols, rows, id, name, testId }) {
  return (
    <textarea
      name={name || ''}
      data-testid={testId || ''}
      id={id || ''}
      cols={cols || '10'}
      rows={rows || '10'}
      onChange={({ target }) => getValue(target.value)}
    />
  );
}

function createSelect({ getValue, options, id, name, testId }) {
  return (
    <select
      name={name}
      data-testid={testId || ''}
      id={id || ''}
      onChange={({ target }) => getValue(target.value)}
    >
      {
        options.map(({ value, innerText }) => (
          <option key={unique(value)} value={value}>{innerText}</option>
        ))
      }
    </select>
  );
}

function Input(props) {
  const { type, getValue, cols, rows, id, name, testId } = props;
  switch (type) {
    case 'text-area':
      return createTextArea({ getValue, cols, rows, id, name, testId });
    case 'number':
    case 'text':
    case 'email':
      return createInput({ type, getValue, id, name, testId });
    default:
      return createInput({ type: 'text', getValue, id, name, testId });
  }
}

function Select(props) {
  const { getValue, id, name, testId, options } = props;
  return createSelect({ getValue, id, name, testId, options });
}

Input.propTypes = {
  type: propTypes.string,
  cols: propTypes.number,
  rows: propTypes.number,
  name: propTypes.string,
  id: propTypes.string,
  testId: propTypes.string,
  getValue: propTypes.func,
};

Select.propTypes = {
  name: propTypes.string,
  id: propTypes.string,
  testId: propTypes.string,
  getValue: propTypes.func,
  options: propTypes.arrayOf(propTypes.object),
};

createInput.propTypes = {
  type: propTypes.string,
  id: propTypes.string,
  name: propTypes.string,
  testId: propTypes.string,
  getValue: propTypes.func,
};

createTextArea.propTypes = {
  getValue: propTypes.func,
  cols: propTypes.number,
  rows: propTypes.number,
  id: propTypes.string,
  name: propTypes.string,
  testId: propTypes.string,
};

createSelect.propTypes = {
  name: propTypes.string,
  testId: propTypes.string,
  id: propTypes.string,
  getValue: propTypes.func,
  options: propTypes.arrayOf(propTypes.object),
};

// Defaults

Input.defaultProps = {
  type: 'text',
  cols: 10,
  rows: 10,
  name: '',
  id: '',
  testId: '',
  getValue: () => {},
};

Select.defaultProps = {
  name: '',
  id: '',
  testId: '',
  getValue: () => {},
  options: propTypes.arrayOf(propTypes.object),
};

createInput.defaultProps = {
  type: 'text',
  id: '',
  name: '',
  testId: '',
  getValue: () => {},
};

createTextArea.defaultProps = {
  getValue: () => {},
  cols: propTypes.number,
  rows: propTypes.number,
  id: '',
  name: '',
  testId: '',
};

createSelect.defaultProps = {
  name: '',
  testId: '',
  id: '',
  getValue: () => {},
  options: propTypes.arrayOf(propTypes.object),
};

export {
  Input,
  Select,
};
