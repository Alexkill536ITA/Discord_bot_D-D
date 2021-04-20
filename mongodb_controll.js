/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const color = require("ansi-colors");
const mongo = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATABASE_MONGDB, { useUnifiedTopology: true });
const config_load = require('./config.json');
var database;
var collection;
var connect_up = false;

//------------------------------------------------------//
/*              MongoDB Database Connection             */
//------------------------------------------------------//

// client.connect().then(result => {
//     const database = client.db("Piccolo_Grande_Mondo");
//     const collection = database.collection("Schede_PG");
//     console.log(result);
// }, error => {
//     console.error(error);
// });

// Gestione Connessione
async function set_db_collection() {
    database = client.db(process.env.DATABASE_MONGDB_DB);
    // collection = database.collection("Schede_PG");
    console.log("[ " + color.blue('INFO') + "  ] Connect MongoDB success");
}

exports.open_db = async function () {
    try {
        client.on('serverOpening', () => { connect_up = true; });
        if (connect_up == false) {
            await client.connect();
            await set_db_collection();
        }
    } catch (e) {
        console.log("[ " + color.red('ERROR') + " ] Connect MongoDB Faill \n");
        if (config_load.Debug_Level == 'DEBUG') {
            console.log("[ " + color.magenta('DEBUG') + " ] " + e);
        }
        connect_up = false;
        return 1;
    }
}

exports.settab_db = function (slect) {
    collection = database.collection(slect);
}

exports.close_db = function () {
    client.close();
}

// Operazioni
// MongoDB Find/Search
exports.serachbyid = async function (id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    var cursor = await collection.find({ '_id': id_scheda }).toArray();
    return cursor;
}

exports.serachbyid_user = async function (id_discord) {
    var cursor = await collection.findOne({ 'Id_discord': id_discord });
    return cursor;
}

exports.load_pg = async function (id_discord, id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    var cursor = await collection.findOne({ '_id': id_scheda, 'Nome_Discord': id_discord });
    return cursor;
}

exports.serachbyid_obj = function (query) {
    return collection.findOne({ 'Id': query });
}

exports.serachbynome_obj = function (query) {
    return collection.findOne({ 'nome': query });
}

exports.serachbynome_shop = function (query) {
    return collection.findOne({ 'Nome_shop': query });
}

exports.serachbylistpg = function (query) {
    return collection.find({ 'Nome_Discord': query }).toArray();
}

exports.serachbyid_Object = async function (id_shop) {
    var cursor = await collection.find({ 'ID Shop': id_shop }).toArray();
    return cursor;
}

exports.getAll_Object = async function () {
    var cursor = await collection.find({}).toArray();
    return cursor;
}

exports.serachCustom = async function (query, Value) {
    var cursor = await collection.find({ query: _Value }).toArray();
    return cursor;
}

// MongoDB Insert
exports.insert_db = function (Data_value) {
    collection.insertOne(Data_value);
    return 0;
}

// MongoDB Update
exports.money_update = function (id_scheda, value_new) {
    collection.updateOne({ '_id': id_scheda }, { $set: { Money: value_new } });
    return 0;
}

exports.exp_update = function (id_scheda, value_new) {
    collection.updateOne({ '_id': id_scheda }, { $set: { Exp: value_new } });
    return 0;
}

exports.level_update = function (id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, { $set: { Livello: value_new } });
    return 0;
}

exports.stats_update = function (id_scheda, filter) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, { $set: filter });
    return 0;
}

exports.inventory_update = function (id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, { $set: { Inventory: value_new } });
    return 0;
}

exports.inventory_pbc_frag = function (id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, { $set: { "Pbc_frag" : value_new } });
    return 0;
}

exports.Object_scambio_update = function (id_scheda, value_new) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.updateOne({ '_id': id_scheda }, { $set: value_new });
    return 0;
}

exports.password_update = function (id_user, value_new) {
    id_user = mongo.ObjectID(id_user);
    collection.updateOne({ '_id': id_user }, { $set: { password: value_new, temp_paw: "1" } });
    return 0;
}

// MongoDB Delete
exports.delete_db = function (id_scheda) {
    id_scheda = mongo.ObjectID(id_scheda);
    collection.deleteOne({ '_id': id_scheda });
    return 0;
}