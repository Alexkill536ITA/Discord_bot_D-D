/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const fs = require('fs');
const color = require('ansi-colors');
const { v4: uuidv4 } = require('uuid');
const { DiscordAPIError } = require("discord.js");
const { MongoClient, Cursor } = require("mongodb");
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
            // get itemes 
            if (args[3]) {
                var file_name = uuidv4();
                if (isNaN(parseInt(args[3]))) {
                    var oggetto_mysql;
                    var nome = args[3];
                    for (let index = 4; index < args.length; index++) {
                        nome += " "+args[index];
                    }
                    await get_obj_By_Nome_Mysql(nome, file_name);
                    await sleep(500);
                    oggetto_mysql = await get_itmes_temp(file_name);
                } else {
                    await get_obj_By_Id_Mysql(args[3], file_name);
                    await sleep(500);
                    oggetto_mysql = await get_itmes_temp(file_name);
                }
                if (oggetto_mysql == 1) {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Richiesta di: ${message.author.username}`)
                        .setTitle('Errore Oggetto non trovato');
                    message.channel.send(Container);
                    return 1;
                }
                await sleep(1000);
                await delete_itmes_temp(file_name);
            } else {
                emit_print(message);
                return 1;
            }

            // get Scheda PG
            if (args[1].length == 24) {
                var Scheda = await get_Scheda_pg(args[1]);
                var Scheda_PG = Scheda[0];
                if (Scheda_PG == 1) {
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
            
            // add sub items Scheda PG
            if (!isNaN(parseInt(args[3]))) {
                if (args[0] == "add" || args[0] == "-a") {
                var nome_var = oggetto_mysql['Nome'];
                var inventory = Scheda_PG['Inventory'];
                var check_nam = inventory[nome_var];
                if (check_nam !== undefined) {
                    var num = parseInt(inventory[nome_var]['Quantita']);
                    num = num+parseInt(args[2]);
                    inventory[nome_var]['Quantita'] = num;
                } else {
                    var oggetto = {};
                    oggetto_mysql['Quantita'] = parseInt(args[2]);
                    oggetto[nome_var] = oggetto_mysql
                    Object.assign(inventory, oggetto);
                }
                methodDB.inventory_update(args[1], inventory);
                Container = new Discord.MessageEmbed();
                Container.setColor([255, 0, 0])
                    .setTitle('Schada: '+ message.author.username)
                    .setThumbnail(message.author.displayAvatarURL(),true)
                    .addField("Nome", oggetto_mysql['Nome'])
                    .addField("Quantità", inventory[nome_var]['Quantita'])
                    .addField("Sincronia", oggetto_mysql['Sincronia'])
                    .setTimestamp()
                    .setFooter("Data", message.author.displayAvatarURL());
                message.channel.send(Container);
                } else if (args[0] == "sub" || args[0] == "-s") {
                    var nome_var = oggetto_mysql['Nome'];
                    var inventory = Scheda_PG['Inventory'];
                    var check_nam = inventory[nome_var];
                    if (check_nam !== undefined) {
                        var num = inventory[nome_var]['Quantita'];
                        num = num-parseInt(args[2]);
                        if (num <= 0) {
                            delete inventory[nome_var];
                            var num_memory = "Non possiede più l'oggetto";
                        } else {
                            inventory[nome_var]['Quantita'] = num;
                            var num_memory = inventory[nome_var]['Quantita'];
                        }
                        methodDB.inventory_update(args[1], inventory);
                        Container.setColor([255, 0, 0])
                            .setTitle('Schada: '+ message.author.username)
                            .setThumbnail(message.author.displayAvatarURL(),true)
                            .addField("Nome", oggetto_mysql['Nome'])
                            .addField("Quantità", num_memory)
                            .addField("Sincronia", oggetto_mysql['Sincronia'])
                            .setTimestamp()
                            .setFooter("Data", message.author.displayAvatarURL());
                        message.channel.send(Container);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Ogetto non rovato: `+message.author.username)
                            .setTitle('Ogetto non è prensente nel\'inventario');
                        message.channel.send(Container);
                    }
                } else {
                    emit_print(message);
                    return 1;
                }    
            } else {
                emit_print(message);
                return 1;
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

async function get_obj_By_Id_Mysql(id_serach, name_file) {
    var ogetto_selct;
    var ogetto_selct_new;
    var nome_var;
    db.query('SELECT * FROM `ogetti` WHERE `id`=? LIMIT 1', [id_serach], (err, results) => {
        if (err) {
            ogetto_selct_new = "1";
            
        } else {
            ogetto_selct = results[0];
            nome_var = ogetto_selct['nome'];
            if (ogetto_selct['sincronia'] == 1) {
                    var sinc = 'Si';
            } else {
                    var sinc = 'No';
            }
            ogetto_selct_new = '{ "Nome": "'+nome_var+'", "Quantita": 0, "Sincronia": "'+sinc+'" }';
            
        }
        fs.appendFile('./temp/'+name_file+'.temp', ogetto_selct_new, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

async function get_obj_By_Nome_Mysql(Name_search, name_file) {
    var ogetto_selct;
    var ogetto_selct_new = {};
    var nome_var;
    db.query('SELECT * FROM `ogetti` WHERE `nome`=? LIMIT 1', [Name_search], (err, results) => {
        if (err) {
            ogetto_selct_new = 1;
        } else {
            ogetto_selct = results[0];
            nome_var = ogetto_selct['nome'];
            if (ogetto_selct['sincronia'] == 1) {
                var sinc = 'Si';
            } else {
                var sinc = 'No';
            }
            ogetto_selct_new = '{ "Nome": "'+nome_var+'", "Quantita": 0, "Sincronia": "'+sinc+'" }';
            
        }
        fs.appendFile('./temp/'+name_file+'.temp', ogetto_selct_new, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {    
        var cursor = methodDB.serachbyid(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

async function get_itmes_temp(name_file) { 
    var oggetto;
    var path = './temp/'+name_file+'.temp';
    const data = fs.readFileSync(path, 'utf8');
    oggetto = JSON.parse(data);
    return oggetto;
}

async function delete_itmes_temp(name_file) {
    var path = './temp/'+name_file+'.temp';
    try {
        fs.unlinkSync(path);
    } catch(err) {
        console.log("[ "+color.red('ERROR')+" ] Imposibile eliminare il File Temp: "+name_file+".temp\n"+err);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}