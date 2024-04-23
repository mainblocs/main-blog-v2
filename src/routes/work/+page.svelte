<script>
  import HeroSvg from '$src/components/HeroSvg.svelte'
  export let data
</script>

<div class="mx-auto max-w-7xl px-6 lg:px-8 mt-40 sm:mt-32 lg:mt-60">
  <div class="max-w-2xl lg:max-w-none">
    <div style="opacity: 1; transform: none;">
      <h1>
        <span
          class="block font-display text-base font-semibold text-neutral-950">
          Our work
        </span>
        <span class="sr-only">-</span>
        <span
          class="mt-6 block max-w-5xl font-display text-5xl font-medium
          tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
          Proven solutions for real-world problems.
        </span>
      </h1>
      <div class="mt-6 max-w-3xl text-xl text-neutral-600">
        <p>
          We believe in efficiency and maximizing our resources to provide the
          best value to our clients. The primary way we do that is by re-using
          the same five projects we’ve been developing for the past decade.
        </p>
      </div>
    </div>
  </div>
  <div class="max-w-2xl lg:max-w-none">
      <div style="opacity: 1; transform: none;margin-top: 48px">
        <h2 class="font-display text-2xl font-semibold text-neutral-950">
          Case studies
        </h2>
      </div>
      <div class="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {#each data?.projects as project}
          <div style="opacity: 1; transform: none;">
            <article>
              <div
                class="grid grid-cols-3 gap-x-8 gap-y-8 pt-16 relative
                before:absolute after:absolute before:bg-neutral-950
                after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px
                before:w-6 after:left-8 after:right-0 after:top-0 after:h-px">
                <div
                  class="col-span-full sm:flex sm:items-center sm:justify-between
                  sm:gap-x-8 lg:col-span-1 lg:block">
                  <div class="sm:flex flex-col sm:items-center gap-3 sm:gap-x-6 lg:block">
                      <img
                      alt={project.client}
                      loading="lazy"
                      decoding="async"
                      data-nimg="1"
                      class="h-32 w-48 bg-slate-300 p-8 object-contain flex-none"
                      src={project.logo}
                      style="color: transparent;" />
                    <h3
                      class="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0
                      lg:mt-8">
                      {project.client}
                    </h3>
                  </div>
                  <div class="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p
                      class="text-sm tracking-tight text-neutral-950 after:ml-4
                      after:font-semibold after:text-neutral-300
                      after:content-['/'] lg:mt-2 lg:after:hidden">
                      {project.service}
                    </p>
                    <p class="text-sm text-neutral-950 lg:mt-2">
                      <time datetime="2023-01">{project.date}</time>
                    </p>
                  </div>
                </div>
                <div class="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p class="font-display text-4xl font-medium text-neutral-950">
                    <a href={project.href} aria-label={project.client}>{project.title}</a>
                  </p>
                  <div class="mt-6 space-y-12 text-base text-neutral-600">
                    <p>{project.description}</p>
                    <p>{project.summary}</p>
                  </div>
                  <div class="mt-8 flex">
                    <a
                      class="inline-flex rounded-full px-4 py-1.5 text-sm
                      font-semibold transition bg-neutral-950 text-white
                      hover:bg-neutral-800"
                      aria-label="Read case study: FamilyFund"
                      href={project.href}>
                      <span class="relative top-px">Read case study</span>
                    </a>
                  </div>
                  <div
                    class="pl-8 mt-12 relative before:absolute after:absolute
                    before:bg-neutral-950 after:bg-neutral-950/10 before:left-0
                    before:top-0 before:h-6 before:w-px after:bottom-0
                    after:left-0 after:top-8 after:w-px">
                    <figure class="text-sm">
                      <blockquote
                        class="text-lg text-neutral-600 [&amp;>*]:relative
                        [&amp;>:first-child]:before:absolute
                        [&amp;>:first-child]:before:right-full
                        [&amp;>:first-child]:before:content-['“']
                        [&amp;>:last-child]:after:content-['”']">
                        <p>{project.testimonial.content}</p>
                      </blockquote>
                      <figcaption class="mt-6 font-semibold text-neutral-950">
                        {project.testimonial.author.name}, {project.testimonial.author.role}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </article>
          </div>
        {/each}
      </div>
  </div>
  <div class="relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32 mt-16">
    <div class="max-w-2xl lg:max-w-none relative">
      <HeroSvg  />
      <figure class="mx-auto max-w-4xl">
        <blockquote
          class="relative font-display text-3xl font-medium tracking-tight
          text-neutral-950 sm:text-4xl mx-12">
          <p
            class="before:content-['“'] after:content-['”'] sm:before:absolute
            sm:before:right-full">
            We approached
            <em>Studio</em>
            because we loved their past work. They delivered something
            remarkably similar in record time.
          </p>
        </blockquote>
        <figcaption class="mt-10 px-12">
          <img
            alt="flamejars"
            loading="lazy"
            width="184"
            height="36"
            decoding="async"
            data-nimg="1"
            src="/flamejars.svg"
            style="color: transparent;" />
        </figcaption>
      </figure>
    </div>
  </div>
  <div class="max-w-2xl lg:max-w-none pb-24">
      <div style="transform: translateY(24px) translateZ(0px);">
        <h2 class="font-display text-2xl font-semibold text-neutral-950 mt-12">
          You’re in good company
        </h2>
      </div>
      <div class="mt-10">
        <div
          class="relative before:absolute after:absolute before:bg-neutral-950
          after:bg-neutral-950/10 before:left-0 before:top-0 before:h-px
          before:w-6 after:left-8 after:right-0 after:top-0 after:h-px"
          style="transform: translateY(24px) translateZ(0px);">
          <ul
            role="list"
            class="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {#each data?.projects as project}
              <li class="group">
                <div
                  class="overflow-hidden"
                  style="transform: translateY(24px) translateZ(0px);">
                  <div
                    class="pt-12 group-[&amp;:nth-child(-n+2)]:-mt-px
                    sm:group-[&amp;:nth-child(3)]:-mt-px
                    lg:group-[&amp;:nth-child(4)]:-mt-px relative before:absolute
                    after:absolute before:bg-neutral-950 after:bg-neutral-950/10
                    before:left-0 before:top-0 before:h-px before:w-6 after:left-8
                    after:right-0 after:top-0 after:h-px">
                    <img
                      alt={project.client}
                      loading="lazy"
                      width="184"
                      height="36"
                      decoding="async"
                      data-nimg="1"
                      class="h-32 w-64 flex-none object-contain bg-slate-400 p-8"
                      src={project.logo}
                      style="color: transparent;" />
                  </div>
                </div>
              </li>
            {/each}
          </ul>
        </div>  
      </div>
  </div>
</div>
