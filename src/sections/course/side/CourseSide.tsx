// @mui
import { Stack } from '@mui/material';
//
import CourseSidePricing from './CourseSidePricing';
import CourseSideMainInfo from './CourseSideMainInfo';
import CourseSideTeacherInfo from './CourseSideTeacherInfo';
import CourseSideTranslatorInfo from './CourseSideTranslatorInfo';
import CourseSideDoublerInfo from './CourseSideDoublerInfo';

// ----------------------------------------------------------------------

export default function CourseSide() {
  return (
    <Stack
      sx={{
        height: 'fit-content',
        position: 'sticky',
        flexGrow: 1,
        top: 130,
        left: 0,
        p: 2,
        width: 550,
      }}
      spacing={2}
    >
      <CourseSidePricing />
      <CourseSideMainInfo />
      <CourseSideTeacherInfo />
      <CourseSideTranslatorInfo />
      <CourseSideDoublerInfo />
    </Stack>
  );
}
