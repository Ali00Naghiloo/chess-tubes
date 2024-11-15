import { useState } from 'react';
// @mui
import { Box, Tab, Tabs } from '@mui/material';
// components
import Iconify from '@/components/iconify';
// tabs
import ProductTab from './tabs/ProductTab';
import CourseTab from './tabs/CourseTab';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'products',
    label: 'محصولات',
    icon: <Iconify icon="icon-park-outline:weixin-favorites" />,
    component: <ProductTab />,
  },
  {
    value: 'courses',
    label: 'دوره های آموزشی',
    icon: <Iconify icon="ph:student-bold" />,
    component: <CourseTab />,
  },
];

// ----------------------------------------------------------------------

export default function FavSection() {
  //

  const [currentTab, setCurrentTab] = useState('products');

  return (
    <Box>
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
    </Box>
  );
}
