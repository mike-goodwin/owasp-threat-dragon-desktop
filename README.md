<p align="center">
  <img src="http://mike-goodwin.github.io/owasp-threat-dragon/content/images/threatdragon_logo_image.svg" width="200" alt="Threat Dragon Logo"/>
</p>

# [OWASP](https://www.owasp.org) Threat Dragon #

Threat Dragon is a free, open-source, cross-platform threat modelling application including system diagramming and a rule engine to auto-generate threats/mitigations. It is an [OWASP Incubator Project](https://www.owasp.org/index.php/OWASP_Threat_Dragon). The focus of the project is on great UX, a powerful rule engine and integration with other development lifecycle tools.

The application comes in two variants:

1. [**A web application**](https://github.com/mike-goodwin/owasp-threat-dragon): For the web application, models files are stored in GitHub (other storage will become available). We are currently maintaining [a working protoype](https://threatdragon.org) in sych with the master code branch.

2. [**A desktop application**](https://github.com/mike-goodwin/owasp-threat-dragon-desktop): This is based on [Electron](https://electron.atom.io/). There are builds available for Windows and OSX (Linux will follow at some point). For this variant models are stored on the local filesystem.

[End user help](http://docs.threatdragon.org/) is available for both variants.

This repository contains the files for the desktop variant.

# Status #

The desktop variant is a work-in-progress, but it basically works. To install and run it locally:

`git clone https://github.com/mike-goodwin/owasp-threat-dragon-desktop`
`npm install`

Then to run it on a Mac/Linux:

`./node_modules/.bin/electron .`

Or on Windows:

`.\node_modules\.bin\electron .`

Installers for OSX and Windows can be downloaded from the [releases folder](https://github.com/mike-goodwin/owasp-threat-dragon-desktop/releases). A Linux version will follow soon.

# Limitations #

The unit tests for the project are currently broken :(

Due to a lack of code signing, you may get a warning when installing on Windows and AutoUopdate on OSX does not work.

# Contributing #

PRs, feature requests, bug reports and feedback of any kind are very welcome. We are trying to keep the test coverage relatively high, so please try to include tests in any PRs and make PRs on the development branch.

# Project leader #

Mike Goodwin (mike.goodwin@owasp.org)
