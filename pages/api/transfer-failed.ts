// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { findByUserId } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../discord-bot/bot';
import { getBalance } from './connect';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { userId, targetUserId, amount } = req.body;
    const user = findByUserId(userId);
    if (!user) {
        return res.status(500).json("failed");
    }
    const thanos = await client.users.fetch(userId);
    const targetThanos = await client.users.fetch(targetUserId);

    await thanos.send(`Failed to transfer ${amount} to <@${targetThanos.id}>\nBalance: ${await getBalance(user.walletAddress)}`);
    // await targetThanos.send(`${amount} received from <@${thanos.id}>\nBalance: ${await getBalance(result[1])}`);

    res.status(200).json("success")
}
