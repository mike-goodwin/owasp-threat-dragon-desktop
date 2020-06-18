Note that this repository has been migrated from Mike Goodwin's [original](https://github.com/mike-goodwin/owasp-threat-dragon-desktop) , which has the issues and pull requests from March 2017 up to June 2020.

<p align="center">
  <img src="https://raw.githubusercontent.com/owasp/threat-dragon-desktop/main/content/images/threatdragon_logo_image.svg" width="200" alt="Threat Dragon Logo"/>
</p>

[![Github All Releases](https://img.shields.io/github/downloads/mike-goodwin/owasp-threat-dragon-desktop/total.svg)]()
[![Known Vulnerabilities](https://snyk.io/test/github/mike-goodwin/owasp-threat-dragon-desktop/badge.svg)](https://snyk.io/test/github/mike-goodwin/owasp-threat-dragon-desktop)
[![GitHub license](https://img.shields.io/github/license/owasp/threat-dragon-core.svg)](LICENSE.txt)

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

[End user help](http://docs.threatdragon.org/) is available for both variants.

This repository contains the files for the desktop variant.

# Local installation #

For the latest versions of code between releases, `npm` can be used to install and run Threat Dragon locally:

`git clone https://github.com/owasp/threat-dragon-desktop`

`npm install`

Then to run it:

`npm run start`

There is a limited command line interface, with help:

`npm run help`

For example to export a given threat model file to pdf :

`npm run pdf ./threat-model.json`

Installers for OSX and Windows can be downloaded from the
[releases folder](https://github.com/mike-goodwin/owasp-threat-dragon-desktop/releases).
In there you can also find packages for both Debian and Fedora Linux on AMD64 and X86-64bit platforms.

With an installed Threat Dragon, and if the executable is in the path, then
the command line interface can be called, for example:

`OWASP-Threat-Dragon help`

And similarly to export to pdf:

`OWASP-Threat-Dragon pdf ./threat-model.json --verbose`

# Screenshots # 

Here are a few screenshots of the app to give you a feel for what it looks like. First, the welcome screen

![Welcome Screen](/screenshots/welcome.PNG)

The diagramming screen:

![Diagramming Screen](/screenshots/diagram.PNG)

And the threat editing screen

![Threat Editing Screen](/screenshots/threat.PNG)

# Contributing #

PRs, feature requests, bug reports and feedback of any kind are very welcome. We are trying to keep the test coverage
relatively high, so please try to include tests in any PRs and make PRs on the development branch.


# Vulnerability disclosure #

If you find a vulnerability in this project please let us know ASAP and we will fix it as a priority.
For secure disclosure, please email mike.goodwin@owasp.org using the following PGP key:

```-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: FlowCrypt 5.1.8 Gmail Encryption flowcrypt.com
Comment: Seamlessly send, receive and search encrypted email

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
Odp+4g==
=8d0U
-----END PGP PUBLIC KEY BLOCK-----
```

If you are not a PGP user, you can easily send an encrypted email from https://flowcrypt.com/me/mikegoodwin

# Project leader #

Mike Goodwin (mike.goodwin@owasp.org)
