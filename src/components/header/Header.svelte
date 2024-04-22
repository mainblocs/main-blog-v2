<script lang="ts">
	import { fade } from 'svelte/transition';
	import Logo from '$components/icons/logo.svelte';
	import WorksMenu from '$src/components/header/WorksMenu.svelte';
	import { changeOpenMenuIndex, navData } from './data.svelte';
	let menuState = $state({
		openIndex: 0,
		isOpened: false
	});
	function openMenuDropSection(index: number) {
		menuState.openIndex = index;
		menuState.isOpened = true;
	}
	function closeMenuDropSection() {
		menuState.isOpened = false;
	}
</script>

<style>
	.block {
		display: block;
	}
</style>

<section class="bg-bgprimary font-[yoga] fixed top-0 left-0 w-full header z-[10000]">
	<div class="wrapper" onmouseleave={() => changeOpenMenuIndex(0)}>
		<nav class="flex items-center justify-between relative">
			<div class="w-[300px]">
				<a href="/" class="flex gap-2 items-center h-16 w-full" title="Home">
					<div class="w-[40px]">
						<Logo />
					</div>
					<span class="text-white">Mainblocs</span>
				</a>
			</div>
			<div class="hidden md:block w-[calc(100%-300px)]" in:fade>
				<!-- <ul id="verticalMenu" style="display: none;">
					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="#home" title="Home" >Home</a>
					</li>

					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="#our-work" title="Our Work" >
							Our Work
						</a>
					</li>
					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="#services" title="Services" >
							Services
						</a>
					</li>
					<li class="navMenuLink">
						<a
							class="navMenuLinkContent"
							href="#awards-press"
							title="Awards &amp; Press"
							>
							Awards &amp; Press
						</a>
					</li>
					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="#our-clients" title="Our Clients" >
							Our Clients
						</a>
					</li>
					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="#contact" title="Contact" >Contact</a>
					</li>
				</ul> -->
				<ul class="flex gap-6 text-xs justify-end items-center text-white tex-sm">
					{#each navData.navItems as item, index}
						<li class="navMenuLink">
							<a
								class="navMenuLinkContent"
								href={item.link}
								title={item.title}
								id={item.id}
								onmouseenter={() => changeOpenMenuIndex(item.index)}>
								{item.title}
							</a>
						</li>
					{/each}
					<WorksMenu {menuState} />
					<!-- <li class="navMenuLink">
						<a class="navMenuLinkContent" href="/us" title="About">About</a>
					</li>
					<li class="navMenuLink" onmouseenter={() => openMenuDropSection(2)}>
						<a class="navMenuLinkContent" href="#our-work" title="Our Work">Our Work</a>

						<WorksMenu {menuState} />

					</li>
					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="#services" title="Services">Services</a>
					</li>
					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="#our-clients" title="Our Clients">Our Clients</a>
					</li>
					<li class="navMenuLink">
						<a class="navMenuLinkContent" href="/contact" title="Contact">Contact</a>
					</li> -->
				</ul>
			</div>
		</nav>

	</div>
</section>
