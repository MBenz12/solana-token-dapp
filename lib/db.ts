import { writeFileSync } from 'fs';
import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || ''),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});

type queryProps = {
    query: string,
    values: Array<[any]>
}

export default async function excuteQuery({ query, values }: queryProps) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}

type User = {
    userId: string,
    walletAddress: string,
};

export function findByUserId(userId: string) {
    const users: Array<User> = require("lib/data.json");
    let index = users.map(user => user.userId).indexOf(userId);
    if (index !== -1) {
        return users[index];
    }
    return null;
}

export function addUser(userId: string, walletAddress: string) {
    const users: Array<User> = require("lib/data.json");
    let index = users.map(user => user.userId).indexOf(userId);
    if (index === -1) {
        users.push({ userId, walletAddress });
    } else {
        users[index].walletAddress = walletAddress;
    }
    writeFileSync('lib/data.json', JSON.stringify(users, null, "\t"));
}