const os = require('os');

// https://nodejs.org/api/os.html#os_os_arch
function mapArch(arch) {
  const mappings = {
    x64: 'amd64'
  };
  return mappings[arch] || arch;
}

// https://nodejs.org/api/os.html#os_os_platform
function mapOS(os) {
  const mappings = {
    win32: 'windows'
  };
  return mappings[os] || os;
}

function getDownloadObject(version) {
  const platform = os.platform();
  const filename = `konjure-${ mapOS(platform) }-${ mapArch(os.arch()) }`;
  const extension = platform === 'win32' ? 'zip' : 'tar.gz';
  const binPath = platform === 'win32' ? 'bin' : filename;
  const url = `https://github.com/thestormforge/konjure/releases/download/v${ version }/${ filename }.${ extension }`;
  return {
    url,
    binPath
  };
}

module.exports = { getDownloadObject }
