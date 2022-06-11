if (localStorage.hasOwnProperty("NONCOMMAND_USERNAME")) {
    username_change(localStorage["NONCOMMAND_USERNAME"])
  }

// This stuff is used for the main functionality
let input = document.getElementsByClassName("input")[0];
let input_line = document.getElementById("input_line");
let output = document.getElementById("output");
let terminal = document.getElementsByClassName("terminal")[0]

// thhis is used for the auto complete feature.
// maybe use snoowrapper for this?
let subreddits = ["2meirl4meirl","abandonedporn","abruptchaos","actualpublicfreakouts","amitheasshole","anarchychess","android","apexlore","apexoutlands","apexuncovered","askreddit","bad_cop_no_donut","beforenafteradoption","bestofredditorupdates","blackpeopletwitter","bojackhorseman","choosingbeggars","cityporn","clashroyale","crappydesign","diy","designporn","fancyfollicles","firefoxcss","gamedeals","gamingcirclejerk","grandblue","hermitcraft","hiphopcirclejerk","idiotsincars","justnomil","justfuckmyshitup","justiceserved","kidcudi","magicmirror","magicmirrors","maliciouscompliance","mechanicalkeyboards","miniworlds","njtech","natureisfuckinglit","nobodyasked","paladins","paperback","piracy","politicalhumor","prorevenge","programmerhumor","properanimalnames","publicfreakout","python","raspberry_pi_projects","rainmeter","retrofuturism","retropie","rocketleagueesports","scp","sneakers","strangerthings","streetmartialarts","stretched","tiktokcringe","toiletpaperusa","tokyoghoul","trashtaste","trueoffmychest","ui_design","vaporwaveaesthetics","westsubever","anime","animepiracy","apexlegends","apexuniversity","apolloapp","apple","badcode","battlestations","beta","blockbustardcomics","bodyweightfitness","btd6guide","buildapc","buildapcsales","confidentlyincorrect","coolguides","cordcutters","creepyasterisks","criticalblunder","dankruto","desktops","electronics","fightporn","freshalbumart","gaming","graphic_design","greentext","hiphopheads","homeassistant","homelab","iosthemes","iwallpaper","iamverysmart","iphonewallpapers","itookapicture","jailbreak","jailbreakdevelopers","jailbreakpiracy","lossofalovedone","manga","marvelstudios","meirl","microgrowery","moviescirclejerk","news","notmeirl","okbuddyretard","pcmasterrace","pettyrevenge","pihole","powerwashingporn","programme_irl","raspberry_pi","relationship_advice","relationships","smartmirrors","softwaregore","talesfromtechsupport","technology","titanfolk","trashy","ublockorigin","unixporn","web_design","webdev","xqcow","zillowgonewild"]
let autocomplete = document.getElementById("autocomplete");
let suggestion;

// this is used for the ability to go up and down previous commands
let inputs_thus_far = []
let inputs_thus_far_counter;

// this is used for the restore command
// GIVE FILE UPLOAD AN ID
let fileUpload = document.createElement("input")
fileUpload.type = "file"

// focus on input line at beginning
input.focus();

// replaces meta-characters just in case of security vulnerability
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// used every time a user clicks "enter". 
function exportUserLine(){
    // copy input line, removes onclick, and remove the text input
    let current_input_line = input_line.cloneNode();
    current_input_line.removeAttribute("onClick");
    current_input_line.removeAttribute("id");
    current_input_line.className = "input_line"
    current_input_line.innerHTML = input_line.innerHTML;
    current_input_line.removeChild(current_input_line.getElementsByClassName("text_input")[0]);
    
    // remove all of the ID information, to avoid common id
    current_input_line.querySelector("#username").className = "username"
    current_input_line.querySelector("#username").removeAttribute("id")
    current_input_line.querySelector("#username_suffix").className = "username_suffix"
    current_input_line.querySelector("#username_suffix").removeAttribute("id")

    // replaces text_input with a paragraph of same value
    let uValue = document.createElement("p");
    uValue.innerHTML = input.value;
    current_input_line.appendChild(uValue);

    // append to terminal
    document.getElementById("output").append(current_input_line);
}

// this is a helper function that outputs "Command not found. For a list of commands, type 'help'."
// for the future, we might just want to make this 1 paragraph element and somehow just color the world help.
function invalidCommand(){
    let nocommand_output = document.createElement("div");
    nocommand_output.className = "flex";
    let nocommand_output_0 = document.createElement("p");
    nocommand_output_0.innerHTML = "Command not found. For a list of commands, type&nbsp;";
    let nocommand_output_1 = document.createElement("p");
    nocommand_output_1.className ="accent_text";
    nocommand_output_1.innerHTML = "'help'";
    let nocommand_output_2 = document.createElement("p");
    nocommand_output_2.innerHTML = "."
    nocommand_output.append(nocommand_output_0,nocommand_output_1,nocommand_output_2)

    document.getElementById("output").append(nocommand_output);
}

// outputs a arbitrary message
function textTerminalRespond(message){
    let p = document.createElement("p");
    p.innerHTML = message;
    
    output.append(p)
}

// REMOVE IT AFTER!!!
fileUpload.addEventListener("change", async function(event){
    console.log("IT HAS STARTED")
    if (fileUpload.files[0]){
        restoreJSON(fileUpload.files[0])
    }
    
})

input.addEventListener("keyup", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // export the current line, add the user's input to a history list, and start the counter.
        exportUserLine()
        inputs_thus_far.push(input.value)
        inputs_thus_far_counter = inputs_thus_far.length

        // splits command at spaces for easy command checking and arg usage
        let command_input = input.value.split(' ');

        // if the first word of the command is in command
        if(command_input[0] in all_commands){
            // takes the args
            let args = command_input.slice(1);

            // if there are no arguments or if the command doesn't take user arguments. then this is how it will be handled
            if (args.length == 0 || args[0] == "" || "arg" in all_commands[command_input[0]]){
                if("arg" in all_commands[command_input[0]]){
                    let arg = all_commands[command_input[0]]["arg"]

                    eval(all_commands[command_input[0]]["command"] + "('"+ arg +"')")                 
                }
                else {
                    eval(all_commands[command_input[0]]["command"] + "()") 
                }

            }
            // otherwise, this is how it handles it.
            else{
                for(var i = 0; i < args.length; i++){
                    args[i] = args[i].replaceAll("(","").replaceAll(")","").replaceAll("=>","")
                }
                let eval_string = all_commands[command_input[0]]["command"] + "(["

                for(var i = 0; i < args.length; i++){
                    eval_string +='"'+ args[i] +'"'
                    if (i != args.length - 1){
                        eval_string += ", "
                    }
                }

                eval_string += "])"
                eval(eval_string)
            }
        }

        else {
            invalidCommand()
        }

        // At the end of everything being executed, the terminal height will update to bottom, input.value is reset, and autocomplete is reset. Just in case.
        terminal.scrollTop = terminal.scrollHeight;
        input.value = "";
        autocomplete.innerHTML = "" 
    }
    // the next 2 else ifs are for the history handling. This way works even though it may seem a bit weird.
    else if (event.key === "ArrowUp"){
        if (inputs_thus_far_counter > 0){
            inputs_thus_far_counter -= 1;
            input.value = inputs_thus_far[inputs_thus_far_counter]
        }
    }
    else if (event.key === "ArrowDown"){
        if (inputs_thus_far_counter < inputs_thus_far.length - 1){
            inputs_thus_far_counter += 1;
            input.value = inputs_thus_far[inputs_thus_far_counter]
        }
        else {
            inputs_thus_far_counter = inputs_thus_far.length
            input.value = ""
        }

    }
    // handles suggestion
    else if (event.key === "Control"){
        if((input.value.startsWith("r ") || input.value.startsWith("reddit ")) && suggestion){
            input.value = input.value.split(" ")[0] + " " +suggestion
        }
    }
    // handles every other key. handles suggestions as well
    else {
        // makes sure to reset autocomplete/suggestions
        if (input.value.startsWith("")){
            autocomplete.innerHTML = ''
        }
        // if the value starts with a reddit command, then get a suggestion.
        if (input.value.startsWith("r ") || input.value.startsWith("reddit ")){
            let suggestion_result = [];
            Usubreddit = input.value.split(" ")[1];
            if (Usubreddit == ""){
            }
            else {
                for (i in subreddits){
                    subreddit = subreddits[i];
                    indx = subreddit.indexOf(Usubreddit);
                    if (indx != 0){
                        indx = 9999;
                    }
                    suggestion_result.push(indx);
                }
                if(Math.min(...suggestion_result) < 9999){
                    suggestion = subreddits[parseInt(suggestion_result.indexOf(Math.min(...suggestion_result)))]
                    let uStr = escapeRegExp(input.value.split(" ")[0]);
                    autocomplete.innerHTML= (uStr) + " " +suggestion
                }
            }
        }
    }
  });