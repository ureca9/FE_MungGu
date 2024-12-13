import { PostPensionsReview } from '../../api/review';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import PlaceData from '../../components/review/reviewAdd/PlaceData';
import useTypeStore from '../../stores/review/useTypeStore';
import { RxStarFilled } from 'react-icons/rx';
import { FaCamera } from 'react-icons/fa';
import { BasicBtn } from '../../stories/Buttons/BasicBtn/BasicBtn';
import { useEffect, useState } from 'react';

const ReviewAdd = () => {
  const { id: pensionId } = useParams();
  const [score, setScore] = useState('');
  const [content, setContent] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { plcPenType } = useTypeStore();

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkDataForm()) return;
    const reviewFormData = new FormData();
    const reviewData = {
      plcPenId: Number(pensionId),
      content: content,
      score: score,
      type: plcPenType,
      visitDate: visitDate,
    };
    console.log('reviewData :', reviewData);
    reviewFormData.append(
      'data',
      new Blob([JSON.stringify(reviewData)], { type: 'application/json' }),
    );
    selectedFiles.forEach((file) => {
      reviewFormData.append('file', file.file);
    });
    console.log('리뷰 저장:', [...reviewFormData.entries()]);
    try {
      const response = await PostPensionsReview(reviewFormData);
      console.log('리뷰 추가 성공 :', response.data);
      Swal.fire({
        title: '추가 성공!',
        icon: 'success',
      }).then(() => {
        window.history.back();
      });
    } catch (error) {
      console.error('추가 중 오류 발생:', error);
    }
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

  const checkDataForm = () => {
    if (!content || !score || !visitDate) {
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
      <PlaceData />
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
          <div className="flex p-5 bg-white rounded-lg h-52">
            <textarea
              className="w-full h-full text-xl resize-none"
              placeholder="내용을 작성해 주세요."
              value={content}
              maxLength="100"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col gap-6 ">
          <BasicBtn styleType="blue" size="lg" label="저장" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ReviewAdd;
