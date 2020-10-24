/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");
const db = require('../mysql');

module.exports = {
    name: 'oggetto',
    description: "get info items",
    async execute(client,message, args){
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if(message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            if (args[0]) {
                if (isNaN(parseInt(args[0]))) {
                    var nome = args[0];
                    for (let index = 1; index < args.length; index++) {
                        nome += " "+args[index];
                    }
                    db.query('SELECT * FROM `oggetti` WHERE `nome`=? LIMIT 1',[nome], async (error, results) => {
                        if (!results || results.length == 0) {
                            Container.setColor([255, 0, 0])
                            .setAuthor(`Richiesta di: ${message.author.username}`)
                            .setTitle('Errore Oggetto non trovato');
                            message.channel.send(Container);
                        } else {
                            emiter_output(client,message,results);
                        }
                    });
                } else {
                    db.query('SELECT * FROM `oggetti` WHERE `id`=? LIMIT 1',[args[0]], async (error, results) => {
                        if (!results || results.length == 0) {
                            Container.setColor([255, 0, 0])
                            .setAuthor(`Richiesta di: ${message.author.username}`)
                            .setTitle('Errore Oggetto non trovato');
                            message.channel.send(Container);
                        } else {
                            emiter_output(client,message,results);
                        }
                    });
                }
            } else {
                Container.setColor([255, 0, 0])
                .setAuthor(`Comando Oggetto`)
                .setTitle('Sintassi **&oggetto** [Id/Nome]');
                message.channel.send(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}

async function emiter_output(client,message,cursor) {
    Container = new Discord.MessageEmbed();
    let botavatar = client.users.cache.find(user => user.username == "Infinity Dice");
    var text_obj = `${cursor[0].effetto}`;
    var text_sen = [];
    if (cursor[0].note == '') {
        var note = '\u200b';
    } else {
        var note = cursor[0].note;
    }
    if (cursor[0].sincronia == 1) {
        var sinc = "SI";
    } else {
        var sinc = "NO";
    }
    Container.setColor([255, 0, 0])
    .setThumbnail(botavatar.displayAvatarURL())
    .setAuthor(`Richiesta di: ${message.author.username}`)
    .setTitle('Oggetto: '+cursor[0].nome)
    .addField('Id', cursor[0].Id,true)
    .addField('Rarità', cursor[0].rarita,true)
    .addField('Costo', cursor[0].costo,true)
    .addField('Unità/Note', note,true)
    .addField('Sinronia', sinc,true);
    if (text_obj != '' && text_obj.length <= 1024) {
        Container.addField('Effetto: ', text_obj);
        message.channel.send(Container);
    } else if (text_obj.length > 1024 && text_obj.length <= 2000) {
        Container.addField('Effetto: ', ':arrow_down:');
        message.channel.send(Container);
        await message.channel.send(':large_blue_diamond:------------------:regional_indicator_s::regional_indicator_t::regional_indicator_a::regional_indicator_r::regional_indicator_t:-------------------:large_blue_diamond:');
        message.channel.send(text_obj);
        await message.channel.send(':large_blue_diamond:--------------------:regional_indicator_e::regional_indicator_n::regional_indicator_d:---------------------:large_blue_diamond:');
    } else if (text_obj.length > 2000) {
        Container.addField('Effetto: ', ':arrow_down:');
        await message.channel.send(Container);
        await message.channel.send(':large_blue_diamond:------------------:regional_indicator_s::regional_indicator_t::regional_indicator_a::regional_indicator_r::regional_indicator_t:-------------------:large_blue_diamond:');
        var x = 0;
        var j = 0;
        for (let i = 0; i < text_obj.length; i++) {
            text_sen[j] += text_obj.charAt(i);
            text_sen[j] = text_sen[j].replace("undefined","");
            x++;
            if (x == 1999) {
                x = 0;
                j++;
            }
        }
        for (let y = 0; y <= j ; y++) {
            await message.channel.send(text_sen[y]);
            await sleep(500);
        }
        await message.channel.send(':large_blue_diamond:--------------------:regional_indicator_e::regional_indicator_n::regional_indicator_d:---------------------:large_blue_diamond:');
    } else {
        Container.addField('Effetto: ', 'Non ha Effetto');
        message.channel.send(Container);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}