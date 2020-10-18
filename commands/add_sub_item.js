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
const db = require('../mysql');
const config = require("../config.json");

module.exports = {
    name: 'pgoggetto',
    description: "Aggiungi o togli oggetto",
    async execute(client, message, args) {
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if(message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            if (args[0] == "add" || args[0] == "-a") {
                if (args[1].length == 24) {
                    if (args[3]) {
                        if (!isNaN(parseInt(args[2]))) {
                            var ogetto_selct;
                            var ogetto_selct_new = {};
                            var nome_var; 
                            db.query('SELECT * FROM `ogetti` WHERE `id`=? LIMIT 1', [args[3]], (error, results) => {
                                if (!results || results.length == 0) {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Oggetto non trovato');
                                    message.channel.send(Container);
                                } else {
                                    ogetto_selct = results[0];
                                    nome_var = ogetto_selct['nome'];
                                    if (ogetto_selct['sincronia'] == 1) {
                                        var sinc = 'Si';
                                    } else {
                                        var sinc = 'No';
                                    }
                                    ogetto_selct_new[nome_var] = { 'Nome': nome_var, 'Quantita': 0, 'Sincronia': sinc };
                                }
                            });
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {    
                                var cursor = methodDB.serachbyid(args[1]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var scheda_pg = result;
                                        var inventory = scheda_pg['Inventory'];
                                        var check_nam = inventory[nome_var];
                                        // console.log(result);
                                        if (check_nam !== undefined) {
                                            var num = parseInt(inventory[nome_var]['Quantita']);
                                            num = num+parseInt(args[2]);
                                            inventory[nome_var]['Quantita'] = num;
                                            methodDB.inventory_update(args[1], inventory);
                                        } else {
                                            console.log(ogetto_selct_new);
                                            ogetto_selct_new[nome_var]['Quantita'] = parseInt(args[2]);
                                            Object.assign(inventory, ogetto_selct_new);
                                            methodDB.inventory_update(args[1], inventory);
                                        }
                                    }
                                });
                            }
                        } else {
                            var nome = args[3];
                            for (let index = 4; index < args.length; index++) {
                                nome += " "+args[index];
                            }
                            var ogetto_selct;
                            var ogetto_selct_new = {};
                            var nome_var; 
                            db.query('SELECT * FROM `ogetti` WHERE `nome`=? LIMIT 1',[nome], (error, results) => {
                                if (!results || results.length == 0) {
                                    Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Oggetto non trovato');
                                    message.channel.send(Container);
                                } else {
                                    ogetto_selct = results[0];
                                    nome_var = ogetto_selct['nome'];
                                    if (ogetto_selct['sincronia'] == 1) {
                                        var sinc = 'Si'
                                    } else {
                                        var sinc = 'No'
                                    }
                                    ogetto_selct_new[nome_var] = {'Nome':nome_var, 'Quantita':0, 'Sincronia':sinc};
                                }
                            });
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {    
                                var cursor = methodDB.serachbyid(args[1]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var scheda_pg = result;
                                        var inventory = scheda_pg['Inventory'];
                                        var check_nam = inventory[nome_var];
                                        if (check_nam !== undefined) {
                                            var num = parseInt(inventory[nome_var]['Quantita']);
                                            num = num+parseInt(args[2]);
                                            inventory[nome_var]['Quantita'] = num;
                                            methodDB.inventory_update(args[1], inventory);
                                        } else {
                                            ogetto_selct_new[nome_var]['Quantita'] = parseInt(args[2]);
                                            Object.assign(inventory, ogetto_selct_new);
                                            methodDB.inventory_update(args[1], inventory);
                                        }
                                    }
                                });
                            }
                        }
                    } else {
                        emit_print(message);
                    }
                } else {
                    emit_print(message);
                }
            } else if (args[0] == "sub" || args[0] == "-s") {
                if (args[1].length == 24) {
                    if (args[3]) {
                        if (!isNaN(parseInt(args[2]))) {
                            db.query('SELECT * FROM `ogetti` WHERE `id`=? LIMIT 1',[args[3]], async (error, results) => {
                                if (!results || results.length == 0) {
                                    Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Oggetto non trovato');
                                    message.channel.send(Container);
                                } else {
                                    ogetto_selct = results[0];
                                    nome_var = ogetto_selct['nome'];
                                }
                            });
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {    
                                var cursor = new methodDB.serachbyid(args[1]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var scheda_pg = result;
                                        var inventory = scheda_pg['Inventory'];
                                        var check_nam = inventory[nome_var];
                                        if (check_nam !== undefined) {
                                            console.log(inventory[nome_var]['Quantita']);
                                            var num = inventory[nome_var]['Quantita'];
                                            num = num-parseInt(args[2]);
                                            if (num <= 0) {
                                                delete inventory[nome_var];
                                            } else {
                                                inventory[nome_var]['Quantita'] = num;
                                            }
                                            methodDB.inventory_update(args[1], inventory);
                                        } else {
                                            Container.setColor([255, 0, 0])
                                                .setAuthor(`[ ERROR ] Ogetto non rovato: `+message.author.username)
                                                .setTitle('Ogetto non è prensente nel\'inventario');
                                            message.channel.send(Container);
                                        }
                                    }
                                });
                            }
                        } else {
                            var nome = args[3];
                            for (let index = 4; index < args.length; index++) {
                                nome += " "+args[index];
                            }
                            var ogetto_selct;
                            var nome_var; 
                            db.query('SELECT * FROM `ogetti` WHERE `nome`=? LIMIT 1',[nome], async (error, results) => {
                                if (!results || results.length == 0) {
                                    Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Oggetto non trovato');
                                    message.channel.send(Container);
                                } else {
                                    ogetto_selct = results[0];
                                    nome_var = ogetto_selct['nome'];
                                }
                            });
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {    
                                var cursor = methodDB.serachbyid(args[1]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var scheda_pg = result;
                                        var inventory = scheda_pg['Inventory'];
                                        var check_nam = inventory[nome_var];
                                        if (check_nam !== undefined) {
                                            var num = parseInt(inventory[nome_var]['Quantita']);
                                            num = num-parseInt(args[2]);
                                            if (num <= 0) {
                                                delete inventory[nome_var];
                                            } else {
                                                inventory[nome_var]['Quantita'] = num;
                                            }
                                            methodDB.inventory_update(args[1], inventory);
                                        } else {
                                            Container.setColor([255, 0, 0])
                                                .setAuthor(`[ ERROR ] Ogetto non rovato: `+message.author.username)
                                                .setTitle('Ogetto non è prensente nel\'inventario');
                                            message.channel.send(Container);
                                        }
                                    }
                                });
                            }
                        }
                    } else {
                        emit_print(message);
                    }
                } else {
                    emit_print(message);
                }
            } else {
                emit_print(message);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando pgoggetto`)
        .setTitle('Sintassi:\n **&pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome oggetto]');
    message.channel.send(Container);
}