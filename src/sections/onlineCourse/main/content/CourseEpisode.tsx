import { toast } from 'react-toastify';
import { useState } from 'react';
// @mui
import { Stack, Step, StepLabel, Typography, styled } from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import { LoadingButton } from '@mui/lab';
// components
import SvgColor from '@/components/svg-color';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
// models
import { CourseContentSections } from '@/modules/course/models/course';
// redux
import { useDispatch } from '@/redux/store';
// modules
import addCourseEpisodeToCart from '@/modules/cart/redux/operators/addCourseEpisodeToCart ';

// ----------------------------------------------------------------------

type CourseEpisodeProps = CourseContentSections;

// ----------------------------------------------------------------------

export function CourseEpisode({ id, price, title }: CourseEpisodeProps) {
  //
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const failureCallBack = (msg?: string) => {
    setIsLoading(false);

    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const successCallBack = () => {
    setIsLoading(false);
  };

  const addEpisodeToCart = (episodeId: string | number) => {
    setIsLoading(true);

    dispatch(addCourseEpisodeToCart(episodeId, successCallBack, failureCallBack));
  };

  return (
    <Step key={id} expanded active>
      <StepLabel StepIconComponent={QontoStepIcon}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography fontWeight={500}>
            {/* {` ${enNumToPer(i + 1)}  -   ${enNumToPer(index + 1)}   ${c.title}`} */}
            {title}
          </Typography>

          <Stack direction="row">
            (
            <Typography variant="body2" fontWeight={600}>
              {enNumToPerPrice(price)}
            </Typography>
            <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />)
          </Stack>

          <LoadingButton
            loading={isLoading}
            onClick={() => addEpisodeToCart(id)}
            color="info"
            size="small"
          >
            خرید اپیزود
          </LoadingButton>
        </Stack>
      </StepLabel>
    </Step>
  );
}

// ----------------------------------------------------------------------

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    height: 22,
    alignItems: 'center',
    color: theme.palette.primary.main,
    '& .QontoStepIcon-completedIcon': {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
);

// ----------------------------------------------------------------------

function QontoStepIcon(props: StepIconProps) {
  const { active, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      <div className="QontoStepIcon-circle" />
    </QontoStepIconRoot>
  );
}
