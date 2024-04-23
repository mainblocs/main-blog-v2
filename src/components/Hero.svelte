<script lang="ts">
	import WorksHero from '$components/WorksHero.svelte';
	import Arrow from '$components/icons/arrow.svelte';
</script>

<section class="bg-bgprimary text-white hero py-24 z-50">
	<div class="wrapper px-4">
		<div class="py-32">
			<div class="flex flex-col gap-16 md:flex-row md:gap-8">
				<div class="relative w-full md:w-2/3">
					<h3
						class="leading-[.9971em] tracking-[-0.01em] font-[yoga] text-3xl sm:text-5xl md:text-7xl
						lg:text-8xl font-bold w-full md:max-w-[400px] text-wrap">
						Design the ​future
					</h3>
					<div class="hidden md:block">
						<div class="absolute top-0 z-50 right-[70px] w-[20%] h-[100px] font-bold">
							<div class="animation_container w-full h-full">
								<div class="w-[250px] h-[100px] overflow-hidden relative">
									<Arrow />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w-2/3 md:w-1/3">
					<button class="font-[yoga]">
						<h3
							class="text-md md:text-2xl font-bold rounded-full border-spacing-1 border-2
							border-white p-4 md:p-6 lg:py-8 lg:px-8 xl:py-8 xl:px-12">
							Work with us
						</h3>
					</button>
				</div>
			</div>
			<WorksHero />
		</div>
	</div>
</section>
