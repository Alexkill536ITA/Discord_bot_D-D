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
const Pagination = require('discord-paginationembed');
const cryptoRandomString = require('crypto-random-string');

module.exports = {
    name: 'scambio',
    description: "scambio",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute Scambio');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            if (args[0] == "vendi") {
                if (args[1]) {
                    var user_call = getUserFromMention(args[1]);
                    if (user_call == message.author.id && args[2].length == 24 && isNaN(parseInt(args[3])) == false && parseInt(args[3]) > 0 && isNaN(parseFloat(args[4])) == false && parseFloat(args[4]) > 0) {
                        if (args[5]) {
                            var nome = args[5];
                            for (let index = 6; index < args.length; index++) {
                                nome += " " + args[index];
                            }
                            nome = String(nome).toLowerCase();

                            var Scheda = await get_Scheda_pg(args[2]);
                            var Scheda_PG = Scheda[0];
                            if (Scheda_PG == 1) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Scheda PG non trovata');
                                message.channel.send(Container);
                                return 1;
                            }

                            var inventory = Scheda_PG['Inventory'];
                            var check_nam = inventory[nome];
                            if (check_nam !== undefined) {
                                var num = inventory[nome]['Quantita'];
                                num = num - parseInt(args[3]);
                                if (num < 0) {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Oggetti insufficienti');
                                    message.channel.send(Container);
                                } else {
                                    if (num == 0 || isNaN(num) == true) {
                                        var sincro = inventory[nome]['Sincronia'];
                                        delete inventory[nome];
                                    } else {
                                        var sincro = inventory[nome]['Sincronia'];
                                        inventory[nome]['Quantita'] = num;
                                    }
                                }
                                methodDB.inventory_update(args[2], inventory);

                                var oggetto = {};
                                oggetto['ID_Discord'] = user_call;
                                oggetto['ID_Sheda'] = args[2];
                                oggetto['ID Shop'] = cryptoRandomString({ length: 10, type: 'alphanumeric' });;
                                oggetto['Nome'] = nome;
                                oggetto['Quantita'] = parseInt(args[3]);
                                oggetto['Sincronia'] = sincro;
                                oggetto['Prezzo'] = parseFloat(args[4]);

                                methodDB.settab_db("Lista_scambio");
                                methodDB.insert_db(oggetto);

                                if (sincro == "1") {
                                    var sinc = "Si";
                                } else {
                                    var sinc = "No";
                                }

                                Container = new Discord.MessageEmbed();
                                Container.setColor(clor_gen.rand_Color())
                                    .setTitle('Oggetto messo in vendita da: ' + Scheda_PG.Nome_PG)
                                    .addField("ID shop", oggetto['ID Shop'])
                                    .addField("Nome oggetto", nome)
                                    .addField("Quantità", parseInt(args[3]))
                                    .addField("Sincronia", sinc)
                                    .addField("Prezzo", parseFloat(args[4] + "mo"))
                                    .setThumbnail(message.author.displayAvatarURL())
                                    .setTimestamp()
                                    .setFooter("Data", message.author.displayAvatarURL());
                                message.channel.send(Container);
                                let role_ping = message.guild.roles.cache.find(role => role.name === config.chat_scambi_ping);
                                client.channels.cache.get(config.chat_scambi).send(Container.setDescription("<@&" + role_ping.id + ">"));

                            } else {
                                Container = new Discord.MessageEmbed();
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Ogetto non rovato: ` + message.author.username)
                                    .setTitle('Ogetto non è prensente nel\'inventario');
                                message.channel.send(Container);
                            }
                        } else {
                            emit_print_1(message);
                            return 1;
                        }
                    } else {
                        emit_print_1(message);
                        return 1
                    }
                } else {
                    emit_print_1(message);
                    return 1;
                }
                // } else if (args[0] == "edit") {
                //     if (args[1] == message.author.id && args[2].length == 24 && isNaN(parseInt(args[3])) == false && parserInt(args[3]) > 0 && isNaN(parseInt(args[4])) == false && parseInt(args[4]) > 0) {
                //         if (args[5]) {
                //             var Scheda = await get_Object_scambio(args[1]);
                //             var Scheda_Object = Scheda[0];
                //             if (Scheda_Object == 1) {
                //                 Container.setColor([255, 0, 0])
                //                     .setAuthor(`Richiesta di: ${message.author.username}`)
                //                     .setTitle('Errore Scheda PG non trovata');
                //                 message.channel.send(Container);
                //                 return 1;
                //             }
                //                 oggetto['Quantita'] = parseInt(args[3]);
                //                 oggetto['Prezo'] = parseInt(args[4])
                //                 methodDB.Object_scambio_update(Scheda_Object['_id'],oggetto);
                //         } else {
                //             emit_print_2(message);
                //         }
                //     } else {
                //         emit_print_2(message);
                //     }
            } else if (args[0] == "rimuovi") {
                if (args[1]) {
                    var user_call = getUserFromMention(args[1]);
                    if (user_call == message.author.id && args[2].length == 24 && isNaN(parseInt(args[3])) == false && parseInt(args[3]) > 0) {
                        if (args[4]) {
                            // Get Scheda Venditore 
                            var Scheda = await get_Scheda_pg(args[2]);
                            var Scheda_PG = Scheda[0];
                            if (Scheda_PG == 1) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Scheda PG non trovata');
                                message.channel.send(Container);
                                return 1;
                            }

                            // Get Scheda Oggetto
                            var Scheda_Ojc_temp = await get_Object_scambio(args[4]);
                            var Scheda_Object = Scheda_Ojc_temp[0];
                            if (Scheda_Object == 1 || Scheda_Object == undefined) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Ogetto non trovato');
                                message.channel.send(Container);
                                return 1;
                            }

                            if (Scheda_PG['Nome_Discord'] != Scheda_Object['ID_Discord'] && Scheda_PG['_id'] != Scheda_Object['ID_Sheda']) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Hey Non Ciprovare a Rubare');
                                message.channel.send(Container);
                                return 1;
                            }

                            var num_ojb = Scheda_Object['Quantita'];
                            num_ojb = num_ojb - parseInt(args[3]);
                            if (num_ojb == 0 || isNaN(num_ojb) == true || args[3] == 'all') {
                                delete_record = true
                            } else {
                                Scheda_Object['Quantita'] = num_ojb;
                            }

                            // Controllo Presenza già a inventario
                            var nome_var = Scheda_Object['Nome'];
                            var inventory = Scheda_PG['Inventory'];
                            var check_nam = inventory[Scheda_Object['Nome']];
                            if (check_nam !== undefined) {
                                var num = parseInt(inventory[nome_var]['Quantita']);
                                num = num + parseInt(args[3]);
                                inventory[nome_var]['Quantita'] = num;
                                qut = num;
                            } else {
                                var oggetto = {};
                                var ogg_temp = {};
                                ogg_temp['Nome'] = nome_var;
                                ogg_temp['Quantita'] = parseInt(args[3]);
                                ogg_temp['Sincronia'] = Scheda_Object['Sincronia'];
                                oggetto[nome_var] = ogg_temp;
                                qut = parseInt(args[2]);
                                Object.assign(inventory, oggetto);
                            }

                            methodDB.settab_db("Schede_PG");
                            methodDB.inventory_update(Scheda_PG['_id'], inventory);

                            if (delete_record == true) {
                                methodDB.settab_db("Lista_scambio");
                                methodDB.delete_db(Scheda_Object['_id']);
                            } else {
                                methodDB.settab_db("Lista_scambio");
                                methodDB.Object_scambio_update(Scheda_Object['_id'], Scheda_Object);
                            }

                            if (Scheda_Object['Sincronia'] == "1") {
                                var sinc = "Si";
                            } else {
                                var sinc = "No";
                            }

                            let meber_user = client.users.cache.find(user => user.id == Scheda_Object['ID_Discord']);

                            Container = new Discord.MessageEmbed();
                            Container.setColor(clor_gen.rand_Color())
                                .setTitle('Operazione di Rimozione e Riassegnazione Oggetto Completata')
                                .addField('Schada', Scheda_PG['Nome_PG'])
                                .setThumbnail(meber_user.displayAvatarURL(), true)
                                .addField("Nome", nome_var)
                                .addField("Quantità", qut)
                                .addField("Sincronia", sinc)
                                .addField("Ogetti Rimanenti in vendita", num_ojb)
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL());
                            message.channel.send(Container);
                        } else {
                            emit_print_5(message);
                            return 1;
                        }
                    } else {
                        emit_print_5(message);
                        return 1;
                    }
                } else {
                    emit_print_5(message);
                    return 1;
                }
            } else if (args[0] == "compra") {
                if (args[1]) {
                    var user_call = getUserFromMention(args[1]);
                    if (user_call == message.author.id && args[2].length == 24 && isNaN(parseInt(args[3])) == false && parseInt(args[3]) > 0) {
                        if (args[4]) {
                            // Get Scheda Compratore 
                            var Scheda = await get_Scheda_pg(args[2]);
                            var Scheda_PG = Scheda[0];
                            if (Scheda_PG == 1) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Scheda PG non trovata');
                                message.channel.send(Container);
                                return 1;
                            }

                            // Get Scheda Oggetto
                            var Scheda_Ojc_temp = await get_Object_scambio(args[4]);
                            var Scheda_Object = Scheda_Ojc_temp[0];
                            if (Scheda_Object == 1 || Scheda_Object == undefined) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Ogetto non trovato');
                                message.channel.send(Container);
                                return 1;
                            }

                            // Get Scheda Venditore 
                            var sender_money = true;
                            var Scheda = await get_Scheda_pg(Scheda_Object['ID_Sheda']);
                            var Scheda_PG_vendor = Scheda[0];
                            if (typeof Scheda_Object == 'undefined') {
                                sender_money = false;
                            }
                            if (Scheda_Object !== undefined) {
                                sender_money = false;
                            }
                            if (Scheda_PG_vendor == 1) {
                                sender_money = false;
                            }


                            if (Scheda_PG['_id'] == Scheda_Object['ID_Sheda']) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Non puoi ricomprare l\'oggetto per rimuovere usare \n(**scambio rimuovi**)');
                                message.channel.send(Container);
                                return 1;
                            } else if (Scheda_PG['Nome_Discord'] == Scheda_Object['ID_Discord']) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Cosa pensi di fare broker system');
                                message.channel.send(Container);
                                return 1;
                            }

                            // Calcolo residuo scheda oggetto
                            var costo = Scheda_Object['Prezzo'];
                            var num_ojb = Scheda_Object['Quantita'];
                            var nome_var = Scheda_Object['Nome'];
                            var id_sheda = Scheda_PG['_id'];
                            var inventory = Scheda_PG['Inventory'];
                            var money_pg = Scheda_PG['Money'];
                            var check_nam = inventory[nome_var];
                            var consto_fin = costo * parseInt(args[3]);
                            money_pg = money_pg - consto_fin
                            if (money_pg >= 0) {
                                var delete_record = false;
                                num_ojb = num_ojb - parseInt(args[3]);
                                if (num_ojb < 0) {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Oggetti insufficienti per la richiesta');
                                    message.channel.send(Container);
                                    return 1;
                                } else {
                                    if (num_ojb == 0 || isNaN(num_ojb) == true) {
                                        delete_record = true
                                    } else {
                                        Scheda_Object['Quantita'] = num_ojb;
                                    }
                                }
                            } else {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Soldi insufficienti per la acquisto');
                                message.channel.send(Container);
                                return 1;
                            }

                            // Controllo Presenza già a inventario
                            var check_nam = inventory[Scheda_Object['Nome']];
                            if (check_nam !== undefined) {
                                var num = parseInt(inventory[nome_var]['Quantita']);
                                num = num + parseInt(args[3]);
                                inventory[nome_var]['Quantita'] = num;
                                qut = num;
                            } else {
                                var oggetto = {};
                                var ogg_temp = {};
                                ogg_temp['Nome'] = nome_var;
                                ogg_temp['Quantita'] = parseInt(args[3]);
                                ogg_temp['Sincronia'] = Scheda_Object['Sincronia'];
                                oggetto[nome_var] = ogg_temp;
                                qut = parseInt(args[2]);
                                Object.assign(inventory, oggetto);
                            }

                            // Asegnazione oggetto e rimozione soldi
                            methodDB.settab_db("Schede_PG");
                            methodDB.inventory_update(id_sheda, inventory);
                            methodDB.money_update(id_sheda, money_pg);

                            if (delete_record == true) {
                                methodDB.settab_db("Lista_scambio");
                                methodDB.delete_db(Scheda_Object['_id']);
                            } else {
                                methodDB.settab_db("Lista_scambio");
                                methodDB.Object_scambio_update(Scheda_Object['_id'], Scheda_Object);
                            }

                            if (sender_money == true) {
                                var money_pg_new = Scheda_PG_vendor['Money'] + consto_fin;
                                methodDB.settab_db("Schede_PG");
                                methodDB.money_update(Scheda_PG_vendor['_id'], money_pg_new);
                            }

                            if (Scheda_Object['Sincronia'] == "1") {
                                var sinc = "Si";
                            } else {
                                var sinc = "No";
                            }

                            Container = new Discord.MessageEmbed();
                            Container.setColor(clor_gen.rand_Color())
                                .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                                // .setThumbnail(member.user.displayAvatarURL(),true)
                                .addField("Nome", nome_var)
                                .addField("Quantità", qut)
                                .addField("Sincronia", sinc)
                                .setThumbnail(botavatar.displayAvatarURL())
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL());
                            message.channel.send(Container);
                        } else {
                            emit_print_3(message);
                            return 1;
                        }
                    } else {
                        emit_print_3(message);
                        return 1;
                    }
                } else {
                    emit_print_3(message);
                    return 1;
                }
            } else if (args[0] == "list") {
                var on_sevice_db = await methodDB.open_db();
                if (on_sevice_db != 1) {
                    methodDB.settab_db("Lista_scambio");
                    var cursor = methodDB.getAll_Object();
                    cursor.then(async function (result) {
                        if (typeof result !== 'undefined' && result.length > 0) {
                            var obj_N = result;
                            var i = 0;
                            var j = 0;
                            var x = 0;
                            var obj_string = [];
                            for (var i in obj_N) {
                                obj_string[j] += '**ID aqquisto:** ' + obj_N[i]['ID Shop'] + '\n**Nome:** ' + obj_N[i]['Nome'] + '\n**Quantità:** ' + obj_N[i]['Quantita'] + '\n**Prezzo:** ' + obj_N[i]['Prezzo'] + 'mo\n\n';
                                obj_string[j] = obj_string[j].replace("undefined", "");
                                x++
                                if (x == 10) {
                                    x = 0;
                                    j++
                                }
                            }
                            const embeds = [];
                            for (let i = 0; i <= obj_string.length; i++) {
                                embeds.push(new Discord.MessageEmbed().addField('Pagine', i, true));
                            }
                            const Embeds = new Pagination.Embeds()
                                .setArray(embeds)
                                .setAuthorizedUsers([message.author.id])
                                .setChannel(message.channel)
                                .setPageIndicator(false)
                                .setColor(clor_gen.rand_Color())
                                .setThumbnail(botavatar.displayAvatarURL())
                                .setTitle('Vetrina Scambi')
                                .addField("N:", obj_string.length, true)
                                .addField("Articoli: ", obj_string[0])
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
                            Container.setColor([225, 0, 0])
                                .setTitle('Vetrina Scambi')
                                .setThumbnail(botavatar.displayAvatarURL())
                                .addField("Vetrina", "Vuota");
                            message.channel.send(Container);
                        }
                    });
                }
            } else {
                emit_print_4(message);
                return 1;
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
}

function emit_print_1(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando scambio`)
        .setTitle('Sintassi:\n **' + config.prefix + 'scambio vendi** [@utente][ID_Scheda][Quantità][Prezzo][Nome oggetto]');
    message.channel.send(Container);
}

// function emit_print_2(message) {
//     var Container = new Discord.MessageEmbed();
//     Container.setColor([255, 0, 0])
//         .setAuthor(`Comando scambio`)
//         .setTitle('Sintassi:\n **' + config.prefix + 'scambio edit** [@utente][ID_Scheda][Quantità][Prezzo][ID_Assegnato]');
//     message.channel.send(Container);
// }

function emit_print_3(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando scambio`)
        .setTitle('Sintassi:\n **' + config.prefix + 'scambio compra** [@utente][ID_Scheda][Quantità][ID_aqquisto]');
    message.channel.send(Container);
}

function emit_print_4(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando scambio`)
        .setTitle('Sintassi:\n **' + config.prefix + 'scambio** [Opzione][@utente][ID_Scheda][Quantità][Prezzo][ID/Nome oggetto/ID_aqquisto]');
    message.channel.send(Container);
}

function emit_print_5(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando scambio`)
        .setTitle('Sintassi:\n **' + config.prefix + 'scambio rimuovi** [@utente][ID_Scheda][Quantità][ID_aqquisto]');
    message.channel.send(Container);
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

async function get_Object_scambio(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Lista_scambio");
        var cursor = methodDB.serachbyid_Object(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

function getUserFromMention(mention) {
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return mention;
    }
}
