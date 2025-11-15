import React from "react";
import Carousel from "../Carousel/Carousel";
import { Box, Center, Flex, Image, Text, chakra } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Countdown from "react-countdown";

import "swiper/css";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
interface IMainSwiper {
  title: string;
  type: string;
  link: string;
  imageAddress: string;
  meta: {};
}
export const MainSwiper = ({ list }: { list: any }) => {
  return (
    <chakra.div mt="8">
      <Swiper
        loop
        autoplay
        speed={30}
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
        {list?.map((item: any, index: any) => {
          const isCountDown = item?.type == "CountDown";
          return (
            <SwiperSlide
              key={index}
              style={
                {
                  // marginRight: "50%",
                  // marginLeft: "50% !important",
                  // textAlign: "center",
                  height: "400px",
                }
              }
            >
              {!isCountDown ? (
                <Link to={item.link}>
                  <Image
                    src={item.imageAddress}
                    style={{
                      width: "100%",
                      height: "360px",
                      objectFit: "cover",
                      margin: 0,
                    }}
                  />
                </Link>
              ) : (
                <Image
                  src={item.imageAddress}
                  style={{
                    width: "100%",
                    height: "360px",
                    objectFit: "cover",
                    margin: 0,
                  }}
                />
              )}
              {isCountDown && (
                <Center
                  color="amir.common"
                  fontSize="20px"
                  fontWeight="500"
                  position="relative"
                  top="-90px"
                >
                  <Countdown
                    date={item.meta.startAt}
                    // intervalDelay={0}
                    // precision={3}
                    renderer={(props) => {
                      return (
                        <Box>
                          <Text mb="4" textAlign="center">
                            شروع بازی
                          </Text>
                          <Flex
                            alignItems="center"
                            gap={"2"}
                            flexDir="row-reverse"
                          >
                            <chakra.div
                              px="2"
                              py="1"
                              borderRadius={"4px"}
                              bgColor="#831BD5"
                            >
                              {props.days}
                            </chakra.div>
                            :
                            <chakra.div
                              px="2"
                              py="1"
                              borderRadius={"4px"}
                              bgColor="#831BD5"
                            >
                              {props.hours}
                            </chakra.div>
                            :
                            <chakra.div
                              px="2"
                              py="1"
                              borderRadius={"4px"}
                              bgColor="#831BD5"
                            >
                              {props.minutes}
                            </chakra.div>
                            :
                            <chakra.div
                              px="2"
                              py="1"
                              borderRadius={"4px"}
                              bgColor="#831BD5"
                            >
                              {props.seconds}
                            </chakra.div>
                          </Flex>
                        </Box>
                      );
                    }}
                  />
                </Center>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </chakra.div>
  );
};
