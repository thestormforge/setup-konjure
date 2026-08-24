import path from 'node:path';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import { getDownloadObject } from './lib/utils.js';

async function setup() {
  try {
    // Get version of tool to be installed
    const version = core.getInput('version');

    // Download the specific version of the tool, e.g. as a tarball/zipball
    const download = await getDownloadObject(version);
    const pathToTarball = await tc.downloadTool(download.url);

    // Extract the tarball/zipball onto host runner
    const extract = download.url.endsWith('.zip') ? tc.extractZip : tc.extractTar;
    const pathToCLI = await extract(pathToTarball);

    // Expose the tool by adding it to the PATH
    core.addPath(path.join(pathToCLI, download.binPath));
    core.info(`Successfully setup konjure version ${ version }`);
  } catch (e) {
    core.setFailed(e);
  }
}

export default setup;

await setup();
