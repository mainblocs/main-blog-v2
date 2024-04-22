<script>
	import Facebook from '$components/icons/facebook.svelte';
	import Instagram from '$components/icons/instagram.svelte';
	import Logo from '$components/icons/logo.svelte';
	import Twitter from '$components/icons/twitter.svelte';
</script>

<section class="bg-bgblack py-24">
	<div class="wrapper">
		<div class="flex flex-col items-center md:flex-row md:justify-between text-white">
			<div class="flex flex-col w-full md:w-2/3">
				<div>
					<Logo />
				</div>
				<div class="flex flex-col gap-12 py-32">
					<div>
						<h3
							class="leading-[.9971em] tracking-[-0.01em] font-yoga text-3xl sm:text-5xl md:text-5xl
							lg:text-6xl font-bold w-full md:max-w-[500px] text-wrap">
							Make your mark
						</h3>
					</div>
					<div class="mt-8">
						<a href="/contact" class="font-yoga max-w-24">
							<h3
								class="text-md md:text-xl font-bold rounded-full border-spacing-1 border-2
								border-white p-4 md:p-6 lg:px-8 lg:py-5 xl:px-12 max-w-[350px] text-center">
								Work with us
							</h3>
						</a>
					</div>
				</div>

			</div>
			<div class="flex flex-col w-full md:w-1/3 gap-8 font-simple text-xl">
				<div class="flex flex-col gap-1">
					<span>hello@mainblocs.com</span>
					<span>(123) 323-3232</span>
				</div>
				<div class="flex flex-col gap-1">
					<span>123 Main St</span>
					<span>San Francisco, CA 94105</span>

				</div>
				<div class="flex gap-4">
					<span class="w-8 h-8">
						<Facebook />
					</span>
					<span class="w-8 h-8">
						<Twitter />
					</span>
					<span class="w-8 h-8">
						<Instagram />
					</span>

				</div>
			</div>
		</div>
	</div>
</section>
