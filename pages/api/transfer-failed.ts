// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../discord-bot/bot';
import { getBalance } from './connect';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { userId, targetUserId, amount } = req.body;
    const result = await excuteQuery({
        query: `SELECT wallet_address FROM wallets WHERE user_id=?`,
        values: [userId, targetUserId],
    }) as any;
    const thanos = await client.users.fetch(userId);
    const targetThanos = await client.users.fetch(targetUserId);

    await thanos.send(`Failed to transfer ${amount} to <@${targetThanos.id}>\nBalance: ${await getBalance(result[0])}: ${result}`);
    // await targetThanos.send(`${amount} received from <@${thanos.id}>\nBalance: ${await getBalance(result[1])}`);

    res.status(200).json("success")
}
