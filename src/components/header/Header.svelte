<script lang="ts">
	// @ts-nocheck
	import { fade } from 'svelte/transition';
	import Logo from '$components/icons/logo.svelte';
	import WorksMenu from '$src/components/header/WorksMenu.svelte';
	import { changeOpenMenuIndex, navData } from './data.svelte';
	function clickOutside(node) {
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('click_outside', node));
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
	function toggleMenu() {
		if (navData.showPhoneMenu) {
			navData.showPhoneMenu = false;
		} else {
			navData.showPhoneMenu = true;
		}
	}
</script>

<section class="bg-bgprimary font-[yoga] fixed top-0 left-0 w-full header z-[10000] px-4 pt-4 pb-2">
	<div class="wrapper" use:clickOutside onmouseleave={() => changeOpenMenuIndex(0)}>
		<nav class="flex items-center justify-between relative">
			<div class="w-[300px]">
				<a href="/" class="flex gap-2 items-center h-12 w-full" title="Home">
					<div class="w-[40px]">
						<Logo />
					</div>
					<span class="text-white ml-4">Mainblocs</span>
				</a>
			</div>
			<div class="hidden md:block w-[calc(100%-300px)]" in:fade>
				<ul class="flex gap-6 text-xs justify-end items-center text-white tex-sm ">
					{#each navData.navItems as item, index}
						<li
							class="navMenuLink"
							on:click_outside={() => changeOpenMenuIndex(0)}
							onmouseenter={() => changeOpenMenuIndex(item.index)}>
							<a class="navMenuLinkContent" href={item.link} title={item.title}>{item.title}</a>

						</li>
					{/each}
					<WorksMenu activeIndex={navData.activeIndex} />
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
			<div class="md:hidden">
				<button onclick={toggleMenu}>
					<img src="/menu.svg" class="w-8 h-8" alt="Menu" />
				</button>

			</div>

		</nav>
		<div class="md:hidden">
			{#if navData.showPhoneMenu == true}
				<ul id="verticalMenu">
					<div
						class:fadeIn={navData.showPhoneMenu == true}
						class:visible={navData.showPhoneMenu == true}
						class:fadeOut={navData.showPhoneMenu == !true}
						class="top-[70px] bg-black hide left-0 mx-auto min-w-[100vw] h-full min-h-screen">
						<nav
							class="h-full max-w-7xl mx-auto flex mt-24 md:mt-0 sm:items-center justify-center
							translate-y-[10%]">
							<ul
								class="flex flex-col md:flex-row md:flex-wrap text-white w-full sm:justify-center
								max-w-[700px]"
								in:fade={{ duration: 500 }}>
								{#each navData.navItems as navItem, index}
									<li class="flex w-full md:w-[48%] md:h-[100px] py-2 md:m-0 md:py-0 ">
										<a
											href={navItem.link}
											aria-label={navItem.name}
											class="flex w-full capitalize items-center justify-center border-none
											md:border-solid md:border-white md:border-[.5px] border-white
											md:hover:bg-white md:hover:text-black hover:transition-transform transform-gpu">

											<span transition:fade>{navItem.name}</span>
										</a>
									</li>
								{/each}
							</ul>
						</nav>
					</div>
				</ul>
			{/if}
		</div>
	</div>
</section>
