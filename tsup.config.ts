import type { Options } from 'tsup';

export const tsup: Options = {
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm'],
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  watch: false,
  target: 'es2020',
  outDir: 'dist',
  entry: ['src/index.ts'],
};
