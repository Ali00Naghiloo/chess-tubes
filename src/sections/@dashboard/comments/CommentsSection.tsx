import { useState } from 'react';
// @mui
import { Box, Paper, Tab, Tabs } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// tabs
import WaitingForCommentTab from './tabs/WaitingForComments';
import MyCommentsTab from './tabs/MyComments';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'waitingForComment',
    label: 'در انتظار ثبت دیدگاه',
    icon: <Iconify icon="bx:detail" />,
    component: <WaitingForCommentTab />,
  },
  {
    value: 'myComments',
    label: 'دیدگاه های من',
    icon: <Iconify icon="eva:cube-fill" />,
    component: <MyCommentsTab />,
  },
];

// ----------------------------------------------------------------------

export default function CommentSection() {
  //
  const [currentTab, setCurrentTab] = useState('waitingForComment');

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
            <Box key={tab.value} sx={{ my: 5, px: { sm: 2, xs: 1 } }}>
              {tab.component}
            </Box>
          )
      )}
    </Paper>
  );
}
