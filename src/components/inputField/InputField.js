import React from 'react';

const InputField = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <div className={`relative mb-4 ${className}`}>
      {label && <label className="block text-[var(--darkText)] font-semibold mb-1">{label}</label>}
      <div className="flex items-center  rounded-[12px] border-[var(--borderColor)] border-[1px] focus-within:border-blue-500">
        {Icon && (
          <div className="flex items-center pl-3">
            <Icon />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`flex-1 p-2 text-[var(--darkText)] font-semibold rounded-[12px] focus:outline-none ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-red-500' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
