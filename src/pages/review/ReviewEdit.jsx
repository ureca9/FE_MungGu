import Swal from 'sweetalert2';
import { GetReviewBasicData, PatchReviewEdit } from '../../api/review';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BasicBtn } from '../../stories/buttons/basic-btn/BasicBtn';
import { FaCamera } from 'react-icons/fa';
import { RxStar, RxStarFilled } from 'react-icons/rx';
import PlaceData from '../../components/review/review-add/PlaceData';
import useTypeStore from '../../stores/review/useTypeStore';
import { CircularProgress } from '@mui/material';

const ReviewEdit = () => {
  const { id: reviewId } = useParams();
  const [reviewBasic, setReviewBasic] = useState();
  const [score, setScore] = useState('');
  const [plcPenId, setPlcPenId] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { setPlcPenIdType, setPensionId, setPlaceId } = useTypeStore();
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

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await GetReviewBasicData(reviewId);
        setReviewBasic(response.data);
      } catch (error) {
        console.error('수정할 리뷰 정보오류:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (reviewId) {
      fetchReviewData();
    }
  }, [reviewId]);

  useEffect(() => {
    if (reviewBasic) {
      setScore(reviewBasic.score);
      setPlcPenId(reviewBasic.plcPenId);
      setType(reviewBasic.type);
      setContent(reviewBasic.content);
      setVisitDate(reviewBasic.visitDate || '');
      setSelectedFiles(reviewBasic.file);
      setPensionId(reviewBasic.plcPenId);
      setPlaceId(reviewBasic.plcPenId);
      setPlcPenIdType(reviewBasic.type);
      setIsDataLoaded(true);
    }
  }, [reviewBasic]);

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkDataForm()) return;

    const reviewFormData = new FormData();
    const reviewData = {
      plcPenId: Number(reviewBasic.plcPenId),
      content: content,
      score: score,
      type: type,
      visitDate: visitDate,
    };
    reviewFormData.append(
      'data',
      new Blob([JSON.stringify(reviewData)], { type: 'application/json' }),
    );
    selectedFiles.forEach((file) => {
      reviewFormData.append('file', file.file);
    });

    try {
      const response = await PatchReviewEdit(reviewFormData, reviewId);
      // console.error('수정 중:', reviewFormData, 'reviewId:', reviewId);
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
    }
  };

  const handleFileChange = async (event) => {
    const files = [...event.target.files];
    const maxFileSize = 100 * 1024 * 1024;
    const reviewFormData = new FormData();
    const processedFiles = await Promise.all(
      files.map((file) => {
        if (file.size > maxFileSize) {
          Swal.fire({
            title: 'Oops...',
            text: `${file.name} 파일의 용량이 너무 큽니다. (${maxFileSize / 1024 / 1024}MB 이하)`,
            icon: 'error',
          });
          return null;
        } else if (file.type.startsWith('image/')) {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 800;
                const scaleFactor = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scaleFactor;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob(
                  (blob) => {
                    const newFile = new File([blob], file.name, {
                      type: 'image/webp',
                    });
                    // console.log('이미지 File:', newFile);
                    reviewFormData.append('file', newFile);
                    resolve({
                      file: newFile,
                      fileUrl: URL.createObjectURL(blob),
                      fileType: 'IMAGE',
                      fileName: file.name,
                    });
                  },
                  'image/webp',
                  0.8,
                );
              };
              img.src = e.target.result;
            };
            reader.readAsDataURL(file);
          });
        } else if (file.type.startsWith('video/')) {
          reviewFormData.append('file', file, file.name);
          return {
            file: file,
            fileUrl: URL.createObjectURL(file),
            fileType: 'VIDEO',
            fileName: file.name,
          };
        } else {
          return null;
        }
      }),
    );

    setSelectedFiles(processedFiles.filter((file) => file !== null));
    handleSubmit(reviewFormData);
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
  if (isLoading) {
    return (
      <div>
        <CircularProgress size={60} />
        로딩 중...
      </div>
    );
  }
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="h-full min-w-96">
      {isDataLoaded ? <PlaceData /> : <CircularProgress size={80} />}
      {reviewBasic ? (
        <form
          onSubmit={handleSubmit}
          className="bg-[#F3F4F5] h-full sm:w-full sm:p-7 px-2 py-3 sm:gap-5 gap-3 flex flex-col"
        >
          <div className="flex justify-center w-full h-auto p-4 bg-white rounded-lg">
            <div className="flex flex-col items-center justify-center w-4/5 sm:w-3/5 sm:gap-7">
              <div className="font-semibold sm:text-2xl">
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
            className="flex items-center gap-2 overflow-x-auto h-aout sm:gap-5 scrollbar-none"
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
                <div className="flex-col p-1 sm:p-2 w-24 h-24 sm:w-36 sm:h-36 bg-[#EBF4FF] flex rounded-lg items-center border border-[#3288FF] justify-center text-[#8A8A8A] ">
                  <p className="sm:mb-2 sm:text-lg">
                    사진첨부
                    <span className="text-2xl text-red-600">*</span>
                  </p>
                  <span className="sm:text-sm text-[12px]">
                    영수증 사진이 없으면 후기가 삭제될수 있습니다.
                  </span>
                </div>
              </label>
            </div>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="min-w-24 max-w-24 h-24 sm:min-w-36 sm:h-36 bg-[#D9D9D9] flex rounded-lg items-center justify-center overflow-hidden"
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
                    controls
                  />
                ) : null}
              </div>
            ))}
            {selectedFiles.length === 0 && (
              <div className="sm:w-36 sm:h-36 w-24 h-24 bg-[#D9D9D9] flex rounded-lg items-center justify-center">
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
                className="w-full p-2 sm:p-5 text-[#8A8A8A] sm:text-xl rounded-lg h-14 focus:outline-none"
              />
            </div>
          </div>
          <div className="sm:mt-4">
            <div className="flex items-center">
              <span className="mr-1 text-lg">후기 내용</span>
              <span className="mt-0.5 text-2xl text-red-600">*</span>
            </div>
            <div className="flex p-4 bg-white rounded-lg sm:p-7 h-52">
              <textarea
                className="w-full h-full resize-none sm:text-xl"
                placeholder="내용을 작성해 주세요."
                value={content}
                maxLength="400"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col gap-6 ">
            <BasicBtn styleType="blue" size="lg" label="수정" type="submit" />
          </div>
        </form>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default ReviewEdit;
