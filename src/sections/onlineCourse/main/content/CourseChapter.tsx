import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// @mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Stepper,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ExpandMore } from '@mui/icons-material';
// components
import SvgColor from '@/components/svg-color';
// utils
import { enNumToPerPrice } from '@/utils/persianUtils';
// models
import { CourseContent } from '@/modules/course/models/course';
// redux
import { useDispatch } from '@/redux/store';
// modules
import addCourseChapterToCart from '@/modules/cart/redux/operators/addCourseChapterToCart';
//
import { CourseEpisode } from './CourseEpisode';

// ----------------------------------------------------------------------

type CourseChapterProps = CourseContent & { index: number };

export default function CourseChapter({ title, price, sections, index, id }: CourseChapterProps) {
  //

  const dispatch = useDispatch();

  const [panel, setPanel] = useState('');

  const handleChangePanel =
    (panelName: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setPanel(isExpanded ? panelName : '');
    };

  const [isLoading, setIsLoading] = useState(false);

  const [operationStatus, setOperationStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    if (operationStatus != null) {
      setTimeout(() => {
        setOperationStatus(null);
      }, 2000);
    }
  }, [operationStatus]);

  const failureCallBack = (msg?: string) => {
    setIsLoading(false);

    setOperationStatus('error');

    toast.error(msg ?? 'یه مشکلی پیش اومده');
  };

  const successCallBack = () => {
    setOperationStatus('success');

    setIsLoading(false);
  };

  const addChapterToCart = (chapterId: string | number) => {
    setIsLoading(true);

    dispatch(addCourseChapterToCart(chapterId, successCallBack, failureCallBack));
  };

  return (
    <Accordion
      variant="outlined"
      key={title}
      expanded={panel === `panel${index}`}
      onChange={handleChangePanel(`panel${index}`)}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack
          sx={{ width: '100%' }}
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography fontWeight={600}>
                {/* {`  فصل ${enNumToPer(index + 1)} : ${ac.title}  `} */}
                {title}
              </Typography>

              <Stack direction="row">
                (
                <Typography variant="body2" fontWeight={600}>
                  {enNumToPerPrice(price)}
                </Typography>
                <SvgColor src="/assets/icons/products/ic_toman.svg" sx={{ width: 15, ml: 0.5 }} />)
              </Stack>
            </Stack>
          </Stack>
          <LoadingButton
            // color={operationStatus ?? 'primary'}
            loading={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              addChapterToCart(id);
            }}
          >
            خرید فصل
          </LoadingButton>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stepper
          orientation="vertical"
          sx={{
            '.MuiStepConnector-line': {
              borderColor: (theme) => theme.palette.primary.main,
              borderLeftStyle: 'dashed',
            },
          }}
        >
          {sections.map((c, i) => (
            <CourseEpisode key={c.id} {...c} />
          ))}
        </Stepper>
      </AccordionDetails>
    </Accordion>
  );
}
