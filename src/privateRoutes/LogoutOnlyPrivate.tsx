import { convertPath } from 'apis/convertURI';
import { Navigate, Outlet } from 'react-router-dom';
import { loginDatahandlers } from 'utils/loginDatahandlers';

const LogoutOnlyPrivate = (): JSX.Element => {
  const loginState = loginDatahandlers.getLoginData();

  return loginState.isLogin ? <Navigate to={convertPath('/')} /> : <Outlet />;
};

export default LogoutOnlyPrivate;
