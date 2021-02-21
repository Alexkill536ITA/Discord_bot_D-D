/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const Discord = require('discord.js');
var Container_meteo = new Discord.MessageEmbed();

exports.setMeteo = function (Data_int) {
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
}

exports.getMeteo = function () {
    return Container_meteo;
}