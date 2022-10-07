const os = require('os');
const { Octokit } = require('@octokit/rest')
const semver = require('semver')

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

async function getDownloadObject(version) {
  version = await getVersion(version);

  const platform = os.platform();
  const filename = `konjure-${ mapOS(platform) }-${ mapArch(os.arch()) }`;
  const extension = platform === 'win32' ? 'zip' : 'tar.gz';
  const binPath = platform === 'win32' ? 'bin' : '';
  const url = `https://github.com/thestormforge/konjure/releases/download/${ version }/${ filename }.${ extension }`;
  return {
    url,
    binPath
  };
}

async function getVersion(version) {
  // Allow clean versions to skip GitHub API calls
  let cleanVersion = semver.clean(version);
  if (cleanVersion) {
    return `v${ cleanVersion }`;
  }
  
  const octokit = new Octokit();
  await octokit.paginate(octokit.rest.repos.listReleases, {
    owner: 'thestormforge',
    repo: 'konjure'
  })
    .then((releases) => {
      for (const release of releases.filter(r => !r.prerelease)) {
        if (version === 'latest' || semver.satisfies(release.name, version, {})) {
          version = release.name;
          break;
        }
      }
    });

  return version;
}

module.exports = { getDownloadObject }
