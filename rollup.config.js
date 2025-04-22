// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    name: 'index',
    dir: 'dist',
    format: 'iife'
  },
  plugins: [
    typescript(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    copy({
      targets: [
        {
          src: 'src/index.html', dest: 'dist', transform: (contents) => {
            const updatedContents = contents.toString().replace('index.ts', 'index.js');
            return updatedContents;
          }
        },
        { src: 'src/data/wa/*.json', dest: 'dist/data/wa/' },
        { src: 'src/data/years/*.json', dest: 'dist/data/years/' },
        { src: 'src/data/waOnDate/*.json', dest: 'dist/data/waOnDate/' }
      ]
    })
  ]
};