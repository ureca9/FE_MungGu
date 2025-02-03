import React from 'react';
import PensionCard from './PensionCard';

const PensionList = ({ pensions, onPensionClick, onToggleLike }) => {
    return (
      <div className="p-4 space-y-4">
        {pensions.length > 0 ? (
          pensions.map((pension) => (
            <PensionCard 
              key={pension.pensionId} 
              pension={pension} 
              onPensionClick={onPensionClick} 
              onToggleLike={onToggleLike} 
            />
          ))
        ) : (
          <p className="text-center text-gray-500">조건에 맞는 펜션이 없습니다.</p>
        )}
      </div>
    );
  };

export default PensionList;
