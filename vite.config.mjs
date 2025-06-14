import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    base: isBuild ? '/console-p-website/' : '/', 
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      assetsInlineLimit: 0,
      minify: 'terser',
      sourcemap: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'mantra',
            dest: '',
          },
        ],
      }),
    ],
  };
});
