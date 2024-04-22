/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable no-undef */
export const navData = $state({
	headerHeight: "100px",
	activeIndex: 0,
	openMenu: false,
	navItems: [
		{
			title: 'about',
			link: '/',
			name: 'about',
			id: 'about',
			index: 1
		},
		{
			title: 'our work',
			link: '/',
			name: 'our work',
			id: 'ourWork',
			index: 2
		},
		{
			title: 'services',
			link: '/services',
			name: 'services',
			id: 'services',
			index: 3
		},
		{
			title: 'our clients',
			link: '/our-clients',
			name: 'our clients',
			id: 'ourClients',
			index: 4
		},
		{
			title: 'contact',
			link: '/contact',
			name: 'contact',
			id: 'contact',
			index: 5
		}
	]
});


/**
 * @param index {number}
 */
export function changeOpenMenuIndex(index) {
	navData.openMenu = !navData.openMenu;
	navData.activeIndex = index;
}
