let db_commands;

// Sets a HTML cookie.
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
    if (getCookie(cname)) {
        document.cookie = cname + "=;" + "expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}

// async function which turns a file into a JSON. It's async cause it uses filereader. it returns a promise cause I wanted to use await.
async function fileToJSON(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = event => resolve(JSON.parse(event.target.result));
        fileReader.onerror = error => reject(error);
        fileReader.readAsText(file);
    })
}

// Helper for "restore" command
async function restoreJSON(file) {
    // awaits return from fileToJSON(), then it restores overrides localStorage
    let x = await fileToJSON(file);
    for (const [key, val] of Object.entries(x)) {
        localStorage.setItem(key, val);
    }
    // updates pre_determined_commands, we might need to update more things as we're going to add more functionality with LocalStorage
    update_pre_determined_commands();
}

// Helper for incomplete commands, to help me know where i am at. Probably not needed anymore but I'll keep it just incase.
function commandStatus(name, status) {
    console.log("Command: " + name);
    console.log("Status: " + status);
}

// Helper to print out command usages.
function describeUsage(commandUsage) {
    let create_help = document.createElement("div");
    create_help.className = "flex";
    let create_help_0 = document.createElement("p");
    create_help_0.innerHTML = "Usage:&nbsp;";
    let create_help_1 = document.createElement("p");
    create_help_1.innerHTML = commandUsage;
    create_help_1.classList.add("accent_text");

    create_help.append(create_help_0, create_help_1);
    output.append(create_help);
}

// helper to handle improper links and return a proper link. It's probably a terrible algorithm but... if it works...
function link_handler(link) {
    link = link.includes("https://") || link.includes("http://") ? link : "https://" + link;
    link = link.includes('.') ? link : link + ".com";

    if (link.includes("https://")) {
        link = link.includes("www.") ? link : link.slice(0, link.lastIndexOf("https://") + 8) + "www." + link.slice(link.lastIndexOf("https://") + 8);
    }
    else {
        link = link.includes("www.") ? link : link.slice(0, link.lastIndexOf("http://") + 7) + "www." + link.slice(link.lastIndexOf("http://") + 7);
    }

    return link;
}

// helper function to open a link. used for the user-generated commands.
function link_opener(link) {
    window.location.href = link;
}

// helper to set username
function username_change(username) {
    document.getElementById("username").innerHTML = username;
}

// creates a backup of localstorage by by encoding localstorage in stringify. then it auto downloads.
function backup() {
    const anchor = document.createElement("a");
    anchor.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localStorage)));
    anchor.setAttribute('download', "command_backup.json");

    anchor.style.display = 'none';
    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
}

// just outputs fileUpload, a file input, which it's all it needs.
function restore() {
    output.appendChild(fileUpload);
}

function testColor(color) {
    return (/^#([0-9A-F]{3}){1,2}$/i.test(color) || /^#[0-9A-F]{6}$/i.test(color));
}

function testBgURL(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
    });
}

async function checkBgURL(url) {
    let validImage = await testBgURL(url);
    return validImage;
}

function background(args = []) {
    let arg = args[0];
    let arg_num = parseInt(args[0]);

    // set image
    if (arg >= 0 && arg < color_palettes.length) {
        while (arg.length < 2) {
            arg = "0" + arg
        }
        set_style("background-image", "url('backgrounds/" + arg + ".jpg')");
    }
    else {
        textTerminalRespond("This background doesn't exist.");
        return;
    }

    // set variables
    set_style("primary-color", "#" + color_palettes[arg_num][0]);
    set_style("secondary-color", "#" + color_palettes[arg_num][1]);
    set_style("tertiary-color", "#" + color_palettes[arg_num][2]);

    // set cookies
    setCookie("bg", arg, 365);
    deleteCookie("USER_BG")
    deleteCookie("USER-PRIMARY-COLOR");
    deleteCookie("USER-SECONDARY-COLOR");
    deleteCookie("USER-TERTIARY-COLOR");

}

function style_colors(args = []) {
    let colors = args
    let invalid_color = false

    for (let i = 0; i < 3; i++) {
        if (colors[i] == undefined) {
            colors[i] = colors[colors.length - 1]
        }
        if (!(testColor(colors[i]))) { invalid_color = true; }
    }
    if (invalid_color) {
        textTerminalRespond("One of your colors is invalid");
    }
    else {
        let color1 = colors[0];
        let color2 = colors[1];
        let color3 = colors[2];
        // APPLY COLORS
        set_style("primary-color", color1);
        set_style("secondary-color", color2);
        set_style("tertiary-color", color3);
        // APPLY COOKIES
        setCookie("USER-PRIMARY-COLOR", color1);
        setCookie("USER-SECONDARY-COLOR", color2);
        setCookie("USER-TERTIARY-COLOR", color3);
    }
}

function style_terminal(args) {
    let color = args
    if (!(testColor(color))) { textTerminalRespond("Your color is invalid.") }
    else {
        if (color.length == "4") {
            color = color[0] + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
        }
        let r = parseInt(color.slice(1, 3), 16);
        let g = parseInt(color.slice(3, 5), 16);
        let b = parseInt(color.slice(5, 7), 16);

        let rgba_string = "rgba(" + r + ", " + g + ", " + b + ", var(--terminal-opacity))"
        console.log(rgba_string)
        set_style("bg-color",rgba_string)
        setCookie("USER-BG-COLOR",rgba_string)
    }
}

function style_font(args) {
    let color = args
    if (!(testColor(color))) { textTerminalRespond("Your color is invalid.") }
    else {
        set_style("fg-color",color)
        setCookie("USER-FG-COLOR",color)
    }
}


async function style_bg_url(args = []) {
    let bg = args[0]
    if (await checkBgURL(bg)) {
        setCookie("USER_BG", bg);
        set_style("background-image", "url('" + bg + "')");
    }
    else {
        textTerminalRespond("Sorry, your image url is invalid, it will not be applied.")
    }
}

function style_opacity(args = []) {
    let user_opacity = args[0];
    if (user_opacity >= 0.0 && user_opacity <= 1.0) {
        setCookie("USER_OPACITY", user_opacity);
        set_style("terminal-opacity", user_opacity);
    }
    else {
        textTerminalRespond("Your number is not between the range 0.0 to 1.0.");
    }
}

// updates user-generated commands.
function update_pre_determined_commands() {
    for (let i = 0; i < localStorage.length; i++) {
        // tries to parse the localstorage[key] result as a JSON. If it doesn't work, then ignore it.
        let key = localStorage.key(i);
        try {
            let data = JSON.parse(localStorage[key]);
            // data is something like this {command: ""; arg: ""; message: "";} which is how individual commands are structure.
            pre_determined_commands[key] = data;

            // updates all dictionaries of commands.
            all_commands_simplified = Object.assign({}, argumentative_commands, pre_determined_commands);
            update_shortened_commands();
            all_commands = Object.assign({}, all_commands_simplified, shortened_commands);
        }
        catch (SyntaxError) {
        }

    }
}

// function to update shortened_commands list and the main command list
function update_shortened_commands() {
    for (command in all_commands_simplified) {
        // if the command has a "shortened" key
        if (all_commands_simplified[command].hasOwnProperty("shortened")) {
            // take the name of the shortened command name to append to shortened commands list.
            let shortened_command = all_commands_simplified[command]["shortened"]
            // if the command has a "arg" key then set command with arg, otherwise just add the command and message. There's probably a way to do this with less lines, but for now we're chilling.
            if ("arg" in all_commands_simplified[command]) {
                shortened_commands[shortened_command] = {
                    "command": all_commands_simplified[command]["command"],
                    "arg": all_commands_simplified[command]["arg"],
                    "message": all_commands_simplified[command]["message"],
                }
            }
            else {
                shortened_commands[shortened_command] = {
                    "command": all_commands_simplified[command]["command"],
                    "message": all_commands_simplified[command]["message"],
                }
            }

        }
    }
    // updates main command list with the shortened command list
    all_commands = Object.assign({}, all_commands_simplified, shortened_commands)
}

// Command Functions

// help command that prints out a table of commands and their descriptions
function help() {
    let help_table = document.createElement("table");

    for (let [key, val] of Object.entries(all_commands_simplified)) {
        let help_row = document.createElement("tr");
        let help_row_key = document.createElement("td");
        help_row_key.classList.add("help_table_key")
        help_row_key.innerHTML = key;
        let help_row_val;
        help_row_val = document.createElement("td");
        help_row_val.innerHTML = val["message"];

        if (val.hasOwnProperty("shortened")) {
            help_row_key.innerHTML += " (" + val['shortened'] + ")";
        }

        help_row_val.classList.add("accent_text");
        help_row.append(help_row_key, help_row_val);
        help_table.append(help_row);

        output.appendChild(help_table);
    }
}

// create command
function create(args = []) {
    // currently supported create templates are link only... but i figured I'd future proof it
    const types = ["link"];
    if (args.includes("--help") || args.length == 0) {
        describeUsage("create [TYPE] [NAME] [LINK] [SHORTNAME](optional)");
    }
    else {
        if (types.includes(args[0])) {
            switch (args[0]) {
                case "link":
                    if (!args[1], !args[2]) {
                        describeUsage("create link [NAME] [LINK] [SHORTNAME](optional)");
                    }
                    else {
                        // sets command data 
                        let name = args[1];
                        let link = link_handler(args[2]);
                        let short = args[3];
                        let data = {
                            "command": "link_opener",
                            "arg": link,
                            "message": "Go to " + name,
                            "shortened": short,
                        };

                        // sets the command to localstorage, then makes it read it
                        localStorage.setItem(name, JSON.stringify(data));
                        update_pre_determined_commands()
                    }
                    break
            }
        }
        else {
            textTerminalRespond("Sorry, create command doesn't support this type of command");
            textTerminalRespond("Create supports:")
            for (i in types) {
                textTerminalRespond(types[i]);
            }

        }
    }
}

// remove command
function remove(args = []) {
    if (args.includes("--help") || args.length == 0) {
        describeUsage("remove [COMMAND_NAME]");
        describeUsage("rm [COMMAND_NAME]")
        textTerminalRespond("Make sure to only use the main command name and not the shortened name.")
    }
    else {
        // takes the name of the command user wants to delete, then it checks if it exists in dictionary. If it does, then delete it
        let desire_rm = args[0];
        if (pre_determined_commands.hasOwnProperty(desire_rm)) {
            popped_command = pre_determined_commands[desire_rm];
            delete pre_determined_commands[desire_rm];
            localStorage.removeItem(desire_rm);
            delete all_commands[desire_rm];
            delete all_commands_simplified[desire_rm];
            // if desired_rm has a shortened name, then delete it as well.
            if (popped_command.hasOwnProperty("shortened")) {
                desire_shortened_rm = popped_command["shortened"];
                delete all_commands[desire_shortened_rm];
                delete shortened_commands[desire_shortened_rm];
            }
        }
        else {
            textTerminalRespond("This command doesn't exist.");
        }
    }
}

// resets terminal by clearing everything out of the ouput div.
function clear() {
    output.innerHTML = "";
}

function username(args = []) {
    if (args.includes("--help") || args.length == 0) {
        describeUsage("username [USER NAME]");
        describeUsage("u [USER NAME]")
    }
    let username = args[0]
    if (username != undefined) {
        localStorage.setItem("NONCOMMAND_USERNAME", username);
        username_change(username);
    }
}

/*
MAYBE ROUNDED CORNERS ?!?! | [INT, INFERRED AS PX]
*/
function style(args = []) {
    if (args.includes("--help") || args.length == 0) {
        describeUsage("style [set OR unset] [STYLE TYPE]");
        describeUsage("style set template [INT]");
        describeUsage("style set t [INT]");
        describeUsage("style set colors [HEX COLOR 1] [HEX COLOR 2](OPTIONAL) [HEX COLOR 3](OPTIONAL)");
        describeUsage("style set c [HEX COLOR 1] [HEX COLOR 2](OPTIONAL) [HEX COLOR 3](OPTIONAL)");
        describeUsage("style set background [BG_URL]");
        describeUsage("style set bg [BG_URL]");
        describeUsage("style set opacity [NUM FROM 0.0 TO 1.0]");
        describeUsage("style set o [NUM FROM 0.0 TO 1.0]");
        describeUsage("style set terminal [HEX COLOR]");
        describeUsage("style set term [HEX COLOR");
        describeUsage("style set font [HEX COLOR]");
        describeUsage("style set f [HEX COLOR");
        describeUsage("style unset [STYLE]");
        textTerminalRespond("Current style types supported are: template (t), colors (c), background (bg), opacity (o), and terminal (term)")
        return
    }
    let main_arg = args[0]
    let secondary_arg = args[1]
    let tertiary_arg = args.slice(2);

    switch (main_arg) {
        case "set":
            if (tertiary_arg.length == 0) {
                textTerminalRespond("No tertiary argument.");
                return
            }
            switch (secondary_arg) {
                case "t":
                case "template":
                    background(tertiary_arg[0]);
                    break
                case "c":
                case "colors":
                    style_colors(tertiary_arg);
                    break
                case "background":
                case "bg":
                    style_bg_url(tertiary_arg);
                    break
                case "o":
                case "opacity":
                    style_opacity(tertiary_arg);
                    break
                case "term":
                case "terminal":
                    style_terminal(tertiary_arg[0]);
                    break
                case "f":
                case "font":
                    style_font(tertiary_arg[0]);
                    break
                case "":
                    break
                case undefined:
                    describeUsage("style set [STYLE] [STYLE ARGS]")
                    break
                default:
                    textTerminalRespond("This argument isn't supported");
                    textTerminalRespond("Current supported arguments include: template (t), colors (c)");
                    break
            }
            break

        case "unset":
            switch (secondary_arg) {
                case "t":
                case "template":
                    background(0)
                    break
                case "c":
                case "colors":
                    deleteCookie("USER-PRIMARY-COLOR");
                    deleteCookie("USER-SECONDARY-COLOR");
                    deleteCookie("USER-TERTIARY-COLOR");

                    let default_bg = parseInt(get_style("background-image").slice(17, 19))
                    if (default_bg != NaN) {
                        set_style("primary-color", "#" + color_palettes[default_bg][0]);
                        set_style("secondary-color", "#" + color_palettes[default_bg][1]);
                        set_style("tertiary-color", "#" + color_palettes[default_bg][2]);
                    }
                    else {
                        set_style("primary-color", "#" + color_palettes[1][0]);
                        set_style("secondary-color", "#" + color_palettes[1][1]);
                        set_style("tertiary-color", "#" + color_palettes[1][2]);
                    }
                    break
                case "bg":
                case "background":
                    deleteCookie("USER_BG");
                    setCookie("bg", "01", 365);
                    set_style("background-image", "url('backgrounds/" + "01" + ".jpg')");
                    break
                case "o":
                case "opacity":
                    deleteCookie("USER_OPACITY");
                    set_style("terminal-opacity", 0.8);
                    break
                case "term":
                case "terminal":
                    set_style("bg-color","rgba(26,26,26,var(--terminal-opacity))")
                    deleteCookie("USER-BG-COLOR")
                    break
                case "f":
                case "font":
                    set_style("fg-color","#fafafa")
                    deleteCookie("USER-FG-COLOR")
                    break
                case undefined:
                    describeUsage("style unset [STYLE]");
                    break
                default:
                    textTerminalRespond("This argument isn't supported");
                    break
            }
            break

        default:
            textTerminalRespond("The first argument isn't supported.");
            textTerminalRespond("Current supported arguments include: 'set' and 'unset'");
            break
    }

}

// USAGE font face [URL]
// usage font size pz (will be interpreted as rem)
function font(args = []) {
    if (args.includes("--help") || args.length == 0) {
        describeUsage("font set face [URL]");
        describeUsage("font set size [PX SIZE]");
        describeUsage("font unset face");
        describeUsage("font unset size");
        textTerminalRespond("NOTE: for the 'font set face [URL]', any google font will work. Make sure to use the @import url, and not the browser url.");
        textTerminalRespond("NOTE: for the 'font set size [PX SIZE]', make sure to a reasonable size, around 10-30px. Anything above may be too unworkable to revert.");
        return
    }
    let main_arg = args[0]
    let secondary_arg = args[1]
    let tertiary_arg = args[2]

    switch (main_arg) {
        case "set":
            if (secondary_arg == undefined) { textTerminalRespond("The second argument is missing."); return; }
            if (tertiary_arg == undefined) { textTerminalRespond("The second argument is missing."); return; }

            switch (secondary_arg) {
                case "face":
                    let styles = "@import url('" + tertiary_arg + "');"

                    let firstIndexOfFamily = tertiary_arg.indexOf("family=") + 7;
                    let lastIndexOfFamily = tertiary_arg.indexOf("&");

                    let fontFamily = tertiary_arg.slice(firstIndexOfFamily, lastIndexOfFamily)

                    let styleSheet = document.createElement("style");
                    styleSheet.innerText = styles;
                    document.head.appendChild(styleSheet); // THIS LINE RIGHT HERE OFFICER
                    set_style("font-family", "'" + fontFamily + "', sans-serif");
                    setCookie("USER-FONT", tertiary_arg)
                    break
                case "size":
                    let user_size = parseInt(tertiary_arg)
                    if (!(user_size == NaN)) {
                        let user_size_rem = user_size / 16
                        set_style("font-size", user_size_rem + "rem")
                        setCookie("USER-FONT-SIZE", user_size)
                    }
                    else {
                        textTerminalRespond("invalid tertiary argument.")
                    }
                    break
                default:
                    textTerminalRespond("The secondary argument isn't supported.");
                    break
            }
            break

        case "unset":
            if (secondary_arg == undefined) { textTerminalRespond("The second argument is missing."); return; }
            switch (secondary_arg) {
                case "face":
                    set_style("font-family", "'" + 'Poppins' + "', sans-serif")
                    deleteCookie("USER-FONT")
                    break

                case "size":
                    break

                default:
                    textTerminalRespond("The secondary argument isn't supported.");
                    break

            }

            break

        default:
            textTerminalRespond("The first argument isn't supported.");
            textTerminalRespond("Current supported arguments include: 'set' and 'unset'");
            break
    }

}

// browse command, takes link through the link_handler, then goes to the website
function browse(args = []) {
    if (args.includes("--help") || args.length == 0) {
        describeUsage("browse [LINK]");
        describeUsage("b [LINK]")
    }

    else {
        link = link_handler(args[0])
        window.location.href = link;
    }
}

// google command, just does a quick google query. nothing to see here.
function google(args = []) {
    if (args.includes("--help")) {
        describeUsage("google [SEARCH_QUERY]");
    }
    else {
        let search = args.join(" ");
        window.location.href = 'http://google.com/search?q=' + search;
    }
}

// gmail command, simple enough
function gmail(args = []) {
    if (args.includes("--help")) {
        describeUsage("gmail [NUM]");
        describeUsage("gm [NUM]");
    }
    else {
        let arg_num = args[0];
        window.location.href = 'https://mail.google.com/mail/u/' + arg_num + '/#inbox';
    }
}

// gdrive command, simple enough as well.
function drive(args = []) {
    if (args.includes("--help")) {
        describeUsage("drive [NUM]");
        describeUsage("gd [NUM]");
    }
    else {
        let arg_num = args[0];
        window.location.href = 'https://drive.google.com/drive/u/' + arg_num + '/my-drive';
    }
}

// reddit command. pretty simple, if no arguments, then just send them to reddit, if not, then send them to a subreddit of arg
function reddit(args = []) {
    if (args.length == 0) {
        window.location.href = 'https://www.reddit.com/';
    }
    else if (args.includes("--help")) {
        describeUsage("reddit [SUBREDDIT](optional)");
        describeUsage("r [SUBREDDIT](optional)");
    }
    else {
        let search = args.join(" ");
        window.location.href = 'https://www.reddit.com/r/' + search;

    }
}

function youtube(args = []) {
    if (args.length == 0) {
        window.location.href = 'https://www.youtube.com/';
    }
    else if (args.includes("--help")) {
        describeUsage("youtube [SEARCH_QUERY](optional)");
        describeUsage("yt [SEARCH_QUERY](optional)");
    }
    else {
        let search = args.join(" ");
        window.location.href = 'https://www.youtube.com/results?search_query=' + search;

    }
}

// twitch function. simple enough as well.
function twitch(args = []) {
    if (args.length == 0) {
        window.location.href = 'https://www.twitch.tv/';
    }
    else if (args.includes("--help")) {
        describeUsage("twitch");
        describeUsage("ttv");
        describeUsage("twitch search [SEARCH_QUERY]");
        describeUsage("ttv s [SEARCH_QUERY]");
        describeUsage("twitch channel [CHANNEL]");
        describeUsage("ttv c [CHANNEL]");
        describeUsage("twitch directory [DIRECTORY]");
        describeUsage("ttv d [DIRECTORY]");
    }
    else {
        let sub_command = args[0];
        let search = args.splice(1).join(" ");
        switch (sub_command) {
            case "c":
            case "channel":
                window.location.href = "https://www.twitch.tv/" + search;
                break
            case "s":
            case "search":
                window.location.href = "https://www.twitch.tv/search?term=" + search;
                break
            case "d":
            case "directory":
                window.location.href = "https://www.twitch.tv/directory/game/" + search;
                break
        }

    }
}

// Lists of Commands


// argumentative commands
let argumentative_commands = {
    "help": {
        "command": "help",
        "message": "Using this command will print out a tip for terminal or command ('--help')",
    },
    "clear": {
        "command": "clear",
        "message": "Clear terminal",
    },
    "create": {
        "command": "create",
        "message": "Create new command",
    },
    "remove": {
        "command": "remove",
        "message": "Remove a created command",
        "shortened": "rm",
    },
    "style": {
        "command": "style",
        "message": "Change the style of your terminal (including the background image)",
    },
    "font": {
        "command": "font",
        "message": "Change the font of the terminal, this changes both the font face and font size",
    },
    "backup": {
        "command": "backup",
        "message": "Download a backup of commands created with the 'create' command",
    },
    "restore": {
        "command": "restore",
        "message": "Use a previously downloaded command backup to restore your previously made commands",
    },
    "username": {
        "command": "username",
        "message": "Change the username",
        "shortened": "u",
    },
    "browse": {
        "command": "browse",
        "message": "Change Background",
        "shortened": "b",
    },
    "google": {
        "command": "google",
        "message": "Google search a query",
        "shortened": "g",
    },
    "gmail": {
        "command": "gmail",
        "message": "Go to Gmail",
        "shortened": "gm",
    },
    "drive": {
        "command": "drive",
        "message": "Go to Google Drive",
        "shortened": "gd",
    },
    "reddit": {
        "command": "reddit",
        "message": "Go to Reddit or a particular Subreddit",
        "shortened": "r",
    },
    "youtube": {
        "command": "youtube",
        "message": "Go to and Search Youtube",
        "shortened": "yt",
    },
    "twitch": {
        "command": "twitch",
        "message": "Go to and Search Twitch",
        "shortened": "ttv",
    },
}

// Pre-determined commands
let pre_determined_commands = {}

// main command list
let all_commands_simplified = Object.assign({}, argumentative_commands, pre_determined_commands) // used in help

let shortened_commands = {}

let all_commands = Object.assign({}, all_commands_simplified, shortened_commands) // will be expanded in the future

// POST
update_pre_determined_commands()
update_shortened_commands()