import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

import { API_URL } from 'config';

export function fetchMenus() {
	return fetch(`${API_URL}wp-api-menus/v2/menus`)
	.then(r => r.json());
}

export function fetchMenu(id) {
	return fetch(`${API_URL}wp-api-menus/v2/menus/${id}`)
	.then(r => r.json());
}

export function fetchPages(language) {
	return fetch(`${API_URL}wp/v2/pages`)
	.then(r => r.json())
	.then(r => r[0]);
}

export function fetchPage(slug) {
	const pathname = (slug) ? slug : 'home';
	return fetch(
		`${API_URL}wp/v2/pages?${querystring.stringify({ slug: pathname })}`
	)
	.then(r => r.json())
	.then(r => r[0]);
}

export function fetchSiteInfo() {
	return fetch(`${API_URL}siteinfo/v1/content`)
	.then(r => r.json())
	.then(r => r[0]);
}
