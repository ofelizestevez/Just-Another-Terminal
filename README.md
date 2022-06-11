<!-- MAKE TITLE -->
# Just Another Terminal

<!-- ADD TABLE OF CONTENTS -->
1. [Overview + Notes](#overview--notes)
1. [Usage](#usage)
1. [Commands](#commands)
1. [Future Ideas](#future-ideas)
1. [Support and Limitations](#support-and-limitations)

## Overview + Notes

![Screenshot of the website.](/screenshot.png?raw=true "Screenshot of the website.")

I'm naming this website Just Another Terminal (JUT) since this ideas is not original (actually inspired by others in [r/startpages](https://www.reddit.com/r/startpages/)). I started this project just as a personal start page but decided to share it with others since it has dynamic elements to it, such as a theme changer and the ability to create new commands/bookmarks.

One important note would be to remember that this terminal is case-sensitive, therefore typing in commands such as "Help" or "HELP" will not invoke the "help" command.

I would also like to emphasize that **this website uses cookies and localStorage** for its dynamic features. That means that out of the box, this website will not use either, but as you start to customize it through the "style" command and the "create" command, you will be using both. 
---

## Usage
One could either use the version hosted on github, or host the files on their computer. 

<!-- ADD GIF OF -->
<!-- ADD HYPERLINK -->
The address for the version hosted on github is: https://ofelizestevez.github.io/

Either way, you're going to want to change your browser's startup and/or homepage to the address either through an extension or your browser's settings.

You can go to [r/startpages' wiki](https://www.reddit.com/r/startpages/wiki/index#wiki_implementation) to learn how to set your startpage.

---

## Personalizing

Hate the default behavior of the terminal? Well there's a couple commands that can help you make this terminal your own. 

* There's the ["style" command](commands.md#style-command) which let's you change the background image, terminal background color and opacity, the font color, and the prefix color.
* There's also the ["font" command](commands.md#font-command) which lets you change the font of the terminal with any Google Font and change the font size as well.
* There's also the ["create" command](commands.md#create-command), which instead of customizing the appearance, it let's you customize the commands, giving you the ability to create your own commands. Currently, you can only create "link" commands, but if you have any suggestions for other templates, please reach out through an email, dm, or repo issue.

Would you like to see an example? Watch this sped up video of "Squidward" Setting up his ideal startpage.

https://youtu.be/zGHUosfWnA4

---
## Commands
This startpage uses commands of different functionality to work. Some commands are simple link redirectors which redirect to differnet websites, others are more complex.

Commands may be used through their general names or a shortened version of their names.

If you'd like to learn more about the individual commands, please [click here](commands.md)

---

## Feature List

* Create (remove, backup and restore) new custom commands that open webpage links.
* Quickly redirect to another website through the "browse" command.
* Make Google Search queries.
* Redirect to one of your logged in gmail and google drive accounts.
* Go to reddit or any subreddit (with autocomplete for a set of subreddits).
* Go to youtube or make a youtube query.
* Go to twitch, make a twitch query, go to a specific channel, or go to a specific directory.
* Change the font face (with any google font) and font size of the terminal.
* Change the template, colors, background, terminal opacity, terminal background, and font color.

---
## Future Ideas

* Make ability to change subreddit list
<!-- useful links: -->
<!-- https://github.com/not-an-aardvark/snoowrap -->
* Change the way commands handle the help/usage to include the link helpers.

---

## Support and Limitations
If you have any suggestions, whether different themes or how to optimize the code or any custom commands I should create, please contact me or create an issue on the repo.

If you have any suggestions for the create template commands, please contact or create an issue as well. For now, one can only create "link openers".

Also, the subreddit autocomplete function is based off of a hard-coded list of my subreddit list. In the future I will create a popular default list, with a way to change the list from the commands. One limitation to this command could possibly be the use of JS localStorage which has a max size of 5MB per website. 

I should also point out that this website will most likely never have a database attached to it.