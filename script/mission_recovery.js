/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { MongoClient, Cursor } = require("mongodb");
const methodDB = require("../mongodb_controll");
const config = require("../config.json");
const color = require("ansi-colors");

exports.mission_recovey = async function (client) {
    try {
        var cursor_ar = await get_Mission();
        var fail = 0;
        cursor_ar.forEach(async (element) => {
            try {
                client.channels.cache.get(config.chat_missioni).send(config.prefix + "mission edit " + element['ID']);
                await sleep(5000);
            } catch (error) {
                console.log("[ " + color.red('ERROR') + " ] Recovery Mission Faill");
                if (config.Debug_Level == 'DEBUG') {
                    console.log("\n[ " + color.magenta('DEBUG') + " ] " + error);
                }
                fail = 1;
                return;
            }
        });
        if (fail != 1) {
            console.info('[  ' + color.green('OK') + '   ] Recovery Mission success');
        }
    } catch (error) {
        console.log("[ " + color.red('ERROR') + " ] Recovery Mission Faill");
        if (config.Debug_Level == 'DEBUG') {
            console.log("\n[ " + color.magenta('DEBUG') + " ] " + error);
        }
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function get_Mission() {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Registro_missioni");
        var cursor = await methodDB.recoverymission();
    } else {
        return 1;
    }
    return cursor;
}