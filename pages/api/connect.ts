// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import excuteQuery from '../../lib/db';
import client from '../../discord-bot/bot';
import { Connection, PublicKey } from '@solana/web3.js';
import { SOLANA_MAINNET_RPC_URL, SPL_TOKEN_ADDRESS } from '@/config';
import { getAssociatedTokenAddress } from '@solana/spl-token';

export const getBalance = async (walletAddres: string) => {
    const connection = new Connection(SOLANA_MAINNET_RPC_URL, "confirmed");
    const ata = await getAssociatedTokenAddress(new PublicKey(SPL_TOKEN_ADDRESS), new PublicKey(walletAddres));
    const { value: { uiAmountString } } = await connection.getTokenAccountBalance(ata);
    return uiAmountString;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { walletAddress, userId } = req.body;

    const resultQuery = await excuteQuery({
        query: `SELECT * FROM wallets WHERE user_id=?`,
        values: [userId]
    }) as any;

    const thanos = await client.users.fetch(userId);

    if (resultQuery && resultQuery.length === 0) {
        await excuteQuery({
            query: `INSERT INTO wallets (user_id, wallet_address) VALUES(?, ?)`,
            values: [userId, walletAddress],
        });
    } else {
        await excuteQuery({
            query: `UPDATE wallets SET wallet_address=? WHERE user_id=?`,
            values: [walletAddress, userId],
        });
    }
    await thanos.send(`You connected wallet: ${walletAddress}\nBalance: ${await getBalance(walletAddress)}`);
    res.status(200).json("success")
}
