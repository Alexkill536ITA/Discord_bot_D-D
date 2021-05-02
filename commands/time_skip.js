/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const { MongoClient } = require("mongodb");
const mongo = require("mongodb");
const Discord = require('discord.js');
const methodDB = require("../mongodb_controll");
const Pagination = require('discord-paginationembed');
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'timeskip',
    description: "Event time skip",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute show_inventrory');
        }
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0] == "start") {
                if (message.member.roles.cache.some(r => config.role_admin.includes(r.name)) || message.author.id == config.owner) {
                    await connect_db("Event_config");
                    methodDB.timeskip_control_update(true);
                    var config_timeskip = await methodDB.serachbyid_obj("1");
                    if (config_timeskip != null && config_timeskip != undefined) {
                        if (config_timeskip.Event_active == false) {
                            await connect_db("Schede_PG");
                            methodDB.timeskip_pg_update(config_timeskip.Token_add, config_timeskip.Limit_avventure);
                            Container = new Discord.MessageEmbed();
                            Container.setColor([0, 255, 0])
                                .setTitle('Time Skip Start')
                                .setDescription('Time Skip Attivo')
                                .setThumbnail(botavatar.displayAvatarURL(), true)
                                .addField("Token:", config_timeskip.Token_add)
                                .addField("Data:", get_date_now())
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL());
                            message.channel.send(Container)
                            client.channels.cache.get(config_timeskip.event_chat).send(Container)
                        } else {
                            Container = new Discord.MessageEmbed();
                            Container.setColor([255, 0, 0])
                                .setAuthor(`Richiesta di: ${message.author.username}`)
                                .setTitle('Errore Timeskip Già Attivo');
                            message.channel.send(Container);
                        }
                    } else {
                        emit_print_err_internal(message);
                    }
                } else {
                    emit_print_denied(message);
                }
            } else if (args[0] == "set") {
                if (message.member.roles.cache.some(r => config.role_admin.includes(r.name)) || message.author.id == config.owner) {
                    await connect_db("Event_config");
                    var fiter_args = [
                        "event_chat",
                        "ping_role",
                        "token_add",
                        "token_value",
                        "limit_avventure",
                        "Cost_avventure_mo",
                        "Cost_talento_mo",
                        "Cost_strumenti_mo",
                        "Cost_lingue_mo",
                        "cost_ricerche_mo",
                        "Cost_avventure_token",
                        "Cost_talento_token",
                        "Cost_strumenti_token",
                        "Cost_lingue_token",
                        "Cost_ricerche_token",
                        "Cost_lavoro_token"
                    ];
                    if (fiter_args.includes(args[1])) {
                        if (args[2]) {
                            var new_value = {};
                            new_value[args[1]] = args[2];
                            methodDB.timeskip_config_update(new_value);
                            var config_timeskip = methodDB.serachbyid_obj("1");
                            if (config_timeskip != null && config_timeskip != undefined) {
                                Container = new Discord.MessageEmbed();
                                Container.setColor([0, 255, 0])
                                    .setTitle('Time Skip Config')
                                    .setDescription('')
                                    .setThumbnail(botavatar.displayAvatarURL(), true)
                                    .addField("Time skip Attive:", config_timeskip.Event_active, true)
                                    .addField("Token add:", config_timeskip.Token_add, true)
                                    .addField("Token Value to Money", config_timeskip.Token_value, true)
                                    .timestamp()
                                    .setFooter("Data", message.author.displayAvatarURL());
                                message.channel.send(Container)
                            } else {
                                emit_print_err_internal(message);
                            }
                        } else {
                            emit_print(message);
                        }
                    } else {
                        emit_print(message);
                    }
                } else {
                    emit_print_denied(message);
                }
            } else if (args[0] == "show") {
                if (message.member.roles.cache.some(r => config.role_admin.includes(r.name)) || message.author.id == config.owner) {
                    await connect_db("Event_config");
                    var config_timeskip = await methodDB.serachbyid_obj("1");
                    if (config_timeskip != null && config_timeskip != undefined) {
                        Container = new Discord.MessageEmbed();
                        Container.setColor([0, 0, 255])
                            .setTitle('Time Skip Config')
                            .setDescription('Configurazione Time Skip')
                            .setThumbnail(botavatar.displayAvatarURL(), true)
                            .addField("Time skip Attive: ", config_timeskip.Event_active)
                            .addField("Chat Event Print: ", config_timeskip.event_chat, true)
                            .addField("Ping Role: ", config_timeskip.ping_role, true)
                            .addField('\u200b', '\u200b')
                            .addField("Token add: ", config_timeskip.Token_add, true)
                            .addField("Token Value to Money", config_timeskip.Token_value, true)
                            .addField('\u200b', '**Parametri Eventi**')
                            .addField("Costo Event",
                                "**In Oro**\nAvventure mo: " + config_timeskip.config_avventure.Cost_avventure_mo +
                                "\nTalento mo: " + config_timeskip.config_talento.Cost_talento_mo +
                                "\nStrumenti mo: " + config_timeskip.config_strumenti.Cost_strumenti_mo +
                                "\nLingue mo: " + config_timeskip.config_lingua.Cost_lingue_mo +
                                "\nRicerche mo: " + "Varia inbase alla rarità" +
                                "\nCreazione mo: " + "Varia inbase alla rarità" +
                                "\n**In Tempo**\nAvventure Token: " + config_timeskip.config_avventure.Cost_avventure_token +
                                "\nTalento Token: " + config_timeskip.config_talento.Cost_talento_token +
                                "\nStrumenti Token: " + config_timeskip.config_strumenti.Cost_strumenti_token +
                                "\nLingue Token: " + config_timeskip.config_lingua.Cost_lingue_token +
                                "\nRicerche Token: " + "Varia inbase alla rarità" +
                                "\nCreazione Token: " + "Varia inbase alla rarità" +
                                "\nLavoro Token: " + config_timeskip.config_lavoro.Cost_lavoro_token, true)
                            .addField("Ritorno Event",
                                "**In Oro**\nLavoro mo:" + config_timeskip.config_lavoro.retun_lavoro_mo, true
                            )
                            .setTimestamp()
                            .setFooter("Data", message.author.displayAvatarURL());
                        message.channel.send(Container)
                    } else {
                        emit_print_err_internal(message);
                    }
                } else {
                    emit_print_denied(message);
                }
            } else if (args[0] == "stop") {
                if (message.member.roles.cache.some(r => config.role_admin.includes(r.name)) || message.author.id == config.owner) {
                    await connect_db("Schede_PG");
                    const cursor = methodDB.getAll_Object();
                    cursor.then(async function (result) {
                        if (result != null && result != []) {
                            await connect_db("Event_config");
                            var config_timeskip = await methodDB.serachbyid_obj("1");
                            if (config_timeskip != null && config_timeskip != undefined) {
                                if (config_timeskip.Event_active == true) {
                                    await connect_db("Schede_PG");
                                    for (var i = 0; i < result.length; i++) {
                                        var Schede_PG = result[i];
                                        var token_values = config_timeskip['Token_value'];
                                        var old_value = Schede_PG['Money'];
                                        var token_pg = Schede_PG.timeskip.token;
                                        var new_value = token_pg * token_values;
                                        new_value = old_value + new_value;
                                        methodDB.money_update(mongo.ObjectID(Schede_PG['_id']), new_value);
                                    }
                                    methodDB.timeskip_pg_token_delete();
                                    await connect_db("Event_config");
                                    methodDB.timeskip_control_update(false);
                                    Container = new Discord.MessageEmbed();
                                    Container.setColor([255, 0, 0])
                                        .setTitle('Time Skip Stop')
                                        .setDescription('Il Time Skip è Terminato')
                                        .setThumbnail(botavatar.displayAvatarURL(), true)
                                        .addField("Data:", get_date_now())
                                        .setTimestamp()
                                        .setFooter("Data", message.author.displayAvatarURL());
                                    message.channel.send(Container)
                                    client.channels.cache.get(config.event_chat).send(Container)
                                } else {
                                    emit_print_err_attive(message);
                                }
                            } else {
                                emit_print_err_internal(message);
                            }
                        } else {
                            emit_print_err_internal(message);
                        }
                    });
                } else {
                    emit_print_denied(message);
                }
            } else if (args[0] == "cambio_talento") {           // Event 1 OK
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1] && args[1].length == 24) {
                            var cursor_Scheda = get_Scheda_pg(args[1]);
                            cursor_Scheda.then(function (result_pg) {
                                if (result_pg != null && result_pg != undefined && result_pg.length > 0) {
                                    var Scheda_pg = result_pg[0];
                                    if (Scheda_pg.Nome_Discord == message.author.id) {
                                        if (Scheda_pg.timeskip.token > 0) {
                                            if (Scheda_pg.timeskip.token >= config_timeskip.config_talento.Cost_talento_token) {
                                                // if (args[2]) {
                                                //     var nome = args[2];
                                                //     for (let index = 3; index < args.length; index++) {
                                                //         nome += " " + args[index];
                                                //     }
                                                //     var talento_richiesto = nome;
                                                // } else {
                                                //     var talento_richiesto = "Non Specificato Mettersi in accordo";
                                                // }
                                                var old_value = Scheda_pg.timeskip.token;
                                                var new_value_tk = old_value - config_timeskip.config_talento.Cost_talento_token;
                                                methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value_tk)
                                                let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                    var avatar = member.user.displayAvatarURL();
                                                } else {
                                                    var avatar = Scheda_pg.Avatar;
                                                }
                                                Container = new Discord.MessageEmbed();
                                                Container.setColor(colrs_set)
                                                    .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                    .setDescription("📨 La tua richiesta **Talento** è stata in oltrata hai Master")
                                                    // .addField("Talento Richiesto: ", talento_richiesto)
                                                    .setThumbnail(botavatar.displayAvatarURL(), true)
                                                    .setTimestamp()
                                                    .setFooter("Data", message.author.displayAvatarURL());
                                                message.channel.send(Container);
                                                Container = new Discord.MessageEmbed();
                                                Container.setColor(colrs_set)
                                                    .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                    .setDescription("<@&" + config_timeskip.ping_role + ">\n\n📫 Richiesta Per Talento Da: <@" + Scheda_pg.Nome_Discord + ">")
                                                    .addField("🆔 Scheda", Scheda_pg._id)
                                                    // .addField("Talento Richiesto: ", talento_richiesto)
                                                    .setThumbnail(avatar, true)
                                                    .setTimestamp()
                                                    .setFooter("Data", message.author.displayAvatarURL());
                                                client.channels.cache.get(config_timeskip.event_chat).send(Container)
                                            } else {
                                                emit_print_err_token_2(message);
                                            }
                                        } else {
                                            emit_print_err_token(message);
                                        }
                                    } else {
                                        emit_print_err_author_not_mach(message);
                                    }
                                } else {
                                    emit_print_err_notfound(message);
                                }
                            });
                        } else {
                            emit_print_err_custom(message, "cambio_talento** [ID_sheda]")
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "spedizione") {               // Event 2 OK
                var list_stats = ["forza", "destrezza", "costituzione", "intelligenza", "saggezza", "carisma"];
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1] && args[1].length == 24) {
                            if (args[2] && list_stats.includes(args[2])) {
                                var cursor_Scheda = get_Scheda_pg(args[1]);
                                cursor_Scheda.then(async function (result_pg) {
                                    if (result_pg != null) {
                                        var Scheda_pg = result_pg[0];
                                        if (Scheda_pg.Nome_Discord == message.author.id) {
                                            if (Scheda_pg.timeskip.token > 0) {
                                                if (Scheda_pg.timeskip.token >= config_timeskip.config_avventure.Cost_avventure_token) {
                                                    if (Scheda_pg.timeskip.limit_avventure > 0) {
                                                        var old_value_mo = Scheda_pg.Money;
                                                        if (old_value_mo > config_timeskip.config_avventure.Cost_avventure_mo) {
                                                            await connect_db("Schede_PG");
                                                            var old_action = Scheda_pg.timeskip.limit_avventure;
                                                            var new_action = old_action - 1;
                                                            methodDB.timeskip_pg_token_limit_avventure(Scheda_pg._id, new_action);
                                                            var old_value_tk = Scheda_pg.timeskip.token;
                                                            var new_value_tk = old_value_tk - config_timeskip.config_avventure.Cost_avventure_token;
                                                            methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value_tk);
                                                            var stats = args[2];
                                                            stats = stats.charAt(0).toUpperCase() + stats.slice(1)
                                                            var roll_result = roll_dice_value(1, 100, Scheda_pg[stats]);
                                                            if (roll_result > config_timeskip.config_avventure.val_high) {
                                                                var value_result = config_timeskip.config_avventure.mo_base_1 + roll_dice_value(0, config_timeskip.config_avventure.mo_base_1, 0);
                                                                var new_value_mo = old_value_mo + value_result;
                                                                var status = "Gran Successo"
                                                                var message_result = "L'esplorazione che hai condotto, contro tutti i pronostici, ti ha portato ad un mirabolante successo fruttandoti ben **" + value_result + "** monete d'oro."
                                                            } else if (roll_result > config_timeskip.config_avventure.val_mid && roll_result <= config_timeskip.config_avventure.val_high) {
                                                                var value_result = config_timeskip.config_avventure.mo_base_2 + roll_dice_value(0, config_timeskip.config_avventure.mo_base_2, 0);
                                                                var new_value_mo = old_value_mo + value_result;
                                                                var status = "Successo"
                                                                var message_result = "L'esplorazione che hai condotto ha riscontrato proprio la fine che speravi ed il che ti ha fatto guadagnare **" + value_result + "** monete d'oro."
                                                            } else if (roll_result > config_timeskip.config_avventure.val_low && roll_result <= config_timeskip.config_avventure.val_mid) {
                                                                var value_result = config_timeskip.config_avventure.mo_base_3 + roll_dice_value(0, config_timeskip.config_avventure.mo_base_3, 0);
                                                                var new_value_mo = old_value_mo - value_result;
                                                                var status = "Fallimento"
                                                                var message_result = "L'esplorazione che hai condotto non ha ottenuto la fine che speravi ed il che ti ha fatto perdere **" + value_result + "** monete d'oro."
                                                            } else if (roll_result <= config_timeskip.config_avventure.val_low) {
                                                                var value_result = config_timeskip.config_avventure.mo_base_4 + roll_dice_value(0, config_timeskip.config_avventure.mo_base_4, 0);
                                                                var new_value_mo = old_value_mo - value_result;
                                                                var status = "Fallimento Totale"
                                                                var message_result = "L'esplorazione che hai condotto, purtroppo, ha ottenuto una devastante disfatta che ti è costata ben **" + value_result + "** monete d'oro."
                                                            }
                                                            methodDB.money_update(Scheda_pg._id, new_value_mo);
                                                            let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                            if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                                var avatar = member.user.displayAvatarURL();
                                                            } else {
                                                                var avatar = Scheda_pg.Avatar;
                                                            }
                                                            Container = new Discord.MessageEmbed();
                                                            Container.setColor(colrs_set)
                                                                .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                .setDescription(message_result)
                                                                .addField("🧾 Stato Spedizione:", status)
                                                                .addField("⚪️ Risultato Spedizione:", value_result)
                                                                .addField("💰 Money", new_value_mo)
                                                                .addField("Spedizioni Rimaneti:", new_action)
                                                                .setThumbnail(botavatar.displayAvatarURL(), true)
                                                                .setTimestamp()
                                                                .setFooter("Data", message.author.displayAvatarURL());
                                                            message.channel.send(Container);
                                                            Container = new Discord.MessageEmbed();
                                                            Container.setColor(colrs_set)
                                                                .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                .setDescription("📯 Ha Fatto Una Spedizione: <@" + Scheda_pg.Nome_Discord + ">")
                                                                .addField("🆔 Scheda:", Scheda_pg._id)
                                                                .addField("🧾 Esito:", status)
                                                                .addField("Spedizioni Rimaneti:", new_action)
                                                                .setThumbnail(avatar, true)
                                                                .setTimestamp()
                                                                .setFooter("Data", message.author.displayAvatarURL());
                                                            client.channels.cache.get(config_timeskip.event_chat).send(Container);
                                                        } else {
                                                            emit_print_err_money(message);
                                                        }
                                                    } else {
                                                        emit_print_err_limit(message);
                                                    }
                                                } else {
                                                    emit_print_err_token_2(message);
                                                }
                                            } else {
                                                emit_print_err_token(message);
                                            }
                                        } else {
                                            emit_print_err_author_not_mach(message);
                                        }
                                    } else {
                                        emit_print_err_notfound(message);
                                    }
                                });
                            } else {
                                emit_print_err_custom(message, "sedizione** [ID_Scheda][Statisitca del PG]");
                            }
                        } else {
                            emit_print_err_custom(message, "sedizione** [ID_Scheda][Statisitca del PG]");
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "strumento") {                // Event 3 OK
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1]) {
                            if (args[1].length == 24) {
                                var cursor_Scheda = get_Scheda_pg(args[1]);
                                cursor_Scheda.then(async function (result_pg) {
                                    if (result_pg != null) {
                                        var Scheda_pg = result_pg[0];
                                        if (Scheda_pg.Nome_Discord == message.author.id) {
                                            if (Scheda_pg.timeskip.token > 0) {
                                                if (Scheda_pg.timeskip.token >= config_timeskip.config_strumenti.Cost_strumenti_token) {
                                                    if (Scheda_pg.Money > config_timeskip.config_strumenti.Cost_strumenti_mo) {
                                                        if (args[2]) {
                                                            var tool_richiesto = args[2];
                                                            for (let index = 3; index < args.length; index++) {
                                                                tool_richiesto += " " + args[index];
                                                            }
                                                            var filter_tool = config_timeskip.config_strumenti.filter_tool;
                                                            if (filter_tool.includes(tool_richiesto)) {
                                                                await connect_db("Lista_Competenze");
                                                                var cursor_tool = methodDB.serach_competenze(tool_richiesto);
                                                                cursor_tool.then(async function (tool_result) {
                                                                    await connect_db("Schede_PG");
                                                                    var old_value_mo = Scheda_pg.Money;
                                                                    var new_value_mo = old_value_mo - config_timeskip.config_strumenti.Cost_strumenti_mo;
                                                                    methodDB.money_update(Scheda_pg._id, new_value_mo);
                                                                    var old_value_tk = Scheda_pg.timeskip.token;
                                                                    var new_value_tk = old_value_tk - config_timeskip.config_strumenti.Cost_strumenti_token;
                                                                    methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value_tk)
                                                                    if (Scheda_pg.Competenze == undefined) {
                                                                        var obj_temp = {};
                                                                        obj_temp["Competenze"] = {};
                                                                        var competenze_old = obj_temp["Competenze"]
                                                                    } else {
                                                                        var competenze_old = Scheda_pg.Competenze;
                                                                    }
                                                                    var ojb = {}
                                                                    ojb[tool_result.nome] = tool_result.nome
                                                                    Object.assign(competenze_old, ojb);
                                                                    var check_nam = competenze_old[tool_result.nome];
                                                                    if (check_nam == undefined) {
                                                                        methodDB.competenze_update(Scheda_pg._id, competenze_old);
                                                                        let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                                        if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                                            var avatar = member.user.displayAvatarURL();
                                                                        } else {
                                                                            var avatar = Scheda_pg.Avatar;
                                                                        }
                                                                        Container = new Discord.MessageEmbed();
                                                                        Container.setColor(colrs_set)
                                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                            .setDescription("Hai Aquisito Questa Competenza")
                                                                            .addField("🛠 / 🎺 Competenza:", tool_result.nome)
                                                                            .setThumbnail(botavatar.displayAvatarURL(), true)
                                                                            .setTimestamp()
                                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                                        message.channel.send(Container);
                                                                        Container = new Discord.MessageEmbed();
                                                                        Container.setColor(colrs_set)
                                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                            .setDescription("📯 Ha Acquisito Una Competenza: <@" + Scheda_pg.Nome_Discord + ">")
                                                                            .addField("🆔 Scheda:", Scheda_pg._id)
                                                                            .addField("🛠/🎺 Competenza Assegnata:", tool_result.nome)
                                                                            .setThumbnail(avatar, true)
                                                                            .setTimestamp()
                                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                                        client.channels.cache.get(config_timeskip.event_chat).send(Container);
                                                                    } else {
                                                                        Container = new Discord.MessageEmbed();
                                                                        Container.setColor(colrs_set)
                                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                            .setDescription("Sei già in possesso di questa Competenza")
                                                                            .addField("🛠 / 🎺 Competenza:", tool_result.nome)
                                                                            .setThumbnail(botavatar.displayAvatarURL(), true)
                                                                            .setTimestamp()
                                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                                        message.channel.send(Container);
                                                                    }
                                                                });
                                                            } else {
                                                                emit_print_err_obj(message, "Errore Strumento Inserito Non Valido");
                                                            }
                                                        } else {
                                                            emit_print_err_custom(message, "strumento** [ID_Sheda][Strumento da acquisire]");
                                                        }
                                                    } else {
                                                        emit_print_err_money(message);
                                                    }
                                                } else {
                                                    emit_print_err_token_2(message);
                                                }
                                            } else {
                                                emit_print_err_token(message);
                                            }
                                        } else {
                                            emit_print_err_author_not_mach(message);
                                        }
                                    } else {
                                        emit_print_err_notfound(message);
                                    }
                                });
                            } else {
                                emit_print_err_custom(message, "strumento** [ID_Sheda][Strumento da acquisire]");
                            }
                        } else {
                            var text = ""
                            var temp_text = config_timeskip.config_strumenti.filter_tool;
                            for (let index = 0; index < temp_text.length; index++) {
                                text = text + "• " + temp_text[index] + "\n";
                            }
                            Container = new Discord.MessageEmbed();
                            Container.setColor(colrs_set)
                                .setTitle('📜 Lista Strumenti Disponibili')
                                .setDescription(text)
                                .addField("Sintassi", "**" + config.prefix + "timeskip strumento** [ID_Sheda][Strumento da acquisire]")
                                .setThumbnail(botavatar.displayAvatarURL(), true)
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL());
                            message.channel.send(Container);
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "lingua") {                   // Event 4 OK
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1]) {
                            if (args[1].length == 24) {
                                var cursor_Scheda = get_Scheda_pg(args[1]);
                                cursor_Scheda.then(async function (result_pg) {
                                    if (result_pg != null) {
                                        var Scheda_pg = result_pg[0];
                                        if (Scheda_pg.Nome_Discord == message.author.id) {
                                            if (Scheda_pg.timeskip.token > 0) {
                                                if (Scheda_pg.timeskip.token >= config_timeskip.config_lingua.Cost_lingue_token) {
                                                    if (Scheda_pg.Money >= config_timeskip.config_lingua.Cost_lingue_mo) {
                                                        if (args[2]) {
                                                            var lingua_richiesto = args[2];
                                                            for (let index = 3; index < args.length; index++) {
                                                                lingua_richiesto += " " + args[index];
                                                            }
                                                            var filter_lingua = config_timeskip.config_lingua.filter_lingua;
                                                            if (filter_lingua.includes(lingua_richiesto)) {
                                                                await connect_db("Lista_Competenze");
                                                                var cursor_lingua = methodDB.serach_competenze(lingua_richiesto);
                                                                cursor_lingua.then(async function (lingua_result) {
                                                                    await connect_db("Schede_PG");
                                                                    var old_value_mo = Scheda_pg.Money;
                                                                    var new_value_mo = old_value_mo - config_timeskip.config_lingua.Cost_lingue_mo;
                                                                    methodDB.money_update(Scheda_pg._id, new_value_mo);
                                                                    var old_value_tk = Scheda_pg.timeskip.token;
                                                                    var new_value_tk = old_value_tk - config_timeskip.config_lingua.Cost_lingue_token;
                                                                    methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value_tk)
                                                                    if (Scheda_pg.Competenze == undefined) {
                                                                        var obj_temp = {};
                                                                        obj_temp["Competenze"] = {};
                                                                        var competenze_old = obj_temp["Competenze"]
                                                                    } else {
                                                                        var competenze_old = Scheda_pg.Competenze;
                                                                    }
                                                                    var ojb = {}
                                                                    ojb[lingua_result.nome] = lingua_result.nome
                                                                    Object.assign(competenze_old, ojb);
                                                                    var check_nam = competenze_old[lingua_result.nome];
                                                                    if (check_nam == undefined) {
                                                                        methodDB.competenze_update(Scheda_pg._id, competenze_old);
                                                                        let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                                        if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                                            var avatar = member.user.displayAvatarURL();
                                                                        } else {
                                                                            var avatar = Scheda_pg.Avatar;
                                                                        }
                                                                        Container = new Discord.MessageEmbed();
                                                                        Container.setColor(colrs_set)
                                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                            .setDescription("Hai Aquisito Questa Competenza")
                                                                            .addField("💬 Competenza:", lingua_result.nome)
                                                                            .setThumbnail(botavatar.displayAvatarURL(), true)
                                                                            .setTimestamp()
                                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                                        message.channel.send(Container);
                                                                        Container = new Discord.MessageEmbed();
                                                                        Container.setColor(colrs_set)
                                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                            .setDescription("📯 Ha Acquisito Una Competenza: <@" + Scheda_pg.Nome_Discord + ">")
                                                                            .addField("🆔 Scheda:", Scheda_pg._id)
                                                                            .addField("💬 Competenza Assegnata:", lingua_result.nome)
                                                                            .setThumbnail(avatar, true)
                                                                            .setTimestamp()
                                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                                        client.channels.cache.get(config_timeskip.event_chat).send(Container);
                                                                    } else {
                                                                        Container = new Discord.MessageEmbed();
                                                                        Container.setColor(colrs_set)
                                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                                            .setDescription("Sei già in possesso di questa Competenza")
                                                                            .addField("💬 Competenza:", lingua_result.nome)
                                                                            .setThumbnail(botavatar.displayAvatarURL(), true)
                                                                            .setTimestamp()
                                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                                        message.channel.send(Container);
                                                                        Container = new Discord.MessageEm
                                                                    }
                                                                });
                                                            } else {
                                                                emit_print_err_obj(message, "Errore Strumento Inserito Non Valido");
                                                            }
                                                        } else {
                                                            emit_print_err_custom(message, "lingua** [ID_Sheda][Lingua da acquisire]");
                                                        }
                                                    } else {
                                                        emit_print_err_money(message);
                                                    }
                                                } else {
                                                    emit_print_err_token_2(message);
                                                }
                                            } else {
                                                emit_print_err_token(message);
                                            }
                                        } else {
                                            emit_print_err_author_not_mach(message);
                                        }
                                    } else {
                                        emit_print_err_notfound(message);
                                    }
                                });
                            } else {
                                emit_print_err_custom(message, "lingua** [ID_Sheda][Lingua da acquisire]");
                            }
                        } else {
                            var text = ""
                            var temp_text = config_timeskip.config_lingua.filter_lingua;
                            for (let index = 0; index < temp_text.length; index++) {
                                text = text + "• " + temp_text[index] + "\n";
                            }
                            Container = new Discord.MessageEmbed();
                            Container.setColor(colrs_set)
                                .setTitle('📜 Lista Lingue Disponibili')
                                .setDescription(text)
                                .addField("Sintassi", "**" + config.prefix + "timeskip lingua** [ID_Sheda][Lingua da acquisire]")
                                .setThumbnail(botavatar.displayAvatarURL(), true)
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL());
                            message.channel.send(Container);
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "ricerca") {                  // Event 5 OK
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1]) {
                            if (args[1].length == 24) {
                                var cursor_Scheda = get_Scheda_pg(args[1]);
                                cursor_Scheda.then(function (result_pg) {
                                    if (result_pg != null && result_pg != undefined && result_pg.length > 0) {
                                        var Scheda_pg = result_pg[0];
                                        if (Scheda_pg.Nome_Discord == message.author.id) {
                                            if (Scheda_pg.timeskip.token > 0) {
                                                if (args[2]) {
                                                    var nome = args[2];
                                                    for (let index = 3; index < args.length; index++) {
                                                        nome += " " + args[index];
                                                    }
                                                    var select_ricerche = nome.toLowerCase();
                                                    if (select_ricerche == "comune") {
                                                        var cost_token = config_timeskip.config_ricerche.Cost_comune
                                                    } else if (select_ricerche == "non comune") {
                                                        var cost_token = config_timeskip.config_ricerche.Cost_non_comune
                                                    } else if (select_ricerche == "raro") {
                                                        var cost_token = config_timeskip.config_ricerche.Cost_raro
                                                    } else {
                                                        Container = new Discord.MessageEmbed();
                                                        Container.setColor([255, 0, 0])
                                                            .setAuthor(`Richiesta di: ${message.author.username}`)
                                                            .setTitle('Errore Rarità Non Valida');
                                                        message.channel.send(Container);
                                                        return
                                                    }
                                                    if (Scheda_pg.timeskip.token >= cost_token) {
                                                        var old_value = Scheda_pg.timeskip.token;
                                                        var new_value_tk = old_value - cost_token;
                                                        methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value_tk)
                                                        let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                        if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                            var avatar = member.user.displayAvatarURL();
                                                        } else {
                                                            var avatar = Scheda_pg.Avatar;
                                                        }
                                                        Container = new Discord.MessageEmbed();
                                                        Container.setColor(colrs_set)
                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                            .setDescription("📨 La tua richiesta **Ricerca/Studio** è stata in oltrata hai Master")
                                                            .addField("Ricerca/Studio Richiesto: ", select_ricerche)
                                                            .setThumbnail(botavatar.displayAvatarURL(), true)
                                                            .setTimestamp()
                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                        message.channel.send(Container);
                                                        Container = new Discord.MessageEmbed();
                                                        Container.setColor(colrs_set)
                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                            .setDescription("<@&" + config_timeskip.ping_role + ">\n\n📫 Richiesta Per Talento Da: <@" + Scheda_pg.Nome_Discord + ">")
                                                            .addField("🆔 Scheda", Scheda_pg._id)
                                                            .addField("Ricerca/Studio Richiesto: ", select_ricerche)
                                                            .setThumbnail(avatar, true)
                                                            .setTimestamp()
                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                        client.channels.cache.get(config_timeskip.event_chat).send(Container)
                                                    } else {
                                                        emit_print_err_token_2(message);
                                                    }
                                                } else {
                                                    emit_print_err_custom(message, "ricerca** [ID_Sheda][Rarità]");
                                                }
                                            } else {
                                                emit_print_err_token(message);
                                            }
                                        } else {
                                            emit_print_err_author_not_mach(message);
                                        }
                                    } else {
                                        emit_print_err_notfound(message);
                                    }
                                });
                            } else {
                                emit_print_err_custom(message, "ricerca** [ID_Sheda][Rarità]");
                            }
                        } else {
                            Container = new Discord.MessageEmbed();
                            Container.setColor(colrs_set)
                                .setTitle('📜 Lista Ricerche Disponibili')
                                .setDescription("• comune\n• non comune\n• raro")
                                .addField("Sintassi", "**" + config.prefix + "timeskip ricerca** [ID_Sheda][Rarità]")
                                .setThumbnail(botavatar.displayAvatarURL(), true)
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL());
                            message.channel.send(Container);
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "creazione") {                // Event 6 OK
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1]) {
                            if (args[1].length == 24) {
                                var cursor_Scheda = get_Scheda_pg(args[1]);
                                cursor_Scheda.then(function (result_pg) {
                                    if (result_pg != null && result_pg != undefined && result_pg.length > 0) {
                                        var Scheda_pg = result_pg[0];
                                        if (Scheda_pg.Nome_Discord == message.author.id) {
                                            if (Scheda_pg.timeskip.token > 0) {
                                                if (args[2]) {
                                                    var nome = args[2];
                                                    for (let index = 3; index < args.length; index++) {
                                                        nome += " " + args[index];
                                                    }
                                                    var select_Creazione = nome.toLowerCase();
                                                    if (select_Creazione == "comune") {
                                                        var cost_token = config_timeskip.config_creazione.Cost_comune
                                                    } else if (select_Creazione == "non comune") {
                                                        var cost_token = config_timeskip.config_creazione.Cost_non_comune
                                                    } else if (select_Creazione == "raro") {
                                                        var cost_token = config_timeskip.config_creazione.Cost_raro
                                                    } else if (select_Creazione == "molto raro") {
                                                        var cost_token = config_timeskip.config_creazione.Cost_molto_raro
                                                    } else {
                                                        Container = new Discord.MessageEmbed();
                                                        Container.setColor([255, 0, 0])
                                                            .setAuthor(`Richiesta di: ${message.author.username}`)
                                                            .setTitle('Errore Rarità Non Valida');
                                                        message.channel.send(Container);
                                                        return
                                                    }
                                                    if (Scheda_pg.timeskip.token >= cost_token) {
                                                        var old_value = Scheda_pg.timeskip.token;
                                                        var new_value_tk = old_value - cost_token;
                                                        methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value_tk)
                                                        let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                        if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                            var avatar = member.user.displayAvatarURL();
                                                        } else {
                                                            var avatar = Scheda_pg.Avatar;
                                                        }
                                                        Container = new Discord.MessageEmbed();
                                                        Container.setColor(colrs_set)
                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                            .setDescription("📨 La tua richiesta **Creazione** è stata in oltrata hai Master")
                                                            .addField("Creazione Richiesto: ", select_Creazione)
                                                            .setThumbnail(botavatar.displayAvatarURL(), true)
                                                            .setTimestamp()
                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                        message.channel.send(Container);
                                                        Container = new Discord.MessageEmbed();
                                                        Container.setColor(colrs_set)
                                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                            .setDescription("<@&" + config_timeskip.ping_role + ">\n\n📫 Richiesta Per Talento Da: <@" + Scheda_pg.Nome_Discord + ">")
                                                            .addField("🆔 Scheda", Scheda_pg._id)
                                                            .addField("Creazione Richiesto: ", select_Creazione)
                                                            .setThumbnail(avatar, true)
                                                            .setTimestamp()
                                                            .setFooter("Data", message.author.displayAvatarURL());
                                                        client.channels.cache.get(config_timeskip.event_chat).send(Container)
                                                    } else {
                                                        emit_print_err_token_2(message);
                                                    }
                                                } else {
                                                    emit_print_err_custom(message, "creazine** [ID_Sheda][Rarità]");
                                                }
                                            } else {
                                                emit_print_err_token(message);
                                            }
                                        } else {
                                            emit_print_err_author_not_mach(message);
                                        }
                                    } else {
                                        emit_print_err_notfound(message);
                                    }
                                });
                            } else {
                                emit_print_err_custom(message, "creazine** [ID_Sheda][Rarità]");
                            }
                        } else {
                            Container = new Discord.MessageEmbed();
                            Container.setColor(colrs_set)
                                .setTitle('📜 Lista Creazine Disponibile')
                                .setDescription("• comune\n• non comune\n• raro\n• molto raro")
                                .addField("Sintassi", "**" + config.prefix + "timeskip creazine** [ID_Sheda][Rarità]")
                                .setThumbnail(botavatar.displayAvatarURL(), true)
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL());
                            message.channel.send(Container);
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "lavoro") {                   // Event 7 OK
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1] && args[1].length == 24) {
                            var cursor_Scheda = get_Scheda_pg(args[1]);
                            cursor_Scheda.then(function (result_pg) {
                                if (result_pg != null && result_pg != undefined && result_pg.length > 0) {
                                    var Scheda_pg = result_pg[0];
                                    if (Scheda_pg.Nome_Discord == message.author.id) {
                                        if (Scheda_pg.timeskip.token > 0) {
                                            if (Scheda_pg.timeskip.token >= config_timeskip.config_lavoro.Cost_lavoro_token) {
                                                var old_value = parseFloat(Scheda_pg.Money);
                                                var new_value = old_value + parseFloat(config_timeskip.config_lavoro.retun_lavoro_mo);
                                                methodDB.money_update(Scheda_pg._id, new_value);
                                                var old_value_tk = parseInt(Scheda_pg.timeskip.token);
                                                var new_value_tk = old_value_tk - parseInt(config_timeskip.config_lavoro.Cost_lavoro_token);
                                                methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value_tk)
                                                let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                    var avatar = member.user.displayAvatarURL();
                                                } else {
                                                    var avatar = Scheda_pg.Avatar;
                                                }
                                                Container = new Discord.MessageEmbed();
                                                Container.setColor(colrs_set)
                                                    .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                    .setDescription("Paga per il lavoro svolto per la città di Halomir")
                                                    .setThumbnail(avatar, true)
                                                    .addField("💰 Money", new_value)
                                                    .setTimestamp()
                                                    .setFooter("Data", message.author.displayAvatarURL());
                                                message.channel.send(Container);
                                            } else {
                                                emit_print_err_token_2(message);
                                            }
                                        } else {
                                            emit_print_err_token(message);
                                        }
                                    } else {
                                        emit_print_err_author_not_mach(message);
                                    }
                                } else {
                                    emit_print_err_notfound(message);
                                }
                            });
                        } else {
                            emit_print_err_custom(message, "lavoro** [ID_Scheda]");
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "token") {                    // Event 8 OK
                await connect_db("Event_config");
                var config_timeskip = await methodDB.serachbyid_obj("1");
                if (config_timeskip != null && config_timeskip != undefined) {
                    if (config_timeskip.Event_active == true) {
                        if (args[1] && args[1].length == 24) {
                            var cursor_Scheda = get_Scheda_pg(args[1]);
                            cursor_Scheda.then(function (result_pg) {
                                if (result_pg != null && result_pg != undefined && result_pg.length > 0) {
                                    var Scheda_pg = result_pg[0];
                                    if (Scheda_pg.Nome_Discord == message.author.id) {
                                        let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                        if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                            var avatar = member.user.displayAvatarURL();
                                        } else {
                                            var avatar = Scheda_pg.Avatar;
                                        }
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(colrs_set)
                                            .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                            .setThumbnail(avatar, true)
                                            .addField("🟡 Token", Scheda_pg.timeskip.token)
                                            .setTimestamp()
                                            .setFooter("Data", message.author.displayAvatarURL());
                                        message.channel.send(Container);
                                    } else {
                                        emit_print_err_author_not_mach(message);
                                    }
                                } else {
                                    emit_print_err_notfound(message);
                                }
                            });
                        } else {
                            emit_print_err_custom(message, "token** [ID_Scheda]");
                        }
                    } else {
                        emit_print_err_attive(message);
                    }
                } else {
                    emit_print_err_internal(message);
                }
            } else if (args[0] == "set_token") {
                if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
                    await connect_db("Event_config");
                    var config_timeskip = await methodDB.serachbyid_obj("1");
                    if (config_timeskip != null && config_timeskip != undefined) {
                        if (config_timeskip.Event_active == true) {
                            if (args[2]) {
                                if (args[3] && args[3].length == 24) {
                                    var cursor_Scheda = get_Scheda_pg(args[3]);
                                    cursor_Scheda.then(function (result_pg) {
                                        if (result_pg != null && result_pg != undefined && result_pg.length > 0) {
                                            var Scheda_pg = result_pg[0];
                                            if (Scheda_pg.Nome_Discord == message.author.id) {
                                                if (args[1] == "add" || args[1] == "-a") {
                                                    var old_value = Scheda_pg.timeskip.token;
                                                    var new_value = old_value + parseInt(args[2]);
                                                } else if (args[1] == "sub" || args[1] == "-s") {
                                                    var old_value = Scheda_pg.timeskip.token;
                                                    var new_value = old_value - parseInt(args[2]);
                                                } else {
                                                    emit_print_err_custom(message, "set_token** [Opzione][Valore][ID_Scheda]");
                                                    return
                                                }
                                                methodDB.timeskip_pg_token_update(Scheda_pg._id, new_value);
                                                let member = message.guild.members.cache.get(Scheda_pg.Nome_Discord);
                                                if (Scheda_pg.Avatar == "Non Assegnata" || Scheda_pg.Avatar == undefined) {
                                                    var avatar = member.user.displayAvatarURL();
                                                } else {
                                                    var avatar = Scheda_pg.Avatar;
                                                }
                                                Container = new Discord.MessageEmbed();
                                                Container.setColor(colrs_set)
                                                    .setTitle('📜 Scheda: ' + Scheda_pg.Nome_PG)
                                                    .setThumbnail(avatar, true)
                                                    .addField("🟡 Token", new_value)
                                                    .setTimestamp()
                                                    .setFooter("Data", message.author.displayAvatarURL());
                                                message.channel.send(Container);
                                            } else {
                                                emit_print_err_author_not_mach(message);
                                            }
                                        } else {
                                            emit_print_err_notfound(message);
                                        }
                                    });
                                } else {
                                    emit_print_err_custom(message, "set_token** [Opzione][Valore][ID_Scheda]");
                                }
                            } else {
                                emit_print_err_custom(message, "set_token** [Opzione][Valore][ID_Scheda]");
                            }
                        } else {
                            emit_print_err_attive(message);
                        }
                    } else {
                        emit_print_err_internal(message);
                    }
                } else {
                    emit_print(message);
                }
            } else {
                emit_print_denied(message);
            }
        } else {
            emit_print_denied(message);
        }
    }
}

//------------------------------------------------------------------//

// Error Message Zone
function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Checkpoint`)
        .setTitle('Sintassi **' + config.prefix + 'timeskip** [Opzione][Valore]...');
    message.channel.send(Container);
}

function emit_print_err_custom(message, obj) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Checkpoint`)
        .setTitle('Sintassi **' + config.prefix + 'timeskip ' + obj);
    message.channel.send(Container);
}

function emit_print_denied(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
        .setTitle('Non sei autorizzato a usare questo comando');
    message.channel.send(Container);
}

function emit_print_err_internal(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Richiesta di: ${message.author.username}`)
        .setTitle('Errore Documento non trovato')
        .addField("Code Error: 500", "Internal Error");
    message.channel.send(Container);
}

function emit_print_err_attive(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Richiesta di: ${message.author.username}`)
        .setTitle('Errore Timeskip Non Attivo');
    message.channel.send(Container);
}

function emit_print_err_notfound(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Richiesta di: ${message.author.username}`)
        .setTitle('Errore Scheda non trovata');
    message.channel.send(Container);
}

function emit_print_err_token(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Richiesta di: ${message.author.username}`)
        .setTitle('Errore Non Hai Più Token a Disposizione');
    message.channel.send(Container);
}

function emit_print_err_token_2(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Richiesta di: ${message.author.username}`)
        .setTitle('Errore Non Hai Token Sufficenti Per Questo Evento');
    message.channel.send(Container);
}

function emit_print_err_limit(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Richiesta di: ${message.author.username}`)
        .setTitle('Errore Non Puoi Eseguire Questa Azione');
    message.channel.send(Container);
}

function emit_print_err_obj(message, obj) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Richiesta di: ${message.author.username}`)
        .setTitle(obj);
    message.channel.send(Container);
}

function emit_print_err_money(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setTitle('ERRORE Fondi Insufficenti')
        .setDescription('Torna quando sarai più ricco');
    message.channel.send(Container);
}

function emit_print_err_author_not_mach(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Acquirente non valido: ` + message.author.username)
        .setTitle('Non puoi spacciarti per un altro');
    message.channel.send(Container);
}

//------------------------------------------------------------------//

// Function Zone
async function connect_db(db_filter) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db(db_filter);
    } else {
        return 1;
    }
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbyid(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

function get_date_now() {
    var data_row = new Date();
    var year = data_row.getFullYear();
    var month = ("0" + (data_row.getMonth() + 1)).slice(-2);
    var day = ("0" + data_row.getDate()).slice(-2);
    var hours = data_row.getHours();
    var minutes = data_row.getMinutes();
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
}

function roll_dice_value(min, max, mod) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result + mod;
}

//------------------------------------------------------------------//