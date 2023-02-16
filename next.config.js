/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        'MYSQL_HOST': 'localhost',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': "sys",
        'MYSQL_USER': "root",
        'MYSQL_PASSWORD': "root",

        'BOT_TOKEN': 'MTAzMTM5NjQ2MDk3OTI5ODM1NA.GYwEX8.0ERN6xQN9Ph3gGnOgQDOVdwAZkGTdKtyiGRzFs',
        'CLIENT_ID': '1031396460979298354',
        'CLIENT_SECRET': '8e9JVjcRZChG3WsMi97xHUUO37BVpe06',
        'GUILD_ID': '753961498367492118',

        'DOMAIN': 'http://localhost:3000',
    }
}

module.exports = nextConfig
