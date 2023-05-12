export const port = process.env.PORT || 3000
export const debug = process.env.DEBUG === 'true'
export const environment = process.env.NODE_ENV || 'development'
export const production = process.env.NODE_ENV === 'production'
export const development = process.env.NODE_ENV !== 'production'
export const appVersion = process.env.VERSION || '0.0.0'
