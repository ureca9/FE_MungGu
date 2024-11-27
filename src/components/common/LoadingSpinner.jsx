import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <CircularProgress />
        <span className="mt-4 text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
