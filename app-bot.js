/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const color = require('ansi-colors');
const Discord = require("discord.js");
const dotenv = require('dotenv');
const Event_time = require('./event/clock_timer_event');
const CheckSum = require('./tools/CheckSum-Code');
const vers = require("./CheckSum.json");
const client = new Discord.Client();

var hit_msg = 0;

//------------------------------------------------------//
/*                       Config                         */
//------------------------------------------------------//
dotenv.config({ path: './.env' });
const config = require("./config.json");

//------------------------------------------------------//
/*                    Check Files                       */
//------------------------------------------------------//
async function main() {
    console.log("[ " + color.blue('INFO') + "  ] Start Process");
    console.log("[ " + color.blue('INFO') + "  ] Name Applications: " + color.yellow('GdrBot Discord'));
    console.log("[ " + color.blue('INFO') + "  ] Authors: " + color.yellow('Alexkill536ITA'));
    console.log("[ " + color.blue('INFO') + "  ] Version Running: " + color.yellow("v" + vers.Create.Version));
    // var pass = await CheckSum.CheckSum_file();
    // if (pass == 1) {
    //     console.log("[ "+color.blue('INFO')+"  ] Stop Process");
    //     process.exit(0);
    // } else {
    //     console.log("[ "+color.blue('INFO')+"  ] Start Service...");
    //     Discord_start();
    // }
    console.log("[ " + color.blue('INFO') + "  ] Start Service...");
    Discord_start();
}

//------------------------------------------------------//
/*                       Discord                        */
//------------------------------------------------------//
function Discord_start() {
    client.login(process.env.TOKEN);
    const prefix = config.prefix
    const cmd_fs = require('fs');  //Declaration File Commands

    // Start Bot
    client.once('ready', () => {
        console.info('[  ' + color.green('OK') + '   ] Service Online');
        console.info('[ ' + color.blue('INFO') + '  ] Logged in as [' + color.cyan(client.user.tag) + ']');
        Event_time.timer(client);
    });

    // Load File Commands
    client.commands = new Discord.Collection();
    const commandFiles = cmd_fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    // Lissener Message/Commands
    client.on('message', message => {
        if (message.author.bot) {
            return;
        } else if (config.Level_Chat_Lissener.includes(message.channel.id)) {
            if (config.Debug_Level == "DEBUG") {
                console.log("[ " + color.magenta('DEBUG') + " ] Triger Hit " + hit_msg + " Channel " + message.channel.name);
                hit_msg = hit_msg + 1;
            }
            client.commands.get('PBC_Chat').execute(client, message);
        }

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (command == 'id') {
            client.commands.get('id').execute(client, message, args);
        } else if (command == 'avatar') {
            client.commands.get('avatar').execute(message, args);
        } else if (command == 'register') {
            client.commands.get('register').execute(client, message, args);
        } else if (command == 'resetpassword') {
            client.commands.get('resetpassword').execute(client, message, args);
        } else if (command == 'roll') {
            client.commands.get('roll').execute(client, message, args);
        } else if (command == 'math') {
            client.commands.get('math').execute(client, message, args);
        } else if (command == 'pg') {
            client.commands.get('pg').execute(message, args);
        } else if (command == 'pglist') {
            client.commands.get('pglist').execute(message, args);
        } else if (command == 'pgdescrizione') {
            client.commands.get('pgdescrizione').execute(client, message, args);
        } else if (command == 'pginventario') {
            client.commands.get('pginventario').execute(message, args);
        } else if (command == 'money') {
            client.commands.get('money').execute(message, args);
        } else if (command == 'milestone') {
            client.commands.get('milestone').execute(message, args);
        } else if (command == 'checkpoint') {
            client.commands.get('checkpoint').execute(message, args);
        } else if (command == 'statsset') {
            client.commands.get('statsset').execute(message, args);
        } else if (command == 'consuma') {
            client.commands.get('consuma').execute(client, message, args);
        } else if (command == 'oggetto') {
            client.commands.get('oggetto').execute(client, message, args);
        } else if (command == 'pgoggetto') {
            client.commands.get('pgoggetto').execute(client, message, args);
        } else if (command == 'pgcustom') {
            client.commands.get('pgcustom').execute(client, message, args);
        } else if (command == 'shop') {
            client.commands.get('shop').execute(client, message, args);
        } else if (command == 'scambio') {
            client.commands.get('scambio').execute(client, message, args);
        } else if (command == 'meteo') {
            client.commands.get('meteo').execute(client, message, args);
        } else if (command == 'help') {
            client.commands.get('help').execute(client, message, args);
        } else if (command == 'clearchat') {
            client.commands.get('clearchat').execute(client, message, args);
        } else if (command == 'patchnotes') {
            client.commands.get('patchnotes').execute(client, message, args);
        } else if (command == 'setconfig') {
            client.commands.get('setconfig').execute(client, message, args);
            // } else if (command == 'restart') {
            //     client.commands.get('restart').execute(client, message, args);
        } else if (command == 'version') {
            client.commands.get('version').execute(client, message, args);
        } else if (command == 'ping') {
            client.commands.get('ping').execute(client, message, args);
            // } else if (command == 'debug') {
            //     if (config.Debug_Level == "DEBUG") {
            //         client.commands.get('debug').execute(client, message, args);
            //     }
        } else {
            message.channel.send('Usare il comando **' + config.prefix + 'help** per la lista dei comandi');
        };
    });
}

//------------------------------------------------------//
/*                      Main Start                      */
//------------------------------------------------------//
main();