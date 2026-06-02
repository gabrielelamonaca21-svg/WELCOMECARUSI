const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        // --- CONFIGURAZIONE ID ---
        // Sostituisci i numeri qui sotto con gli ID reali del tuo server
        const welcomeChannelId = 1490564270599966810; 
        const sectionChannelId = 1464003262523900140; 
        // -------------------------

        // Trova il canale di benvenuto nel server
        const channel = member.guild.channels.cache.get(welcomeChannelId);
        
        // Se il canale non esiste o il bot non ha i permessi, si ferma per evitare errori
        if (!channel) return;

        // Invia il messaggio personalizzato
        // <#ID> serve a Discord per creare il link cliccabile al canale
        await channel.send(`Benvenuto ${member} nel dark alcool, richiedi la tua sezione in <#${sectionChannelId}>`);
    },
};
