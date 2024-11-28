import React from 'react';

const LiveReviews = () => {
  const reviews = [1, 2, 3, 4, 5]; // 샘플 데이터

  return (
    <section className="p-4">
      <h2 className="text-lg font-bold mb-2">실시간 리뷰 🕒</h2>
      <div className="flex gap-4 overflow-x-scroll">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[150px] p-4 bg-white shadow-md rounded-lg text-center"
          >
            <p>리뷰입니다.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveReviews;