const PensionIntroduction = ({ introduction, showFullIntro, setShowFullIntro }) => {
    const maxLines = 10;
    const introductionLines = introduction.split('\n');
  
    return (
      <section className="p-4 mt-4 bg-white">
        <h3 className="mb-2 text-lg font-bold">소개글</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {showFullIntro ? introduction : introductionLines.slice(0, maxLines).join('\n')}
        </p>
        {introductionLines.length > maxLines && (
          <button onClick={() => setShowFullIntro(!showFullIntro)} className="mt-2 text-sm text-blue-500">
            {showFullIntro ? '접기' : '더보기'}
          </button>
        )}
      </section>
    );
  };
  
  export default PensionIntroduction;
  