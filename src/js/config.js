// App configuration for both server and client side. For now it mostly defines the <head> values

module.exports = {
	API_URL: 'http://localhost/robinwkurtz_playground_wp/wp-json/wp/v2/',
	API_URL_MENUS: 'http://localhost/robinwkurtz_playground_wp/wp-json/wp-api-menus/v2/menus',
	app: {
		head: {
			en: {
				defaultTitle: 'Robin\'s Playground',
				titleTemplate: '%s | Robin\'s Playground',
				meta: [
					{ charset: 'utf-8' },
					{ name: 'description', content: 'meta description' },
					{ property: 'og:site_name', content: 'Robin\'s Playground' },
					{ property: 'og:image', content: '' },
					{ property: 'og:title', content: '' },
					{ property: 'og:description', content: 'meta description' },
					{ property: 'og:site', content: '' },
					{ property: 'og:creator', content: '' }
				]
			},
			fr: {
				defaultTitle: 'Robin\'s Playground',
				titleTemplate: '%s | Robin\'s Playground',
				meta: [
					{ charset: 'utf-8' },
					{ name: 'description', content: 'meta description' },
					{ property: 'og:site_name', content: 'Robin\'s Playground' },
					{ property: 'og:image', content: '' },
					{ property: 'og:title', content: '' },
					{ property: 'og:description', content: 'meta description' },
					{ property: 'og:site', content: '' },
					{ property: 'og:creator', content: '' }
				]
			}
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
			target: '_self'
		}
	]
}
