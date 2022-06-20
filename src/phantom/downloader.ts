import * as fs from 'fs';

import StreamZip from 'node-stream-zip';

import { DEFAULT_PHANTOM_PATH, PhantomExtensionPath, PHANTOM_ZIP_PATH } from './constants/PhantomExtensionPath';

const downloader = async (location: PhantomExtensionPath = DEFAULT_PHANTOM_PATH): Promise<string> => {
  if (!fs.existsSync(location.extract)) {
    fs.mkdirSync(location.extract);
  }

  const zip = new StreamZip.async({ file: PHANTOM_ZIP_PATH });
  await zip.extract(null, location.extract);

  return location.extract;
};

export default downloader;
