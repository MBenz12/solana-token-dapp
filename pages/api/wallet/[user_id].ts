// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { findByUserId } from '@/lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { user_id } = req.query;

    if (!user_id) return res.status(500).json("empty user id");

    const user = findByUserId(user_id as string);
    res.status(200).json(user?.walletAddress || '')
}
