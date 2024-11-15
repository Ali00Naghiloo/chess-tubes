import { useState } from 'react';
// components
import Iconify from '@/components/iconify/Iconify';
// @mui
import { Box, Paper, Tab, Tabs } from '@mui/material';
//
import TabsComments from './TabsComments';
import TabsQAndA from './TabsQAndA';

// ----------------------------------------------------------------------

const TABS = [
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

export default function CourseTabs() {
  //
  const [currentTab, setCurrentTab] = useState('comments');

  return (
    <Paper variant="outlined" sx={{ my: 10 }}>
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
    </Paper>
  );
}
