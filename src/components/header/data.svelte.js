/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable no-undef */
export const navData = $state({
	activeIndex: 0,
	showPhoneMenu: false,
	isMenuOpen: false,
	navItems: [
		{
			title: 'about',
			link: '/about',
			name: 'about',
			id: 'about',
			index: 1
		},
		{
			title: 'our work',
			link: '/work',
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
	navData.isMenuOpen = !navData.isMenuOpen;
	navData.activeIndex = index;
}
