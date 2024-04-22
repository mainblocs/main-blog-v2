<script lang="ts">
	import { fade } from 'svelte/transition';
	import Open from '$components/icons/open.svelte';
	import { navData } from './data.svelte';
	let { menuState }: any = $props();
	let hoverState = $state({
		index: 0,
		hovering: false
	});
	function heroWorkEnter(index: number) {
		console.log('hovering', hoverState);
		hoverState.hovering = true;
		hoverState.index = index;
	}
	function heroWorkLeave(index: number) {
		hoverState.hovering = false;
		hoverState.index = index;
	}
	let navDataDerived = $derived(navData);
</script>

<style>
	.image-container {
		position: relative;
	}
	.image-container img {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
	.hover-image {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		transition: transform 0.3s cubic-bezier(0.47, 0.03, 0.49, 1.37);
		height: 100%;
		width: 100%;
		max-height: 110%;
	}

	.image-container:hover .hover-image {
		opacity: 1;
		transform: scale(1.05);
	}
</style>

{#if navDataDerived.activeIndex == 2 && navDataDerived.openMenu == true}
	<div
		style="width: 100%;"
		class="flex flex-col justify-center md:flex-row flex-wrap gap-6 bg-white absolute left-0 w-full
		z-50 mt-6 min-h-[450px] pt-12 top-[50px]"
		in:fade
		out:fade>
		<div
			class="image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px]"
			onmouseenter={(index) => heroWorkEnter(1)}
			onmouseleave={(index) => heroWorkLeave(1)}
			class:opacity-50={hoverState.hovering == true && hoverState.index != 1}>
			<img
				class="w-full h-full object-cover rounded-lg "
				src="/head.webp"
				alt="Lamp on White Background"
				loading="lazy" />
			<div class="hover-image flex flex-col gap-4">
				<img
					alt="Lamp on White Background"
					class="w-full h-full object-cover rounded-lg "
					src="/chicago.webp"
					loading="lazy" />
				<div class="w-full bg-gray-200 absolute bottom-[50%] translate-y-[50%] right-0 p-4">
					<a href="#" class=" text-black w-full bg-gray-200 flex gap-3 items-center">
						<span class="text-nowrap">View Casestudy</span>
						<Open />
					</a>
				</div>
			</div>
		</div>
		<div
			class="image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px]"
			onmouseenter={(index) => heroWorkEnter(2)}
			onmouseleave={(index) => heroWorkLeave(2)}
			class:opacity-50={hoverState.hovering == true && hoverState.index != 2}>
			<img
				alt="Lamp on White Background"
				class="w-full h-full object-cover rounded-lg"
				src="/chicago.webp"
				loading="lazy" />
			<img
				class="w-full h-full object-cover rounded-lg hover-image"
				src="/head.webp"
				alt="Lamp on White Background"
				loading="lazy" />
		</div>
		<div
			class="image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px]"
			onmouseenter={(index) => heroWorkEnter(3)}
			onmouseleave={(index) => heroWorkLeave(3)}
			class:opacity-50={hoverState.hovering == true && hoverState.index != 3}>
			<img
				src="/indie.webp"
				class="w-full h-full object-cover rounded-lg"
				alt="Macbook Mockup on White Table"
				loading="lazy" />
			<img
				class="w-full h-full object-cover rounded-lg hover-image"
				src="/head.webp"
				alt="Lamp on White Background"
				loading="lazy" />
		</div>
		<div
			class="image-container z-[100] w-[22%] h-[275px] min-w-[275px] max-h-[275px]"
			onmouseenter={(index) => heroWorkEnter(4)}
			onmouseleave={(index) => heroWorkLeave(4)}
			class:opacity-50={hoverState.hovering == true && hoverState.index != 4}>
			<img
				alt="Lamp on White Background"
				class="w-full h-full object-cover rounded-lg"
				src="/superstore.webp"
				loading="lazy" />
			<img
				class="w-full h-full object-cover rounded-lg hover-image"
				src="/head.webp"
				alt="Lamp on White Background"
				loading="lazy" />
		</div>
		<div class="w-[400px] bg-gray-200 p-4 self-start">
			<a href="#" class=" text-black w-full bg-gray-200 h-full flex items-center">
				<span class="text-nowrap">see Case studies</span>
				<Open />
			</a>
		</div>
	</div>
{/if}
