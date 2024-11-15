import _mock from '../_mock';
import { randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _carouselsMembers = [...Array(6)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
  avatar: `/assets/images/portraits/portrait_${index + 1}.jpg`,
}));

// ----------------------------------------------------------------------

export const _faqs = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Questions ${index + 1}`,
  detail: _mock.text.description(index),
}));

// ----------------------------------------------------------------------

export const _addressBooks = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  receiver: _mock.name.fullName(index),
  fullAddress: _mock.address.fullAddress(index),
  phoneNumber: _mock.phoneNumber(index),
  addressType: index === 0 ? 'Home' : 'Office',
  isDefault: index === 0,
}));

// ----------------------------------------------------------------------

export const _skills = [...Array(3)].map((_, index) => ({
  label: ['Development', 'Design', 'Marketing'][index],
  value: _mock.number.percent(index),
}));

// ----------------------------------------------------------------------

export const _contacts = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  username: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  address: _mock.address.fullAddress(index),
  phone: _mock.phoneNumber(index),
  email: _mock.email(index),
  lastActivity: _mock.time(index),
  status: randomInArray(['online', 'offline', 'away', 'busy']),
  role: _mock.role(index),
}));

// ----------------------------------------------------------------------

export const _mapContact = [
  {
    latlng: [33, 65],
    address: _mock.address.fullAddress(1),
    phoneNumber: _mock.phoneNumber(1),
  },
  {
    latlng: [-12.5, 18.5],
    address: _mock.address.fullAddress(2),
    phoneNumber: _mock.phoneNumber(2),
  },
];

// ----------------------------------------------------------------------

export const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'logos:facebook',
    color: '#1877F2',
    path: 'https://www.facebook.com/',
  },
  // {
  //   value: 'instagram',
  //   name: 'Instagram',
  //   icon: 'logos:instagram-icon',
  //   color: '#E02D69',
  //   path: 'https://www.instagram.com/',
  // },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'logos:linkedin-icon',
    color: '#007EBB',
    path: 'https://www.linkedin.com/',
  },
  {
    value: 'youtube',
    name: 'Youtube',
    icon: 'logos:youtube-icon',
    color: '#00AAEC',
    path: 'https://www.twitter.com/',
  },
  // {
  //   value: 'aparat',
  //   name: 'Aparat',
  //   icon: 'simple-icons:aparat',
  //   color: '#00AAEC',
  //   path: 'https://www.twitter.com/',
  // },
];

export const _socials2 = [
  {
    value: 'x',
    name: 'X',
    icon: '/assets/icons/social/x.svg',
    color: '#00AAEC',
    path: 'https://www.twitter.com/',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: '/assets/icons/social/instagram.svg',
    color: '#E02D69',
    path: 'https://www.instagram.com/',
  },
  {
    value: 'aparat',
    name: 'Aparat',
    icon: '/assets/icons/social/aparat.svg',
    color: '#00AAEC',
    path: 'https://www.twitter.com/',
  },
];
