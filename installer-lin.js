// utility to create the linux distro files for OWASP Threat Dragon
module.exports.all = async function () {
  // these have to be done consequtively not concurrently,
  // otherwise get 'files exist' errors
  await debX86()
  await debAmd64()
  await rpmX86()
  await rpmAmd64()
  await snapX86()
  await snapAmd64()
}

async function createRelease (installer, options) {

  try {
    await installer(options)
    console.log(`** Success, release at ${options.dest}`)
  } catch (err) {
    console.error("** No dice : " + err.message)
  }
}

async function debX86 () {
  console.log('** Creating Debian release .deb package for Intel x86 64 bit')

  const options = {
    arch: 'x86_64',
    dest: './installers/linux-x64',
    icon: './content/icons/icon.icns',
    src: './build/OWASP-Threat-Dragon-linux-x64/',
  }

  await createRelease(require('electron-installer-debian'), options)
}

async function debAmd64 () {
  console.log('** Creating Debian release .deb package for AMD 64 bit')

  const options = {
    arch: 'amd64',
    dest: './installers/linux-x64',
    icon: './content/icons/icon.icns',
    src: './build/OWASP-Threat-Dragon-linux-x64/',
  }

  await createRelease(require('electron-installer-debian'), options)
}

async function rpmX86 () {
  console.log('** Creating Fedora release .rpm package for Intel x86 64 bit')

  const options = {
    arch: 'x86_64',
    dest: './installers/linux-x64',
    icon: './content/icons/icon.icns',
    src: './build/OWASP-Threat-Dragon-linux-x64/',
  }

  await createRelease(require('electron-installer-redhat'), options)
}

async function rpmAmd64 () {
  console.log('** Creating Fedora release .rpm package for AMD 64 bit')

  const options = {
    arch: 'amd64',
    dest: './installers/linux-x64',
    icon: './content/icons/icon.icns',
    src: './build/OWASP-Threat-Dragon-linux-x64/',
  }

  await createRelease(require('electron-installer-redhat'), options)
}

async function snapX86 () {
  console.log('** Creating Snap release .snap package for Intel x86 64 bit')

  const options = {
    arch: 'x86_64',
    dest: __dirname + '/installers/linux-x64',
    name: 'threatdragon',
    src: __dirname + '/build/OWASP-Threat-Dragon-linux-x64/',
  }

  await createRelease(require('electron-installer-snap'), options)
}

async function snapAmd64 () {
  console.log('** Creating Snap release .snap package for AMD 64 bit')

  const options = {
    arch: 'amd64',
    dest: __dirname + '/installers/linux-x64',
    name: 'threatdragon',
    src: __dirname + '/build/OWASP-Threat-Dragon-linux-x64/',
  }

  await createRelease(require('electron-installer-snap'), options)
}

