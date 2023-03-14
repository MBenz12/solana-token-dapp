// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';
import DiscordOauth2 from "discord-oauth2";
import { serialize } from 'cookie';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const code = req.query.code === undefined ? "" : req.query.code.toString();

    const oauth = new DiscordOauth2();
    oauth.tokenRequest({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        code: code,
        scope: "identify",
        grantType: "authorization_code",
        redirectUri: `${process.env.DOMAIN}/api/discord/callback`,
    }).then(value => {
        const cookie = serialize("discord_access", value.access_token, {
            httpOnly: true,
            path: "/",
        });
        res.setHeader("Set-Cookie", cookie);
        res.redirect(`${process.env.DOMAIN}/connect`);
    })
}
