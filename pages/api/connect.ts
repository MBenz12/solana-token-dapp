// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {

    const body = JSON.parse(req.body);
    const { walletAddress, userId } = body;

    await excuteQuery({
        query: `INSERT INTO wallets (user_id, wallet_address) VALUES(?, ?) ON DUPLICATE KEY UPDATE user_id=VALUES(user_id), wallet_address=VALUES(wallet_address)`,
        values: [userId, walletAddress],
    });

    res.status(200).json("success")
}
