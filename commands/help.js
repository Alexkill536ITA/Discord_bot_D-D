/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const globals_var = require('../script/globals_var.js');

module.exports = {
    name: 'help',
    description: "Lista Comandi",
    async execute(client, message, args){
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == "Infinity Dice");
        if (args[0] == "id") {
            Container.setColor([255, 0, 0])
                .setTitle('Help ID')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&id** \n\ninvia in chat privata il proprio ID Discord');
            message.channel.send(Container);
        } else if (args[0] == "avatar") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Avatar')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&avatar** [@utente] \n\ninvia in chat il la foto profilo di Discord.\n Se si vuole ottenere la foto profilo di un mebro basta merzionarlo nell \n campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "roll") {
            Container.setColor([255, 0, 0])
                .setTitle(`Help Roll`)
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi **&roll** Es:[1d20+5] \n\nRoll fa un tiro di dadi a tua scelta');        
                message.channel.send(Container);
        } else if (args[0] == "pg") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pg')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&pg** [@utente][ID_Scheda] \n\nMostra la scheda personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "pglist") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pglist')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&pglist** [@utente] \n\nMostra le schede di un utente\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "pginventario") {
            Container.setColor([255, 0, 0])
                .setTitle('Help PgInventario')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&pginventario** [@utente][ID_Scheda] \n\nMostra l\'inventario del personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "money") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Money')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&money** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire denaro inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "milestone") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Milestone')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&milestone** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire milestone inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "oggetto") {
            Container.setColor([255, 0, 0])
                .setTitle('Help oggetto')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **&oggetto** [Id/Nome] \n\n Mostra le informazioni dell\'oggetto\n Per ricercare uno oggetto inserire [Id/Nome]');
            message.channel.send(Container);
        } else if (args[0] == "meteo") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help meteo')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi: **&meteo** \n\n Mostra il meteo giornaliero');
                message.channel.send(Container);
        } else if (args[0] == "pgoggetto") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgoggetto')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **&pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire Id Scheda [ID_Scheda]\n Quantità in [Quantità]\n Inserire Id o Nome completo dell\'oggetto [Id/Nome oggetto]');
            message.channel.send(Container);
        } else if (args[0] == "pgcustom") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgcustom')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **&pgcustom** [Opzione][ID_Scheda][Quantità][Sincronia][Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire Id Scheda [ID_Scheda]\n Quantità in [Quantità]\n Inseire Si/No [Sincronia]\n Inserire Nome completo dell\'oggetto [Nome oggetto]');
            message.channel.send(Container);
        } else {
            Container.setColor([255, 0, 0])
                .setTitle('Lista comandi')
                .setThumbnail(botavatar.displayAvatarURL())
                .addField(":question: Help :question:",'• **help** [comando]')
                .addField("👤 Utente 👤",'• **id**\n• **avatar** [@utente]')
                .addField("🟡 PG 🟡",'• **pg** [@utente][ID_Scheda]\n • **pglist** [@utente]\n • **pginventario** [@utente][ID_Scheda]\n • **money** [Opzione][Valore][ID_Scheda]\n • **milestone** [Opzione][Valore][ID_Scheda]\n • **oggetto** [Id/Nome]\n • **pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome]\n • **pgcustom** [Opzione][ID_Scheda][Quantità][Sincronia][Nome]')
                .addField("🧰 Tools 🧰",'• **roll** Es:[1d20+5]\n ')
                .setFooter("Bot by Alexkill ITA#3593", "https://cdn.discordapp.com/avatars/188587744140853251/7b4f42c2dd6de8acf3dccfc694e35b9f.webp");
            message.channel.send(Container);
        }
    }
}