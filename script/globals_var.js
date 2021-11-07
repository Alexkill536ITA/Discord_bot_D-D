/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const Discord = require('discord.js');
const { config } = require('dotenv');
const config_json = require('../config.json');
var Container_meteo = new Discord.MessageEmbed();

exports.setMeteo = function (Data_int, year, month, day) {
    Container_meteo = new Discord.MessageEmbed();
    if (Data_int[0] == 1) {
        if (Data_int[1] == 1) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':sunny: Sereno');
        } else if (Data_int[1] == 2) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud: Nuvoloso');
        } else if (Data_int[1] == 3) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_rain: Pioggia');
        } else if (Data_int[1] == 4) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_snow: Nevicata');
        }
    } else if (Data_int[0] == 2) {
        if (Data_int[1] == 1) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':sunny: Sereno');
        } else if (Data_int[1] == 2) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud: Nuvoloso');
        } else if (Data_int[1] == 3) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_rain: Pioggia');
        } else if (Data_int[1] == 4) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_snow: Nevicata');
        }
    } else if (Data_int[0] == 3) {
        if (Data_int[1] == 1) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':sunny: Sereno');
        } else if (Data_int[1] == 2) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud: Nuvoloso');
        } else if (Data_int[1] == 3) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_rain: Pioggia');
        } else if (Data_int[1] == 4) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_snow: Nevicata');
        }
    } else if (Data_int[0] == 4) {
        if (Data_int[1] == 1) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':sunny: Sereno');
        } else if (Data_int[1] == 2) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud: Nuvoloso');
        } else if (Data_int[1] == 3) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_rain: Pioggia');
        } else if (Data_int[1] == 4) {
            Container_meteo.setColor(255, 0, 0).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_snow: Nevicata');
        }
    }

    month = month+1;
    var data_compose = day + "-" + month;
    for (var x=0; x<config_json.event_day_list.length; x++) {
        if (data_compose == config_json.event_day_list[x]['data']) {
            Container_meteo.addField(config_json.event_day_list[x]['text'], "\u200b"); 
        }
    }
    year = year - 2020
    if (data_compose == "10-10") {
        Container_meteo.addField("🎉 Un Giorno Specile per Il Maggiordomo 🎉", "Da ben " + year + " anni sempre al vostro servizio"); 
    }


}

exports.getMeteo = function () {
    return Container_meteo;
}