// App configuration for both server and client side. For now it mostly defines the <head> values

module.exports = {
	API_URL: 'http://robin.local/personal/robinwkurtz_playground_wp/wp-json/wp/v2/',
	API_URL_MENUS: 'http://robin.local/personal/robinwkurtz_playground_wp/wp-json/wp-api-menus/v2/menus',
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
	},
	socialList: [
		{
			link: 'https://www.behance.net/robinwkurtz',
			title: 'Behance',
			target: '_blank'
		},
		{
			link: 'https://www.instagram.com/robinwkurtz/',
			title: 'Instagram',
			target: '_blank'
		},
		{
			link: 'https://dribbble.com/robinwkurtz',
			title: 'Dribbble',
			target: '_blank'
		},
		{
			link: 'https://github.com/robinwkurtz',
			title: 'GitHub',
			target: '_blank'
		},
		{
			link: 'https://www.linkedin.com/in/robin-kurtz-238a934b',
			title: 'LinkedIn',
			target: '_blank'
		},
		{
			link: '/contact',
			title: 'Contact',
			icon: 'paper-plane',
			target: '_self'
		}
	]
}
