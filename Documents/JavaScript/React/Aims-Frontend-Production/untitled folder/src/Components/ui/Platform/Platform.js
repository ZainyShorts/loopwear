import UAParser from 'ua-parser-js';

export const detectPlatform = (userAgent) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  if (result.device.type === 'mobile') {
    if (result.os.name === 'iOS') {
      return 'IOS';
    } else if (result.os.name === 'Android') {
      return 'Android';
    }
  }
  return 'Web';
};