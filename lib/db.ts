import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || '3306'),
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});

type queryProps = {
    query: string,
}

export default async function excuteQuery({ query }: queryProps) {
    try {
        await db.connect();
        const results = await db.query(query);
        console.log(results);
        await db.end();
        return results;
    } catch (error) {
        console.log(error)
        return { error };
    }
}