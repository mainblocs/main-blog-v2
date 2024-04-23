<script lang="ts">
	import { goto } from '$app/navigation';
	import { showModle } from './modalstore.svelte';

	let emailStore = $state({
		error: false,
		value: '',
		message: 'thank you for subscribing. We will notify you on important updates.',
		errorMessage: 'please enter valid email.'
	});
	function change(event: Event) {
		if (!emailStore.error || emailStore.value.length > 7 || emailStore.value.includes('@')) {
			emailStore.error = false;
			return;
		}
	}
	function subscribe(event: Event) {
		if (emailStore.error || emailStore.value.length < 7 || !emailStore.value.includes('@')) {
			emailStore.error = true;
			return;
		}
		showModle('Thank you for subscribing!', 1500);
		emailStore.value = '';
		goto('/');
	}
</script>

<div class="max-w-sm pb-8">
	<h2 class="font-yoga text-sm font-semibold tracking-wider text-white">
		Sign up for our newsletter
	</h2>
	<p class="mt-4 text-sm text-gray-100 font-comsans ">
		Subscribe to get the latest design news, articles, resources and inspiration.
	</p>
	<div class="relative mt-6">
		<input
			type="email"
			placeholder="Email address"
			autocomplete="email"
			aria-label="Email address"
			bind:value={emailStore.value}
			on:change={change}
			class="block w-full rounded-2xl border border-neutral-300 bg-white py-4 pl-6 pr-20 text-base/6
			text-white ring-4 ring-transparent transition placeholder:text-neutral-500
			focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5" />
		<div class="absolute inset-y-1 right-1 flex justify-end">
			<button
				on:click={subscribe}
				aria-label="Submit"
				class="flex aspect-square h-full items-center justify-center rounded-xl bg-black text-white
				transition hover:bg-neutral-800">
				<svg viewBox="0 0 16 6" aria-hidden="true" class="w-4 text-white">
					<path
						fill="white"
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16 3 10 .5v2H0v1h10v2L16 3Z" />
				</svg>
			</button>
		</div>
	</div>
	{#if emailStore.error}
		<h3 class="py-3 text-[red]">{emailStore.errorMessage}</h3>
	{/if}
</div>
