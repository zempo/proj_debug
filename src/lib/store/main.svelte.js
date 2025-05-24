/* eslint-disable no-undef */
class Main {
	currentPage = $state('');

	getRouteClass(url) {
		let routeMap = new Map();
		routeMap.set('d3', 'd3_on');
		routeMap.set('docs', 'docs_on');
		routeMap.set('glsl', 'glsl_on');
		routeMap.set('ui', 'ui_on');

		let urlSplits = url.split('/');

		return routeMap.get(`${urlSplits[1]}`) ?? 'main_on';
	}
}

export const main = new Main();
