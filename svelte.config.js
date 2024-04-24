import adapter from '@sveltejs/adapter-cloudflare-workers';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    serviceWorker: {
			register: false,
		},
		prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                // ignore deliberate link to shiny 404 page
                if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
                    return;
                }

                // otherwise fail the build
                return message;
            },
		
        },

		adapter:adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
		}),
    alias: {
      $src: './src',
      '$src/*': './src/*',
      $lib: './src/lib',
      '$lib/*': './src/lib/*',
      $components: './src/components',
      '$components/*': './src/components/*'
    },
  },
 
  preprocess: vitePreprocess()
};
export default config;