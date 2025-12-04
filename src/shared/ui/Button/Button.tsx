import './Button.scss';

interface Button {
 type?: 'primary' | 'secondary';
 formType?: 'submit' | 'reset' | 'button';
 loading?: boolean;
 disabled?: boolean;
 danger?: boolean;
 link?: boolean;
 icon?: React.ReactNode;
 children?: React.ReactNode | string;
 weight?: 'regular' | 'bold' | 'thin' | 'bolder';
 className?: string;
 onClick?: VoidFunction;
}

const Button = ({
 type = 'secondary',
 formType = 'button',
 disabled,
 loading,
 danger,
 link,
 icon,
 children,
 className,
 weight = 'regular',
 onClick,
}: Button) => {
 return (
  <button
   onClick={disabled || loading ? undefined : onClick}
   disabled={disabled || loading}
   className={`my-button my-button__${type} ${
    danger ? 'my-button--danger' : ''
   } ${weight} ${className ? className : ''} ${link ? 'my-button__link' : ''}`}
   type={formType}
  >
   <div className="flex gap-2 w-100 justify-center align-items-center">
    {icon}
    {children}
   </div>
  </button>
 );
};

export default Button;

