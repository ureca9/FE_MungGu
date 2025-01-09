import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPreferenceRegions,
  savePreferenceRegions,
} from '../../api/user-edit/regionEdit';
import Swal from 'sweetalert2';
import ROUTER_PATHS from '../../utils/RouterPath';

const RegionEdit = () => {
  const [selected, setSelected] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const regions = [
    '서울',
    '경기',
    '인천',
    '강원권',
    '충청권',
    '전라권',
    '경상권',
    '제주권',
  ];

  useEffect(() => {
    const fetchSelectedRegions = async () => {
      try {
        const { regions: savedRegions } = await getPreferenceRegions();
        setSelected(savedRegions || []);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: '선호 지역 데이터를 불러오는 중 오류가 발생했습니다.',
          confirmButtonColor: '#3288FF',
        });
      } finally {
        setIsLoaded(true);
      }
    };

    fetchSelectedRegions();
  }, []);

  const toggleSelect = (option) => {
    if (selected.includes(option)) {
      setSelected((prev) => prev.filter((item) => item !== option));
    } else if (selected.length < 2) {
      setSelected((prev) => [...prev, option]);
    }
  };

  const handleSubmit = async () => {
    if (selected.length !== 2) {
      Swal.fire({
        icon: 'warning',
        text: '2개의 지역을 선택해주세요.',
        confirmButtonColor: '#3288FF',
      });
      return;
    }

    try {
      await savePreferenceRegions(selected);
      Swal.fire({
        icon: 'success',
        title: '저장 완료',
        text: '선호 지역이 성공적으로 저장되었습니다.',
        confirmButtonColor: '#3288FF',
      });
      navigate(ROUTER_PATHS.MY_PAGE);
    } catch (error) {
      let errorMessage = '오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = '잘못된 지역 선택입니다.';
            break;
          case 401:
            errorMessage = '로그인이 필요합니다.';
            break;
          case 500:
            errorMessage = '서버 오류가 발생했습니다.';
            break;
        }
      }
      Swal.fire({
        icon: 'error',
        title: '오류 발생',
        text: errorMessage,
        confirmButtonColor: '#3288FF',
      });
    }
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="pt-8 mb-4 text-xl text-center">
        <strong className="text-[#3288ff]">선호하는 지역 2개</strong>를
        선택해주세요!
      </div>
      <main className="flex flex-col items-center pt-16 pb-16">
        <div className="grid grid-rows-[auto] gap-10">
          <div className="flex justify-center gap-8 md:gap-16">
            {regions.slice(0, 3).map((option, index) => (
              <button
                key={index}
                aria-label={`${option} 선택하기`}
                role="button"
                onClick={() => toggleSelect(option)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 text-lg font-semibold 
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
          <div className="flex justify-center gap-8 md:gap-16">
            {regions.slice(3, 5).map((option, index) => (
              <button
                key={index}
                aria-label={`${option} 선택하기`}
                role="button"
                onClick={() => toggleSelect(option)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 text-lg font-semibold 
                  flex items-center justify-center transition-all duration-500
                  ${
                    selected.includes(option)
                      ? 'bg-[#C4DDFF] border-[#3288FF] text-[#3288FF] scale-150 animate-bounce-grow'
                      : 'bg-white border-[#8a8a8a] text-[#8a8a8a] scale-100 animate-bounce-custom'
                  }
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'}`}
                style={{
                  animationDelay: `${(index + 3) * 0.2}s`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-8 md:gap-16">
            {regions.slice(5).map((option, index) => (
              <button
                key={index}
                aria-label={`${option} 선택하기`}
                role="button"
                onClick={() => toggleSelect(option)}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 text-lg font-semibold 
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

export default RegionEdit;
