import Slider from 'react-slick';

const PlaceSlider = ({ images }) => {
  return (
    <div className="w-full h-[400px] overflow-hidden">
      <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
        {images.slice(0, 5).map((image, index) => (
          <div key={index}>
            <img 
              src={image} 
              alt={`장소 이미지 ${index + 1}`} 
              className="w-full h-[400px] object-cover" 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PlaceSlider;
