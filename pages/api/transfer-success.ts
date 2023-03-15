// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery, { findByUserId } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../discord-bot/bot';
import { getBalance } from './connect';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { userId, targetUserId, amount } = req.body;
    const user = findByUserId(userId);
    const targetUser = findByUserId(targetUserId);
    if (!user || !targetUser) return res.status(500).json("Failed");

    const thanos = await client.users.fetch(userId);
    const targetThanos = await client.users.fetch(targetUserId);

    await thanos.send(`You sent ${amount} to <@${targetThanos.id}>\nBalance: ${await getBalance(user.walletAddress)}`);
    await targetThanos.send(`${amount} received from <@${thanos.id}>\nBalance: ${await getBalance(targetUser.walletAddress)}`);

    res.status(200).json("success")
}
