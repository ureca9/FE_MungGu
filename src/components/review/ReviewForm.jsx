import { FaCamera } from 'react-icons/fa';
import FileData from '../../components/review/reviewAdd/FileData';
import PlaceData from '../../components/review/reviewAdd/PlaceData';
import StarScore from '../../components/review/reviewAdd/StarScore';
import useScoreStore from '../../stores/review/useScoreStore';
import { CgMathPlus } from 'react-icons/cg';
import { useState } from 'react';
import { RxStarFilled } from 'react-icons/rx';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import Swal from 'sweetalert2';

const ReviewForm = ({ buttonText, deleteButton, onSubmit }) => {
  // const { score, setScore } = useScoreStore();
  const [score, setScore] = useState();
  const [content, setContent] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };
  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]); // 선택된 파일들을 state에 저장
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDataForm()) return;
    const reviewData = {
      plcPenId: '',
      content: content,
      score: score,
      type: '',
      visit_date: '',
    };
    console.log('reviewData :', reviewData);

    const formData = new FormData();
    formData.append('data', JSON.stringify(reviewData));
    if (selectedFiles) {
      formData.append('image', selectedFiles);
    }
    console.log('저장하는 리뷰 데이터 :', [...formData.entries()]);
    onSubmit({ ...reviewData, image: selectedFiles });
  };
  const checkDataForm = () => {
    if (!content || !score) {
      Swal.fire({
        title: 'Oops...',
        text: '모든 항목을 입력해주세요.',
        icon: 'error',
      });
      return false;
    }
    return true;
  };
  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F3F4F5] h-full p-7 gap-5 flex flex-col"
      >
        <PlaceData />
        {/* <StarScore /> */}
        {/* <FileData /> */}
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
        {/* 파일 */}
        <div className="flex items-center h-auto gap-5">
          <div>
            <label>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden peer"
                multiple // 여러 파일 선택 가능하도록 multiple 속성 추가
                accept="image/*, video/*"
              />
              <div className="w-28 h-28 bg-[#EBF4FF] flex rounded-lg items-center border border-[#3288FF] justify-center text-[#3288FF] text-6xl">
                <CgMathPlus />
              </div>
            </label>
          </div>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="w-28 h-28 bg-[#D9D9D9] flex rounded-lg items-center justify-center overflow-hidden"
            >
              {file.type.startsWith('image/') ? ( // 이미지 파일인 경우
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover w-full h-full"
                />
              ) : file.type.startsWith('video/') ? ( // 비디오 파일인 경우
                <video
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover w-full h-full"
                  controls
                />
              ) : null}
            </div>
          ))}
          <div className="w-28 h-28 bg-[#D9D9D9] flex rounded-lg items-center justify-center ">
            <div className="text-[#8A8A8A] text-4xl flex">
              <FaCamera />
            </div>
          </div>
        </div>
        {/* 후기 내용 */}
        <div className="mt-4">
          <div className="flex items-center">
            <span className="mr-1 text-lg">후기 내용</span>
            <span className="mt-0.5 text-2xl text-red-600">*</span>
          </div>
          <div className="flex bg-white rounded-lg p-7 h-52">
            <textarea
              className="w-full"
              placeholder="내용을 작성해 주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <BasicBtn
            styleType="blue"
            size="lg"
            label={buttonText}
            type="submit"
          />
          <BasicBtn
            styleType="reverseBlue"
            size="lg"
            label="삭제"
            type="button"
            // onClick={onDelete}
            style={{ display: deleteButton ? 'block' : 'none' }}
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
