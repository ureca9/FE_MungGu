// src/components/detail-page/ViewerCount.jsx
import React from 'react';

const ViewerCount = ({ viewCount }) => {
  return (
    <div className="my-4 p-4 text-center bg-blue-100 text-blue-800 rounded-md">
      지금 <strong>{viewCount}</strong>명이 보고 있어요!
    </div>
  );
};

export default ViewerCount;