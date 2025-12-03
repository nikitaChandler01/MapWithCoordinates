import type { InputHTMLAttributes } from 'react';
import React from 'react';
import './Index.scss';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
 isNumber?: boolean;
}

const Input = (props: Input) => {
 const onChange_ = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (props.onChange) {
   if (props.isNumber) {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
     props.onChange(e);
    }
   } else props.onChange(e);
  }
 };
 return <input className="input" {...props} onChange={onChange_} />;
};

export default Input;

