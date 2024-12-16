import { useState } from 'react';
import ViewHistoryCard from '../../components/review/ViewHistoryCard';
import Swal from 'sweetalert2';

const ViewHistory = () => {
  const [watched, setWatched] = useState(() => {
    return JSON.parse(localStorage.getItem('watched')) || [];
  }, []);

  const clearWatched = () => {
    localStorage.setItem('watched', JSON.stringify([]));
    setWatched([]);
    Swal.fire({
      title: '최근 본 장소가 초기화되었습니다!',
      icon: 'success',
    });
  };
  return (
    <div className="mx-5 mt-5">
      {watched.length === 0 ? (
        <div className="flex items-center justify-center w-full text-gray-500">
          최근 본 장소가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {watched.map((place, index) => (
            <ViewHistoryCard key={index} data={place} />
          ))}
        </div>
      )}
      {watched.length === 0 ? (
        ''
      ) : (
        <div className="flex justify-end">
          <button
            onClick={clearWatched}
            className="px-4 py-2 my-4 border border-[#3288FF] border-spacing-1 text-[#3288FF] rounded-lg"
          >
            최근 본 장소 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewHistory;
