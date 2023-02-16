// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db';
import client from '../../discord-bot/bot';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { walletAddress, userId } = req.body;

    const resultQuery = await excuteQuery({
        query: `SELECT * FROM wallets WHERE user_id=?`,
        values: [userId]
    })

    const thanos = await client.users.fetch(userId);

    if (resultQuery.length === 0) {
        await excuteQuery({
            query: `INSERT INTO wallets (user_id, wallet_address) VALUES(?, ?)`,
            values: [userId, walletAddress],
        });
        thanos.send(`You connected wallet: ${walletAddress}`);
    } else {
        await excuteQuery({
            query: `UPDATE wallets SET wallet_address=? WHERE user_id=?`,
            values: [walletAddress, userId],
        });
        thanos.send(`You updated wallet: ${walletAddress}`);
    }
    res.status(200).json("success")
}
