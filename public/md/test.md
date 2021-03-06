Hopping over to i3wm
========================

i3 Window Manager is one of the more popular tiling Window Managers for Linux. It's radically different from the commonplace Window Managers you come across (example: The Window Managers of GNOME, KDE etc. To name them: Compiz, Kwin etc), and is likely to be a huge leap for anyone.

First things first, why on earth would you want to use i3? You've probably never even heard of it. Here:

1. No mouse needed ! Yes. You can live without the mouse, open applications, move windows, resize them, everything without touching the contraption named mouse.
2. Blazing fast. Even if you have an old PC, which tries really hard to make GNOME/Unity run at a snail's pace, i3 would be super fast. It even beats XFCE etc there IMO.
3. Uses every single pixel of your screen. There won't be a single pixel wasted on your screen with i3. Windows span the complete screen, you have a very minimal but hugely customizable status bar, and the window boundaries are the minimum one can live with.
4. Lets you work with a large number of workspaces seamlessly. You can have any number of workspaces, it doesn't take forever to go from 1 to 0 (just a single keypress), and allows windows marks.
5. Out-of-the-box support for multiple monitors, and exceptionally easy to use.
6. My personal favorite: It is *Made for Multitasking*. Windows arrange automatically, occupying the maximum space possible, never overlap, and keep you focussed on work all the time.

Convinced? No? I'll post some screenshots soon. Yes? Great! Let's go ahead:


### Installation

Arch:

    sudo pacman -S i3 dmenu

Arch (individual):

    sudo pacman -S i3-wm i3status i3lock dmenu

Debain/Ubuntu (a simple `sudo apt-get install i3` would install an old version):

    echo "deb http://debian.sur5r.net/i3/ $(lsb_release -c -s) universe" >> /etc/apt/sources.list
    sudo apt-get update
    sudo apt-get --allow-unauthenticated install sur5r-keyring
    sudo apt-get update
    sudo apt-get install i3


### First start (read this before you open i3)

If you use GNOME/any other Desktop Environment, just log out and while logging in, select i3 from the available Desktop sessions. For people using `startx` like me, add `exec i3` to it replacing any previous commands you used till now.

i3 loads with a black desktop background, and a small bar at the bottom. It should want your choice of the preferred 'mod key'. Personally I use the Windows/Super key, but some people prefer the Alt key. It's your choice. Though I would want to point out that choosing the Alt key would render some other shortcuts (like going back and forward in browser/file manager) useless. I'll call your choice as the 'Mod' button.

Can't do anything? Stuck? Here's something to cheer you up. Press 'Mod+Return'. A terminal! Yay! What about launching other applications? Press 'Mod+d'. See that bar up there? Type the name of the application you want, and it'll keep on filtering the list. Couldn't be more simple. Want to close an application? The default goes 'Mod+Shift+Q'. Moving to workspace 'n' (n is a number) is as simple as 'Mod+n' and moving the currently selected Window there goes by 'Mod+Shift+n'. Play around for a while.

### Again, WHY ??

If you find yourself asking 'Why would I use such tricky shortcuts? Why not a simple Alt+F4' ? Simple, that makes your hand stretch out and breaks the flow. Trust me, once you get used to it, you won't want to go back. I once went back to GNOME, and set Mod+Shift+Q and Mod+Return there too ! Anyway, if you feel it's not for you (and you *are* interested in productivity, stick around for 2-3 hours, i3 *does* take quite some time to get used to).

### Tiling

You must have noticed by now how new windows push the previous windows to the left and take up an equal amount of space. That's changeable. Open 2 terminals, and then do 'Mod+W'. This hides all the windows behind the one which was selected. Tabbed behaviour. You can move between windows with 'Mod+Left/Right' or 'Mod+j/;' (note that its not hjkl as in Vi here, its jkl; as used by typists. There's a way to change it. More on this later).

Now try 'Mod+e'. Toggling the stacking. Press it multiple times. Now you'll need to use Up/Down with Mod to move between windows too. You can perhaps see how easy it is to handle multiple tasks in the same screen this way.

This is a fairly involved thing to master, and the i3 User Guide does a fine job explaining it [here](https://i3wm.org/docs/userguide.html). Do read it! (oh, and come back here for more :P ).

Resizing a window is done by entering the resize mode with 'Mod+r'. Now use Up/Down/Left/Right/j/k/l/; to change size as required. Outside the resize mode, these buttons would move your focus onto different windows.

Before I forget, you log out of i3 with 'Mod+Shift+E' by default.

### Configuration

i3wm allows a lot of freedom in terms of customization. The configuration file is $HOME/.i3/config . Along with i3 lies a file named 'i3status' which keeps the configuration for the bottom bar you see below. You can use conky for that too (and its awesome), but for now let's not dwell on the bottom bar. The configuration file uses simple keywords to handle things. 

* `exec <command>` would run that command every time i3 starts up. Example: `exec --no-startup-id nm-applet &`.

* `bindsym <keyboard_shortcut> <command>` as expected, binds a keyboard shortcut. Example `bindsym $mod+F1 exec google-chrome-stable`

* `set $<name> <value>` sets the value for variables. Example `set $mod Mod4`

There are a couple of other keywords which aren't used as often. For now, these should get you up and running with ease.

Of note, you don't have to log out and log in to see your changes take effect. 'Mod+Shift+C' reloads the configuration, 'Mod+Shift+R' restarts i3 in place.

To try out a little customization, try changing the default motion keys from 'jkl;' to 'hjkl' (Vim users rejoice :P ). Its simple, really.

Didn't get it?
Change:

    bindsym $mod+k focus left

to:

    bindsym $mod+h focus left

Here '$mod' is a variable which is declared at the top to be Mod4 (in my case, Mod4 is the Super key, Mod1 is the Alt key).

To be continued..
