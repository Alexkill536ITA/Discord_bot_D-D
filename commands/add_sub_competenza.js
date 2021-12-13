/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const { MongoClient, Cursor } = require("mongodb");
const Discord = require('discord.js');
const methodDB = require("../mongodb_controll");
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'competenza',
    description: "Aggiungi o togli pgcompetenze",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute add_sub_competenze');
        }
        var Container = new Discord.MessageEmbed();
        // let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        try {
            if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
                if (args[2]) {
                    var nome = args[2];
                    for (let index = 3; index < args.length; index++) {
                        nome += " " + args[index];
                    }
                    nome = String(nome).toLowerCase();
                    var on_sevice_db = await methodDB.open_db();
                    if (on_sevice_db != 1) {
                        methodDB.settab_db("Lista_Competenze");
                        var cursor = methodDB.serachbynome_obj(nome);
                        cursor.then(async function (result) {
                            if (result) {
                                if (result == null) {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Talento non trovato');
                                    message.channel.send(Container);
                                    return 1;
                                } else {
                                    if (args[1]) {
                                        try {
                                            var autore = message.mentions.users.first();
                                            // var Scheda = await get_Scheda_pg(args[1]);
                                            var Scheda = await get_Scheda_pg(autore.id);
                                            if (Scheda != null) {
                                                var complete = add_sub(message, args, Scheda, result);
                                                if (complete == 1) {
                                                    emit_print(message);
                                                    return 1;
                                                } else {
                                                    return 0;
                                                }
                                            } else {
                                                Container.setColor([255, 0, 0])
                                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                                    .setTitle('Errore Scheda PG non trovata');
                                                message.channel.send(Container);
                                                return 1;
                                            }
                                        } catch {
                                            emit_print(message);
                                            return 1;
                                        }
                                    } else {
                                        emit_print(message);
                                        return 1;
                                    }
                                }
                            } else {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Oggetto non trovato');
                                message.channel.send(Container);
                            }
                        });
                    }
                } else {
                    emit_print(message);
                    return 1;
                }

            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autorizzato a usare questo comando');
                message.channel.send(Container);
            }
        } catch (error) {
            console.log(error);
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
}

function add_sub(message, args, Scheda_PG, result) {
    var colrs_set = clor_gen.rand_Color();
    if (args[0] == "add" || args[0] == "-a") {
        var nome_var = result.nome;
        var talento_pg = Scheda_PG['Competenze'];
        var check_nam = talento_pg[nome_var];
        let member = message.guild.members.cache.get(Scheda_PG['Nome_Discord']);
        if (Scheda_PG['Avatar'] == "Non Assegnata" || Scheda_PG['Avatar'] == undefined) {
            var avatar = member.user.displayAvatarURL();
        } else {
            var avatar = Scheda_PG['Avatar'];
        }
        if (check_nam !== undefined) {
            Container = new Discord.MessageEmbed();
            Container.setColor(colrs_set)
                .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                .setThumbnail(avatar, true)
                .addField("Competenza", "Già in Possesso")
                .setTimestamp()
                .setFooter("Data", message.author.displayAvatarURL());
        } else {
            var talento = {};
            talento[nome_var] = nome_var;
            Object.assign(talento_pg, talento);
            Container = new Discord.MessageEmbed();
            Container.setColor(colrs_set)
                .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                .setThumbnail(avatar, true)
                .addField("Competenza", nome_var)
                .setTimestamp()
                .setFooter("Data", message.author.displayAvatarURL());
        }
        methodDB.competenze_update(Scheda_PG['_id'], talento);
        message.channel.send(Container);
    } else if (args[0] == "sub" || args[0] == "-s") {
        var nome_var = result.nome;
        var talento_pg = Scheda_PG['Competenze'];
        var check_nam = talento_pg[nome_var];
        let member = message.guild.members.cache.get(Scheda_PG['Nome_Discord']);
        if (Scheda_PG['Avatar'] == "Non Assegnata" || Scheda_PG['Avatar'] == undefined) {
            var avatar = member.user.displayAvatarURL();
        } else {
            var avatar = Scheda_PG['Avatar'];
        }
        if (check_nam !== undefined) {
            Container = new Discord.MessageEmbed();
            Container.setColor(colrs_set)
                .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                .setThumbnail(avatar, true)
                .addField("Competenza", "Non possiedi questo Competenza")
                .setTimestamp()
                .setFooter("Data", message.author.displayAvatarURL());
        } else {
            delete talento_pg[nome_var];
            Container = new Discord.MessageEmbed();
            Container.setColor(colrs_set)
                .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                .setThumbnail(avatar, true)
                .setDescription("Non possiedi più la Competenza")
                .addField("Competenza", nome_var)
                .setTimestamp()
                .setFooter("Data", message.author.displayAvatarURL());
        }
        methodDB.competenze_update(Scheda_PG['_id'], talento_pg);
        message.channel.send(Container);
    } else {
        return 1;
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Competenza`)
        // .setTitle('Sintassi:\n **' + config.prefix + 'competenza** [Opzione][ID_Scheda][Id/Nome Competenza]');
        .setTitle('Sintassi:\n **' + config.prefix + 'competenza** [Opzione][@utente][Id/Nome Competenza]');
    message.channel.send(Container);
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        // var cursor = methodDB.serachbyid(id_serach);
        var cursor = methodDB.load_pg(id_serach);
    } else {
        return 1;
    }
    return cursor;
}