#!/bin/sh

glib-compile-schemas ~/.local/share/gnome-shell/extensions/maxi@snickl.github.com/schemas
gnome-extensions pack
