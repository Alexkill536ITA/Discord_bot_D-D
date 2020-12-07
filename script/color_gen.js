/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const config = require("../config.json");

exports.rand_Color = function() {
    if (config.random_color_enable == true) {
        var red  = 0;
        var gren = 0;
        var blue = 0;
        min = Math.ceil(0);
        max = Math.floor(255);
        red = Math.floor(Math.random() * (max - min + 1)) + min;
        gren = Math.floor(Math.random() * (max - min + 1)) + min;
        blue = Math.floor(Math.random() * (max - min + 1)) + min;
        return [red, gren, blue];
    } else {
        return [255, 0, 0];
    }
    
}