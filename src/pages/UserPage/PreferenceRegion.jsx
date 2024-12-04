import { useState, useEffect } from 'react';

const PreferencePlant = () => {
  const [selected, setSelected] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const plant = [
    '서울',
    '경기도',
    '인천',
    '강원도',
    '충청도',
    '전라도',
    '경상도',
    '제주도',
  ];

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

  return (
    <div className="flex flex-col min-h-screen w-full sm:max-w-[768px] mx-auto shadow-2xl">
      <div className="pt-8 mb-4 text-xl text-center">
        <strong>선호하는 지역 2개</strong>를 선택해주세요!
      </div>
      <main className="flex flex-col items-center pt-16 pb-16">
        <div className="grid grid-rows-[auto] gap-10">
          <div className="flex justify-center gap-16">
            {plant.slice(0, 3).map((option, index) => (
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
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'}
                `}
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-16">
            {plant.slice(3, 5).map((option, index) => (
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
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100%]'}
                `}
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
                  ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-100%]'}
                `}
                style={{
                  animationDelay: `${(index + 5) * 0.2}s`,
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>
      <style jsx>{`
        @keyframes bounce-custom {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes bounce-grow {
          0% {
            transform: translateY(0) scale(1.4);
          }
          50% {
            transform: translateY(-10px) scale(1.4);
          }
          100% {
            transform: translateY(0) scale(1.4);
          }
        }
        .animate-bounce-custom {
          animation: bounce-custom 1.5s infinite;
        }
        .animate-bounce-grow {
          animation: bounce-grow 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default PreferencePlant;
