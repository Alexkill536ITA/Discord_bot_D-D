/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

var crypto = require('crypto')
var fs = require('fs');

/**
 ** Global Var
 */
var File_ok_count = 0;
var File_error_count = 0;
var File_error;

/**
 ** Load File CheckSum JSON
 */
let rawdata = fs.readFileSync('./CheckSum.json');
var CheckSum = JSON.parse(rawdata);

/**
 ** Load Files
 */
var Files_app, Files_com, Files_evt, Files_spt;
Files_app = fs.readdirSync('./').filter(file => file.endsWith('.js'));
Files_com = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
Files_evt = fs.readdirSync('./event/').filter(file => file.endsWith('.js'));
Files_spt = fs.readdirSync('./script/').filter(file => file.endsWith('.js'));

/**
 ** Calculate SHA512
 */
function Calculate_SHA512(fiele_byte) {
    var hash = crypto.createHash('sha512'), stream = fs.readFileSync(fiele_byte);
    var str_hex;
    hash.update(stream);
    str_hex = hash.digest('hex');
    return str_hex;
}

/**
 ** Verify Hash Files 
 */
exports.CheckSum_file= function() {
    console.log("[ INFO  ] Start CheckSum files");
    for (var file of Files_app) { 
        var Hash_File = Calculate_SHA512('./'+file);
        var Hash_Check = CheckSum[file]['SHA512'];
        if (Hash_File == Hash_Check) {
            File_ok_count++;
        } else {
            File_error_count++;
            File_error += ", "+file;
        }
    }
    for (let file of Files_com) {
        var Hash_File = Calculate_SHA512('./commands/'+file);
        var Hash_Check = CheckSum[file]['SHA512'];
        if (Hash_File == Hash_Check) {
            File_ok_count++;
        } else {
            File_error_count++;
            File_error += ", "+file;
        }
    }
    for (let file of Files_evt) {
        var Hash_File = Calculate_SHA512('./event/'+file);
        var Hash_Check = CheckSum[file]['SHA512'];
        if (Hash_File == Hash_Check) {
            File_ok_count++;
        } else {
            File_error_count++;
            File_error += ", "+file;
        }
    }
    for (let file of Files_spt) {
        var Hash_File = Calculate_SHA512('./script/'+file);
        var Hash_Check = CheckSum[file]['SHA512'];
        if (Hash_File == Hash_Check) {
            File_ok_count++;
        } else {
            File_error_count++;
            File_error += ", "+file;
        }
    }
    if (File_error_count == 0) {
        console.log("[ INFO  ] Total Files found: "+File_ok_count);
        console.log("[  OK   ] CheckSum Compleate scanned files: "+File_ok_count);
        return 0;
    } else {
        var tot = File_error_count+File_ok_count;
        File_error = File_error.replace("undefined,", "");
        console.log("[ INFO  ] Total Files found: "+tot);
        console.log("[  OK   ] CheckSum full scan successfully files: "+File_ok_count);
        console.log("[ ERROR ] CheckSum full scan failed files: "+File_error_count);
        console.log("[ ERROR ] Failed files Name: "+File_error);
        console.log("[ INFO  ] Files need to be restored or updated. Please check Update");
        return 1;
    }
}