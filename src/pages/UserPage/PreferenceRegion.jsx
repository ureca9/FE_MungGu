import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePreferenceRegions } from '../../api/userRegister/preference';
import useRegisterStore from '../../stores/register/useRegisterStore';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import LOCAL_STORAGE_KEYS from '../../utils/LocalStorageKey';

const PreferenceRegion = () => {
  const { selectedRegions, setSelectedRegions, resetState } =
    useRegisterStore();
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
    setSelectedRegions(selectedRegions);
  }, [setSelectedRegions, selectedRegions]);

  const toggleSelect = (option) => {
    if (selectedRegions.includes(option)) {
      setSelectedRegions(selectedRegions.filter((item) => item !== option));
    } else if (selectedRegions.length < 2) {
      setSelectedRegions([...selectedRegions, option]);
    }
  };

  const handleSubmit = async () => {
    if (selectedRegions.length !== 2) {
      Swal.fire({
        icon: 'warning',
        title: '선택 오류',
        text: '2개의 지역을 선택해주세요.',
        confirmButtonColor: '#3288FF',
      });
      return;
    }

    try {
      await savePreferenceRegions(selectedRegions, navigate);

      Swal.fire({
        icon: 'success',
        title: '저장 성공',
        text: '선호 지역이 저장되었습니다.',
        confirmButtonColor: '#3288FF',
      }).then(() => {
        resetState();
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REGISTER_STORAGE);
      });
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
    <>
      <div className="h-1 w-full bg-[#3288ff]"></div>
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
                  onClick={() => toggleSelect(option)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 text-lg font-semibold 
                  flex items-center justify-center transition-all duration-500
                  ${
                    selectedRegions.includes(option)
                      ? 'bg-[#C4DDFF] border-[#3288FF] text-[#3288FF] scale-150 animate-bounce-grow'
                      : 'bg-white border-[#8a8a8a] text-[#8a8a8a] scale-100 animate-bounce-custom'
                  }`}
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
                  onClick={() => toggleSelect(option)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 text-lg font-semibold 
                  flex items-center justify-center transition-all duration-500
                  ${
                    selectedRegions.includes(option)
                      ? 'bg-[#C4DDFF] border-[#3288FF] text-[#3288FF] scale-150 animate-bounce-grow'
                      : 'bg-white border-[#8a8a8a] text-[#8a8a8a] scale-100 animate-bounce-custom'
                  }`}
                  style={{
                    animationDelay: `${(index + 2) * 0.2}s`,
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
                  onClick={() => toggleSelect(option)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 text-lg font-semibold 
                  flex items-center justify-center transition-all duration-500
                  ${
                    selectedRegions.includes(option)
                      ? 'bg-[#C4DDFF] border-[#3288FF] text-[#3288FF] scale-150 animate-bounce-grow'
                      : 'bg-white border-[#8a8a8a] text-[#8a8a8a] scale-100 animate-bounce-custom'
                  }`}
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
              className="w-full px-4 py-2 font-semibold text-white transition-all bg-blue-500 rounded-lg shadow-md hover:bg-blue-700"
              disabled={selectedRegions.length !== 2}
            >
              완료
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default PreferenceRegion;
