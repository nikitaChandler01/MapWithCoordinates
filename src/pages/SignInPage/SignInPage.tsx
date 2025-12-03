import Logo from '@assets/Logo';
import { CenterBox } from '@shared/ui/CenterBox';
import { SignInForm } from '@widgets/SignInForm';
import './SignInPage.scss';

const SignInPage = () => {
 return (
  <div className="sign-in flex h-100 w-100">
   <div className="sign-in__logo">
    <CenterBox>
     <div
      className=" w-100 flex-vertical align-center gap-2"
      style={{ height: 'fit-content' }}
     >
      <Logo width="80%" />
      <span className="info-message bolder">
       Test app by{' '}
       <a
        target="_blank"
        href="https://novosibirsk.hh.ru/resume/60ef8526ff0bf0f0570039ed1f5a4f36767439"
       >
        Berdnik Nikita
       </a>
      </span>
     </div>
    </CenterBox>
   </div>
   <div className="sign-in__form">
    <SignInForm />
   </div>
  </div>
 );
};

export default SignInPage;

