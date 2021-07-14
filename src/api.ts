import ky from 'ky';

const api = ky.create({ prefixUrl: process.env.REACT_APP_BASEURL })

export default api;