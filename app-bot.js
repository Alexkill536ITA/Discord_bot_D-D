/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const Discord = require("discord.js");
const dotenv = require('dotenv');
const Event_time = require('./event/clock_timer_event');
const client = new Discord.Client();

//------------------------------------------------------//
/*                    Check Files                       */
//------------------------------------------------------//
// const CheckSum = require('./tools/CheckSum-Code');
// var pass = CheckSum.CheckSum_file();
// if (pass == 1) {
//     process.exit(0);
// } else {
//     console.log("\n#---------------- Start Service ----------------#");
// }

//------------------------------------------------------//
/*                       Config                         */
//------------------------------------------------------//
dotenv.config({ path: './.env' });
const config = require("./config.json");

//------------------------------------------------------//
/*                 Thread Async Event                   */
//------------------------------------------------------//
// Declarate Event_time.timer();

//------------------------------------------------------//
/*                       Discord                        */
//------------------------------------------------------//
client.login(process.env.TOKEN);
const prefix = config.prefix;
const cmd_fs = require('fs');  //Declaration File Commands

// Start Bot
client.once('ready', () => {
    console.info('[ INFO  ] Service Online');
    console.info(`[ INFO  ] Logged in as [${client.user.tag}]`);
    Event_time.timer(client);
});

// Load File Commands
client.commands = new Discord.Collection();
const commandFiles = cmd_fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Lissener Message/Commands
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'id') {
        client.commands.get('id').execute(message, args);
    } else if (command == 'avatar') {
        client.commands.get('avatar').execute(message, args);
    } else if (command == 'roll') {
        client.commands.get('roll').execute(client, message,args);
    } else if (command == 'pg') {
        client.commands.get('pg').execute(message,args);
    } else if (command == 'pginventario') {
        client.commands.get('pginventario').execute(message,args);
    } else if (command == 'money') {
        client.commands.get('money').execute(message,args);
    } else if (command == 'milestone') {
        client.commands.get('milestone').execute(message,args);
    } else if (command == 'oggetto') {
        client.commands.get('oggetto').execute(client, message,args);
    } else if (command == 'pgoggetto') {
        client.commands.get('pgoggetto').execute(client, message,args);
    } else if (command == 'meteo') {
        client.commands.get('meteo').execute(client, message,args);
    } else if (command == 'help') {
        client.commands.get('help').execute(client, message, args);
    } else {
        message.channel.send('Usare il comando **&help** per la lista dei comandi');
    };
});