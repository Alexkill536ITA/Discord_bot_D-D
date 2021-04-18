/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");
const vers = require("../CheckSum.json");
const lib = require("../package.json");
const os = require("os");
const osutils = require("os-utils");
const osName = require("os-name");
const { isMainThread } = require("worker_threads");
const { prototype } = require("module");

module.exports = {
    name: 'version',
    description: "version",
    execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute get_version');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {

            // Operation System
            var type_run = os.type();
            var platform_run = os.platform();
            var release_run = os.release();
            var arch_run = os.arch();
            var Name_run = osName(platform_run, release_run);

            // Version Node.js
            var version_node = process.version;

            // Version Application
            var version_app = vers.Create.Version;

            // Relase Date Application
            var Relase_app_date = vers.Create["Date Check"];

            // info CPU
            var CPU = os.cpus();
            var speed_CPU = CPU[0].speed;
            CPU_name = CPU[0].model;


            // info RAM
            var total_memory = os.totalmem();
            var total_mem_in_kb = total_memory / 1024;
            var total_mem_in_mb = total_mem_in_kb / 1024;
            var total_mem_in_gb = total_mem_in_mb / 1024;
            total_mem_in_kb = Math.floor(total_mem_in_kb);
            total_mem_in_mb = Math.floor(total_mem_in_mb);
            total_mem_in_gb = Math.floor(total_mem_in_gb);
            total_mem_in_mb = total_mem_in_mb % 1024;
            total_mem_in_kb = total_mem_in_kb % 1024;
            total_ram = "Total memory: " + total_mem_in_gb + "GB " + total_mem_in_mb + "MB " + total_mem_in_kb + "KB";

            // Uptime Server Host:
            var ut_sec = os.uptime();
            var ut_min = ut_sec / 60;
            var ut_hour = ut_min / 60;
            var ut_day = ut_hour / 24;
            ut_sec = Math.floor(ut_sec);
            ut_min = Math.floor(ut_min);
            ut_hour = Math.floor(ut_hour);
            ut_day = Math.floor(ut_day);
            ut_hour = ut_hour % 60;
            ut_min = ut_min % 60;
            ut_sec = ut_sec % 60;
            ut_day = ut_day % 24;
            var uptime_server = "Up time Server: " + ut_day + "d:" + ut_hour + "h:" + ut_min + "m:" + ut_sec + "s";

            // Uptime Application:
            var ap_sec = process.uptime();
            var ap_min = ap_sec / 60;
            var ap_hour = ap_min / 60;
            var ap_day = ap_hour / 24;
            ap_sec = Math.floor(ap_sec);
            ap_min = Math.floor(ap_min);
            ap_hour = Math.floor(ap_hour);
            ap_day = Math.floor(ap_day);
            ap_hour = ap_hour % 60;
            ap_min = ap_min % 60;
            ap_sec = ap_sec % 60;
            ap_day = ap_day % 24;
            var uptime_app = "Up time App: " + ap_day + "d:" + ap_hour + "h:" + ap_min + "m:" + ap_sec + "s";

            // set Img os
            if (platform_run == "win32") {
                if (Name_run == "Windows 10") {
                    var img_os = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Windows_logo_-_2012_%28dark_blue%29.svg/1200px-Windows_logo_-_2012_%28dark_blue%29.svg.png"
                } else if (Name_run == "Windows 8.1") {
                    var img_os = "https://downloadandkey.com/wp-content/uploads/2017/08/windows-8.1-logo.jpg"
                } else if (Name_run == "Windows 8") {
                    var img_os = "https://banner2.cleanpng.com/20180324/lhq/kisspng-windows-8-1-computer-software-windows-7-windows-logos-5ab719a19b2416.7302040815219490896355.jpg"
                } else if (Name_run == "Windows 7") {
                    var img_os = "https://technicallyeasy.net/wp-content/uploads/2010/03/windows-logo-450449.png"
                } else if (Name_run == "Windows Vista") {
                    var img_os = "https://lh3.googleusercontent.com/proxy/bSCIWmG9Ct7X0YjcXhCJljxRR580_Udt5DQMtlcQKOXaI9u7btDyTv-TafyAJtyXH7TP-Y9bHawIVFcYx3xy6qwiQ7AVgUtTA-1guzOAHNHWf3te87Zz1Bz8fntD_PWP_tjEM7EyNDcf"
                } else if (Name_run == "Windows Server 2003") {
                    var img_os = "https://lh3.googleusercontent.com/proxy/yr-1j2BuzgM637_5Yd_BNE-dDqKPiEds_NtZ-bUCC4YGBphMnOaaZJe84EpVFWEinuWD9QjMOXyfGY0qgEHi0y83FCo0OT4VfrRQVXtp0YQ2TtLjjCNi0DxeKzL9bPie1zRhsRO1FUA"
                } else if (Name_run == "Windows XP") {
                    var img_os = "https://i.imgur.com/OtfzGgx.png"
                } else {
                    var img_os = "https://www.kindpng.com/picc/m/277-2770780_windows-server-2012-icon-hd-png-download.png"
                }
            } else if (platform_run == "darwin") {
                var img_os = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/MacOS_logo_%282017%29.svg/768px-MacOS_logo_%282017%29.svg.png"
            } else if (platform_run == "linux") {
                var img_os = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/1200px-Tux.svg.png"
            } else if (platform_run == "openbsd") {
                var img_os = "https://upload.wikimedia.org/wikipedia/it/thumb/c/c9/OpenBSD_Logo.svg/1200px-OpenBSD_Logo.svg.png"
            } else if (platform_run == "freebsd") {
                var img_os = "https://seeklogo.com/images/F/freebsd-logo-D2E9B59F6A-seeklogo.com.png"
            } else if (platform_run == "aix") {
                var img_os = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/IBM_AIX_logo.svg/1200px-IBM_AIX_logo.svg.png"
            } else if (platform_run == "cygwin") {
                var img_os = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cygwin_logo.svg/1024px-Cygwin_logo.svg.png"
            } else if (platform_run == "netbsd") {
                var img_os = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/NetBSD.svg/1200px-NetBSD.svg.png"
            } else if (platform_run == "sunos") {
                var img_os = "https://logodix.com/logo/1857591.png"
            } else if (platform_run == "android") {
                var img_os = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Android_logo_2019.svg/1173px-Android_logo_2019.svg.png"
            } else {
                var img_os = "https://cdn.onlinewebfonts.com/svg/img_144996.png"
            }

            // Dependencies:
            var Dependencies = ""
            for (a in lib.dependencies) {
                Dependencies = Dependencies + a + ": " + lib.dependencies[a] + "\n";
            }

            // Output
            if (config.Debug_Level == "DEBUG") {
                var Dep = "";
                var run_1 = false;
                console.log("[ " + color.cyan('DEBUG') + " ] OS Name: " + Name_run);
                console.log("[ " + color.cyan('DEBUG') + " ] Type: " + type_run);
                console.log("[ " + color.cyan('DEBUG') + " ] Platform: " + platform_run);
                console.log("[ " + color.cyan('DEBUG') + " ] Release: " + release_run);
                console.log("[ " + color.cyan('DEBUG') + " ] Kernel Release: " + kernel_release_run);
                console.log("[ " + color.cyan('DEBUG') + " ] Arch: " + arch_run);
                console.log("[ " + color.cyan('DEBUG') + " ] CPU: " + CPU_name);
                console.log("[ " + color.cyan('DEBUG') + " ] Speed CPU: " + speed_CPU);
                console.log("[ " + color.cyan('DEBUG') + " ] Cores: " + osutils.cpuCount());
                console.log("[ " + color.cyan('DEBUG') + " ] " + total_ram);
                console.log("[ " + color.cyan('DEBUG') + " ] " + uptime_server);
                console.log("[ " + color.cyan('DEBUG') + " ] Node.js: " + version_node);
                for (a in lib.dependencies) {
                    if (run_1 == false) {
                        Dep = "[ " + color.cyan('DEBUG') + " ] " + a + ": " + lib.dependencies[a];
                        run_1 = true;
                    } else {
                        Dep = Dep + "\n[ " + color.cyan('DEBUG') + " ] " + a + ": " + lib.dependencies[a];
                    }
                }
                console.log("[ " + color.cyan('DEBUG') + " ] Dependencies:\n" + Dep);
                console.log("[ " + color.cyan('DEBUG') + " ] app: " + version_app);
                console.log("[ " + color.cyan('DEBUG') + " ] " + uptime_app);
            }

            if (type_run == "Linux") {
                var getos = require('getos');
                getos(function (e, os_linux) {
                    if (e) return console.log(e);
                    var obj_linux = JSON.stringify(os_linux)
                    console.log(typeof os_linux);
                    var platform_run = obj_linux["dist"];
                    var release_run = obj_linux["release"];
                    //Kernell INFO
                    var Name_run = osName(platform_run, release_run);
                    var kernel_release_run = os.release();
                    var arch_run = os.arch();
                    Container.setColor([255, 0, 0])
                        .setTitle("Version Bot and Info Server Host")
                        .setThumbnail(img_os)
                        .addField("Operation System", "OS Name: " + Name_run + "\nType: " + type_run + "\nPlatform: " + platform_run + "\nRelease: " + release_run + "\nArch: " + arch_run + "\n Kernel: " + kernel_release_run)
                        .addField("Hardware Server", "CPU: " + CPU_name + "\nCores: " + osutils.cpuCount() + "\n Core Speed: " + speed_CPU + "MHz\n" + total_ram + "\n" + uptime_server)
                        .addField("Demon Node.js", "Version: " + process.version)
                        .addField("Dependencies", Dependencies)
                        .addField("Application Bot", "Version: v" + version_app + "\n Relase Date: " + Relase_app_date + "\n" + uptime_app);
                    message.channel.send(Container);
                });
            } else {
                Container.setColor([255, 0, 0])
                    .setTitle("Version Bot and Info Server Host")
                    .setThumbnail(img_os)
                    .addField("Operation System", "OS Name: " + Name_run + "\nType: " + type_run + "\nPlatform: " + platform_run + "\nRelease: " + release_run + "\nArch: " + arch_run)
                    .addField("Hardware Server", "CPU: " + CPU_name + "\nCores: " + osutils.cpuCount() + "\n Core Speed: " + speed_CPU + "MHz\n" + total_ram + "\n" + uptime_server)
                    .addField("Demon Node.js", "Version: " + process.version)
                    .addField("Dependencies", Dependencies)
                    .addField("Application Bot", "Version: v" + version_app + "\n Relase Date: " + Relase_app_date + "\n" + uptime_app);
                message.channel.send(Container);
            }

        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');
            message.channel.send(Container);
        }
    }
}