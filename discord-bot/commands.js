const commands = [
    {
        name: 'connect-wallet',
        description: 'Connect Solana wallet',
    },
    {
        name: 'transfer',
        description: 'Transfer',
        options: [
            {
                name: "user-id",
                description: "User ID",
                type: 3,
                required: true
            },
            {
                name: "amount",
                description: "Amount",
                type: 3,
                required: true
            }
        ]
    },
];

module.exports = commands