// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db';
import client from '../../discord-bot/bot';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { walletAddress, userId } = req.body;

    await excuteQuery({
        query: `INSERT INTO wallets (user_id, wallet_address) VALUES(?, ?) ON DUPLICATE KEY UPDATE user_id=VALUES(user_id), wallet_address=VALUES(wallet_address)`,
        values: [userId, walletAddress],
    });
    const thanos = client.users.fetch(userId);
    thanos.then(async (user) => {
        await user.send(`You connected wallet: ${walletAddress}`);
    }).catch(async () => {
        console.log("Error")
    });
    res.status(200).json("success")
}
