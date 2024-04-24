<script>
	/** @type {import('./$types').PageData} */
	export let data;

	console.log(data.products); // [{ slug: 'profile', title: 'Profile' }, ...]
    export const prerender = true;
    export const ssr = true;
</script>

<div class="mt-56">
    {#each data.products as product}
        <a href="/">{product.title}</a>
    {/each}
</div>