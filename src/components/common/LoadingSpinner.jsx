import { CircularProgress } from '@mui/material';
import useLoadingStore from '../../stores/common/useLoadingStore.js';

const LoadingSpinner = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <CircularProgress />
        <span className="mt-4 text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
