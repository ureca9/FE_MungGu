const PlaceInfoSection = ({ businessHour, telNo, hmpgUrl, description }) => {
    return (
      <>
        <section className="p-4 mt-4 bg-white">
          <h3 className="mb-2 text-lg font-bold">운영 정보</h3>
          <p>운영 시간: {businessHour || '정보 없음'}</p>
          <p>전화 번호: {telNo || '정보 없음'}</p>
          {hmpgUrl && (
            <p>
              홈페이지:{' '}
              <a href={hmpgUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {hmpgUrl}
              </a>
            </p>
          )}
        </section>
  
        <section className="p-4 mt-4 bg-white">
          <h3 className="mb-2 text-lg font-bold">시설 정보</h3>
          <p className="text-sm text-gray-600">{description || '설명 없음'}</p>
        </section>
      </>
    );
  };
  
  export default PlaceInfoSection;
  