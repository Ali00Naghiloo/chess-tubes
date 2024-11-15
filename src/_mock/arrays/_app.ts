import uuidv4 from '@/utils/uuidv4';
import _mock from '../_mock';
import { randomNumberRange, randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _appRelated = ['Chrome', 'Drive', 'Dropbox', 'Evernote', 'Github'].map(
  (name, index) => ({
    id: _mock.id(index),
    name,
    system: (index === 2 && 'Windows') || (index === 4 && 'Windows') || 'Mac',
    price: index === 0 || index === 2 || index === 4 ? 0 : _mock.number.price(index),
    rating: _mock.number.rating(index),
    review: randomNumberRange(999, 99999),
    shortcut:
      (name === 'Chrome' && '/assets/icons/apps/ic_chrome.svg') ||
      (name === 'Drive' && '/assets/icons/apps/ic_drive.svg') ||
      (name === 'Dropbox' && '/assets/icons/apps/ic_dropbox.svg') ||
      (name === 'Evernote' && '/assets/icons/apps/ic_evernote.svg') ||
      '/assets/icons/apps/ic_github.svg',
  })
);

// ----------------------------------------------------------------------

export const _appInstalled = ['de', 'en', 'fr', 'kr', 'us'].map((country, index) => ({
  id: _mock.id(index),
  name: ['Germany', 'England', 'France', 'Korean', 'USA'][index],
  android: randomNumberRange(999, 99999),
  windows: randomNumberRange(999, 99999),
  apple: randomNumberRange(999, 99999),
  flag: `/assets/icons/flags/ic_flag_${country}.svg`,
}));

// ----------------------------------------------------------------------

export const _appAuthors = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  favourite: randomNumberRange(9999, 19999),
}));

// ----------------------------------------------------------------------

export const _appInvoices = [...Array(5)].map((_, index) => ({
  id: `${Date.now() + index}`,
  price: _mock.number.price(index),
  category: randomInArray(['Android', 'Mac', 'Windows']),
  status: randomInArray(['paid', 'out_of_date', 'in_progress']),
}));

// ----------------------------------------------------------------------

export const _appCarousel = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  headline: ['فروشگاه', 'آموزش', 'خبر تازه'][index],
  title: ['صحفه شطرنج جدید', 'یک دوره آموزشی جذاب', 'خبر تازه رو شنیدی؟'][index],
  description: [
    'صحفه شطرنج های جدید با طرح های جذاب',
    'دوره آموزشی برترین تکنیک های گشایش',
    'مصاحبه جدید با نفر اول شطرنج جهان',
  ][index],
  action: ['مشاهده محصول', 'بررسی دوره آموزشی', 'مشاهده خبر '][index],
  href: ['/', '/', '/'][index],
  image: _mock.image.cover(index),
}));

// ----------------------------------------------------------------------

export const _appProduct = [...Array(5)].map((_, index) => ({
  id: uuidv4(),
  name: [
    'کتاب تدوین برنامه استراتژیک',
    'صحفه شطرنج چوبی اطلس',
    'کتاب گشایش بابی فیشر',
    'صحفه شطرنج منبت کاری شده',
    'مهره های شطرنج',
  ][index],
  rating: `${_mock.number.rating(index)}`,
  price: ['۴۰۰,۰۰۰', '۱۰۰,۰۰۰', '۲,۰۰۰,۰۰۰', '۲,۰۰۰,۰۰۰', '۲,۰۰۰,۰۰۰'][index],
  offPrice: ['۵۰۰،۰۰۰', undefined, undefined, '۵۰۰،۰۰۰', '۵۰۰،۰۰۰'][index],
  offPercent: ['۲%', undefined, undefined, '۵٪', '۱۰٪'][index],

  image: _mock.image.cover(index),
  type: 'product',
}));

// ----------------------------------------------------------------------

export const _appCourses = [...Array(5)].map((_, index) => ({
  id: uuidv4(),
  name: [
    '۹۹ استراتژی شطرنج',
    'آموزش شطرنج برای کودکان',
    'آموزش راز های اساتید بزرگ شطرنج در ۷۷ کشور جهان',
    'آموزش حرفه ای گشایش',
    'آموزش تکنیک های حرفه ای شطرنج',
  ][index],
  teacher: ['حسین خزانی', 'محمد علیدوست', 'پاشا خاورانی', 'حسن باعی', 'علی نعمتی'][index],
  participant: ['۲۲۴', '۱۲۳', '۶۵', '۳۴', '۲۳'][index],
  duration: ['۰۲:۲۳:۱۱', '۰۲:۲۳:۱۱', '۰۲:۲۳:۱۱', '۰۲:۲۳:۱۱', '۰۲:۲۳:۱۱'][index],
  rating: `${_mock.number.rating(index)}`,
  price: ['۴۰۰,۰۰۰', '۱۰۰,۰۰۰', '۲,۰۰۰,۰۰۰', '۲,۰۰۰,۰۰۰', '۲,۰۰۰,۰۰۰'][index],
  offPrice: ['۵۰۰،۰۰۰', undefined, undefined, '۵۰۰،۰۰۰', '۵۰۰،۰۰۰'][index],
  offPercent: ['۲%', undefined, undefined, '۵٪', '۱۰٪'][index],

  image: _mock.image.cover(index),
  type: 'course',
}));

// ----------------------------------------------------------------------

export const _appNews = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: [
    'مسابقه قهرمانی جهان در شطرنج آغاز شد',
    'بازیکن برتر جوانان در مسابقات شطرنج معرفی شد',
    'تیم ملی شطرنج کشور در رده برتر قرار گرفت',
    'بازیکنان برتر جهان در مسابقات شطرنج حاضر خواهند شد',
    'شطرنج در میان مردم رواج یافته و پرطرفدار شده است',
  ][index],
  description: [
    'مسابقه قهرمانی جهان در شطرنج با حضور بازیکنان برتر جهان آغاز شد. در این مسابقه، بهترین بازیکنان شطرنج جهان به مبارزه با یکدیگر می‌پردازند.',
    'در مسابقات شطرنج بین بازیکنان جوان، یک بازیکن برتر معرفی شد. او با عملکرد برتر خود توانست عنوان قهرمانی را به دست آورد.',
    'تیم ملی شطرنج کشور موفق شد در رده برتر تیم‌های جهان قرار گیرد. این تیم با عملکرد برتر خود توانست جایگاه برتری را به دست آورد.',
    'بازیکنان برتر شطرنج جهان در مسابقات بزرگی که بزودی برگزار خواهد شد، حضور خواهند داشت. این مسابقات منجر به رقابتی سخت و جذاب بین بهترین بازیکنان جهان خواهد شد.',
    'شطرنج به عنوان یک بازی ذهنی و استراتژیک، در میان مردم رواج یافته و پرطرفدار شده است. این بازی توانسته است بازیکنان بسیاری را به خود جذب کند و محبوبیت بالایی را به دست آورد.',
  ][index],
  time: ['۴ روز قبل', '۴ روز قبل', '۴ روز قبل', '۴ روز قبل', '۴ روز قبل'][index],
  image: _mock.image.cover(index),
}));

// ----------------------------------------------------------------------

export const _appTestimonials = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  description: [
    'این سایت فروشگاهی و دوره آموزشی شطرنج واقعاً عالی است! من تا به حال بهترین منابع آموزشی را در اینجا پیدا کرده‌ام.',
    'من از این سایت برای خرید محصولات شطرنجی استفاده کردم و بسیار راضی بودم. کیفیت محصولات بسیار بالا بود و خدمات مشتریان عالی بود.',
    'دوره‌های آموزشی شطرنج این سایت بسیار جذاب و آموزنده هستند. من توانستم مهارت‌هایم را بهبود ببخشم و به یک بازیکن بهتر تبدیل شوم.',
    'سایت فروشگاهی اینجا واقعاً تنوع بسیاری از محصولات شطرنجی را دارد. من همیشه اینجا را به دوستانم توصیه می‌کنم.',
    'من عاشق این سایت هستم! دوره‌های آموزشی بسیار حرفه‌ای و کاربردی هستند و محصولات فروشگاهی نیز با کیفیت عالی عرضه می‌شوند.',
  ][index],
  name: ['مینا احدی', 'حسین حسنزاده', 'محمد صنوبری', 'بهزاد واعظی', 'علی سلیمی'][index],
  rating: _mock.number.rating(index).toString(),
  image: _mock.image.cover(index),
}));
