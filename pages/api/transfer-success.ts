// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../discord-bot/bot';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {

    const body = JSON.parse(req.body);
    const { userId, targetUserId, amount } = body;

    const thanos = client.users.fetch(targetUserId);
    const targetThanos = client.users.fetch(userId);
    thanos.then(async (user) => {
        await user.send(`You sent ${amount} to ${targetUserId}`);
    }).catch(async () => {
        console.log("Error")
    });
    targetThanos.then(async (user) => {
        await user.send(`${amount} received from ${userId}`);
    }).catch(async () => {
        console.log("Error")
    });

    res.status(200).json("success")
}
