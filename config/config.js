const env = process.env.NODE_ENV || 'development';

const serverConfig = {
    development: {
        port: process.env.PORT || 8000,
        dbURL: 'mongodb+srv://admin:admin123@cluster0.nca11.mongodb.net/nafta-app-db',
        authCookieName: 'x-auth-token'
    },
    production: {}
};

export default serverConfig[env];