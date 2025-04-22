import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfig from './tsconfig.json';
import {defineConfig} from "vite";

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z0-9\\/]/g, '');

    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });
  return webpackConfigAliases;
};

export default defineConfig({
  plugins: [react()],
  base:"/",
  resolve: {
    alias: {
      components: path.resolve(SRC_PATH, 'components'),
      pages: path.resolve(SRC_PATH, 'App/pages'),
      config: path.resolve(SRC_PATH, 'config'),
      styles: path.resolve(SRC_PATH, 'styles'),
      utils: path.resolve(SRC_PATH, 'utils'),
      firebaseConfig: path.resolve(SRC_PATH, 'firebaseConfig'),
      types: path.resolve(SRC_PATH, 'types'),
      hooks: path.resolve(SRC_PATH, 'hooks'),
      stores: path.resolve(SRC_PATH, 'stores'),
      api: path.resolve(SRC_PATH, 'api'),
      contexts: path.resolve(SRC_PATH, 'contexts'),
      icons: path.resolve(SRC_PATH, 'components/icons'),
      routes: path.resolve(SRC_PATH, 'routes')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "styles/variables" as *;`,
      },
    },
  },
});

/*
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "styles/variables" as *;`,
      },
    },
  },
});*/
