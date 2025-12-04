import { useEffect, useLayoutEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { SignInPage } from '../pages/SignInPage';
import AuthorizedRouter from './AuthorizedRouter';
import { AppUserContext } from 'AppContext';
import Layout from './Layout';

const Router = () => {
 const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

 useLayoutEffect(() => {
  const authorized = localStorage.getItem('authorized') === 'true';
  setIsAuthorized(authorized);
  console.log(authorized);
 }, []);
 return (
  <AppUserContext value={{ isAuthorized, setIsAuthorized }}>
   {isAuthorized ? (
    <Layout>
     <AuthorizedRouter />
    </Layout>
   ) : (
    <Routes>
     <Route path="sign-in" element={<SignInPage />} />
     <Route path="*" element={<Navigate replace to="/sign-in" />}></Route>
    </Routes>
   )}
  </AppUserContext>
 );
};

export default Router;

