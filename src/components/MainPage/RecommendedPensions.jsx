import React from 'react';

const RecommendedPensions = () => {
  const pensions = [1, 2, 3, 4, 5, 6]; // 샘플 데이터

  return (
    <section className="p-4">
      <h2 className="text-lg font-bold mb-2">추천 펜션 ✨</h2>
      <div className="grid grid-cols-2 gap-4">
        {pensions.map((pension, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow-md rounded-lg text-center"
          >
            <p>펜션입니다.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPensions;