import { RxStarFilled } from 'react-icons/rx';
import useScoreStore from '../../../stores/review/useScoreStore';

const StarScore = () => {
  const { score, setScore } = useScoreStore();
  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };
  return (
    <div>
      <div className="flex justify-center w-full h-auto p-4 bg-white rounded-lg">
        <div className="flex flex-col items-center justify-center w-3/5 gap-7">
          <div className="text-2xl font-semibold">
            이 방문 장소를 추천하시겠어요?
          </div>
          <div className="flex flex-col justify-around w-full">
            <div className="flex justify-around">
              {[1, 2, 3, 4, 5].map((value) => (
                <RxStarFilled
                  key={value}
                  className={`text-5xl cursor-pointer ${
                    value <= score
                      ? 'text-[#FDBD00]'
                      : 'text-white drop-shadow-[0_0.5px_0.5px_rgba(0,0,0,1)] '
                  }`}
                  onClick={() => handleScoreChange(value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StarScore;
