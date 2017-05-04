// App configuration for both server and client side. For now it mostly defines the <head> values

module.exports = {
	// API_URL: 'http://robin.local/personal/robinwkurtz_playground_wp/wp-json/',
	API_URL: 'http://playground.robinwkurtz.com/wp-json/',
	app: {
		logo: {
			full: 'Robin Kurtz',
			short: 'RK'
		},
		head: {
			defaultTitle: 'Robin\'s Playground',
			titleTemplate: '%s | Robin\'s Playground',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'description', content: 'meta description' },
				{ property: 'og:site_name', content: 'Robin\'s Playground' },
				{ property: 'og:image', content: 'imagepath' },
				{ property: 'og:title', content: 'Robin\'s Playground' },
				{ property: 'og:description', content: 'meta description' },
				{ property: 'og:site', content: 'http://robinwkurtz.com' },
				{ property: 'og:creator', content: 'Robin Kurtz <robinwkurtz@gmail.com>' }
			]
		}
	}
}
