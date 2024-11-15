// components
import SvgColor from '@/components/svg-color';
// routes
import { PATH_PAGE } from '../../../routes/paths';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  home: icon('ic_home'),
  courses: icon('ic_courses'),
  shop: icon('ic_shop'),
  news: icon('ic_news'),
  rules: icon('ic_book'),
  about: icon('ic_about'),
  contact: icon('ic_message'),
  onlineCourse: icon('ic_online-course'),
  liveAnalysis: icon('ic_online-course'),
};

const navConfig = [
  {
    subheader: '',
    items: [
      { title: 'صفحه اصلی', path: PATH_PAGE.root, icon: ICONS.home },
      { title: 'دوره های آموزشی', path: PATH_PAGE.courses, icon: ICONS.courses },
      { title: 'دوره های آنلاین', path: PATH_PAGE.onlineCourses, icon: ICONS.onlineCourse },
      { title: 'تفسیر آنلاین', path: PATH_PAGE.liveAnalysis, icon: ICONS.liveAnalysis },
      { title: 'فروشگاه', path: PATH_PAGE.shop, icon: ICONS.shop },
      {
        title: 'اخبار',
        path: PATH_PAGE.news.root,
        icon: ICONS.news,
        children: [
          { title: 'اخبار داخلی', path: PATH_PAGE.news.internalNews },
          { title: 'اخبار خارجی', path: PATH_PAGE.news.externalNews },
        ],
      },
      { title: 'قوانین', path: PATH_PAGE.rules, icon: ICONS.rules },
      { title: 'درباره ما', path: PATH_PAGE.about, icon: ICONS.about },
      { title: 'تماس با ما', path: PATH_PAGE.contact, icon: ICONS.contact },
    ],
  },
];

export default navConfig;
