async function createRelease (installer, options) {

  try {
    await installer(options)
    console.log(`Success, release at ${options.dest}`)
  } catch (err) {
    console.error("No dice : " + err.message)
  }
}

module.exports.deb = function () {
  const createDeb = require('electron-installer-debian')
  console.log('Creating release package for Debian .deb file')

  const options = {
    arch: 'x86_64',
    dest: './installers/linux-x64',
    icon: 'cupcakes.icns',
    src: './packages/OWASP-Threat-Dragon-linux-x64/',
  }

  createRelease(createDeb, options)
}

module.exports.rpm = function () {
  const createRPM = require('electron-installer-redhat')
  console.log('Creating release package for Redhat .rpm file')

  const options = {
    arch: 'x86_64',
    dest: './installers/linux-x64',
    icon: 'cupcakes.icns',
    src: './packages/OWASP-Threat-Dragon-linux-x64/',
  }

  createRelease(createRPM, options)
}

module.exports.snap = function () {
/* So far unable to get this to work
  const createSnap = require('electron-installer-snap')
  console.log('Creating release package for Snap .snap file')

  const options = {
    arch: 'x64',
    dest: './installers/linux-x64',
    name: 'threatdragon',
    src: './packages/OWASP-Threat-Dragon-linux-x64/',
  }

  createRelease(createSnap, options)
*/
  console.log('Snap files not supported yet')
}

