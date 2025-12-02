import { Route, Routes } from 'react-router';
import { SignInPage } from '../pages/SignInPage';
import AuthorizedRouter from './AuthorizedRouter';

const Router = () => {
 const authorized = localStorage.getItem('authorized') === 'true';

 return (
  <>
   {authorized ? (
    <AuthorizedRouter />
   ) : (
    <Routes>
     <Route path="sign-in" element={<SignInPage />} />
    </Routes>
   )}
  </>
 );
};

export default Router;

