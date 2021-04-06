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

                if (Scheda_PG["Pbc_frag"]["Data"] === undefined) {
                    reset_frag(message, Scheda_PG);
                } else {
                    var settimana_valida = getWeekNumber(new Date());
                    var ultima_asseganzione = getWeekNumber(Scheda_PG["Pbc_frag"]["Data"]);
                    var frammenti_attuale = Scheda_PG["Pbc_frag"]["Frammento"];
                    var Exp_get_attuale = Scheda_PG["Pbc_frag"]["Exp_get"];
                    if (ultima_asseganzione[0] == settimana_valida[0]) {
                        if (Exp_get_attuale < 2) {
                            add_exp_frag(message, frammenti_attuale, Exp_get_attuale, Scheda_PG);
                        } else {
                            return 1;
                        }
                    } else {
                        reset_frag(message, Scheda_PG);
                    }
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

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
    // var result = getWeekNumber(new Date());
    // console.log('It\'s currently week ' + result[1] + ' of ' + result[0]);
}

function add_exp_frag(message, frammenti, exp, Scheda_PG) {
    var ogg_temp = {};
    frammenti = frammenti + 1;
    if (frammenti == 100) {
        exp = exp + 1;
        frammenti = 0;

        ogg_temp['Exp_get'] = exp;
        ogg_temp['Frammento'] = frammenti;
        ogg_temp['Data'] = new Date();

        var exp_value = Scheda_PG.Exp;
        exp_value = exp_value + 1;
        methodDB.settab_db("Schede_PG");
        methodDB.exp_update(Scheda_PG._id, exp_value);
        var level = LevelUP_auto(message, message.author.id, Scheda_PG._id, exp_value);
        methodDB.inventory_pbc_frag(Scheda_PG._id, ogg_temp);

        var colrs_set = clor_gen.rand_Color();
        Container = new Discord.MessageEmbed();
        Container.setColor(colrs_set)
            .setTitle('Scheda: ' + level)
            .setThumbnail(message.author.displayAvatarURL(), true)
            .addField("Livello: ", Scheda_PG.Livello)
            .addField("Milestone ottenute: ", exp_value)
            .setTimestamp()
            .setFooter("Data", message.author.displayAvatarURL());
        message.channel.send(Container);

    } else {
        ogg_temp['Exp_get'] = exp;
        ogg_temp['Frammento'] = frammenti;
        ogg_temp['Data'] = new Date();
        methodDB.settab_db("Schede_PG");
        methodDB.inventory_pbc_frag(Scheda_PG._id, ogg_temp);
    }
}

function reset_frag(message, Scheda_PG) {
    var ogg_temp = {};
    ogg_temp['Exp_get'] = 0;
    ogg_temp['Frammento'] = 1;
    ogg_temp['Data'] = new Date();
    methodDB.settab_db("Schede_PG");
    methodDB.inventory_pbc_frag(Scheda_PG._id, ogg_temp);
}

function LevelUP_auto(message, id_discord, id, exp) {
    if (exp >= 0 && exp < 3) {
        methodDB.level_update(id, 3);           // 0
        Manager_role_level(message, id_discord, config.Level["Rame"])
        return 3;
    } else if (exp >= 3 && exp < 7) {
        methodDB.level_update(id, 4);           // 4
        Manager_role_level(message, id_discord, config.Level["Rame"])
        return 4;
    } else if (exp >= 7 && exp < 12) {
        methodDB.level_update(id, 5);           // 9
        Manager_role_level(message, id_discord, config.Level["Rame"])
        return 5;
    } else if (exp >= 12 && exp < 18) {
        methodDB.level_update(id, 6);           // 15
        Manager_role_level(message, id_discord, config.Level["Bronzo"])
        return 6;
    } else if (exp >= 18 && exp < 25) {
        methodDB.level_update(id, 7);           // 22
        Manager_role_level(message, id_discord, config.Level["Bronzo"])
        return 7;
    } else if (exp >= 25 && exp < 33) {
        methodDB.level_update(id, 8);           // 30
        Manager_role_level(message, id_discord, config.Level["Ferro"])
        return 8;
    } else if (exp >= 33 && exp < 42) {
        methodDB.level_update(id, 9);           // 39
        Manager_role_level(message, id_discord, config.Level["Ferro"])
        return 9;
    } else if (exp >= 42 && exp < 51) {
        methodDB.level_update(id, 10);          // 48
        Manager_role_level(message, id_discord, config.Level["Argento"])
        return 10;
    } else if (exp >= 51 && exp < 61) {
        methodDB.level_update(id, 11);          // 58
        Manager_role_level(message, id_discord, config.Level["Argento"])
        return 11;
    } else if (exp >= 61 && exp < 72) {
        methodDB.level_update(id, 12);          // 69
        Manager_role_level(message, id_discord, config.Level["Electrum"])
        return 12;
    } else if (exp >= 72 && exp < 83) {
        methodDB.level_update(id, 13);          // 81
        Manager_role_level(message, id_discord, config.Level["Electrum"])
        return 13;
    } else if (exp >= 83 && exp < 95) {
        methodDB.level_update(id, 14);          // 93
        Manager_role_level(message, id_discord, config.Level["Oro"])
        return 14;
    } else if (exp >= 95 && exp < 108) {
        methodDB.level_update(id, 15);          // 106
        Manager_role_level(message, id_discord, config.Level["Oro"])
        return 15;
    } else if (exp >= 108 && exp < 122) {
        methodDB.level_update(id, 16);          // 120
        Manager_role_level(message, id_discord, config.Level["Platino"])
        return 16;
    } else if (exp >= 122 && exp < 137) {
        methodDB.level_update(id, 17);          // 135
        Manager_role_level(message, id_discord, config.Level["Platino"])
        return 17;
    } else if (exp >= 137 && exp < 153) {
        methodDB.level_update(id, 18);          // 151
        Manager_role_level(message, id_discord, config.Level["Mithril"])
        return 18;
    } else if (exp >= 153 && exp < 172) {
        methodDB.level_update(id, 19);          // 168
        Manager_role_level(message, id_discord, config.Level["Mithril"])
        return 19;
    } else if (exp >= 182) {
        methodDB.level_update(id, 20);          // 185
        Manager_role_level(message, id_discord, config.Level["Adamantio"])
        return 20;
    }
}

function Manager_role_level(message, id_discord, level_select) {
    let member = message.guild.members.cache.get(id_discord);
    let Role_select = message.guild.roles.cache.get(level_select)
    if (!member.roles.cache.some(role => role === Role_select)) {
        for (index in config.Level) {
            let Role = message.guild.roles.cache.get(config.Level[index]);
            if (member.roles.cache.some(role => role === Role)) {
                member.roles.remove(Role).catch(console.error);
            }
        }
        member.roles.add(Role_select).catch(console.error);
    }
}