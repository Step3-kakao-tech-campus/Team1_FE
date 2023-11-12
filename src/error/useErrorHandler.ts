import { convertPath } from 'apis/convertURI';
import { useNavigate } from 'react-router-dom';

const useErrorHandler = () => {
  const navigate = useNavigate();

  // useLocation state 깨짐
  const wrongPathHandler = (redirect?: string) => {
    navigate(convertPath(redirect || '/'));
  };

  return { wrongPathHandler };
};

export default useErrorHandler;
