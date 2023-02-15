// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../../lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { user_id } = req.query;

    if (!user_id) return res.status(500).json("empty user id");

    const result = await excuteQuery({
        query: `SELECT user_id, wallet_address FROM wallets WHERE user_id=?`,
        values: [user_id as any],
    });

    res.status(200).json(result)
}
