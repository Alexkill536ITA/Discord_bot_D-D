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
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");
const bcrypt = require('bcryptjs');

module.exports = {
    name: 'resetpassword',
    description: "Recover Password",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute Recover_Password');
        }
        var Container = new Discord.MessageEmbed();
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            var on_sevice_db = await methodDB.open_db();
            if (on_sevice_db != 1) {
                methodDB.settab_db("Utenti_web")
                var cursor = methodDB.serachbyid_user(message.author.id);
                cursor.then(async function (result) {
                    if (result != null) {
                        var temp_pass = generatePassword();
                        let hashedPassword = await bcrypt.hash(temp_pass, 8)
                        methodDB.password_update(result._id, hashedPassword);
                        Container.setColor(colrs_set)
                            .setTitle('Richiesta Completata')
                            .setDescription(`🆔 Richiesta di: ${message.author.username}`)
                            .setTimestamp()
                            .setFooter("Data", message.author.displayAvatarURL())
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
                        message.channel.send(Container);
                        Container = new Discord.MessageEmbed();
                        Container.setColor(colrs_set)
                            .setTitle('Reset Password')
                            .setDescription(message.author.username + ": " + message.author + "\n Usare la Password appena generata per loggarsi")
                            .addField("Username", result.username)
                            .addField("Password Temp", temp_pass);
                        message.author.send(Container);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setTitle('ERROR Reset Password')
                            .setDescription("ERRORE Impossibile Trovare Utente o Non esiste");
                        message.author.send(Container);
                    }
                });
            } else {
                Container.setColor([255, 0, 0])
                    .setTitle('ERROR Reset Password')
                    .setDescription("ERRORE Impossibile completare operazione contttatare il tecnico **@Tecnico Discord**");
                message.author.send(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');
            message.channel.send(Container);
        }
    }
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!?+-*^",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}