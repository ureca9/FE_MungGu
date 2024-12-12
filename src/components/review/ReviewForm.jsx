import { FaCamera } from 'react-icons/fa';
import { useState } from 'react';
import { RxStarFilled } from 'react-icons/rx';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import useTypeStore from '../../stores/review/useTypeStore';
import useReviewEditStore from '../../stores/review/useReviewEditStore.Store';

const ReviewForm = ({ buttonText, onSubmit }) => {
  const { id: pensionId } = useParams();
  const [score, setScore] = useState('');
  const [content, setContent] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { typePension } = useTypeStore();

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };
  const handleFileChange = (event) => {
    const files = [...event.target.files];
    const maxFileSize = 5 * 1024 * 1024;

    const processedFiles = files
      .map((file) => {
        if (file.size > maxFileSize) {
          Swal.fire({
            title: 'Oops...',
            text: `${file.name} 파일의 용량이 너무 큽니다. (${maxFileSize / 1024 / 1024}MB 이하)`,
            icon: 'error',
          });
          return null;
        } else {
          return {
            file: file,
            fileUrl: URL.createObjectURL(file),
            fileType: file.type.startsWith('image/')
              ? 'IMAGE'
              : file.type.startsWith('video/')
                ? 'VIDEO'
                : null,
            fileName: file.name,
          };
        }
      })
      .filter((file) => file !== null);

    setSelectedFiles(processedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkDataForm()) return;
    const reviewData = {
      plcPenId: Number(pensionId),
      content: content,
      score: score,
      type: typePension,
      visitDate: visitDate,
    };
    console.log('reviewData :', reviewData);

    const formData = new FormData();
    formData.append('data', JSON.stringify(reviewData));
    if (selectedFiles) {
      formData.append('file', selectedFiles);
    }
    console.log('저장하는 리뷰 데이터 :', [...formData.entries()]);
    onSubmit({ ...reviewData, file: selectedFiles });
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
                multiple
                accept="image/*, video/*"
              />
              <div className="flex-col p-2 w-36 h-36 bg-[#EBF4FF] flex rounded-lg items-center border border-[#3288FF] justify-center text-[#8A8A8A] ">
                <p className="text-lg">
                  사진첨부
                  <span className="text-2xl text-red-600">*</span>
                </p>
                <span className="text-sm">
                  영수증 사진이 없으면 후기가 삭제될수 있습니다.
                </span>
              </div>
            </label>
          </div>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="w-36 h-36 bg-[#D9D9D9] flex rounded-lg items-center justify-center overflow-hidden"
            >
              {file.fileType === 'IMAGE' ? ( // 이미지 파일인 경우
                <img
                  src={file.fileUrl}
                  alt={file.fileName}
                  className="object-cover w-full h-full"
                />
              ) : file.fileType === 'VIDEO' ? (
                <video
                  src={file.fileUrl}
                  alt={file.fileName}
                  className="object-cover w-full h-full"
                  controls
                />
              ) : null}
            </div>
          ))}
          {selectedFiles.length > 0 ? (
            ''
          ) : (
            <div className="w-36 h-36 bg-[#D9D9D9] flex rounded-lg items-center justify-center ">
              <div className="text-[#8A8A8A] text-4xl flex">
                <FaCamera />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <span className="mr-1 text-lg">방문 날짜</span>
            <span className="mt-0.5 text-2xl text-red-600">*</span>
          </div>
          <div>
            <input
              type="date"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full p-5 text-[#8A8A8A] text-xl rounded-lg h-14 focus:outline-none"
            />
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
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
