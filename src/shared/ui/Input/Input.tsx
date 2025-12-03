import type { InputHTMLAttributes } from 'react';
import './Index.scss';

interface Input extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Input) => {
 return <input className="input" {...props} />;
};

export default Input;

