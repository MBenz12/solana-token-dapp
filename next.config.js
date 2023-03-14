/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        'MYSQL_HOST': 'localhost',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': "discord-bot",
        'MYSQL_USER': "root",
        'MYSQL_PASSWORD': "",

        'BOT_TOKEN': 'MTA3NDcxMDkwNDYxNDE2NjU1OA.G7LNne.qIZ70-6g2Wg3h5ZyH2Epj-sQ8B8BH8oVbC9V8k',
        'CLIENT_ID': '1074710904614166558',
        'CLIENT_SECRET': 'jULuVveC7DtjXv1XKt4H1puL2wudEbXQ',
        'GUILD_ID': '980666668802007080',

        'AUTHORIZE_URL': 'https://discord.com/api/oauth2/authorize?client_id=1074710904614166558&redirect_uri=https%3A%2F%2Fpawn.zenstudios.xyz%2Fapi%2Fdiscord%2Fcallback&response_type=code&scope=identify',

        'DOMAIN': 'http://pawn.zenstudios.xyz',

        'SPL_TOKEN_ADDRESS': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        'SOLANA_DEVNET_RPC_URL': 'https://delicate-withered-theorem.solana-devnet.quiknode.pro/0399d35b8b5de1ba358bd014f584ba88d7709bcf/',
        'SOLANA_MAINNET_RPC_URL': 'https://white-autumn-sun.solana-mainnet.quiknode.pro/8d59c3c9d2faa821cf42b0ed72596fd8c3da4d4b/',
    }
}

module.exports = nextConfig
