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
    name: 'pgoggetto',
    description: "Aggiungi o togli oggetto",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ '+color.cyan('DEBUG')+' ] Event Execute add_sub_item');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if(message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            // get itemes 
            if (args[3]) {
                if (isNaN(parseInt(args[3]))) {
                    var nome = args[3];
                    for (let index = 4; index < args.length; index++) {
                        nome += " "+args[index];
                    }
                    var on_sevice_db = await methodDB.open_db();
                    if (on_sevice_db != 1) {    
                        methodDB.settab_db("Oggeti_Di_Gioco");
                        var cursor = methodDB.serachbynome_obj(nome);
                        cursor.then(async function (result) {
                            if(result) {
                                if (result == null) {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Oggetto non trovato');
                                    message.channel.send(Container);
                                    return 1;
                                } else {
                                    if (args[1].length == 24) {
                                        var Scheda = await get_Scheda_pg(args[1]);
                                        if (Scheda != null) {
                                            var complete = add_sub(message, args, Scheda[0], result);
                                            if (complete == 1) {
                                                emit_print(message);
                                                return 1;
                                            } else if (complete == 2) {
                                                Container.setColor([255, 0, 0])
                                                    .setAuthor(`Ogetto non rovato: `+message.author.username)
                                                    .setTitle('Ogetto non è prensente nel\'inventario');
                                                message.channel.send(Container);
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
                                    } else {
                                        emit_print(message);
                                        return 1;
                                    }
                                }
                            }
                        });
                    }
                } else {
                    var on_sevice_db = await methodDB.open_db();
                    if (on_sevice_db != 1) {    
                        methodDB.settab_db("Oggeti_Di_Gioco");
                        var cursor = methodDB.serachbyid_obj(args[3]);
                        cursor.then(async function (result) {
                            if(result) {
                                if (result == null) {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Oggetto non trovato');
                                    message.channel.send(Container);
                                    return 1;
                                } else {
                                    if (args[1].length == 24) {
                                        var Scheda = await get_Scheda_pg(args[1]);
                                        if (Scheda != null) {
                                            var complete = add_sub(message, args, Scheda[0], result);
                                            if (complete == 1) {
                                                emit_print(message);
                                                return 1;
                                            } else if (complete == 2) {
                                                Container.setColor([255, 0, 0])
                                                    .setAuthor(`Ogetto non rovato: `+message.author.username)
                                                    .setTitle('Ogetto non è prensente nel\'inventario');
                                                message.channel.send(Container);
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
                                    } else {
                                        emit_print(message);
                                        return 1;
                                    }
                                }
                            }
                        });
                    }
                }
            } else {
                emit_print(message);
                return 1;
            }

        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}

function add_sub(message, args, Scheda_PG, result) {
    // add sub items Scheda PG
    var colrs_set = clor_gen.rand_Color();
    if (args[0] == "add" || args[0] == "-a") {
        var qut = 0;
        var nome_var = result.nome;
        var inventory = Scheda_PG['Inventory'];
        var check_nam = inventory[nome_var];
        if (check_nam !== undefined) {
            var num = parseInt(inventory[nome_var]['Quantita']);
            num = num+parseInt(args[2]);
            inventory[nome_var]['Quantita'] = num;
            qut = num;
        } else {
            var oggetto = {};
            var ogg_temp = {};
            ogg_temp['Nome'] = nome_var;
            ogg_temp['Quantita'] = parseInt(args[2]);
            ogg_temp['Sincronia'] = result.sincronia;
            oggetto[nome_var] = ogg_temp; 
            qut = parseInt(args[2]);
            Object.assign(inventory, oggetto);
        }
        methodDB.inventory_update(args[1], inventory);
        let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
        Container = new Discord.MessageEmbed();
        Container.setColor(colrs_set)
            .setTitle('Schada: '+ Scheda_PG.Nome_PG)
            .setThumbnail(member.user.displayAvatarURL(),true)
            .addField("Nome", result.nome)
            .addField("Quantità", qut)
            .addField("Sincronia", result.sincronia)
            .setTimestamp()
            .setFooter("Data", message.author.displayAvatarURL());
        message.channel.send(Container);
    } else if (args[0] == "sub" || args[0] == "-s") {
        var qut = 0;
        var nome_var = result.nome;
        var inventory = Scheda_PG['Inventory'];
        var check_nam = inventory[nome_var];
        if (check_nam !== undefined) {
            var num = parseInt(inventory[nome_var]['Quantita']);
            num = num-parseInt(args[2]);
            if (num <= 0 || isNaN(num) == true) {
                var num_memory = "Non possiede più l'oggetto";
                let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
                Container = new Discord.MessageEmbed();
                Container.setColor(colrs_set)
                    .setTitle('Schada: '+ Scheda_PG.Nome_PG)
                    .setThumbnail(member.user.displayAvatarURL(),true)
                    .addField("Nome", nome_var)
                    .addField("Quantità", num_memory)
                    .addField("Sincronia", inventory[nome_var]['Sincronia'])
                    .setTimestamp()
                    .setFooter("Data", message.author.displayAvatarURL());
                delete inventory[nome_var];
            } else {
                inventory[nome_var]['Quantita'] = num;
                var num_memory = inventory[nome_var]['Quantita'];
                Container = new Discord.MessageEmbed();
                Container.setColor(colrs_set)
                    .setTitle('Schada: '+ message.author.username)
                    .setThumbnail(message.author.displayAvatarURL(),true)
                    .addField("Nome", nome_var)
                    .addField("Quantità", num_memory)
                    .addField("Sincronia", inventory[nome_var]['Sincronia'])
                    .setTimestamp()
                    .setFooter("Data", message.author.displayAvatarURL());
            }
            methodDB.inventory_update(args[1], inventory);
            message.channel.send(Container);
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando pgoggetto`)
        .setTitle('Sintassi:\n **'+config.prefix+'pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome oggetto]');
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