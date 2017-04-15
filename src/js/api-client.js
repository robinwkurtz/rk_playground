/*
This module is used to make API calls to WordPress.
It uses the isomorphic-fetch library which exports a fetch function.
In essence, fetch takes a URL and returns a promise for the respone.
It's the little brother of XMLHttpRequest, and it works on the server too.
*/

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

import { API_URL, API_URL_MENUS } from 'config';

export function fetchMenus() {
	return fetch(API_URL_MENUS)
	.then(res => res.json());
}

export function fetchMenu(id) {
	console.log('fetchMenu', id);
	return fetch(`${API_URL_MENUS}/${id}`)
	.then(res => res.json());
}

export function fetchPages(language) {
	return fetch(API_URL + 'pages?' + querystring.stringify({ lang: language }))
	.then(res => res.json())
	.then(res => res[0]);
}

export function fetchPage(slug) {
	console.log('fetchPage', slug);
	const pathname = (slug) ? slug : 'home';
	return fetch(API_URL + 'pages?' + querystring.stringify({ slug: pathname, lang: language }))
	.then(res => res.json())
	.then(res => res[0]);
}
