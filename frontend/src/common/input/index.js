import React from 'react'

const Input = ({ className, inputClassName, label, name, type, placeholder, onChange, value, required, min }) => (
  <div className={className}>
    {label &&
      <label htmlFor={name} className='block text-sm font-bold text-gray-700'>
        {label}
      </label>}
    <input
      type={type}
      name={name}
      id={name}
      className={inputClassName}
      onChange={e => onChange(e.target.value)}
      value={value}
      required={required}
      min={min}
      placeholder={placeholder}
    />
  </div>
)

Input.defaultProps = {
  type: 'text',
  onChange: () => null,
  value: null,
  className: 'mt-2',
  inputClassName: 'shadow-sm focus:ring-indigo-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md'
}

export default Input
