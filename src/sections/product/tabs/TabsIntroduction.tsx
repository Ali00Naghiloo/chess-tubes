import { useState } from 'react';
// @mui
import { Box, Button, Typography } from '@mui/material';
// redux
import { useSelector } from '@/redux/store';

// ----------------------------------------------------------------------

export default function TabsIntroduction() {
  //

  const [isShowMore, setIsShowMore] = useState(false);

  const { description } = useSelector((s) => s.product.product);

  return (
    <Box sx={{ pb: 4, px: 4 }}>
      <Typography
        paragraph
        fontWeight={500}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: isShowMore ? 'auto' : 4,
          WebkitBoxOrient: 'vertical',
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <Button color="info" onClick={() => setIsShowMore((s) => !s)}>
        {isShowMore ? 'توضیحات کمتر' : 'توضیحات بیشتر'}
      </Button>
    </Box>
  );
}
