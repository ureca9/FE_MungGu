import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import { useEffect } from 'react';
import useLoginStore from './stores/login.js';
import LOCAL_STORAGE_KEYS from './utils/LocalStorageKey.js';
const App = () => {
  const { setLogin } = useLoginStore();
  useEffect(() => {
    const memberId = localStorage.getItem(LOCAL_STORAGE_KEYS.MEMBER_ID);
    if (memberId) {
      setLogin();
    }
  }, [setLogin]);
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
};

export default App;
