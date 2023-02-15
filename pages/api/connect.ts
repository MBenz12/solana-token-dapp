// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { walletAddress, userId } = req.body;
    // need to store in the db (update or create)

    res.status(200).json("success")
}
