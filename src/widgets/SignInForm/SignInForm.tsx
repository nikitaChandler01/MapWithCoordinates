import { Loading } from '@assets/Loading';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@shared/ui/Button';
import { CenterBox } from '@shared/ui/CenterBox';
import { Checkbox } from '@shared/ui/Checkbox';
import { Input } from '@shared/ui/Input';
import './SignInForm.scss';
import { useSignInForm } from './UseSignInForm';

const SignInForm = () => {
 const { error, register, handleSubmit, onSubmit, loading, errors } = useSignInForm();
 return (
  <div className="sign-in-form h-100 w-100">
   <CenterBox>
    <div className="sign-in-form__container">
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-vertical gap-6 w-100">
       <div className="flex-vertical gap-2">
        <span className="sign-in-form__title info-message">Авторизация</span>
        <span className="error-message">{error}</span>
       </div>
       <div className="flex-vertical w-100 gap-4">
        <Input
         disabled={loading}
         placeholder="Логин (test)"
         {...register('login', {
          required: {
           value: true,
           message: 'Это поле обязательно к заполнению',
          },
         })}
        />
        <ErrorMessage
         errors={errors}
         name="login"
         render={({ message }) => (
          <span className="error-message justify-left">{message}</span>
         )}
        />
        <Input
         disabled={loading}
         placeholder="Пароль (test)"
         type="password"
         {...register('password', {
          required: {
           value: true,
           message: 'Это поле обязательно к заполнению',
          },
         })}
        />
        <ErrorMessage
         errors={errors}
         name="password"
         render={({ message }) => (
          <span className="error-message justify-left">{message}</span>
         )}
        />
        <Checkbox disabled={loading} {...register('rememberMe')}>
         Запомнить меня
        </Checkbox>
       </div>
       <div className="flex justify-center w-100 sign-in-form__actions">
        <Button
         loading={loading}
         icon={loading ? <Loading width={24} /> : null}
         disabled={loading}
         className="w-100"
         weight="bolder"
         type="primary"
         formType="submit"
        >
         Войти
        </Button>
       </div>
      </div>
     </form>
    </div>
   </CenterBox>
  </div>
 );
};

export default SignInForm;

