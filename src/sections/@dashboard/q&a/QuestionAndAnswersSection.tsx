import { useState } from 'react';
// @mui
import { Box, Paper, Tab, Tabs } from '@mui/material';
// components
import Iconify from '@/components/iconify/Iconify';
// tabs
import MyQuestions from './tabs/MyQuestions';
import MyAnswers from './tabs/MyAnswers';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'questions',
    label: 'سوالات من',
    icon: <Iconify icon="bx:detail" />,
    component: <MyQuestions />,
  },
  {
    value: 'answers',
    label: 'پاسخ های من',
    icon: <Iconify icon="eva:cube-fill" />,
    component: <MyAnswers />,
  },
];

// ----------------------------------------------------------------------

export default function QuestionAndAnswersSection() {
  //
  const [currentTab, setCurrentTab] = useState('questions');

  return (
    <Paper variant="outlined">
      <Tabs
        dir="rtl"
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
