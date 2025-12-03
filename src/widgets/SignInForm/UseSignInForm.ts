import { AppUserContext } from 'AppContext';
import { useContext, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import './SignInForm.scss';

interface IFormInput {
 login: string;
 password: string;
 rememberMe: boolean;
}

export const useSignInForm = () => {
 const {
  formState: { errors },
  register,
  handleSubmit,
 } = useForm<IFormInput>();
 const [loading, setLoading] = useState<boolean>(false);

 const { setIsAuthorized } = useContext(AppUserContext);

 const onSubmit: SubmitHandler<IFormInput> = data => {
  setLoading(true);
  new Promise((resolve, reject) => {
   setTimeout(() => {
    if (data.login === 'test' && data.password === 'test') {
     if (data.rememberMe) {
      localStorage.setItem('authorized', 'true');
     }
     setIsAuthorized(true);
     setLoading(false);
     resolve(data);
    } else {
     setLoading(false);
     reject('Ошибка авторизации');
    }
   }, 3000);
  });
 };

 const onSubmitClick = () => handleSubmit(onSubmit);

 return {
  register,
  handleSubmit,
  onSubmit,
  loading,
  errors,
 };
};

