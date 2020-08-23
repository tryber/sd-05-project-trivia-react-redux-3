import React from 'react';
import propTypes from 'prop-types';
import unique from '../utils';

function createInput({ type, getValue, className, id, name, testId }) {
  return (
    <input
      name={name || ''}
      data-testid={testId || ''}
      className={className}
      id={id || ''}
      type={type || 'text'}
      onChange={({ target }) => getValue(target.value)}
    />
  );
}

function createTextArea({ getValue, className, cols, rows, id, name, testId }) {
  return (
    <textarea
      name={name || ''}
      className={className}
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
  const { type, getValue, cols, rows, id, name, className, testId } = props;
  switch (type) {
    case 'text-area':
      return createTextArea({ getValue, className, cols, rows, id, name, testId });
    case 'number':
    case 'text':
    case 'email':
      return createInput({ type, className, getValue, id, name, testId });
    default:
      return createInput({ type: 'text', className, getValue, id, name, testId });
  }
}

function Select(props) {
  const { getValue, id, name, testId, options } = props;
  return createSelect({ getValue, id, name, testId, options });
}

function Button(props) {
  const { disabled, isButton, className, testId, onClick, children } = props;
  return (
    <button
      data-testid={testId}
      className={className}
      type={isButton ? 'button' : 'submit'}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Input.propTypes = {
  type: propTypes.string,
  cols: propTypes.number,
  rows: propTypes.number,
  name: propTypes.string,
  className: propTypes.string,
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
  className: propTypes.string,
  getValue: propTypes.func,
};

createTextArea.propTypes = {
  getValue: propTypes.func,
  cols: propTypes.number,
  rows: propTypes.number,
  id: propTypes.string,
  name: propTypes.string,
  className: propTypes.string,
  testId: propTypes.string,
};

createSelect.propTypes = {
  name: propTypes.string,
  testId: propTypes.string,
  id: propTypes.string,
  getValue: propTypes.func,
  options: propTypes.arrayOf(propTypes.object),
};

Button.propTypes = {
  disabled: propTypes.bool,
  isButton: propTypes.bool,
  children: propTypes.oneOfType([ propTypes.string, propTypes.element ]),
  onClick: propTypes.func,
  testId: propTypes.string,
  className: propTypes.string,
};

// Defaults

Input.defaultProps = {
  type: 'text',
  cols: 10,
  rows: 10,
  name: '',
  id: '',
  testId: '',
  className: '',
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
  className: '',
  getValue: () => {},
};

createTextArea.defaultProps = {
  getValue: () => {},
  cols: propTypes.number,
  rows: propTypes.number,
  id: '',
  name: '',
  testId: '',
  className: '',
};

createSelect.defaultProps = {
  name: '',
  testId: '',
  id: '',
  getValue: () => {},
  options: propTypes.arrayOf(propTypes.object),
};

Button.defaultProps = {
  disabled: false,
  isButton: true,
  className: '',
  onClick: () => {},
  testId: '',
  children: 'Botão',
};

export {
  Input,
  Select,
  Button,
};
