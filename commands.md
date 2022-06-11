<!-- TODO: ADD STYLE COMMAND -->

# Commands

[Click Here to go back to main](https://github.com/ofelizestevez/Just-Another-Terminal)
## Command Table

| Command | Description |
| ----------- | ----------- |
[help](#help-command)|Using this command will print out a tip for terminal or command ('--help')
[clear](#clear-command)|Clear terminal
[create](#create-command)|Create new command
[remove](#remove-command) (rm)|Remove a created command.
[style](#style-command)|Change the style of your terminal (including the background image)
[font](#font-command)|Change the font of the terminal, this has the ability to change both the font face and font size
[backup](#backup-command)|Download a backup of commands created with the 'create' command
restore|Use a previously downloaded command backup to restore your previously made commands
[browse](#browse-command) (b)|Change Background
[google](#google-command) (g)|Google search a query
[gmail](#gmail-command) (gm)|Go to Gmail
[drive](#drive-command) (gd)|Go to Google Drive
[reddit](#reddit-command) (r)|Go to Reddit or a particular Subreddit
[youtube](#youtube-command) (yt)|Go to and Search Youtube
[twitch](#twitch-command) (ttv)|Go to and Search Twitch

## Individual Commands

### "help" Command
[go back to the command table](#command-table)

Help is the most important for people that are not acclimated to the command system. This has 2 different usages.

1. Inputting "help" as a command

    This command prints out a table of all the commands and short descriptions for each command
    ```
    help
    ```

2. inputting "--help" as a command argument

    This command prints the usage/command example for the specific command.
    ```
    gmail --help
    ```


---

### "clear" Command
[go back to the command table](#command-table)

Clear is a very simple command that clears all the outputs from the terminal.

```
clear
```


----

<!-- SUB-SECTION create -->
### "create" command
[go back to the command table](#command-table)

the "create" command is a command which saves user-generated commands based off of templates to the browser's LocalStorage. Currently, the only template supported is the link template, which works as a bookmark which redirects you to another link.

This command uses a helper function named link_handler() to handle improper links, which means you won't have to include "https://" , "www." , or ".com" when making a link. This does have a limitation where if you'd like to link to an "http://" address, you will need to include it in the [ARGUMENT]. Similarly, if you'd like to link to a subdirectory, you will need to include the ".com" and the subdirectory in the argument. Lastly, since this handler assumes the website is a ".com", if you'd like to go to a website with another ending, you're going to need to include it as well.

Note: using general command names or shortened command names that were already a part of the command list will override them. This could be a good thing or a bad thing.

#### Usage
```
create [TEMPLATE] [COMMAND NAME] [ARGUMENT] [SHORTENED COMMAND NAME](OPTIONAL)
```

```
create link [COMMAND NAME] [LINK] [SHORTENED COMMAND NAME](OPTIONAL)
```

One thing to note here is that the shortened command name is optional.

#### Examples

This example will create a command that redirects to https://github.com/
```
create link github github gh
```

This example will create a command that redirects to https://wikipedia.org/wiki/Haimchar_Upazila
```
create link haimchar wikipedia.org/wiki/Haimchar_Upazila
```

This example will create a command that redirects to http://www.staggeringbeauty.com/
```
create link staggeringbeauty http://staggeringbeauty sb
```

---

### "remove" command
[go back to the command table](#command-table)

the "remove" command is a counterpart to the "create" command, meaning that it can delete or remove a user-generated command. The shortened named for this command is rm. In order to remove a command, you need to use it's general name, not the shortened name.

#### Usage
```
remove [COMMAND NAME]
```

#### Example
```
remove github
```

---

### "style" command
[go back to the command table](#command-table)

The "style" command is a great way to make this terminal website you own (atleast visually). The current features of this command include:

* change the terminal theme depending on 5 default [0-4], which changes the background and the prefix colors.
* change the colors of the prefix individually (3 colors in total, although)
* change the background to a background of your choosing (as long as it's a URL and not a local file)
* change the opacity of the terminal window
* change the background color of the terminal window.
* change the general font color.

In the future, I plan to add the following features:
* change the terminal background color

This command works on style types. The current style types supported are: template (t), colors (c), background (bg), and opacity (o)

#### Usage
```
style [set OR unset] [STYLE TYPE]
```
```
style set template [INT]
```
```
style set t [INT]
```
```
style set colors [HEX COLOR 1] [HEX COLOR 2](OPTIONAL) [HEX COLOR 3](OPTIONAL)
```
```
style set c [HEX COLOR 1] [HEX COLOR 2](OPTIONAL) [HEX COLOR 3](OPTIONAL)
```
```
style set background [BG_URL]
```
```
style set bg [BG_URL]
```
```
style set opacity [NUM FROM 0.0 TO 1.0]
```
```
style set o [NUM FROM 0.0 TO 1.0]
```
```
style set terminal [HEX COLOR]
```
```
style set term [HEX COLOR
```
```
style set font [HEX COLOR]
```
```
style set f [HEX COLOR
```
```
style unset [STYLE]
```

#### Examples

```
style set template 1
```

```
style set c #000
```
```
style set background https://images.unsplash.com/photo-1654481862986-b7329dbdbbf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80
```
```
style set o 0.6
```
```
style unset template
```

---
### "font" command
[go back to the command table](#command-table)

The font command is similar to the style command, where it gives you customizablity over the terminal. In this instance, you as the user can change the font size and font face of the terminal. 

NOTES: For the "font size", make sure to keep your size at a reasonable range (10-30), as making it too big might create a hard to reverse situation. Font the "font family", currently, the terminal only supports Google Fonts, but I'm sure I'll add support to others afterwards. To get the appropriate google font URL, make sure to select the style and use the url for css @import.


#### Usage
```
font set face [URL]
```
```
font set size [PX SIZE]
```
```
font unset face
```
```
font unset size
```

#### Examples
```
font set face https://fonts.googleapis.com/css2?family=Pacifico&display=swap
```
```
font set size 16
```
```
font unset face
```
```
font unset size
```


---

### "backup" command
[go back to the command table](#command-table)

"backup" is another simple command with no arguments which downloads a .json of your commands created with the "create" command. This is useful for transfering your commands between devices and restoring them in case they get deleted.

#### Usage & Example
```
backup
```

---

### "Restore" command
[go back to the command table](#command-table)

"restore" is a command with no arguments that is the counterpart to the backup command. There is currently no check to make sure that the file uploaded is a file generated by the website, so if you upload a random file, it might override your commands.

#### Usage & Example
```
restore
```
<!-- GIF EXAMPLE HERE -->

---

### "browse" command
[go back to the command table](#command-table)

The browse command takes 1 argument, which is supposed to be a link. 

This command also uses the link_handler() helper, thus, the same limitations of create also apply to this command.

#### Usage
```
browser [LINK]
```
```
b [LINK]
```

#### Examples
This example sends you to https://puginarug.com
```
browser puginarug
```

This example will send you to http://www.staggeringbeauty.com/
```
b http://staggeringbeauty 
```

This example will send you to https://wikipedia.org/wiki/Haimchar_Upazila
```
b wikipedia.org/wiki/Haimchar_Upazila
```

---

### "google" command
[go back to the command table](#command-table)

The "google" command is a command that can redirect to google search or do a google search query. The short name for google is g.

This command is not limited by spaces.

#### Usage
```
google [SEARCH QUERY](OPTIONAL)
```
```
g [SEARCH QUERY](OPTIONAL)
```

#### Examples
This example will send you to google
```
google
```

This example will end you to https://www.google.com/search?q=weather
```
google how are you today
```

---

### "gmail" command
[go back to the command table](#command-table)

The "gmail command takes 1 optional argument. This argument is a number which refers to the int linked to your gmail account. For example, if you are logged into 3 google accounts then the associated ints would be 0, 1 , & 2. using the command without an argument will redirect you the default gmail page.

#### Usage
```
gmail (NUMBER)[OPTIONAL]
```
```
gm (NUMBER)[OPTIONAL]
```
#### Examples

This example will redirect you to https://mail.google.com/mail/u/1/#inbox
```
gmail 1
```

This example will redirect you to https://mail.google.com/mail/u/0/#inbox
```
gm
```

---

### "drive" command
[go back to the command table](#command-table)

The "drive" command is similar to the gmail command, where it takes 1 optional argument which is a number associated with your account logged in.

#### Usage
```
drive (NUMBER)[OPTIONAL]
```
```
gd (NUMBER)[OPTIONAL]
```

#### Examples

This example will redirect you to https://drive.google.com/mail/u/1/#inbox
```
drive 1
```

This example will redirect you to https://drive.google.com/mail/u/0/#inbox
```
gd
```

---

### "reddit" command
[go back to the command table](#command-table)

The "drive" command is a command which takes 1 optional argument. This argument is currently limited to a subreddit name.

#### Usage

```
reddit [SUBREDDIT](OPTIONAL)
```
```
r [SUBREDDIT](OPTIONAL)
```

#### Examples

This example will redirect you to https://www.reddit.com/
```
reddit
```
This example will redirect you to https://www.reddit.com/r/manga/
```
r manga
```

---
### "youtube" command
[go back to the command table](#command-table)

This command works as a youtube redirect, but also as a way to look up something on youtube. One thing to note is that this command's argument is not limited by spaces.


#### Usage
```
youtube [SEARCH QUERY](OPTIONAL)
```
```
yt [SEARCH QUERY](OPTIONAL)
```
#### Examples
This example will redirect you to https://www.youtube.com/
```
youtube
```
This example will redirect you to https://www.youtube.com/results?search_query=meme+videos
```
yt meme videos
```

---
### "twitch" command
[go back to the command table](#command-table)

The twitch command is a bit more complicated than all the other commands. the twitch command has 2 optional arguments, type of query and the query itself. The current types of query supported are search (s), channel (c) and directory (d)


#### Usage 
```
twitch [TYPE OF QUERY](OPTIONAL) [QUERY]
```
```
twitch search SEARCH_QUERY
```
```
ttv s SEARCH_QUERY
```
```
twitch channel CHANNEL
```
```
ttv c CHANNEL
```
```
twitch directory CHANNEL
```
```
ttv d DIRECTORY
```

#### Examples
This example will redirect you to https://www.twitch.tv/
```
twitch
```

This example will redirect you to https://www.twitch.tv/search?term=test
```
ttv s test
```

This example will redirect you to https://www.twitch.tv/moistcr1tikal
```
twitch channel moistcr1tikal
```

This example will redirect you to
```
https://www.twitch.tv/directory/game/apex%20legends
```