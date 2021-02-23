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
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            if (args[0] == "vendi") {
                var user_call = getUserFromMention(args[1]);
                if (user_call == message.author.id && args[2].length == 24 && isNaN(parseInt(args[3])) == false && parseInt(args[3]) > 0 && isNaN(parseInt(args[4])) == false && parseInt(args[4]) > 0) {
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
                                if (num <= 0 || isNaN(num) == true) {
                                    delete inventory[nome];
                                } else {
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
                            oggetto['Sincronia'] = inventory[nome]['Sincronia'];
                            oggetto['Prezo'] = parseInt(args[4]);

                            methodDB.settab_db("Lista_scambio");
                            methodDB.insert_db(oggetto);

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
                    return 1;
                }
                // } else if (args[0] == "edit") {
                //     if (args[1] == message.author.id && args[2].lengh == 24 && isNaN(parseInt(args[3])) == false && parserInt(args[3]) > 0 && isNaN(parseInt(args[4])) == false && parseInt(args[4]) > 0) {
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
            } else if (args[0] == "compra") {
                if (args[1] == message.author.id && args[2].lengh == 24 && isNaN(parseInt(args[3])) == false && parserInt(args[3]) > 0) {
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
                        if (Scheda_Object == 1) {
                            Container.setColor([255, 0, 0])
                                .setAuthor(`Richiesta di: ${message.author.username}`)
                                .setTitle('Errore Ogetto non trovato');
                            message.channel.send(Container);
                            return 1;
                        }

                        // Get Scheda Venditore 
                        var sender_money = true;
                        var Scheda = await get_Scheda_pg(Scheda_Object['ID_Scheda_venditore']);
                        var Scheda_PG_vendor = Scheda[0];
                        if (Scheda_PG_vendor == 1) {
                            sender_money = false;
                        }

                        // Calcolo residuo scheda oggetto
                        var costo = Scheda_Object['Prezzo'];
                        var num_ojb = Scheda_Object['Quantita'];
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
                        var check_nam = inventory[Scheda_Object['Nome_Oggetto']];
                        if (check_nam !== undefined) {
                            var num = parseInt(inventory[nome_var]['Quantita']);
                            num = num + parseInt(args[1]);
                            inventory[nome_var]['Quantita'] = num;
                            qut = num;
                        } else {
                            var oggetto = {};
                            var ogg_temp = {};
                            ogg_temp['Nome'] = nome_var;
                            ogg_temp['Quantita'] = parseInt(args[1]);
                            ogg_temp['Sincronia'] = result.sincronia;
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
                    } else {
                        emit_print_3(message);
                        return 1;
                    }
                } else {
                    emit_print_3(message);
                    return 1;
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

function emit_print_2(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando scambio`)
        .setTitle('Sintassi:\n **' + config.prefix + 'scambio edit** [@utente][ID_Scheda][Quantità][Prezzo][ID_Assegnato]');
    message.channel.send(Container);
}

function emit_print_3(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando scambio`)
        .setTitle('Sintassi:\n **' + config.prefix + 'scambio compra** [@utente][ID_Scheda][Quantità][ID/Nome oggetto]');
    message.channel.send(Container);
}

function emit_print_4(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando scambio`)
        .setTitle('Sintassi:\n **' + config.prefix + 'scambio** [Opzione][@utente][ID_Scheda][Quantità][ID/Nome oggetto/ID_Assegnato]');
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
        var cursor = methodDB.serachbyid(id_serach);
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
