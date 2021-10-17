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
const Pagination = require('discord-paginationembed');
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'pgcompetenze',
    description: "motra Competenze pg",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute show_competenze');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        try {
            if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
                var colrs_set = clor_gen.rand_Color();
                if (args[0]) {
                    var autore = message.mentions.users.first();
                    try {
                        // if (args[1] && args[1].length == 24) {
                        var on_sevice_db = await methodDB.open_db();
                        if (on_sevice_db != 1) {
                            // var id_discord = args[1].replace('<@!', '');
                            // id_discord = id_discord.replace('>', '');
                            methodDB.settab_db("Schede_PG");
                            // const cursor = methodDB.load_pg(autore.id, id_discord);
                            const cursor = methodDB.load_pg(autore.id);
                            cursor.then(function (result) {
                                if (result != null) {
                                    var js_result = JSON.stringify(result);
                                    js_result = JSON.parse(js_result);
                                    var obj_N = JSON.stringify(js_result['Competenze']);
                                    if (obj_N.length > 2) {
                                        obj_N = JSON.parse(obj_N);
                                        const obj_k = Object.keys(obj_N);
                                        var i = 0;
                                        var j = 0;
                                        var x = 0;
                                        var obj_string = [];
                                        for (var i in obj_k) {
                                            obj_string[j] += 'Competenza: ' + obj_N[obj_k[i]]['Nome'];
                                            obj_string[j] = obj_string[j].replace("undefined", "");
                                            x++
                                            if (x == 5) {
                                                x = 0;
                                                j++
                                            }
                                        }
                                        const embeds = [];
                                        for (let i = 0; i <= obj_string.length; i++) {
                                            embeds.push(new Discord.MessageEmbed().addField('Pagine', i, true));
                                        }
                                        if (js_result['Avatar'] == "Non Assegnata" || js_result['Avatar'] == undefined) {
                                            var avatar = autore.displayAvatarURL();
                                        } else {
                                            var avatar = js_result['Avatar'];
                                        }
                                        const Embeds = new Pagination.Embeds()
                                            .setArray(embeds)
                                            .setAuthorizedUsers([message.author.id])
                                            .setChannel(message.channel)
                                            .setPageIndicator(false)
                                            .setColor(colrs_set)
                                            .setTitle('📜 Scheda Inventario: ' + autore.username)
                                            .setThumbnail(avatar, true)
                                            .addField("N:", obj_string.length, true)
                                            .addField("🆔 Scheda", js_result['_id'], true)
                                            .addField("📝 Nome", js_result['Nome_PG'])
                                            .addField("📄 Competenze", obj_string[0])
                                            .setDisabledNavigationEmojis(['all'])
                                            .setDeleteOnTimeout(false)
                                            .setFunctionEmojis({
                                                '◀️': (_, instance) => {
                                                    for (const embed of instance.array) {
                                                        var e = embed.fields[0].value;
                                                        e--;
                                                        if (e >= 0) {
                                                            embed.fields[0].value = e;
                                                            embed.fields[5].value = obj_string[e];
                                                        }
                                                    }
                                                },
                                                '▶️': (_, instance) => {
                                                    for (const embed of instance.array) {
                                                        var e = embed.fields[0].value;
                                                        e++;
                                                        if (e < embed.fields[1].value) {
                                                            embed.fields[0].value = e;
                                                            embed.fields[5].value = obj_string[e];
                                                        }
                                                    }
                                                }
                                            });
                                        // Debug embeds function
                                        // .on('start', () => console.log('Started!'))
                                        // .on('finish', (user) => console.log(`Finished! User: ${user.username}`))
                                        // .on('react', (user, emoji) => console.log(`Reacted! User: ${user.username} | Emoji: ${emoji.name} (${emoji.id})`))
                                        // .on('expire', () => console.warn('Expired!'))
                                        // .on('error', console.error);
                                        Embeds.build();
                                    } else {
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(colrs_set)
                                            .setTitle('📜 Scheda Inventario: ' + autore.username)
                                            .setThumbnail(autore.displayAvatarURL(), true)
                                            .addField("🆔 Scheda", js_result['_id'])
                                            .addField("📝 Nome", js_result['Nome_PG'],)
                                            .addField("📄 Competenze", "Vuoto");
                                        message.channel.send(Container);
                                    }
                                } else {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Scheda non trovata');
                                    message.channel.send(Container);
                                }
                            });
                        }
                    } catch {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando Competenze`)
                            // .setTitle('Sintassi **' + config.prefix + 'pgCompetenze** [@utente][ID_Scheda]');
                            .setTitle('Sintassi **' + config.prefix + 'pgCompetenze** [@utente]');
                        message.channel.send(Container);
                    }
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando Competenze`)
                        .setTitle('Sintassi **' + config.prefix + 'pgCompetenze** [@utente]');
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autorizzato a usare questo comando');
                message.channel.send(Container);
            }
        } catch (error) {
            if (message.author.bot) {
                message.delete()
                return;
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autorizzato a usare questo comando');
                message.channel.send(Container);
                console.log(error);
            }
        }
    }
}