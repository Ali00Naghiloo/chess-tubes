import { MouseEvent, useEffect, useRef, useState } from 'react';
// @mui
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
//
import ScrollContainer from 'react-indiana-drag-scroll';

// ----------------------------------------------------------------------

export default function HorizontalScrollbar({ children, disableArrows = false }: any) {
  const scrollRef = useRef<any>();

  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollBoxWidth, setScrollBoxWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    handleScroll();
  }, []);

  const handleScroll = () => {
    const scrollLeftValue = scrollRef.current.parentElement.scrollLeft;
    const scrollWidthValue = scrollRef.current.parentElement.scrollWidth;
    const width = (scrollRef.current.parentElement as HTMLElement).clientWidth;

    setScrollWidth(scrollWidthValue);
    setScrollLeft(scrollLeftValue);
    setScrollBoxWidth(width);
  };

  return (
    <ScrollContainer onScroll={handleScroll}>
      <Box ref={scrollRef}>
        {(scrollWidth !== Math.ceil(-(scrollLeft - scrollBoxWidth)) || scrollBoxWidth === 0) &&
          !disableArrows && <LeftArrow />}
        {scrollLeft < -10 && !disableArrows && <RightArrow />}
        {children}
      </Box>
    </ScrollContainer>
  );
}

// ----------------------------------------------------------------------

function LeftArrow() {
  const scrollLeft = (e: MouseEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.parentElement?.parentElement?.parentElement;
    parent?.scrollBy({
      behavior: 'smooth',
      left: -200,
    });
  };

  return (
    <Paper sx={{ position: 'absolute', right: 5, top: '40%', borderRadius: '50%', zIndex: 99 }}>
      <IconButton onClick={scrollLeft}>
        <ChevronLeft />
      </IconButton>
    </Paper>
  );
}

function RightArrow() {
  const scrollLeft = (e: MouseEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.parentElement?.parentElement?.parentElement;
    parent?.scrollBy({
      behavior: 'smooth',
      left: 200,
    });
  };

  return (
    <Paper sx={{ position: 'absolute', left: 5, top: '40%', borderRadius: '50%', zIndex: 99 }}>
      <IconButton onClick={scrollLeft}>
        <ChevronRight />
      </IconButton>
    </Paper>
  );
}
