<script>
	import { afterNavigate } from '$app/navigation';
	import { navData } from '$src/components/header/data.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import Header from '../components/header/Header.svelte';
	import '../styles.css';
	import Lenis from '@studio-freight/lenis';
	import { onMount } from 'svelte';
	afterNavigate(() => {
		navData.showPhoneMenu = false;
		navData.activeIndex = 0;
	});
	export const prerender = true;
	export const ssr = true;

	onMount(async () => {
		const lenis = new Lenis();
		/**
		 * @param time {number}
		 */
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>

<style>

</style>

<div class="overflow-x-hidden">
	<Header />
	<slot />
	<Footer />
</div>
