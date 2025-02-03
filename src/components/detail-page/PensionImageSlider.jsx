import Slider from 'react-slick';

const PensionImageSlider = ({ images }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full h-[400px] overflow-hidden">
      <Slider {...sliderSettings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Pension Image ${index + 1}`} className="w-full h-[400px] object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PensionImageSlider;
