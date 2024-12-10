import { useState, useEffect } from 'react';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import { useNavigate } from 'react-router-dom';
import ROUTER_PATHS from '../../utils/RouterPath';
import { savePreferencePlaces } from '../../api/userRegister/preference';

const PreferencePlant = () => {
  const [selected, setSelected] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const plant = ['카페', '공원', '해수욕장', '섬', '놀이터', '마당', '펜션'];

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
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
      alert('2개의 시설을 선택해주세요.');
      return;
    }

    try {
      await savePreferencePlaces(selected);
      navigate(ROUTER_PATHS.PREFERENCE_REGION);
    } catch (error) {
      alert(error.message || '오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="pt-8 mb-4 text-xl text-center">
        <strong>선호하는 시설 2개</strong>를 선택해주세요!
      </div>
      <main className="flex flex-col items-center justify-center pt-16 pb-16">
        <div className="grid grid-rows-[auto] ">
          <div className="flex justify-center gap-16">
            {plant.slice(0, 2).map((option, index) => (
              <button
                key={index}
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
          <div className="flex justify-center gap-16">
            {plant.slice(2, 5).map((option, index) => (
              <button
                key={index}
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
          <div className="flex justify-center gap-16">
            {plant.slice(5).map((option, index) => (
              <button
                key={index}
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
          <BasicBtn
            styleType="blue"
            size="md"
            label="다음"
            onClick={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default PreferencePlant;
