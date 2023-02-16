// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../discord-bot/bot';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { userId, targetUserId, amount } = req.body;

    const thanos = client.users.fetch(targetUserId);
    const targetThanos = client.users.fetch(userId);
    thanos.then(async (user) => {
        await user.send(`You sent ${amount} to ${(await targetThanos).id}`);
    }).catch(async () => {
        console.log("Error")
    });
    targetThanos.then(async (user) => {
        await user.send(`${amount} received from ${await (await thanos).id}`);
    }).catch(async () => {
        console.log("Error")
    });

    res.status(200).json("success")
}
