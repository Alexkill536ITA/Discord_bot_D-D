/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const fs = require("fs");

exports.set_prefix = function (prefix) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.prefix = prefix;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

exports.set_ora_event = function (ora) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.set_event_ora = ora;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

exports.set_chat_event = function (id_chat) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.event_chat_output = id_chat;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

exports.set_random_color = function (set_color) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.random_color_enable = set_color;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

exports.set_event_meteo_enable = function (event_meteo_enable) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.event_meteo_enable = event_meteo_enable;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

exports.set_Level_Chat_min_char = function (Chat_min_char) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.Level_Chat_min_char = Chat_min_char;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

exports.set_Level_Chat_max = function (Chat_max) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.Level_Chat_max = Chat_max;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

exports.set_Level_Chat_reset = function (Chat_reset) {
  jsonReader("./config.json", (err, customer) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    // increase customer order count by 1
    customer.Level_Chat_reset = Chat_reset;
    fs.writeFile("./config.json", JSON.stringify(customer, null, 4), err => {
      if (err) console.error("Error writing file:", err);
    });
  });
}

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}