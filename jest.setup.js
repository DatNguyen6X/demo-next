jest.mock('next/config', () => () => ({
    serverRuntimeConfig: {
        secret: 'JWT TOKENS'
    },
    publicRuntimeConfig: {
        apiUrl: '/api',
        youtubeDataApiKey: ''
    }
}))
