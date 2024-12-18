import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import treeIcon from "../../stories/assets/tree.svg";
import emptyIcon from "../../assets/common/petgray.svg"


const RecommendedPensions = () => {
  const [pensions, setPensions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRecommendedPensions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('ACCESS_TOKEN');

        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get(
          'https://meong9.store/api/v1/spots/recommendations',
          { headers }
        );

        const { data } = response.data;

        if (data && data.recommend) {
          setPensions(data.recommend);
        } else {
          setError('추천 펜션 데이터를 불러오지 못했습니다.');
        }
      } catch (err) {
        Swal.fire({
          title: '오류 발생',
          text: err.response?.data?.message || "추천 펜션 데이터를 불러오지 못했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPensions();
  }, []);

  const handlePensionClick = (id) => {
    navigate(`/pension-detail/${id}`);
  };

  const addDragScroll = (ref) => {
    let isDragging = false;
    let startX, scrollLeft;

    const mouseDownHandler = (e) => {
      isDragging = true;
      startX = e.pageX - ref.current.offsetLeft;
      scrollLeft = ref.current.scrollLeft;
    };

    const mouseMoveHandler = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * 2;
      ref.current.scrollLeft = scrollLeft - walk;
    };

    const mouseUpHandler = () => {
      isDragging = false;
    };
  
    ref.current.addEventListener('mousedown', mouseDownHandler);
    ref.current.addEventListener('mousemove', mouseMoveHandler);
    ref.current.addEventListener('mouseup', mouseUpHandler);
    ref.current.addEventListener('mouseleave', mouseUpHandler);
  };
  
    useEffect(() => {
      if (scrollRef.current) {
        addDragScroll(scrollRef);
      }
    }, []);

  return (
    <div className="p-6 bg-white rounded-lg relative">
  <div className="flex items-center mb-2">
    <h2 className="text-lg font-bold mb-0">
      추천 펜션
      <img
        src={treeIcon}
        alt="리뷰 아이콘"
        className="inline-block w-6 h-6 relative"
        style={{ top: "-5px", left: "10px" }}
      />
    </h2>
  </div>

  {pensions.length > 0 ? (
    <div
    ref={scrollRef}
    className="
      flex gap-x-4 overflow-x-auto snap-x snap-mandatory 
      scrollbar-thin scrollbar-thumb-[#3288ff] scrollbar-track-gray-200 
      sm:scrollbar-none pb-1 mb-[-1px] overscroll-none
    "
    style={{ scrollBehavior: "smooth" }}
  >
      {pensions.map((pension) => (
        <div
        key={pension.id}
        className="flex-none w-60 bg-white rounded-lg text-center snap-start cursor-pointer"
        onClick={() => handlePensionClick(pension.id)}
      >
        <div
          className="w-48 h-24 bg-gray-300 rounded-lg mb-2 sm:w-full h-32"
          style={{
            backgroundImage: `url(${pension.img ? pension.img : emptyIcon})`, // 빈 사진을 대체
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <h3 className="text-base font-semibold text-gray-800 truncate sm:pr-0 pr-12">
          {pension.name}
        </h3>
        <p className="text-sm text-gray-500 truncate sm:pr-0 pr-12">
          {pension.address}
        </p>
        <p className="text-sm text-gray-500 mt-1 sm:pr-0 pr-12">
          ⭐ {pension.reviewAvg || "0"} ({pension.reviewCount || "0"} 리뷰)
        </p>
      </div>
      
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">추천 펜션 데이터를 찾을 수 없습니다.</p>
  )}
</div>

  );
};

export default RecommendedPensions;
