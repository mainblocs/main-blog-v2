<script>
	import Footer from '../components/footer/Footer.svelte';
	import Header from '../components/header/Header.svelte';
	import '../styles.css';
</script>

<style>

</style>

<div class="overflow-x-hidden">
	<Header />
	<slot />
	<Footer />
</div>
