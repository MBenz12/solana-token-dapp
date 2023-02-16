// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../discord-bot/bot';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { userId, targetUserId, amount } = req.body;

    const thanos = await client.users.fetch(userId);
    const targetThanos = await client.users.fetch(targetUserId);
    await thanos.send(`You sent ${amount} to <@${targetThanos.id}>`);
    await targetThanos.send(`${amount} received from <@${thanos.id}>`);

    res.status(200).json("success")
}
