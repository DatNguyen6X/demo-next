/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: 'JWT TOKENS'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? '/api' // development api
        : '/api', // production api
    youtubeDataApiKey: 'AIzaSyD5YMssBbequ-HiMswvlYmV5qb6dcHNNFI'
  }
}
