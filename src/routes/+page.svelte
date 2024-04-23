<script>
	import Contact from '$src/components/Contact.svelte';
	import Clients from '../components/Clients.svelte';
	import Hero from '../components/Hero.svelte';
	import Wedo from '../components/Wedo.svelte';
</script>

<style>
	.hero-section {
		margin-top: 64px;
		margin-bottom: 104px;
	}
	.container {
		width: 100%;
		max-width: 1920px;
		padding-left: 56px;
		padding-right: 56px;
	}
	.w-layout-blockcontainer {
		max-width: 940px;
		margin-left: auto;
		margin-right: auto;
		display: block;
	}
	.w-container {
		max-width: 940px;
		margin-left: auto;
		margin-right: auto;
	}

	.w-container:before,
	.w-container:after {
		content: ' ';
		grid-area: 1 / 1 / 2 / 2;
		display: table;
	}
	.max-width-1048-tablet-648-mobile-344 {
		max-width: 1048px;
	}

	.vertical-flex-start-start {
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		display: flex;
	}
	.margin-bottom-32 {
		margin-bottom: 32px;
	}
	.margin-bottom-24 {
		margin-bottom: 24px;
	}

	h1 {
		font-family: 'AcuminProWideBold', sans-serif;
	}

	.max-width-400 {
		max-width: 400px;
	}

	.regular-xl {
		letter-spacing: -0.24px;
		font-size: 24px;
		line-height: 136%;
	}
	.primary-button {
		grid-column-gap: 32px;
		background-color: var(--black);
		border-radius: 100px;
		align-items: center;
		padding: 16.5px 20px 16.5px 28px;
		display: flex;
		position: relative;
		overflow: hidden;
	}
	.w-inline-block {
		max-width: 100%;
		display: inline-block;
	}
	a {
		color: var(--black);
		text-decoration: none;
	}
	.button-text-wrapper {
		z-index: 1;
		padding-bottom: 2px;
		position: relative;
	}
	.text-color-white {
		color: var(--white);
	}
	.medium-m {
		letter-spacing: -0.08px;
		font-size: 16px;
		font-weight: 500;
		line-height: 130%;
	}
	.icon-size-16.button-icon {
		z-index: 1;
		position: relative;
	}

	.icon-size-16 {
		width: 16px;
		height: 16px;
	}
	img {
		max-width: 100%;
		vertical-align: middle;
		display: inline-block;
	}
	img {
		border: 0;
	}
	.button-circle {
		z-index: 0;
		width: 40px;
		height: 40px;
		background-color: var(--accent);
		border-radius: 100px;
		position: absolute;
		top: 8px;
		bottom: 8px;
		left: auto;
		right: 8px;
	}
	.w-container:after {
		clear: both;
	}
	.w-container:before,
	.w-container:after {
		content: ' ';
		grid-area: 1 / 1 / 2 / 2;
		display: table;
	}
</style>

<Hero />
<Wedo />
<Clients />
<Contact />
