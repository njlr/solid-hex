import babel from 'rollup-plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs', 
  },
  plugins: [ 
    babel({
      exclude: 'node_modules/**', 
    }),
    autoExternal({
      dependencies: true,
      peerDependencies: true,
      builtins: true,
    }),
    commonjs(),
    globals(), 
  ], 
};
