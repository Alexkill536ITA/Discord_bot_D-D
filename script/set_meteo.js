/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const goglas_var = require('./globals_var.js');
const color = require("ansi-colors");

/*
 * |------------------------------------|
 * | Equinozio di primavera 20/02-19/05 |
 * |------------------------------------|
 * | Solstizio d’estate     20/05-21/08 |
 * |------------------------------------|
 * | Equinozio d’autunno    22/08-20/10 |
 * |------------------------------------|
 * | Solstizio d’inverno    21/10-19/02 |
 * |------------------------------------|
 */

exports.set_meteo_out = function() {
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();
	var day = today.getDate();
	//today = new Date(year,month,day);
	const i_Primavera = new Date(year,02,20);
	const f_Primavera = new Date(year,05,19);
	const i_Estate = new Date(year,05,20);
	const f_Estate = new Date(year,08,21);
	const i_Autunno = new Date(year,08,22);
	const f_Autunno = new Date(year,10,20);
	//const i_Inverno = new Date(year,10,21);
	//const f_Inverno = new Date(year+1,02,19);
	var rand_number = getRandomInt(1,100);
	var data_set = [];

	if (today.getTime() >= i_Primavera.getTime() && today.getTime() <= f_Primavera.getTime()) {
		if (rand_number >= 1 && rand_number <= 29){
			// console.log("Primavera "+1);
			data_set = [1,1];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 30 && rand_number <= 59) {
			// console.log("Primavera "+2);
			data_set = [1,2];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 60 && rand_number <= 89) {
			// console.log("Primavera "+3);
			data_set = [1,3];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 90 && rand_number <= 100) {
			// console.log("Primavera "+4);
			data_set = [1,4];
			goglas_var.setMeteo(data_set);
		}
	} else if (today.getTime() >= i_Estate.getTime() && today.getTime() <= f_Estate.getTime()) {
		if (rand_number >= 1 && rand_number <= 29){
			// console.log("Estate "+1);
			data_set = [2,1];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 30 && rand_number <= 59) {
			// console.log("Estate "+2);
			data_set = [2,2];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 60 && rand_number <= 89) {
			// console.log("Estate "+3);
			data_set = [2,3];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 90 && rand_number <= 100) {
			// console.log("Estate "+4);
			data_set = [2,4];
			goglas_var.setMeteo(data_set);
		}
	} else if (today.getTime() >= i_Autunno.getTime() && today.getTime() <= f_Autunno.getTime()) {
		if (rand_number >= 1 && rand_number <= 29){
			// console.log("Autunno "+1);
			data_set = [3,1];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 30 && rand_number <= 59) {
			// console.log("Autunno "+2);
			data_set = [3,2];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 60 && rand_number <= 89) {
			// console.log("Autunno "+3);
			data_set = [3,3];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 90 && rand_number <= 100) {
			// console.log("Autunno "+4);
			data_set = [3,4];
			goglas_var.setMeteo(data_set);
		}
	} else {
		if (rand_number >= 1 && rand_number <= 29){
			// console.log("Inverno "+1);
			data_set = [4,1];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 30 && rand_number <= 59) {
			// console.log("Inverno "+2);
			data_set = [4,2];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 60 && rand_number <= 89) {
			// console.log("Inverno "+3);
			data_set = [4,3];
			goglas_var.setMeteo(data_set);
		} else if (rand_number >= 90 && rand_number <= 100) {
			// console.log("Inverno "+4);
			data_set = [4,4];
			goglas_var.setMeteo(data_set);
		}
	}
	console.log('[ '+color.cyan('DEBUG')+' ] :'+today+"\n Anno:"+year+"\n Mese:"+month+"\n Giorno:"+day+
		"\n Inizio Primavera: "+i_Primavera+"\n Fine Primavara: "+f_Primavera+
		"\n Inizio Estate: "+i_Estate+"\n Fine Estate: "+f_Estate+
		"\n Inizio Autunno: "+i_Autunno+"\n Fine Autunno"+f_Autunno);
	return goglas_var.getMeteo();
}
