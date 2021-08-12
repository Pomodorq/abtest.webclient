export const server =
  process.env.REACT_APP_ENV === 'production' ? '' : 'http://localhost:6178';

export const webAPIUrl = `${server}/api`;
