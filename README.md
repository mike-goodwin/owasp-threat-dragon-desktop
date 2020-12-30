Note that this repository has been migrated from Mike Goodwin's [original](https://github.com/mike-goodwin/owasp-threat-dragon-desktop) ,
which has the issues and pull requests from March 2017 up to June 2020.

<p align="center">
  <img src="https://raw.githubusercontent.com/owasp/threat-dragon-desktop/main/content/images/threatdragon_logo_image.svg" width="200" alt="Threat Dragon Logo"/>
</p>

[![Github All Releases](https://img.shields.io/github/downloads/owasp/threat-dragon-desktop/total.svg)]()
[![Build Status](https://travis-ci.org/owasp/threat-dragon-desktop.svg?branch=main)](https://travis-ci.org/owasp/threat-dragon-desktop)
[![codecov.io](http://codecov.io/github/owasp/threat-dragon-desktop/coverage.svg?branch=main)](http://codecov.io/github/owasp/threat-dragon-desktop?branch=main)
[![GitHub license](https://img.shields.io/github/license/owasp/threat-dragon-desktop.svg)](LICENSE.txt)

# [OWASP](https://www.owasp.org) Threat Dragon #

Threat Dragon is a free, open-source, cross-platform [threat modeling](https://owasp.org/www-community/Threat_Modeling)
application including system diagramming and a rule engine to auto-generate threats/mitigations. It is an
[OWASP Incubator Project](https://owasp.org/www-project-threat-dragon/). The focus of the project is on great UX,
a powerful rule engine and integration with other development lifecycle tools.

There is a good overview of [threat modeling and risk assessment](https://owasp.org/www-community/Application_Threat_Modeling)
from OWASP, and this expands on what Threat Dragon will achieve: 
* designing the data flow diagram
* automatic determining and ranking threats
* suggested mitigations
* entry of mitigations and counter measures

The application comes in two variants:

1. [**A web application**](https://github.com/owasp/threat-dragon): For the web application, models files
are stored in GitHub (other storage will become available). We are currently maintaining [a working protoype](https://threatdragon.org)
in synch with the main code branch.

2. [**A desktop application**](https://github.com/owasp/threat-dragon-desktop): This is based on
[Electron](https://electron.atom.io/). There are installers available for both Windows and Mac OSX, as well as rpm and
debian packages for Linux. For the desktop variant models are stored on the local filesystem.

[End user help](https://threatdragon.github.io/) is available for both variants.

This repository contains the files for the desktop variant.

## Installation from command line ##

For the latest versions of code between releases, `npm` can be used to install and run Threat Dragon locally:

`git clone https://github.com/owasp/threat-dragon-desktop`

`npm install`

Then to run it:

`npm run start`

There is a limited command line interface, with help:

`npm run help`

For example to export a given threat model file to pdf :

`npm run pdf ./threat-model.json`

## Desktop installation for MacOS ##
The .dmg installer for MacOS can be downloaded from the
[releases folder](https://github.com/mike-goodwin/owasp-threat-dragon-desktop/releases).
Open the download and drag 'OWASP Threat  Dragon' to the application directory. When the copy has
finished then Threat  Dragon can be run from launchpad or Finder -> Applications.

If an error message pops up when running for the first time, along the lines of 
_'OWASP Threat Dragon cannot be opened because the developer cannot be verified'_ or 
_“OWASP ZAP” cannot be opened because the developer cannot be verified,_
_macOS cannot verify that this app is free from malware_ then follow
[this FAQ](https://github.com/OWASP/threat-dragon-desktop/wiki/FAQs#why-do-i-get-developer-can-not-be-verified-errors-after-installing-on-macos)
to resolve this.

## Desktop installation for Windows ##
The .exe installer for Windows can be downloaded from the
[releases folder](https://github.com/mike-goodwin/owasp-threat-dragon-desktop/releases).

## Desktop installation for Linux ##
Packages for both Debian and Fedora Linux on AMD64 and X86-64bit platforms can be downloaded from the
[releases folder](https://github.com/mike-goodwin/owasp-threat-dragon-desktop/releases), along with
snap and AppImage installers.

## Optionally run from command line ##
With the desktop version of Threat Dragon installed then run the application as normal. Additionally there is a command
line interface which can be used if the executable is in the environment path. Run this command to get help :

`OWASP-Threat-Dragon help`

For example to export a given threat model file to pdf :

`OWASP-Threat-Dragon pdf ./threat-model.json --verbose`

or on Windows:

`OWASP-Threat-Dragon pdf .\threat-model.json --verbose`

# Screenshots # 

Here are a few screenshots of the app to give you a feel for what it looks like. First, the welcome screen

![Welcome Screen](/screenshots/welcome.PNG)

The diagramming screen:

![Diagramming Screen](/screenshots/diagram.PNG)

And the threat editing screen

![Threat Editing Screen](/screenshots/threat.PNG)

# Contributing #

Pull requests, feature requests, bug reports and feedback of any kind are very welcome, please refer to the page for
[contributors](https://github.com/OWASP/threat-dragon-core/blob/main/CONTRIBUTING.md). 

We are trying to keep the test coverage relatively high, so please try to update tests in any PRs and make PRs on the development branch.
There are some [developer notes](https://github.com/OWASP/threat-dragon-core/blob/main/dev-notes.md) in the core
[threat dragon](https://github.com/OWASP/threat-dragon-core) repo to help get started with this project.

# Vulnerability disclosure #

If you find a vulnerability in this project please let us know ASAP and we will fix it as a priority.
For secure disclosure, please see the [security policy](SECURITY.md).

# Project leader #

Mike Goodwin (mike.goodwin@owasp.org)
