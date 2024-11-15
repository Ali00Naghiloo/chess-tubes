import { useRef, useState } from 'react';
// components
import Carousel from '@/components/carousel';
// @mui
import { Avatar, Box, Card, CardProps, Divider, Stack, Typography } from '@mui/material';
import Iconify from '@/components/iconify/Iconify';
import { PATH_PAGE } from '@/routes/paths';

// ----------------------------------------------------------------------

type ItemProps = {
  id: string | number;
  image: string;
  rating: string | number;
  name: string;
  description: string;
};

interface Props extends CardProps {
  list: ItemProps[];
}

export default function HomeTestimonials({ list, ...other }: Props) {
  const carouselRef = useRef<Carousel>(null);

  const [currentIndex, setCurrentIndex] = useState(list.length - 1);

  const carouselSettings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    className: 'center',
    speed: 500,
    arrows: true,
    autoplay: true,
    slidesToScroll: 1,
    rtl: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box dir="rtl" variant="outlined" {...other} sx={{ my: 10, overflow: 'hidden' }}>
      <Divider sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          نظرات کاربران درباره چس تیوبز
        </Typography>
      </Divider>

      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} />
        ))}
      </Carousel>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ItemProps;
  isActive?: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const { image, description, name } = item;

  return (
    <Stack
      sx={{
        pt: 5,
        pb: 10,
        position: 'relative',
        mx: 1,
      }}
    >
      {/*  */}

      <Stack
        component={Card}
        justifyContent="flex-start"
        alignItems="center"
        variant="outlined"
        sx={{
          py: 2,
          px: { xs: 0.5, sm: 2 },
          minHeight: 210,
        }}
      >
        <Iconify
          icon="gridicons:quote"
          sx={{
            width: 60,
            height: 60,
            mb: { xs: 1, sm: 2 },
            color: (theme) => (isActive ? theme.palette.darkPrimary.main : theme.palette.grey[300]),
          }}
        />
        <Typography
          dir="rtl"
          textAlign="center"
          variant="body1"
          fontWeight={isActive ? '700' : '500'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: { xs: '4', sm: '3' },
            WebkitBoxOrient: 'vertical',
            opacity: isActive ? 1 : 0.6,
          }}
        >
          {description}
        </Typography>
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ position: 'absolute', bottom: '25px', left: '50%', transform: 'translate(-50%,0)' }}
      >
        <Avatar src={PATH_PAGE.avatarImageUrl(image)} sx={{ width: 55, height: 55 }} />
        <Typography textAlign="center" variant="button">
          {name}
        </Typography>
      </Stack>
    </Stack>
  );
}
