/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        'MYSQL_HOST': 'localhost',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': "discord-bot",
        'MYSQL_USER': "root",
        'MYSQL_PASSWORD': "root",

        'BOT_TOKEN': 'MTA3NDcxMDkwNDYxNDE2NjU1OA.GUhc3I.PtsxxmGzEC8x-sC6BfTCkSvsukOlovMzA1dEOk',
        'CLIENT_ID': '1074710904614166558',
        'GUILD_ID': '980666668802007080',

        'DOMAIN': 'http://localhost:3000',
    }
}

module.exports = nextConfig
