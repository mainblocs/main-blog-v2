<script>
	import Logo from '$components/icons/logo.svelte';
	import Circle from './icons/Circle.svelte';
</script>

<section class="bg-white" id="services">
	<div class="wrapper py-12 md:py-32 flex flex-col gap-12 px-4">
		<div class="flex justify-center flex-col items-center w-full">
			<Logo />
		</div>
		<div class="flex flex-col md:flex-row items-center justify-between">
			<div class="flex flex-col gap-8">
				<h3 class="font-yoga text-3xl md:text-6xl">What we do?</h3>
				<p class="font-comsans text-xl">Elevate your brand and make your mark in history</p>
			</div>

			<div class="w-1/2">
				<div class="w-48 ml-32 h-52 md:ml-52 mt-4 md:mt-0">
					<Circle />
				</div>
			</div>
		</div>
		<div>
			<h3
				class="text-2xl md:text-5xl font-yoga text-red-500 max-w-[600px] text-wrap py-4 md:py-12
				md:leading-[60px]">
				We design, develope, and promote shopify stores.
			</h3>
		</div>
		<div class="flex flex-wrap justify-center lg:justify-between gap-8">
			<div class="w-full sm:w-[45%] md:w-[31%]">
				<span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">
					Brand Identity →
				</span>
			</div>
			<div class="w-full sm:w-[45%] md:w-[31%]">
				<span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">
					Brand Activation →
				</span>
			</div>
			<div class="w-full sm:w-[45%] md:w-[31%]">
				<span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">
					Website Development →
				</span>
			</div>
			<div class="w-full sm:w-[45%] md:w-[31%]">
				<span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">
					Brand strategy →
				</span>
			</div>
			<div class="w-full sm:w-[45%] md:w-[31%]">
				<span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">
					Video Production →
				</span>
			</div>
			<div class="w-full sm:w-[45%] md:w-[31%]">
				<span class="px-12 py-5 border-gray-700 border-[1px] rounded-full text-center block">
					Integrated Marketing →
				</span>
			</div>
		</div>
		<div class="bg-[#43302A] md:mt-8 py-24 flex flex-col md:flex-row gap-2 items-center">
			<div class="w-full md:w-1/2">
				<span
					class="w-2/3 block max-w-[500px] border-t-2 border-white border-spacing-3 px-4 md:px-16 " />
				<h3
					class="w-full font-yoga text-2xl md:text-3xl pt-5 max-w-[800px] text-gray-200 px-4
					md:px-16 ">
					Design meets technology at MainBlocs , where our experienced team helps you create a
					successful Shopify ecommerce store
				</h3>
			</div>
			<div class="w-full md:w-1/2 p-4">
				<img
					src="s2.webp"
					alt="Shopify"
					class="w-full md:w-[80%] aspect-square object-cover object-center rounded-xl" />
			</div>
		</div>
	</div>
</section>
