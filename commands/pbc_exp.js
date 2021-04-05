/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const { MongoClient } = require("mongodb");
const Discord = require('discord.js');
const methodDB = require("../mongodb_controll");
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'PBC_Chat',
    description: "Aggiungi Exp PBC_Chat",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute add PBC_Chat');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (message.content.length >= 120) {
                var Scheda = await get_Scheda_pg(message.author.id);
                var Scheda_PG = Scheda[0];
                if (Scheda_PG == 1) {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Richiesta di: ${message.author.username}`)
                        .setTitle('Errore Scheda PG non trovata');
                    message.channel.send(Container);
                    return 1;
                }

                var fine_settimana = 0;
                var ultima_asseganzione = Scheda_PG["Pbc_frag"]["Data"];
                var exp_attuale = Scheda_PG["Pbc_frag"]["Frammento"];
                if (ultima_asseganzione == 0) {
                    
                }
            }
        }
    }
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbylistpg(id_serach);
    } else {
        return 1;
    }
    return cursor;
}
