import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './BandSwiper.module.scss';

interface BandSwiperProps {
    images: string[];
    alt: string;
}

const BandSwiper: React.FC<BandSwiperProps> = ({ images, alt }) => {
    const [activeImage, setActiveImage] = React.useState(images[0]);
    const [fadeBlur, setFadeBlur] = React.useState(false);

    const handleSlideChange = (swiper: any) => {
        const newImage = images[swiper.activeIndex];
        if (newImage !== activeImage) {
            setFadeBlur(true);
            setTimeout(() => {
                setActiveImage(newImage);
                setFadeBlur(false)
            }, 200)
        }
    };

    return (
        <div className={styles.bandSwiperWrapper}>
            <img
                className={`${styles.bandImageBlur} ${fadeBlur ? styles.fadeOut : styles.fadeIn}`}
                src={activeImage}
                alt=""
                aria-hidden="true"
            />
            <Swiper className={styles.bandSwiper}
                modules={[Pagination, Navigation]}
                spaceBetween = {20}
                slidesPerView = {1}
                navigation
                pagination = {{ clickable:true }}
                onSlideChange={handleSlideChange}
            >
                {images.map((image, index)=> (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`${alt} ${index + 1}`} className={styles.bandImageMain}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default BandSwiper