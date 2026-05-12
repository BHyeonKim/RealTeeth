import path from 'node:path';
import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [visualizer(), tailwindcss(), react(), svgr()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://apihub.kma.go.kr',
				changeOrigin: true,
			},
		},
	},
});
