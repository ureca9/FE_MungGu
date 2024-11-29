import React, { useState } from 'react';

const BreedsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={toggleOffcanvas}>메뉴 열기</button>
      <div className={`offcanvas ${isOpen ? 'active' : ''}`}>
        {/* Offcanvas 내용 */}
        <p>Offcanvas 콘텐츠</p>
        <button onClick={toggleOffcanvas}>닫기</button>
      </div>
    </div>
  );
};

export default BreedsPanel;