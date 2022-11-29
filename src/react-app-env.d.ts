/// <reference types="react-scripts" />

declare module '@react-mock/localstorage'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    PUBLIC_URL: string
    REACT_APP_AUTH_BASEURL: string
    REACT_APP_API_BASEURL: string
  }
}
