/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const color = require('ansi-colors');
const meteo = require('../script/set_meteo.js');
const globals_var = require('../script/globals_var.js');
const config = require("../config.json");

exports.timer = async (client) => {
    var ms = 0;
    while (1) {
        ms = check_date(client) - 1000;
        await sleep(ms);
        await sleep(1000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function check_date(client) {
    var out;
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var ora = today.getHours();
    var minuti = today.getMinutes();
    var sec = today.getSeconds();
    var set_event = config.set_event_ora.split(':');
    today = new Date(year, month, day, ora, minuti, sec);
    var event_day = new Date(year, month, day, set_event[0], set_event[1], 00);

    if (event_day < today) {
        event_day.setDate(event_day.getDate() + 1);
    }
    var diff = event_day - today;
    // console.log(diff);

    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    var result = "";
    result += "Prossimo evento tra: ";
    if (hh != 0) {
        result += hh;
        result += "h ";
    }
    if (mm != 0) {
        result += mm;
        result += "m ";
    }
    if (ss != 0) {
        result += ss;
        result += "s";
    }

    if (result == 'Prossimo evento tra: ') {
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        if (config.event_meteo_enable == true) {
            out = meteo.set_meteo_out();
            out.setThumbnail(botavatar.displayAvatarURL());
            client.channels.cache.get(config.event_chat_output).send(out);
        }
        console.log('[ ' + color.magenta('EVENT') + ' ] Compleate Send EVENT');
    } else {
        console.log('[ ' + color.magenta('EVENT') + ' ] ' + result);
    }
    return diff;
}