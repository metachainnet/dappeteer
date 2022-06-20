import * as path from 'path';

export type PhantomExtensionPath = { download: string; extract: string };

// constants => phantom => src
export const BASE_PHANTOM_PATH = path.resolve(__dirname, '..', '..', '..', 'phantom');
export const PHANTOM_ZIP_PATH = path.resolve(BASE_PHANTOM_PATH, 'download', 'phantom-chrome-22.5.25.2.zip');
export const DEFAULT_PHANTOM_PATH: PhantomExtensionPath = {
  download: path.resolve(BASE_PHANTOM_PATH, 'download'),
  extract: path.resolve(BASE_PHANTOM_PATH, 'latest'),
};
