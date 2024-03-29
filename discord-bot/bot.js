const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const nextConfig = require("../next.config");
const commands = require("./commands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const BOT_TOKEN = nextConfig.env.BOT_TOKEN;
const CLIENT_ID = nextConfig.env.CLIENT_ID;
const GUILD_ID = nextConfig.env.GUILD_ID;
const DOMAIN = nextConfig.env.DOMAIN;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === "connect-wallet") {
      try {
        await interaction.reply(`${DOMAIN}/connect`);
      } catch (error) {
        
      }
    }
    if (interaction.commandName === "transfer") {
      const userId = interaction.user.id;
      const targetUserId = interaction.options.get("user-id").value;
      const amount = interaction.options.get("amount").value;
      try {
        await interaction.reply(
          `${DOMAIN}/transfer/${userId}/${targetUserId.slice(2, -1)}/${amount}`
        );
      } catch (error) {
        
      }
    }
  } catch (error) {
    console.log(error);
  }
});

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.login(BOT_TOKEN);

module.exports = client;
