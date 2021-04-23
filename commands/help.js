/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const globals_var = require('../script/globals_var.js');
const config = require("../config.json");
const vers = require("../CheckSum.json");
const color = require("ansi-colors");
const { version, versions } = require("process");

module.exports = {
    name: 'help',
    description: "Lista Comandi",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute get_help');
        }
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        if (args[0] == "id") {
            Container.setColor([255, 0, 0])
                .setTitle('Help ID')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'id** \n\ninvia in chat privata il proprio ID Discord');
            message.channel.send(Container);
        } else if (args[0] == "avatar") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Avatar')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'avatar** [@utente] \n\ninvia in chat il la foto profilo di Discord.\n Se si vuole ottenere la foto profilo di un mebro basta merzionarlo nell \n campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "register") {
            Container.setColor([255, 0, 0])
                .setTitle('Help register')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'register** Mostra il link con la guida per registrasi al BOT');
            message.channel.send(Container);
        } else if (args[0] == "resetpassword") {
            Container.setColor([255, 0, 0])
                .setTitle('Help resetpassword')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'resetpassword** Genera una nuova Password Temporanea');
            message.channel.send(Container);
        } else if (args[0] == "roll") {
            Container.setColor([255, 0, 0])
                .setTitle(`Help Roll`)
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi **' + config.prefix + 'roll** Es:[1d20] / [1d20+1d8] / [d%] / [1d20+5] \n\nRoll fa un tiro di dadi a tua scelta');
            message.channel.send(Container);
        } else if (args[0] == "math") {
            Container.setColor([255, 0, 0])
                .setTitle(`Help math`)
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi **' + config.prefix + 'math** Es:[2+2*5-10/2] \n\n Math una calcolatrice semplice');
            message.channel.send(Container);
        } else if (args[0] == "pg") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pg')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'pg** [@utente][ID_Scheda] \n\nMostra la scheda personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "pgdescrizione") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pgdescrizione')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'pgdescrizione** [@utente][ID_Scheda] \n\nMostra descrizione personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "pglist") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pglist')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'pglist** [@utente] \n\nMostra le schede di un utente\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "pgdescrizione") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pgdescrizione')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'pgavatar** [Opzione][ID_Scheda][URL Avatar] \n\n **OPZIONI**\n show = Motra avatar\n set = Modifica avatar \n\nMostra avatar del personaggio o modifica\n Per usare pgavatar inserire show/set [Opzione] e [ID_Scheda], in caso di set inserire [URL Avatar]');
            message.channel.send(Container);
        } else if (args[0] == "pginventario") {
            Container.setColor([255, 0, 0])
                .setTitle('Help PgInventario')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'pginventario** [@utente][ID_Scheda] \n\nMostra l\'inventario del personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "shop") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Shop')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'Shop** [Nome Shop/ID_Scheda][Quantità][Id/Nome oggetto]\n\n **Nomi shop:**\n • emporio\n • numero42 \n\nLo shop permette di accquistare oggetti materiali pozzioni armi. Uso inserire [Nome Shop] pervisualizare la vetrina [ID_Scheda] dichiare la [Quantità] e inserire [ID/Nome Oggetto]');
            message.channel.send(Container);
        } else if (args[0] == "scambio") {
            Container.setColor([255, 0, 0])
                .setTitle('Help scambio')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'scambio** [Opzione][@utente][ID_Scheda][Quantità][ID/Nome oggetto/ID_Assegnato] \n\n **OPZIONI**\n vendi = Crea offerta\n rimuovi = Rimuovi offerta\n compra = Aquista Oggetto da offerta\n\n Il comando scambio permette di vendere un oggetto del proprio inventario e comprare da un altro\n Il comando scambio con opzione **vendi** ha bisgono di menzionare sestessi [@user] ID scheda del personaggio [ID_scheda] la quantità da mettre in vendita [Qunatità] il prezzo [Prezzo] e inserire il nome del oggetto [Nome oggetto] \n\n Il comando scambio con opzione **compra** ha bisgono di menzionare sestessi [@user] ID scheda del personaggio [ID_scheda] la quantità da comprare [Qunatità] e inserire il ID aqquisto del oggetto [ID_aqquisto]\n\n  Il comando scambio con opzione **rimuovi** ha bisgono di menzionare sestessi [@user] ID scheda del personaggio [ID_scheda] la quantità da rimuove [Qunatità] e inserire il ID aqquisto del oggetto [ID_aqquisto]');
            message.channel.send(Container);
        } else if (args[0] == "checkpoint") {
            Container.setColor([255, 0, 0])
                .setTitle('Help checkpoint')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'checkpoint** [Opzione][ID_Scheda] \n\n**OPZIONI**\n 1 = Livello 6 Money 500mo\n 2 = Livello 10 Money 750mo\n 3 = Livello 14 Money 1000mo\n\n Per settare il checkpoint inserire [Opzione] e [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "money") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Money')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'money** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire denaro inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "statsset") {
            Container.setColor([255, 0, 0])
                .setTitle('Help statsset')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'statsset** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n Forza\n Destrezza\n Costituzione\n Intelligenza\n Saggezza\n Carisma\n\n Per modificare le statisitche inserire [Opzione][Valore][ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "milestone") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Milestone')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'milestone** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire milestone inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
            message.channel.send(Container);
        } else if (args[0] == "oggetto") {
            Container.setColor([255, 0, 0])
                .setTitle('Help oggetto')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'oggetto** [Id/Nome] \n\n Mostra le informazioni dell\'oggetto\n Per ricercare uno oggetto inserire [Id/Nome]');
            message.channel.send(Container);
        } else if (args[0] == "consuma") {
            Container.setColor([255, 0, 0])
                .setTitle('Help consuma')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'consuma** [ID_Scheda][Quantità][Nome oggetto] \n\n Il Comando consuma l\'oggetto selezionato e rimuove dal inventario. Per usare il comando inserire [ID_Scheda] la qunatità che si intende consumare [Quantità] e infine il nome dello oggetto [Nome oggetto]');
            message.channel.send(Container);
        } else if (args[0] == "meteo") {
            Container.setColor([255, 0, 0])
                .setTitle('Help meteo')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'meteo** [Opzione][Valore] \n\n **OPZIONI**\n set = Setta\n\n **VALORI**\n 1 = :sunny: Sereno\n 2 = :cloud: Nuvoloso\n 3 = :cloud_rain: Pioggia\n 4 = :cloud_snow: Nevicata\n\n Il comando **meteo** di base mostra il meteo giornaliero, Nel campo [Opzione] se inserito solo **set** il meteo viene generato in modo randomico ma se agiunto un numero da 1 a 4 nel campo [Valore] si seceglie quello che sivuole');
            message.channel.send(Container);
        } else if (args[0] == "pgoggetto") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgoggetto')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **' + config.prefix + 'pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire Id Scheda [ID_Scheda]\n Quantità in [Quantità]\n Inserire Id o Nome completo dell\'oggetto [Id/Nome oggetto]');
            message.channel.send(Container);
        } else if (args[0] == "pgcustom") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgcustom')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **' + config.prefix + 'pgcustom** [Opzione][ID_Scheda][Quantità][Sincronia][Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire Id Scheda [ID_Scheda]\n Quantità in [Quantità]\n Inseire Si/No [Sincronia]\n Inserire Nome completo dell\'oggetto [Nome oggetto]');
            message.channel.send(Container);
        } else if (args[0] == "patchnotes") {
            Container.setColor([255, 0, 0])
                .setTitle('Help patchnotes')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **' + config.prefix + 'patchnotes** \n\n Mostra le modifiche e cambiamenti al bot fatte fino a dora');
            message.channel.send(Container);
        } else if (args[0] == "ping") {
            Container.setColor([255, 0, 0])
                .setTitle('Help ping')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **' + config.prefix + 'ping** Esegue un ping al bot ber vedere le latenze di risposta');
            message.channel.send(Container);
        } else if (args[0] == "setconfig") {
            Container.setColor([255, 0, 0])
                .setTitle('Help setconfig')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **' + config.prefix + 'setconfig** [Opzione][Valore]\n\n **OPZIONI**\n prefix = [Nuvo Prefix]\n event_meteo_enable = [true/false]\n ora_event_meteo = [hh:mm]\n chat_event_meteo = [ID TextChat]\n random_color = [true/false]');
            message.channel.send(Container);
        } else if (args[0] == "version") {
            Container.setColor([255, 0, 0])
                .setTitle('Help version')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **' + config.prefix + 'version** \n\n Mostra Versione del Bot e del specifiche del Server Host');
            message.channel.send(Container);
        } else if (args[0] == "clearchat") {
            Container.setColor([255, 0, 0])
                .setTitle('Help clearchat')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi:\n **' + config.prefix + 'clearchat** [Opzione/Valore]\n\n **OPZIONI**\n all = Tutto\n\n Il comando clearchat elimina i messaggi data una quntità specifica o l\'intera chat con **all** nel campo [Opzione/Valore]');
            message.channel.send(Container);
        } else {
            Container.setColor([255, 0, 0])
                .setTitle('Lista comandi')
                .setThumbnail(botavatar.displayAvatarURL())
                .addField("💬 Prefix 💬", "• **" + config.prefix + "**")
                .addField(":question: Descrizione Comandi :question:", '• **help** [comando]')
                .addField("👤 Utente 👤", '• **id**\n• **avatar** [@utente]\n • **register** \n • **resetpassword**')
                .addField("🟡 PG 🟡", '• **pglist** [@utente]\n • **pg** [@utente][ID_Scheda]\n • **pgavatar** [Opzione][ID_Scheda][URL Avatar]\n • **pgdescrizione** [@utente][ID_Scheda]\n • **pginventario** [@utente][ID_Scheda]')
                .addField("🔵 Oggetti e Shop 🔵", "• **oggetto** [Id/Nome]\n • **consuma** [ID_Scheda][Quantità][Nome oggetto]\n • **shop** [Nome Shop/ID_Scheda][Quantità][Id/Nome oggetto]\n • **scambio** [Opzione][@utente][ID_Scheda][Quantità][ID/Nome oggetto/ID_Assegnato]")
                .addField("🟠 Comandi PG Master 🟠", "• **checkpoint** [Opzione][ID_Scheda]\n • **statsset** [Opzione][Valore][ID_Scheda]\n • **money** [Opzione][Valore][ID_Scheda]\n • **milestone** [Opzione][Valore][ID_Scheda]\n • **pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome]\n • **pgcustom** [Opzione][ID_Scheda][Quantità][Sincronia][Nome]")
                .addField("🧰 Tools 🧰", '• **meteo**[Opzione][Valore]\n • **roll** Es:[1d20+5]\n • **math** Es:[2+2*5-10/2]\n • **clearchat** [Opzione/Valore]\n')
                .addField("⚙️ Impostazioni ⚙️", '• **ping**\n • **patchnotes** \n • **setconfig** [Opzione][Valore]\n • **version**')
                .setFooter("Bot by Alexkill ITA#3593                                                                                                Version " + vers.Create.Version, "https://cdn.discordapp.com/avatars/188587744140853251/7b4f42c2dd6de8acf3dccfc694e35b9f.webp");
            message.channel.send(Container);
        }
    }
}