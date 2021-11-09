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
        if (message.author.bot) {
            message.delete();
            return;
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
                // .setDescription('Sintassi: **' + config.prefix + 'pg** [@utente][ID_Scheda] \n\nMostra la scheda personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'pg** [@utente] \n\nMostra la scheda personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "pgdescrizione") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pgdescrizione')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'pgdescrizione** [@utente][ID_Scheda] \n\nMostra descrizione personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'pgdescrizione** [@utente] \n\nMostra descrizione personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "pglist") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Pglist')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'pglist** [@utente] \n\nMostra le schede di un utente\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "pgavatar") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgavatar')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'pgavatar** [Opzione][ID_Scheda][URL Avatar] \n\n **OPZIONI**\n show = Motra avatar\n set = Modifica avatar \n\nMostra avatar del personaggio o modifica\n Per usare pgavatar inserire show/set [Opzione] e [ID_Scheda], in caso di set inserire [URL Avatar]');
                .setDescription('Sintassi: **' + config.prefix + 'pgavatar** [Opzione][@utente][URL Avatar] \n\n **OPZIONI**\n show = Motra avatar\n set = Modifica avatar \n\nMostra avatar del personaggio o modifica\n Per usare pgavatar inserire show/set [Opzione] e [@utente], in caso di set inserire [URL Avatar]');
            message.channel.send(Container);
        } else if (args[0] == "pgcompetenze") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgcompetenze')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'pgcompetenze** [@utente][ID_Scheda] \n\nMostra le competenze del personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'pgcompetenze** [@utente] \n\nMostra le competenze del personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "pginventario") {
            Container.setColor([255, 0, 0])
                .setTitle('Help PgInventario')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'pginventario** [@utente][ID_Scheda] \n\nMostra l\'inventario del personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]\ne inserire ID della scheda nel campo [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'pginventario** [@utente] \n\nMostra l\'inventario del personaggio\n Per ottenerla menzionare il sestessi o un altro membro nel campo [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "shop") {
            message_shop = ""
            for (index of config.shop_name) {
                message_shop = message_shop + "• " + index + "\n"
            }
            Container.setColor([255, 0, 0])
                .setTitle('Help Shop')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'Shop** [Nome Shop o ID_Scheda][Quantità][Id/Nome oggetto]\n\n **Nomi shop:**\n' + message_shop + '\nLo shop permette di acquistare oggetti materiali pozzioni armi. Uso inserire [Nome Shop] per visualizare la vetrina.\nPer comprare inserire [ID_Scheda] dichiare la [Quantità] e inserire [ID/Nome Oggetto]');
                .setDescription('Sintassi: **' + config.prefix + 'Shop** [Nome Shop o @utente][Quantità][Id/Nome oggetto]\n\n **Nomi shop:**\n' + message_shop + '\nLo shop permette di acquistare oggetti materiali pozzioni armi. Uso inserire [Nome Shop] per visualizare la vetrina.\nPer comprare inserire [@utente] dichiare la [Quantità] e inserire [ID/Nome Oggetto]');
            message.channel.send(Container);
        // } else if (args[0] == "scambio") {
        //     Container.setColor([255, 0, 0])
        //         .setTitle('Help scambio')
        //         .setThumbnail(botavatar.displayAvatarURL())
        //         .setDescription('Sintassi: **' + config.prefix + 'scambio** [Opzione][@utente][ID_Scheda][Quantità][ID/Nome oggetto/ID_Assegnato] \n\n **OPZIONI**\n vendi = Crea offerta\n rimuovi = Rimuovi offerta\n compra = Aquista Oggetto da offerta\n\n Il comando scambio permette di vendere un oggetto del proprio inventario e comprare da un altro\n Il comando scambio con opzione **vendi** ha bisgono di menzionare sestessi [@user] ID scheda del personaggio [ID_scheda] la quantità da mettre in vendita [Qunatità] il prezzo [Prezzo] e inserire il nome del oggetto [Nome oggetto] \n\n Il comando scambio con opzione **compra** ha bisgono di menzionare sestessi [@user] ID scheda del personaggio [ID_scheda] la quantità da comprare [Qunatità] e inserire il ID aqquisto del oggetto [ID_aqquisto]\n\n  Il comando scambio con opzione **rimuovi** ha bisgono di menzionare sestessi [@user] ID scheda del personaggio [ID_scheda] la quantità da rimuove [Qunatità] e inserire il ID aqquisto del oggetto [ID_aqquisto]');
        //     message.channel.send(Container);
        } else if (args[0] == "checkpoint") {
            Container.setColor([255, 0, 0])
                .setTitle('Help checkpoint')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'checkpoint** [Opzione][ID_Scheda] \n\n**OPZIONI**\n 1 = Livello 6 Money 500mo\n 2 = Livello 10 Money 750mo\n 3 = Livello 14 Money 1000mo\n\n Per settare il checkpoint inserire [Opzione] e [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'checkpoint** [Opzione][@utente] \n\n**OPZIONI**\n 1 = Livello 6 Money 500mo\n 2 = Livello 10 Money 750mo\n 3 = Livello 14 Money 1000mo\n\n Per settare il checkpoint inserire [Opzione] e [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "money") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Money')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'money** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire denaro inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'money** [Opzione][Valore][@utenti] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire denaro inserire opzione [Opzione], ammontare in [Valore], utente Discord in [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "statsset") {
            Container.setColor([255, 0, 0])
                .setTitle('Help statsset')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'statsset** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n Forza\n Destrezza\n Costituzione\n Intelligenza\n Saggezza\n Carisma\n\n Per modificare le statisitche inserire [Opzione][Valore][ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'statsset** [Opzione][Valore][@utnete] \n\n**OPZIONI**\n Forza\n Destrezza\n Costituzione\n Intelligenza\n Saggezza\n Carisma\n\n Per modificare le statisitche inserire [Opzione][Valore][@utente]');
            message.channel.send(Container);
        } else if (args[0] == "milestone") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Milestone')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'milestone** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire milestone inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'milestone** [Opzione][Valore][@utente] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire milestone inserire opzione [Opzione], ammontare in [Valore], utente Discord in [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "fragment") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Fragment')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi: **' + config.prefix + 'fragment** [Opzione][Valore][ID_Scheda] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire fragment inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
                .setDescription('Sintassi: **' + config.prefix + 'fragment** [Opzione][Valore][@utente] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n\n Per aggiungere o toglire fragment inserire opzione [Opzione], ammontare in [Valore], utente Discord in [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "mission") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Mission')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'mission** [Opzione][ID_MISSIONE] \n\n**OPZIONI**\n init = inizilaizza misione\n response = chiudi missione\n unlock = sblcca player\n\n Opzione **init** per inizializare la missione con reaction role inserire [ID_MISSIONE]\n Opzione **response** Manda Il messagio di riepiloco della missione conclusa inserire [ID_MISSIONE]\n Opzione **unlock** Rimuove il blocco sul player che inpedisce di parttecipare a più missione in contemporanea inseire [@utente]');
            message.channel.send(Container);
        } else if (args[0] == "disprezzo") {
            Container.setColor([255, 0, 0])
                .setTitle('Help Disprezzo')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'Disprezzo** [Opzione][Valore][@utente] \n\n**OPZIONI**\n add = Aggiungi\n sub = Rimuovi\n show = Mostra\n\n Per aggiungere o toglire disprezzo inserire opzione [Opzione], ammontare in [Valore], utente Discord in [@utente]\n Per visualizare inserire **show** in [Opzione] e taggare utente Discord in [@utente]');
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
                // .setDescription('Sintassi: **' + config.prefix + 'consuma** [ID_Scheda][Quantità][Nome oggetto] \n\n Il Comando consuma l\'oggetto selezionato e rimuove dal inventario. Per usare il comando inserire [ID_Scheda] la qunatità che si intende consumare [Quantità] e infine il nome dello oggetto [Nome oggetto]');
                .setDescription('Sintassi: **' + config.prefix + 'consuma** [@utente][Quantità][Nome oggetto] \n\n Il Comando consuma l\'oggetto selezionato e rimuove dal inventario. Per usare il comando inserire [@utente] la qunatità che si intende consumare [Quantità] e infine il nome dello oggetto [Nome oggetto]');
            message.channel.send(Container);
        } else if (args[0] == "meteo") {
            Container.setColor([255, 0, 0])
                .setTitle('Help meteo')
                .setThumbnail(botavatar.displayAvatarURL())
                .setDescription('Sintassi: **' + config.prefix + 'meteo** [Opzione][Valore] \n\n **OPZIONI**\n set = Setta\n\n **VALORI**\n 1 = :sunny: Sereno\n 2 = :cloud: Nuvoloso\n 3 = :cloud_rain: Pioggia\n 4 = :cloud_snow: Nevicata\n\n Il comando **meteo** di base mostra il meteo giornaliero, Nel campo [Opzione] se inserito solo **set** il meteo viene generato in modo randomico ma se agiunto un numero da 1 a 4 nel campo [Valore] si seceglie quello che sivuole');
            message.channel.send(Container);
        } else if (args[0] == "competenza") {
            Container.setColor([255, 0, 0])
                .setTitle('Help competenza')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi:\n **' + config.prefix + 'competenza** [Opzione][ID_Scheda][Id/Nome Competenza]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli competenza [Opzione]\n Inserire Id Scheda [ID_Scheda]\n Inserire Nome completo della competenza o ID nel campo [Id/Nome Competenza]');
                .setDescription('Sintassi:\n **' + config.prefix + 'competenza** [Opzione][@utente][Id/Nome Competenza]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli competenza [Opzione]\n Inserire utente Discord [@utente]\n Inserire Nome completo della competenza o ID nel campo [Id/Nome Competenza]');
            message.channel.send(Container);
        } else if (args[0] == "pgoggetto") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgoggetto')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi:\n **' + config.prefix + 'pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire Id Scheda [ID_Scheda]\n Quantità in [Quantità]\n Inserire Id o Nome completo dell\'oggetto [Id/Nome oggetto]');
                .setDescription('Sintassi:\n **' + config.prefix + 'pgoggetto** [Opzione][@utente][Quantità][Id/Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire utente Discord [@utente]\n Quantità in [Quantità]\n Inserire Id o Nome completo dell\'oggetto [Id/Nome oggetto]');
            message.channel.send(Container);
        } else if (args[0] == "pgcustom") {
            Container.setColor([255, 0, 0])
                .setTitle('Help pgcustom')
                .setThumbnail(botavatar.displayAvatarURL())
                // .setDescription('Sintassi:\n **' + config.prefix + 'pgcustom** [Opzione][ID_Scheda][Quantità][Sincronia][Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire Id Scheda [ID_Scheda]\n Quantità in [Quantità]\n Inseire Si/No [Sincronia]\n Inserire Nome completo dell\'oggetto [Nome oggetto]');
                .setDescription('Sintassi:\n **' + config.prefix + 'pgcustom** [Opzione][@utente][Quantità][Sincronia][Nome oggetto]\n\n **OPZIONI**\n add = Aggiungi\n sub = Togli \n\n Aggiungi o Togli oggetto dal inventario [Opzione]\n Inserire utente Discord [@utente]\n Quantità in [Quantità]\n Inseire Si/No [Sincronia]\n Inserire Nome completo dell\'oggetto [Nome oggetto]');
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
                .setDescription('Sintassi:\n **' + config.prefix + 'setconfig** [Opzione][Valore]\n\n **OPZIONI**\n Nickname_Bot = [Nuvo Nick]\n prefix = [Nuvo Prefix]\n role_base = [Option][Nome Ruolo]\n role_avance = [Option][Nome Ruolo]\n role_admin = [Option][Nome Ruolo]\n Level_Chat_Lissener = [Option][ID Chat]\n Level_Chat_min_char = [Value]\n Level_Chat_max = [Value]\n Level_Chat_reset = [true/false]\n Level_Chat_allert = [Value]\n Level = [Select Level][ID Ruolo]\n event_meteo_enable = [true/false]\n ora_event_meteo = [hh:mm]\n chat_event_meteo = [ID TextChat]\n chat_scambi_chat = [ID Chat]\n chat_scambi_ping = [Nome Ruolo]\n random_color = [true/false]');
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
        } else if (args[0] == "timeskip") {
            var nome = args[0];
            for (let index = 1; index < args.length; index++) {
                nome += " " + args[index];
            }
            if (nome == "timeskip start") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip start')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip start** \n\n Avvia il timeskip. Assegna a tutte le schede PG Token da usare per gli eventi');
                message.channel.send(Container);
            } else if (nome == "timeskip stop") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip stop')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip stop**  \n\n Stoppa il timeskip. Blocca uso dei comandi eventi del timeskip e converte i Token non usati in mo');
                message.channel.send(Container);
            } else if (nome == "timeskip show") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip show')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip show**  \n\n Mostra la conficurazione attuale del timeskip');
                message.channel.send(Container);
            } else if (nome == "timeskip token") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip token')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip token** [ID_Sheda] \n\nEvento token mostra token rimaneti del PG\n\nPer usare timeskip token inserire [ID_Scheda]');
                message.channel.send(Container);
            } else if (nome == "timeskip set_token") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip token')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip set_token** [Opzione][Valore][ID_Scheda] \n\nset_token metti togli token al PG \n\n**OPZIONI**\n add = Aggiungi\n sub = Togli \n\nPer aggiungere o toglire token inserire opzione [Opzione], ammontare in [Valore], ID scheda utente in [ID_Scheda]');
                message.channel.send(Container);
            } else if (nome == "timeskip cambio_talento") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip cambio_talento')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip cambio_talento** [ID_Scheda]\n\n Invia Una notifica hai Master con la richiesta di asseganzione\n\n Per usare timeskip cambio_talento inserire [ID_Scheda]');
                message.channel.send(Container);
            } else if (nome == "timeskip spedizione") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip spedizione')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip spedizione** [ID_Scheda][Statisitca del PG] \n\nEvento Randomico di esplorazione \n\n**Statistiche PG:**\n forza\n destrezza\n costituzione\n intelligenza\n saggezza\n carisma \n\n Per usare timeskip spedizione inserire [ID_Scheda] e inserire la caratteristica del PG in [Statisitca del PG]');
                message.channel.send(Container);
            } else if (nome == "timeskip strumento") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip strumento')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip strumento** [ID_Sheda][Strumento da acquisire] \n\nEvento trumento assegna alla scheda PG la competneza trumento selezionata \n\nPer mostrare la lista inserire solo **&timeskip strumento** \n\n Per usare timeskip strumento inserire [ID_Scheda] e inserire la competenza dello strumento in [Strumento da acquisire]');
                message.channel.send(Container);
            } else if (nome == "timeskip lingua") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip lingua')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip lingua** [ID_Sheda][Lingua da acquisire] \n\nEvento lingua assegna alla scheda PG la competneza nella lingua selezionata \n\nPer mostrare la lista inserire solo **&timeskip lingua** \n\n Per usare timeskip lingua inserire [ID_Scheda] e inserire la competenza della lingua in [Lingua da acquisire]');
                message.channel.send(Container);
            } else if (nome == "timeskip ricerca") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip ricerca')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip ricerca** [ID_Sheda][Rarità] \n\nEvento ricerca notifica i master di ricontattarti della tua richiesta \n\n**Rarità:**\n comune\n non comune\n raro\n\n Per usare timeskip ricerca inserire [ID_Scheda] e inserire la rarità in [Rarità]');
                message.channel.send(Container);
            } else if (nome == "timeskip creazione") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip creazione')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip creazione** [ID_Sheda][Rarità] \n\nEvento crezione notifica i master di ricontattarti della tua richiesta \n\n**Rarità:**\n comune\n non comune\n raro\n molto raro\n\n Per usare timeskip creazione inserire [ID_Scheda] e inserire la rarità in [Rarità]');
                message.channel.send(Container);
            } else if (nome == "timeskip lavoro") {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip lavoro')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip lavoro** [ID_Sheda] \n\nEvento lavoro Usa token in cambio di MO\n\nPer usare timeskip lavoro inserire [ID_Scheda]');
                message.channel.send(Container);
            } else {
                Container.setColor([255, 0, 0])
                    .setTitle('Help timeskip')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription('Sintassi:\n **' + config.prefix + 'timeskip** [Opzione][Valore]...\n\n **OPZIONI [Solo Master]**\n start = Avvia il timeskip\n stop = Stoppa il time skip\n show = Mostra la configurazione del timeskip\n set = Modificare la configurazione del timskip **[BETA]**\n set_token = Aggiungi o togli token\n\n **EVENTI**\n token = Mostra Token rimasti\n cambio_talento = Cambia talaneto. notifica i master\n spedizione = Evento randomico bonus malus\n strumento = Ottieni competenza strumento notifica i master\n lingua = Ottieni competenza lingua e notifica i master\n ricerca = Ottieni ricerca e notifica i master\n creazione = Crea oggetto notifica i master\n lavoro = Ottieni paga per lavoro svolto\n\n **PER MAGGIORI INFORMAZIONI USARE **\n' + config.prefix + 'help timeskip [Opzioni / Eventi]');
                message.channel.send(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setTitle('Lista comandi')
                .setThumbnail(botavatar.displayAvatarURL())
                .addField("💬 Prefix 💬", "• **" + config.prefix + "**")
                .addField(":question: Descrizione Comandi :question:", '• **help** [comando]')
                .addField("👤 Utente 👤", '• **id**\n• **avatar** [@utente]\n • **register** \n • **resetpassword**')
                // .addField("🟡 PG 🟡", '• **pglist** [@utente]\n • **pg** [@utente][ID_Scheda]\n • **pgavatar** [Opzione][ID_Scheda][URL Avatar]\n • **pgdescrizione** [@utente][ID_Scheda]\n • **pgcompetenze** [@utente][ID_Scheda]\n • **pginventario** [@utente][ID_Scheda]')
                .addField("🟡 PG 🟡", '• **pglist** [@utente]\n • **pg** [@utente]\n • **pgavatar** [Opzione][@utente][URL Avatar]\n • **pgdescrizione** [@utente]\n • **pgcompetenze** [@utente]\n • **pginventario** [@utente]')
                // .addField("🔵 Oggetti e Shop 🔵", "• **oggetto** [Id/Nome]\n • **consuma** [ID_Scheda][Quantità][Nome oggetto]\n • **shop** [Nome Shop o ID_Scheda][Quantità][Id/Nome oggetto]\n • **scambio** [Opzione][@utente][ID_Scheda][Quantità][ID/Nome oggetto/ID_Assegnato]")
                .addField("🔵 Oggetti e Shop 🔵", "• **oggetto** [Id/Nome]\n • **consuma** [@utente][Quantità][Nome oggetto]\n • **shop** [Nome Shop o @utente][Quantità][Id/Nome oggetto]")
                // .addField("🟠 Comandi PG Master 🟠", "• **checkpoint** [Opzione][ID_Scheda]\n • **statsset** [Opzione][Valore][ID_Scheda]\n • **money** [Opzione][Valore][ID_Scheda]\n • **milestone** [Opzione][Valore][ID_Scheda]\n • **fragment** [Opzione][Valore][ID_Scheda]\n • **competenza** [Opzione][ID_Scheda][Id/Nome Competenza]\n • **pgoggetto** [Opzione][ID_Scheda][Quantità][Id/Nome]\n • **pgcustom** [Opzione][ID_Scheda][Quantità][Sincronia][Nome]")
                .addField("🟠 Comandi PG Master 🟠", "• **mission** [Opzione][ID_MISSIONE]\n • **disprezzo** [Opzione][Valore][@utente]\n • **checkpoint** [Opzione][@utente]\n • **statsset** [Opzione][Valore][@utente]\n • **money** [Opzione][Valore][@utente]\n • **milestone** [Opzione][Valore][@utente]\n • **fragment** [Opzione][Valore][@utente]\n • **competenza** [Opzione][@utente][Id/Nome Competenza]\n • **pgoggetto** [Opzione][@utente][Quantità][Id/Nome]\n • **pgcustom** [Opzione][@utente][Quantità][Sincronia][Nome]")
                .addField("🧰 Tools 🧰", '• **timeskip** [Opzione][Valore]...\n • **meteo**[Opzione][Valore]\n • **roll** Es:[1d20+5]\n • **math** Es:[2+2*5-10/2]\n • **clearchat** [Opzione/Valore]\n')
                .addField("⚙️ Impostazioni ⚙️", '• **ping**\n • **patchnotes** \n • **setconfig** [Opzione][Valore]\n • **version**')
                .setFooter("Bot by Alexkill ITA#3593                                                                                                Version " + vers.Create.Version, "https://cdn.discordapp.com/avatars/188587744140853251/7b4f42c2dd6de8acf3dccfc694e35b9f.webp");
            message.channel.send(Container);
        }
    }
}