import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import {
  savePreferencePlaces,
  getPreferencePlaces,
} from '../../api/userEdit/plantEdit';
import Swal from 'sweetalert2';

const PlantEdit = () => {
  const [selected, setSelected] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const plant = ['카페', '공원', '해수욕장', '섬', '놀이터', '마당'];

  useEffect(() => {
    const fetchSelectedPlaces = async () => {
      try {
        const { places } = await getPreferencePlaces();
        setSelected(places || []);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: '선호 시설 데이터를 불러오는 중 오류가 발생했습니다.',
          confirmButtonColor: '#3288FF',
        });
      } finally {
        setIsLoaded(true);
      }
    };

    fetchSelectedPlaces();
  }, []);

  const toggleSelect = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option));
    } else if (selected.length < 2) {
      setSelected([...selected, option]);
    }
  };

  const handleSubmit = async () => {
    if (selected.length !== 2) {
      Swal.fire({
        icon: 'warning',
        text: '2개의 시설을 선택해주세요.',
        confirmButtonColor: '#3288FF',
      });
      return;
    }

    try {
      await savePreferencePlaces(selected);
      Swal.fire({
        icon: 'success',
        title: '저장 완료',
        text: '선호 지역이 성공적으로 저장되었습니다.',
        confirmButtonColor: '#3288FF',
      });
      navigate(ROUTER_PATHS.MY_PAGE);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: error.message || '오류가 발생했습니다. 다시 시도해주세요.',
        confirmButtonColor: '#3288FF',
      });
    }
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="pt-8 mb-4 text-xl text-center">
        <strong className="text-[#3288ff]">선호하는 시설 2개</strong>를
        선택해주세요!
      </div>
      <main className="flex flex-col items-center justify-center pt-16 pb-16">
        <div className="grid grid-rows-[auto] w-full">
          <div className="flex justify-center gap-8 md:gap-16">
            {plant.slice(0, 2).map((option, index) => (
              <button
                key={index}
                aria-label={`${option} 선택하기`}
                role="button"
                onClick={() => toggleSelect(option)}
                className={`w-24 h-24 rounded-full border-2 text-lg font-semibold 
                  flex items-center justify-center transition-all duration-500
                  ${
                    selected.includes(option)
                      ? 'bg-[#C4DDFF] border-[#3288FF] text-[#3288FF] scale-150 animate-bounce-grow'
                      : 'bg-white border-[#8a8a8a] text-[#8a8a8a] scale-100 animate-bounce-custom'
                  }
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex w-full gap-16 my-8 justify-evenly">
            {plant.slice(2, 4).map((option, index) => (
              <button
                key={index}
                aria-label={`${option} 선택하기`}
                role="button"
                onClick={() => toggleSelect(option)}
                className={`w-24 h-24 rounded-full border-2 text-lg font-semibold 
                  flex items-center justify-center transition-all duration-500
                  ${
                    selected.includes(option)
                      ? 'bg-[#C4DDFF] border-[#3288FF] text-[#3288FF] scale-150 animate-bounce-grow'
                      : 'bg-white border-[#8a8a8a] text-[#8a8a8a] scale-100 animate-bounce-custom'
                  }
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'}`}
                style={{
                  animationDelay: `${(index + 2) * 0.2}s`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-8 md:gap-16">
            {plant.slice(4).map((option, index) => (
              <button
                key={index}
                aria-label={`${option} 선택하기`}
                role="button"
                onClick={() => toggleSelect(option)}
                className={`w-24 h-24 rounded-full border-2 text-lg font-semibold 
                  flex items-center justify-center transition-all duration-500
                  ${
                    selected.includes(option)
                      ? 'bg-[#C4DDFF] border-[#3288FF] text-[#3288FF] scale-150 animate-bounce-grow'
                      : 'bg-white border-[#8a8a8a] text-[#8a8a8a] scale-100 animate-bounce-custom'
                  }
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'}`}
                style={{
                  animationDelay: `${(index + 5) * 0.2}s`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="w-2/3 mt-16">
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 font-semibold text-white transition-all bg-blue-500 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            disabled={selected.length !== 2}
          >
            저장
          </button>
        </div>
      </main>
    </div>
  );
};

export default PlantEdit;
