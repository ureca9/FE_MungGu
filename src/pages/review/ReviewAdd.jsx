import {
  PostPensionsReview,
  PostPresignedUrls,
  PutReviewPresignedUrls,
} from '../../api/review';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import PlaceData from '../../components/review/review-add/PlaceData';
import useTypeStore from '../../stores/review/useTypeStore';
import { RxStar, RxStarFilled } from 'react-icons/rx';
import { FaCamera } from 'react-icons/fa';
import { BasicBtn } from '../../stories/buttons/basic-btn/BasicBtn';
import { useEffect, useRef, useState } from 'react';

const ReviewAdd = () => {
  const { id: pensionId } = useParams();
  const [score, setScore] = useState('');
  const [content, setContent] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { plcPenType } = useTypeStore();
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    const ref = scrollRef.current;
    if (e.deltaY > 0) {
      ref.scrollLeft += 40;
    } else {
      ref.scrollLeft -= 40;
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  const handleFileChange = async (event) => {
    const files = [...event.target.files];
    const maxFileSize = 10 * 1024 * 1024;
    const filePaths = [];

    const processedFiles = await Promise.all(
      files.map((file, index) => {
        if (file.size > maxFileSize) {
          Swal.fire({
            title: 'Oops...',
            text: `${file.name} 파일의 용량이 너무 큽니다. (${
              maxFileSize / 1024 / 1024
            }MB 이하)`,
            icon: 'error',
          });
          return null;
        } else if (
          file.type.startsWith('image/') ||
          file.type.startsWith('video/')
        ) {
          const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
          const filePath = `Review/${pensionId}_review${index}${fileExtension}`;
          filePaths.push(filePath);
          return {
            file,
            fileUrl: URL.createObjectURL(file),
            fileType: file.type.startsWith('image/') ? 'IMAGE' : 'VIDEO',
            fileName: file.name,
            filePath,
          };
        } else {
          return null;
        }
      }),
    );

    setSelectedFiles(processedFiles.filter(Boolean));
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

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkDataForm()) return;

    const reviewData = {
      plcPenId: Number(pensionId),
      type: plcPenType,
      files: selectedFiles.map((item) => item.filePath),
    };
    console.log('[Step 1] presignedUrl 요청:', reviewData);
    try {
      const response = await PostPresignedUrls(reviewData);
      console.log('[Step 2] Presigned URL 응답:', response.data);

      const filesToUpload = selectedFiles.map((item) => item.file);
      const presignedUrls = response.data;
      await handleFileUpload(filesToUpload, presignedUrls);
      console.log('[Step 3] 파일 업로드 완료!');
    } catch (error) {
      console.error('[Error] Presigned URL 요청 중 오류 발생:', error);
    }
  };

  const handleFileUpload = async (files, presignedUrls) => {
    try {
      const uploadResponses = await PutReviewPresignedUrls(
        files,
        presignedUrls,
      );
      const extractedUrls = uploadResponses
        .filter((response) => response.status === 200)
        .map((response) => response.config.url.split('?')[0]);

      const presignedUrls01 = extractedUrls;
      console.log('[Step 4] Presigned URL 업로드 응답:', uploadResponses);

      if (uploadResponses.some((response) => response.status !== 200)) {
        uploadResponses.forEach((response, index) => {
          if (response.statusText !== 'OK') {
            console.error(`파일 ${files[index].name} 업로드 실패`);
          }
        });
        throw new Error('일부 파일 업로드에 실패했습니다.');
      }
      console.log('[Success] 모든 파일이 성공적으로 업로드되었습니다.');
      await reviewSubmit(presignedUrls01);
    } catch (error) {
      console.error('[Error] 파일 업로드 중 오류 발생:', error);
      throw error;
    }
  };

  const reviewSubmit = async (presignedUrls01) => {
    if (!checkDataForm()) return;
    const reviewData = {
      plcPenId: Number(pensionId),
      content,
      score,
      type: plcPenType,
      visitDate,
      fileUrls: presignedUrls01,
    };
    console.log('reviewSubmit전송 데이터:', reviewData);
    console.log('presignedUrls01:', presignedUrls01);

    try {
      const response = await PostPensionsReview(reviewData);
    } catch (error) {
      console.error('추가 중 오류 발생:', error);
    }
  };

  return (
    <div className="h-full min-w-80">
      <PlaceData />
      <form
        onSubmit={handleSubmit}
        className="bg-[#F3F4F5] h-full md:w-full md:p-7 px-2 py-3 md:gap-5 gap-3 flex flex-col"
      >
        <div className="flex justify-center w-full h-auto p-4 bg-white rounded-lg">
          <div className="flex flex-col items-center justify-center w-4/5 md:w-3/5 md:gap-7">
            <div className="font-semibold md:text-2xl">
              이 방문 장소를 추천하시겠어요?
            </div>
            <div className="flex flex-col justify-around w-full">
              <div className="flex justify-around">
                {[1, 2, 3, 4, 5].map((value) =>
                  value <= score ? (
                    <RxStarFilled
                      key={value}
                      className="text-5xl cursor-pointer text-[#FDBD00]"
                      onClick={() => handleScoreChange(value)}
                    />
                  ) : (
                    <RxStar
                      key={value}
                      className="text-5xl text-[#D9D9D9] cursor-pointer"
                      onClick={() => handleScoreChange(value)}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-none h-aout md:gap-5"
        >
          <div>
            <label>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden peer"
                multiple
                accept="image/*, video/*"
              />
              <div className="flex-col p-1 md:p-2 w-24 h-24 md:w-36 md:h-36 bg-[#EBF4FF] flex rounded-lg items-center border border-[#3288FF] justify-center text-[#8A8A8A] ">
                <p className="md:mb-2 md:text-lg">
                  사진첨부
                  <span className="text-2xl text-red-600">*</span>
                </p>
                <span className="md:text-md text-[12px]">
                  영수증 사진이 없으면 후기가 삭제될수 있습니다.
                </span>
              </div>
            </label>
          </div>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="min-w-24 max-w-24 h-24 md:min-w-36 md:h-36 bg-[#D9D9D9] flex rounded-lg items-center justify-center overflow-hidden"
            >
              {file.fileType === 'IMAGE' ? (
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
                />
              ) : null}
            </div>
          ))}
          {selectedFiles.length > 0 ? (
            ''
          ) : (
            <div className="md:w-36 md:h-36 w-24 h-24 bg-[#D9D9D9] flex rounded-lg items-center justify-center ">
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
              max={today}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full p-2 md:p-5 text-[#8A8A8A] md:text-xl rounded-lg h-14 focus:outline-none"
            />
          </div>
        </div>
        <div className="md:mt-4">
          <div className="flex items-center">
            <span className="mr-1 text-lg">후기 내용</span>
            <span className="mt-0.5 text-2xl text-red-600">*</span>
          </div>
          <div className="flex p-4 bg-white rounded-lg md:p-7 h-52">
            <textarea
              className="w-full h-full resize-none md:text-xl"
              placeholder="내용을 작성해 주세요."
              value={content}
              maxLength="400"
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
