import { convertPath } from 'apis/convertURI';
import { Navigate, Outlet } from 'react-router-dom';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const UserTypePrivate = ({ when }: { when: 'admin' | 'alba' }): JSX.Element => {
  const loginState = loginDatahandlers.getLoginData();

  const isLogin: boolean = loginState.isLogin;
  const isAdmin: boolean = loginState.isAdmin;
  const correctType: boolean = (when === 'admin' && isAdmin) || (when === 'alba' && !isAdmin);

  return <>{isLogin && correctType ? <Outlet /> : <Navigate to={convertPath('/')} />}</>;
};

export default UserTypePrivate;
