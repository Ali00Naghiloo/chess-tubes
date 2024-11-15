import { useRef, useState } from 'react';
// components
import { MotionContainer } from '@/components/animate';
import Carousel, { CarouselArrows, CarouselDots } from '@/components/carousel';
import Image from '@/components/image/Image';
// @mui
import { Card, CardProps, Link } from '@mui/material';
// models
import { Banner } from '@/modules/banner/models/banner';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  list: Banner[];
}

export default function ShopCarousel({ list, sx, ...other }: Props) {
  //
  const carouselRef = useRef<Carousel>(null);

  const [currentIndex, setCurrentIndex] = useState(list.length - 1);

  const carouselSettings = {
    speed: 800,
    dots: true,
    arrows: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    ...CarouselDots({
      sx: {
        bottom: 10,
        left: '50%',
        transform: 'translate(-50%)',
        position: 'absolute',
      },
      rounded: true,
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card dir="rtl" variant="elevation" sx={{ ...sx, position: 'relative' }} {...other}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={handleNext}
        onPrevious={handlePrev}
        filled
        sx={{
          position: 'absolute',
          color: 'common.white',
          left: '20px',
          top: '30px',
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: Banner;
  isActive?: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const { image, title, link } = item;

  return (
    <MotionContainer action animate={isActive} sx={{ position: 'relative', cursor: 'pointer' }}>
      {/*  */}
      <Link
        href={link}
        target="_blank"
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          zIndex: 9,
        }}
        onDragStart={(e) => {
          e.preventDefault();
        }}
      />

      <Image
        alt={title}
        src={image.replace('https', 'http')}
        sx={{
          width: '100%',
          aspectRatio: '3 / 1',
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />
    </MotionContainer>
  );
}
