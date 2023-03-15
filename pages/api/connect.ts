// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addUser } from '@/lib/db';
import client from '../../discord-bot/bot';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { SOLANA_MAINNET_RPC_URL, SPL_TOKEN_ADDRESS } from '@/config';
import { getAssociatedTokenAddress } from '@solana/spl-token';

export const getBalance = async (walletAddres: string) => {
    const connection = new Connection(SOLANA_MAINNET_RPC_URL, "confirmed");
    try {
        if (SPL_TOKEN_ADDRESS) {
            const ata = await getAssociatedTokenAddress(new PublicKey(SPL_TOKEN_ADDRESS), new PublicKey(walletAddres));
            const { value: { uiAmountString } } = await connection.getTokenAccountBalance(ata);
            return uiAmountString;
        } else {
            const balance = await connection.getBalance(new PublicKey(walletAddres));
            console.log(walletAddres);
            return (balance / LAMPORTS_PER_SOL).toLocaleString('en-us', { maximumFractionDigits: 3 });
        }    
    } catch (error) {
        return 0;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    const { walletAddress, userId } = req.body;
    const thanos = await client.users.fetch(userId);
    addUser(userId, walletAddress);
    await thanos.send(`You connected wallet: ${walletAddress}\nBalance: ${await getBalance(walletAddress)}`);
    res.status(200).json("success")
}
