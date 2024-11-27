import useLoadingStore from '../stores/common/useLoadingStore.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

const Main = () => {
  const { isLoading, setIsLoading } = useLoadingStore();

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <>
      <div className="text-blue-500">메인 페이지</div>
      <button onClick={toggleLoading}>loading</button>
      {isLoading ? <LoadingSpinner /> : <span>X</span>}
    </>
  );
};

export default Main;
