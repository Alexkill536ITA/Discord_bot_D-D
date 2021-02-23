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
                if (args[1] == message.author.id && args[2].lengh == 24 && isNaN(parseInt(args[3])) == false && parserInt(args[3]) > 0 && isNaN(parseInt(args[4])) == false && parseInt(args[4]) > 0) {
                    if (args[5]) {
                        var nome = "";
                        for (let i = 5; i < args.length; i++) {
                            if (stp == 1) {
                                nome = args[i];
                                stp = 0;
                            } else {
                                nome += " " + args[i];
                            }
                        }
                        nome = String(nome).toLowerCase();

                        var Scheda = await get_Scheda_pg(args[1]);
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
                            num = num - parseInt(args[3]);
                            if (num <= 0 || isNaN(num) == true) {
                                delete inventory[nome];
                            } else {
                                inventory[nome]['Quantita'] = num;
                            }
                            methodDB.inventory_update(args[1], inventory);

                            oggetto['ID Shop'] = id_generate;
                            oggetto['Nome'] = nome;
                            oggetto['Quantita'] = parseInt(args[3]);
                            oggetto['Prezo'] = parseInt(args[4])
                            // Object.assign(inventory_db, oggetto);

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
                    }
                } else {
                    emit_print_1(message);
                }
            } else if (args[0] == "edit") {
                
            } else if (args[0] == "compra"){

            } else {
                emit_print_4(message);
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
