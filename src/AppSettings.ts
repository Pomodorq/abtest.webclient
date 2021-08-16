export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://abtest-backend.azurewebsites.net'
    : 'http://localhost:6178';

export const webAPIUrl = `${server}/api`;
