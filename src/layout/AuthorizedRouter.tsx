import { HomePage } from '@pages/HomePage';
import { Navigate, Route, Routes } from 'react-router';

const AuthorizedRouter = () => {
 return (
  <Routes>
   <Route path="/home" element={<HomePage />} />
   <Route path="*" element={<Navigate replace to="/home" />} />
  </Routes>
 );
};

export default AuthorizedRouter;

