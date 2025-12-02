import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
 if (mode === 'development') {
  //для дев режима что-то
  console.log('Дев режим');
 }
 return {
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {},
 };
});

