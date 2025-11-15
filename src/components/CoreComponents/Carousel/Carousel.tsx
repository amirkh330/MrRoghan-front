import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/swiper-bundle.css";

const Carousel = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      loop
      autoplay
      speed={500}
      style={{ margin: 0 }}
      slidesPerView={1}
      spaceBetween={16}
      slidesPerGroup={1}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {images?.map((item, index) => {
        return (
          <SwiperSlide key={index} style={{ margin: 0 }}>
            <img
              src={item}
              style={{ width: "380", height: "380px", objectFit: "cover" }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
