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
});