import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// components
import { SubmitCommentDialog } from '@/components/comment-dialog';
import Iconify from '@/components/iconify/Iconify';
// @mui
import { Box, Paper, Tab, Tabs } from '@mui/material';
//
import TabsIntroduction from './TabsIntroduction';
import TabsDetail from './TabsDetail';
import TabsComments from './TabsComments';
import TabsQAndA from './TabsQAndA';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'introduction',
    label: 'معرفی',
    icon: <Iconify icon="bx:detail" />,
    component: <TabsIntroduction />,
  },
  {
    value: 'details',
    label: 'مشخصات',
    icon: <Iconify icon="eva:cube-fill" />,
    component: <TabsDetail />,
  },
  {
    value: 'comments',
    label: 'دیدگاه کاربران',
    icon: <Iconify icon="eva:message-square-fill" />,
    component: <TabsComments />,
  },
  {
    value: 'qanda',
    label: 'پرسش و پاسخ',
    icon: <Iconify icon="eva:question-mark-circle-fill" />,
    component: <TabsQAndA />,
  },
];

// ----------------------------------------------------------------------

export default function ProductTabs() {
  //
  const [currentTab, setCurrentTab] = useState('introduction');

  const { query } = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (query.isSubmitComment === 'show') {
      setIsDialogOpen(true);
    }
  }, [query]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Paper variant="outlined">
      <Tabs
        dir="rtl  "
        value={currentTab}
        onChange={(_, newValue) => {
          setCurrentTab(newValue);
        }}
        variant="scrollable"
        scrollButtons={false}
        sx={{ borderBottom: 1, borderColor: 'grey.200' }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            icon={tab.icon}
            value={tab.value}
            iconPosition="start"
          />
        ))}
      </Tabs>

      {TABS.map(
        (tab) =>
          tab.value === currentTab && (
            <Box key={tab.value} sx={{ mt: 5 }}>
              {tab.component}
            </Box>
          )
      )}

      <SubmitCommentDialog open={isDialogOpen} handleClose={handleDialogClose} />
    </Paper>
  );
}
