const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');
onst token = process.env.DISCORD_TOKEN;

// Creiamo una nuova istanza del bot con i permessi necessari
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // FONDAMENTALE per rilevare i nuovi utenti!
    ],
});

// --- CODE HANDLER PER GLI EVENTI ---
// Questo pezzo di codice legge in automatico tutti i file dentro la cartella /events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Avviamo il bot usando il token nel config.json
client.login(token);
