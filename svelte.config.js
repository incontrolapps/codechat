import preprocess from 'svelte-preprocess'
//import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-netlify';


/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
		// default options are shown
		adapter: adapter({
			// if true, will create a Netlify Edge Function rather
			// than using standard Node-based functions
			edge: false,

			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app.
			// if `edge` is true, this option cannot be used
			split: false
		}),
    // hydrate the <div id="svelte"> element in src/app.html
    //target: '#svelte',

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "src/variables.scss" as *;'
          }
        }
      }
    }
  },

  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;'
      }
    })
  ]
}

export default config
