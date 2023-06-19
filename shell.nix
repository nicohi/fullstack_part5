{ pkgs ? import <nixpkgs> {} }:

with pkgs;

(pkgs.buildFHSUserEnv {
  name = "cypress";

  targetPkgs = pkgs: (with pkgs; [
    xorg.libXScrnSaver
    xorg.libXdamage
    xorg.libX11
    xorg.libxcb
    xorg.libXcomposite
    xorg.libXi
    xorg.libXext
    xorg.libXfixes
    xorg.libXcursor
    xorg.libXrender
    xorg.libXrandr
    mesa
    cups
    expat
    ffmpeg
    libdrm
    libxkbcommon
    at-spi2-atk
    at-spi2-core
    dbus
    gdk-pixbuf
    gtk3
    cairo
    pango
    xorg.xauth
    glib
    nspr
    atk
    nss
    gtk2
    alsaLib
    gnome2.GConf
    unzip
    (lib.getLib udev)
    # Needed to compile some of the node_modules dependencies from source
    autoreconfHook
    autoPatchelfHook

    nodePackages.prettier
    nodePackages.eslint
    nodejs
  ]);
}).env
