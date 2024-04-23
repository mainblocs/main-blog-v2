<script>
	import { afterNavigate } from '$app/navigation';
	import { navData } from '$src/components/header/data.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import Header from '../components/header/Header.svelte';
	import '../styles.css';
	afterNavigate(() => {
		navData.showPhoneMenu = false;
		navData.activeIndex = 0;
	});
</script>

<style>

</style>

<div class="overflow-x-hidden">
	<Header />
	<slot />
	<Footer />
</div>
