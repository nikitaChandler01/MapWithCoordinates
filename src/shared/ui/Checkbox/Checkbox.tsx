import React, { type InputHTMLAttributes } from 'react';
import './Checkbox.scss';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
 children: React.ReactNode | string;
}

const Checkbox = (props: Input) => {
 const { children, ...rest } = props;
 return (
  <label className="checkbox w-100 gap-2">
   <input {...rest} type="checkbox" />
   {children}
  </label>
 );
};

export default Checkbox;

