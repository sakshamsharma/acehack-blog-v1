Kickstart to Vim
====================

Vim is one of the two widely known text-based Text Editor cum IDEs, the other one being, ahem, Emacs.
For people new to Vim, it might have be a big leap, it is markedely different from the usual text editors, it being modal (implying that the same keys do differnt things in different modes. Don't worry, modes are awesome.)

Some cool things to know about Vim:

1. You don't have to press any keys outside beyond the Return key. No need to stretch/move your hands to press the Home/End/PageUp/PageDown/Up/Down/Left/Right keys. There are much better ways to do that in Vim.
2. Vim works even on the most basic and old Linux computer you can run into, it runs via SSH, and basically it works everywhere.
3. Vim is yours, you make it do whatever you want. You don't have to find workarounds to things you want to do everyday, someone must have made a plugin for it already.

### Basics
Open Vim by typing `vim` in your terminal, or else `vim <file>` to open a particular file. I also first recommend you to open `vimtutor`, Vim's own tutor. I would be covering the basics pretty fast, as vimtutor explains them really well.

So, Vim by default opens in the 'normal' mode. This mode doesn't let you type text (so don't freak out when you try to type something). In this mode, most of the alphabet keys are binded to regular text-editing functions. For starters, pressing 'x' deletes the character below the cursor.

You press 'i' for Insert, this takes you to insert mode, where your alphabet keys work normally. Try typing something in Insert mode, then press the Escape key to exit to the Normal mode. Then move your cursor with the arrow keys (BAD practice, I'll come to this) over some character, and press 'x' to see it get deleted.

Now to embed the biggest change you should embrace, in Vim we use the keys 'hjkl' for moving. The arrow keys are NOT to be used.

Here:

* h: Left

* j: Down

* k: Up

* l: Down

Get used to these, and stop using arrow keys pronto. This is because, to be able to use Vim at the speed it is meant for, you ought not to move your hands away from the alphabet region of the keyboard. I'll come to 'banning' the use of the arrow keys in a short while. Also, these 4 keys represent the 4 different motions in Vim (see section on Motions)

So, learn the basic moves, you type in the Insert mode, you exit the insert mode for any editing. This is where you use the Vim specific commands. I'll list the main ones here:

* i: Insert mode

* x: Delete character

* yy: Yank a line (Yank implies keeping a line for pasting, like the concept of 'Copy' in modern text editors)

* dd: Kill a line (Kill implies delete it, but keep it for pasting, like the concept of 'Cut' in modern text editors)

* dw: Delete a word (from current position to the end of the current word)

* p: Paste some previously killed text (y stands for Yanking)

* gg: Go to the start of the document

* G: Go to the end of the document

* o: Insert a new line below the current line, move the cursor there, and then enter insert mode

* O: Insert a new line above the current line, move the cursor there, and then enter insert mode

* A: Enter insert mode at the end of the current line

* 0: Move to the start of the current line

* $: Move to the end of the current line

* %: Move to a matching brace (when your cursor is one brace, this moves you to the matching one, useful in languages like C where blocks of code are bounded by curly braces)

* "+yy: Copy line which can be pasted anywhere other than Vim too (like Browser)

* "+p: Paste text copied from outside Vim (Their meaning will be explained in a later section)

Now to saving files, you can save any text you write with `:w`. Note that pressing ':' takes you to a special mode where you can type out commands. More on this later. 'w' stands for write. You can save a file you opened with `:w`, but if it was a new file, you would have to write something like `:w filename` to save it by that name in the current directory where Vim was opened.

You can quit Vim with `:q`. Also, you can quit without saving changes by typing `:q!`

Make sure that you check out `vimtutor` at this stage. Try practicing basic vim using that now.


### Repeating commands

If you have to delete 10 consecutive lines, in a normal editor you can select them with your mouse and then delete it. Or maybe press Ctrl+Shift+Down and select them, then delete. All this is too slow.

Here's something better: `10dd`. A simple and standard pattern for all commands in Vim. You can prefix them with a number to repeat them that number of times. So 10yy would copy/yank the next 10 lines.

This is a very important thing in Vim. Similarly, you can copy 10 lines with 10yy. You can delete 10 characters with 10x. You can go 10 lines downward with 10j, or 10 lines up with 10k. You can copy 10 lines (such that they can be pasted elsewhere too) with 10"+yy. Try things out!


### Motions

I'll explain this with an example. Type some C code in Vim, and don't try to align it. Let it remain unindented. Now to indent code, in Vim you use the character '='. Now, to inform Vim of the block of code you want to indent, say you have 10 lines to indent, you go to the 1st line you want to indent, then type `10=j`. What does this mean?
It defines a motion for Vim. It reads as 'Indent the 10 lines below me.' (remember j stands for going down). This might be intimidating at first, but happens to be really versatile with practice.
What if you want to indent the whole code? Try this `G=gg`. This stands for 'Go to the start, and indent all lines from the current position to the last line of the file'.


### Visual Mode

Another way to do stuff like this, which might be more familiar to new users, is the Visual Mode. You wish you could just drag and select a block of lines to copy? Here's a way.

Press `Ctrl+V` (this does not stand for paste in Vim, remember). This activates Visual Mode. Now you can move around with hjkl and see text getting selected. Leave this mode with Escape key.

Now, say you want to copy 10 lines, go to the first line in normal mode. Press '0' to get to the beginning of the current line. Enter Visual Mode. Press '$' to select to the end of this line. Press j 10 times to go 10 lines down. See? You have 10 lines selected now (you can also use your mouse to do this, I'll tell you how to enable mouse in a later section). Copy them with 'y', or if you want to paste them elsewhere, copy them with "+y.


### The colon commands

Vim can do various other non-editing stuff with the colon-commands. You want to change your colour-scheme? Type `:colorscheme <name>` and you're done (remember, Tab completion works here. Try experimenting with different schemes right now and choose one you like).

Try typing `:set ` and then try Tab completion, you'll see the various settings you can play with.\n
Of note, these commands stay active only till Vim is open. If you close it and re-open, these settings are gone. To keep them permanent, look at the section about the vimrc.
Here is a simple setting: `:set nu`, this shows the line numbers on the left. Another thing (though not really recommended), you can enable mouse with `:set mouse=a`, where a stands for all. You can enable it for specific modes too, with n/i in place of a.


### The .vimrc

So, I claimed Vim is yours to build. Here is the way you do that. You use the configuration file called vimrc. This is a file located in your home folder by the name *.vimrc*. If not there, create a new one and open it.

Here, you can set commands to be executed whenever your Vim starts (mind it, it can slow it down a very little bit sometimes, still faster than everything out there though). So say for example you want to display line numbers all the time. You can simply write `set nu` in your vimrc and save it. Next time you open Vim, it will have line numbers from the start.

You can save Keymappings here, enable Plugins here, and do almost anything with your Vim here.


### Plugins

The best thing about Vim is, even though it doesn't do everything itself, it can do almost anything with plugins written by the vast Vim community.
Want Git support in Vim? git-gutter. Want auto-completion? AutoComplPop. Want to code in Scala? You have vim-scala.

Here is how to set up your Vim to handle plugins fast and easy. You need a plugin for that too! :p Don't get scared already. So, its called Vundle (vim-bundle I fancy). You can clone it with:

`git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim`

This clones the files required for Vundle to your .vim folder where your Vim files are stored (other than your vimrc of course).

Now add this to the start of your .vimrc:

    set nocompatible
    filetype off
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    Plugin 'gmarik/vundle'
    call vundle#End
    filetype plugin indent on

Now look up the plugin on GitHub (or other sources, I'll update this thing). Say the homepage of that plugin is this: https://github.com/tpope/vim-fugitive (a very useful Git plugin).

You can install it by adding this to your .vimrc: `Plugin 'tpope/vim-fugitive'` after the gmarik line in the text I told you to paste above. Restart vim (close and open it). Now type in `:PluginInstall` (tab-completion works). There you go, Vundle will now download and install any new plugins you wanted to install.


### Keymappings

This is one of the great features of Vim, you can map almost any activity you repeat to a key binding.
So here's a scenario, I use a plugin called NERDcommenter (I cannot live without this). This plugin by default comments the current line when you press *leader ci* . What I want instead is, to comment the line when I press '//'.
So here is what I key-in: `:map // <leader>ci`


### The :! stuff

One of the coolest things about Vim which modern editors cannot do, it to be able to run terminal commands right inside the editor. So say, you want to compile and run your C++ code from within Vim, and don't want to exit, I'll show you how to do that.
