<script lang="ts">
	import HeroSvg from '$components/HeroSvg.svelte';
	export let data;
</script>


{#if data?.project?.slug}
<article class="mx-auto max-w-7xl mt-40 sm:mt-48 lg:mt-60 flex flex-col gap-16 p-3">
    <div class="max-w-2xl lg:max-w-none text-center flex flex-col gap-12">
        <h1>
            <span class="block font-display text-base font-semibold text-neutral-950"
                >Case Study</span
            ><span class="sr-only"> - </span><span
                class="mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl mx-auto"
                >{data?.project?.title}</span
            >
        </h1>
        <div class="max-w-3xl text-xl text-neutral-600 mx-auto">
            <p>
                {data?.project?.description}
            </p>
        </div>
        <dl class="text-center grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
            <div
                class="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0"
                >
                <dt class="font-semibold">Client</dt>
                <dd>{data?.project?.client}</dd>
            </div>
            <div
                class="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0"
            >
                <dt class="font-semibold">Year</dt>
                <dd><time datetime={data?.project?.date}>{data?.project?.date}</time></dd>
            </div>
            <div
                class="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0"
            >
                <dt class="font-semibold">Service</dt>
                <dd>{data?.project?.service}</dd>
            </div>
        </dl>
    </div>
    <div class="border-y border-neutral-200 bg-neutral-100 sm:p-12">
        <div class="-my-px mx-auto max-w-[76rem] bg-neutral-200">
            <div class="group relative">
                <img
                    alt={data?.project?.image?.alt}
                    decoding="async"
                    data-nimg="1"
                    class="w-full"
                    src={data?.project?.image?.src}
                    style="color: transparent; filter: grayscale(1);"
                />
                <div
                    class="pointer-events-none absolute left-0 top-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                >
                    <img
                        alt={data?.project?.image?.alt}
                        width="3648"
                        height="3117"
                        decoding="async"
                        data-nimg="1"
                        class="w-full"
                        src={data?.project?.image.src}
                        style="color: transparent;"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="[&amp;>*]:mx-auto [&amp;>*]:max-w-3xl [&amp;>:first-child]:!mt-0 [&amp;>:last-child]:!mb-0">
        <div class="typography">
            <h2>Overview</h2>
            <p>
                {data?.project?.description}
            </p>
            <h2>What we did</h2>
        </div>
        <ul role="list" class="my-6 flex flex-wrap gap-4">
            {#each data?.project?.service?.split(",") as serviceDone}
            <li class="rounded-full bg-neutral-100 px-4 py-1.5 text-base text-neutral-600">
                {serviceDone}
            </li>
            {/each}
        </ul>
        <figure
            class="grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-8 sm:grid-cols-12 sm:grid-rows-[1fr,auto,auto,1fr] sm:gap-x-10 lg:gap-x-16 my-16"
            >
            <blockquote
                class="col-span-2 text-xl/7 text-neutral-600 sm:col-span-7 sm:col-start-6 sm:row-start-2"
            >
                <p>
                    {data?.project?.testimonial.content}
                </p>
            </blockquote>
            <div
                class="col-start-1 w-full row-start-2 overflow-hidden rounded-xl bg-neutral-100 sm:col-span-5 sm:row-span-full sm:rounded-3xl"
            >
                <img
                    alt={data?.project?.testimonial.author.name}
                    loading="lazy"
                    decoding="async"
                    data-nimg="1"
                    class="h-24 w-24 p-2 object-contain bg-slate-400    sm:aspect-[7/9] sm:h-auto sm:w-full sm:p-16"
                    src={data?.project?.logo}
                    style="color: transparent;"
                />
            </div>
            <figcaption
                class="text-sm text-neutral-950 sm:col-span-7 sm:row-start-3 sm:text-base"
            >
                <span class="font-semibold">{data?.project?.testimonial.author.name}<span
                    class="hidden font-semibold sm:inline"
                    >,
                </span><br class="sm:hidden" /><span class="sm:font-semibold"
                    >{data?.project?.testimonial.author.role}</span
                >
            </figcaption>
        </figure>
        <div class="!max-w-none">
            <dl
                class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none"
                >
                {#each data?.project?.improvements as improvement}
                <div
                    class="flex flex-col-reverse pl-8 relative before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px"
                    style="opacity: 1; transform: none;"
                >
                    <dt class="mt-2 text-base text-neutral-600">{improvement.title}</dt>
                    <dd class="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
                        {improvement.scale}
                    </dd>
                </div>
                {/each}
            </dl>
        </div>
    </div>
    <div class="relative px-3 md:px-16 md:py-24">
        <div
            class="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50"
            >
         <HeroSvg  />
        </div>
        <div class="max-w-2xl" style="opacity: 1; transform: none;">
            <h2>
                <span
                    class="block font-display tracking-tight [text-wrap:balance] text-2xl font-semibold text-neutral-950"
                    >More case studies</span
                >
            </h2>
        </div>
        <div class="mx-auto max-w-2xl lg:max-w-none mt-12">
            <div class="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
                { #each data?.moreProjects as moreProject }
                <div style="opacity: 1; transform: none;">
                    <article>
                        <div
                            class="relative flex flex-col items-start pl-8 before:absolute after:absolute before:bg-neutral-950 after:bg-neutral-950/10 before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px"
                        >
                            <h3 class="mt-6 text-base font-semibold text-neutral-950">
                                {moreProject.title}
                            </h3>
                            <time datetime="2022-10" class="order-first text-sm text-neutral-600"
                                >{moreProject.date}</time
                            >
                            <p class="mt-2.5 text-base text-neutral-600">
                                {moreProject.description}
                            </p>
                            <a
                                class="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700" data-sveltekit-reload
                                aria-label="Read more: Get a hodl of your health"
                                href={moreProject.href}
                                >Read more<svg
                                    viewBox="0 0 24 6"
                                    aria-hidden="true"
                                    class="w-6 flex-none fill-current"
                                    ><path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
                                    /></svg
                                ><span class="absolute inset-0" /></a
                            >
                        </div>
                    </article>
                </div>
                {/each}
            </div>
        </div>
    </div>
</article>
{/if}