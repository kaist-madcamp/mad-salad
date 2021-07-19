export const monthStr = [
  '',
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const dayStr = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export function dateWithDay(dateStr: string): string {
  const dateObj = new Date(dateStr);
  const day = dateObj.getDay();
  const date = dateObj.getDate();
  let dateExtension = 'th';
  if (date == 1) dateExtension = 'st';
  else if (date == 2) dateExtension = 'nd';
  else if (date == 3) dateExtension = 'rd';
  return `${dayStr[day]}, ${date}${dateExtension}`;
}

export function priceToString(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const getPaymentEnKeyName = (paymentName: string) => {
  const pName = paymentName.toLowerCase();

  if (pName.includes('카카오') || pName.includes('kakao')) {
    return 'kakao';
  } else if (pName.includes('신한') || pName.includes('shinhan')) {
    return 'shinhan';
  } else if (pName.includes('삼성') || pName.includes('samsung')) {
    return 'samsung';
  } else if (pName.includes('롯데') || pName.includes('lotte')) {
    return 'lotte';
  } else if (pName.includes('우리') || pName.includes('woori')) {
    return 'woori';
  } else if (pName.includes('현금') || pName.includes('cash')) {
    return 'cash';
  } else if (pName.includes('현대') || pName.includes('hyundai')) {
    return 'hyundai';
  } else if (pName.includes('비씨') || pName.includes('bc')) {
    return 'bc';
  } else {
    return '';
  }
};
