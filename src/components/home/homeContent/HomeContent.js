import React from 'react'
import { Navigation } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import OrderItem from './orderItem';
import Link from 'next/link';
import { Autoplay } from 'swiper';

const HomeContent = ({ orders }) => {
    const ordersArray = Object.values(orders);
    return (
        <div className="home-content">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="mySwiper"
            >
                {ordersArray?.map((order) => (
                    <SwiperSlide key={order.orderId}>
                        <Link href={`${order.category}/${order.orderId}`}>
                            <div className="home-content__wrapper" onClick={(e) => e.stopPropagation()}>
                                <OrderItem order={order} />
                            </div>
                        </Link>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default React.memo(HomeContent)