<script lang="ts">
    // @ts-nocheck
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
  
    function submit() {
      if (
        data.name.value === '' ||
        data.name === undefined ||
        data.name.value.length < 2
      ) {
        data.name.error = true
        return
      }
      if (
        data.email.value === '' ||
        data.email === undefined ||
        !data.email.value.includes('@')
      ) {
        data.email.error = true
        return
      }
      if (
        data.name.value === '' ||
        data.name === undefined ||
        data.name.value.length < 3
      ) {
        data.name.error = true
        return
      }
      if (
        data.company.value === '' ||
        data.company === undefined ||
        data.company.value.length < 3
      ) {
        data.company.error = true
        return
      }
      if (
        data.phone.value === '' ||
        data.phone.value === undefined ||
        data.phone.value.length < 10
      ) {
        data.phone.error = true
        return
      }
      if (
        data.message.value === '' ||
        data.message.value === undefined ||
        data.message.value.length < 10
      ) {
        data.message.error = true
        return
      }
      if (data.budget.value === '' || data.budget === undefined) {
        data.budget.error = true
        return
      }
  
      showModle(
        'Thank you for contacting us. We will get back to you soon.',
        3000,
      )
      goto('/')
    }
    let data = $state({
      name: {
        value: '',
        error: false,
        errorMessage: 'plese enter your name',
      },
      email: {
        value: '',
        error: false,
        errorMessage: 'plese enter your email',
      },
      company: {
        value: '',
        error: false,
        errorMessage: 'plese enter your company name',
      },
      phone: {
        value: '',
        error: false,
        errorMessage: 'plese enter your phone number',
      },
      message: {
        value: '',
        error: false,
        errorMessage: 'plese enter your message',
      },
      budget: {
        value: '',
        error: false,
        errorMessage: 'plese enter your budget',
      },
    })
    $effect(() => {
        data = {
          name: {
            value: '',
            error: false,
            errorMessage: 'plese enter your name',
          },
          email: {
            value: '',
            error: false,
            errorMessage: 'plese enter your email',
          },
          company: {
            value: '',
            error: false,
            errorMessage: 'plese enter your company name',
          },
          phone: {
            value: '',
            error: false,
            errorMessage: 'plese enter your phone number',
          },
          message: {
            value: '',
            error: false,
            errorMessage: 'plese enter your message',
          },
          budget: {
            value: '',
            error: false,
            errorMessage: 'plese enter your budget',
          }
    }});
    
</script>
  
<section class="bg-bgprimary py-32 mt-[70px] text-white">
 <div class="wrapper px-4">
  <div class="mx-auto max-w-2xl lg:max-w-none ">
    <div >
      <h1>
        <span
          class="block text-base">
          Contact us
        </span>
        <span class="sr-only">-</span>
        <span
          class="py-12 block text-3xl font-medium
           sm:text-5xl font-yoga max-w-[500px] leading-[70px]">
          Let’s work together
        </span>
      </h1>
      <div class="mt-6 max-w-3xl text-xl font-comsans">
        <p>We can’t wait to hear from you.</p>
      </div>
    </div>
  </div>
  <div class="mx-auto max-w-2xl lg:max-w-none font-comsans">
    <div class="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
      <div class="lg:order-last" >
        <form>
          <h2 class="text-base font-semibold ">
            Work inquiries
          </h2>
          <div class="isolate mt-6 -space-y-px rounded-2xl bg-white  text-black py-12 px-4 md:py-24 md:px-12">
            <div class="group relative z-0 transition-all focus-within:z-10">
              <input
                type="text"
                id=":r5:"
                name="name"
                autocomplete="name"
                on:change={(event) => {
                  if (event.target.value.length > 2) {
                    data.name.error = false
                  }
                }}
                bind:value={data.name.value}
                class="peer block w-full border border-neutral-300
                bg-transparent px-6 pb-4 pt-12 text-base/6 
                ring-4 ring-transparent transition focus:border-neutral-950
                focus:outline-none focus:ring-neutral-950/5
                group-first:rounded-t-2xl group-last:rounded-b-2xl" />
              <label
                for=":r5:"
                class="pointer-events-none absolute left-6 top-1/2 -mt-3
                origin-left text-base/6 transition-all
                duration-200 peer-focus:-translate-y-4 peer-focus:scale-75
                peer-focus:font-semibold peer-focus:
                peer-[:not(:placeholder-shown)]:-translate-y-4
                peer-[:not(:placeholder-shown)]:scale-75
                peer-[:not(:placeholder-shown)]:font-semibold
                peer-[:not(:placeholder-shown)]:">
                Name
              </label>
            </div>
            {#if data.name.error}
              <h3 class="text-[red] py-3 pl-6">{data.name.errorMessage}</h3>
            {/if}
            <div class="group relative z-0 transition-all focus-within:z-10">
              <input
                type="email"
                id=":r6:"
                name="email"
                autocomplete="email"
                placeholder=""
                bind:value={data.email.value}
                on:change={(event) => {
                  if (event.target.value.length > 5 && event.target.value.includes('@')) {
                    data.email.error = false
                  }
                }}
                class="peer block w-full border border-neutral-300
                bg-transparent px-6 pb-4 pt-12 text-base/6 
                ring-4 ring-transparent transition focus:border-neutral-950
                focus:outline-none focus:ring-neutral-950/5
                group-first:rounded-t-2xl group-last:rounded-b-2xl" />
              <label
                for=":r6:"
                class="pointer-events-none absolute left-6 top-1/2 -mt-3
                origin-left text-base/6 transition-all
                duration-200 peer-focus:-translate-y-4 peer-focus:scale-75
                peer-focus:font-semibold peer-focus:
                peer-[:not(:placeholder-shown)]:-translate-y-4
                peer-[:not(:placeholder-shown)]:scale-75
                peer-[:not(:placeholder-shown)]:font-semibold
                peer-[:not(:placeholder-shown)]:">
                Email
              </label>
            </div>
            {#if data.email.error}
            <h3 class="text-[red] py-3 pl-6">{data.email.errorMessage}</h3>
            {/if}
            <div class="group relative z-0 transition-all focus-within:z-10">
              <input
                type="text"
                id=":r7:"
                name="company"
                autocomplete="organization"
                placeholder=""
                bind:value={data.company.value}
                on:change={(event) => {
                  if (event.target.value.length > 2) {
                    data.company.error = false
                  }
                }}
                class="peer block w-full border border-neutral-300
                bg-transparent px-6 pb-4 pt-12 text-base/6 
                ring-4 ring-transparent transition focus:border-neutral-950
                focus:outline-none focus:ring-neutral-950/5
                group-first:rounded-t-2xl group-last:rounded-b-2xl" />
              <label
                for=":r7:"
                class="pointer-events-none absolute left-6 top-1/2 -mt-3
                origin-left text-base/6 transition-all
                duration-200 peer-focus:-translate-y-4 peer-focus:scale-75
                peer-focus:font-semibold peer-focus:
                peer-[:not(:placeholder-shown)]:-translate-y-4
                peer-[:not(:placeholder-shown)]:scale-75
                peer-[:not(:placeholder-shown)]:font-semibold
                peer-[:not(:placeholder-shown)]:">
                Company
              </label>
            </div>
            {#if data.company.error}
            <h3 class="px-6 pb-4 pt-12 text-[">
              {data.company.errorMessage}
            </h3>
          {/if}
            <div class="group relative z-0 transition-all focus-within:z-10">
              <input
                type="tel"
                id=":r8:"
                name="phone"
                autocomplete="tel"
                placeholder=""
                bind:value={data.phone.value}
                on:change={(event) => {
                  if (event.target?.value?.length == 10) {
                    data.phone.error = false
                  }
                }}
                class="peer block w-full border border-neutral-300
                bg-transparent px-6 pb-4 pt-12 text-base/6 
                ring-4 ring-transparent transition focus:border-neutral-950
                focus:outline-none focus:ring-neutral-950/5
                group-first:rounded-t-2xl group-last:rounded-b-2xl" />
              <label
                for=":r8:"
                class="pointer-events-none absolute left-6 top-1/2 -mt-3
                origin-left text-base/6 transition-all
                duration-200 peer-focus:-translate-y-4 peer-focus:scale-75
                peer-focus:font-semibold peer-focus:
                peer-[:not(:placeholder-shown)]:-translate-y-4
                peer-[:not(:placeholder-shown)]:scale-75
                peer-[:not(:placeholder-shown)]:font-semibold
                peer-[:not(:placeholder-shown)]:">
                Phone
              </label>
              
            </div>
            {#if data.phone.error}
            <h3 class="block text-[red] py-3 pl-6">
              {data.phone.errorMessage}
            </h3>
          {/if}
            <div class="group relative z-0 transition-all focus-within:z-10">
              <input
                type="text"
                id=":r9:"
                name="message"
                placeholder=""
                bind:value={data.message.value}
                on:change={(event) => {
                  if (event.target?.value?.length > 10) {
                    data.message.error = false
                  }
                }}
                class="peer block w-full border border-neutral-300
                bg-transparent px-6 pb-4 pt-12 text-base/6 
                ring-4 ring-transparent transition focus:border-neutral-950
                focus:outline-none focus:ring-neutral-950/5
                group-first:rounded-t-2xl group-last:rounded-b-2xl" />
              <label
                for=":r9:"
                class="pointer-events-none absolute left-6 top-1/2 -mt-3
                origin-left text-base/6 transition-all
                duration-200 peer-focus:-translate-y-4 peer-focus:scale-75
                peer-focus:font-semibold peer-focus:
                peer-[:not(:placeholder-shown)]:-translate-y-4
                peer-[:not(:placeholder-shown)]:scale-75
                peer-[:not(:placeholder-shown)]:font-semibold
                peer-[:not(:placeholder-shown)]:">
                Message
              </label>
            </div>
            {#if data.message.error}
            <h3 class="text-[red] py-3 pl-6">
              {data.message.errorMessage}
            </h3>
          {/if}
            <div
              class="border border-neutral-300 px-6 py-8 first:rounded-t-2xl
              last:rounded-b-2xl">
              <fieldset>
                <legend class="text-base/6 text-neutral-500">Budget</legend>
                <div class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <label class="flex gap-x-3">
                    <input
                      type="radio"
                      name="budget"
                      class="h-6 w-6 flex-none appearance-none rounded-full
                      border border-neutral-950/20 outline-none
                      checked:border-[0.5rem] checked:border-neutral-950
                      focus-visible:ring-1 focus-visible:ring-neutral-950
                      focus-visible:ring-offset-2"
                      on:change={(event) => {
                        data.budget.value = '50'
                      }}
                      value="50" />
                    <h3 class="text-base/6 ">$1K – $5K</h3>
                  </label>
                  <label class="flex gap-x-3">
                    <input
                      type="radio"
                      name="budget"
                      class="h-6 w-6 flex-none appearance-none rounded-full
                      border border-neutral-950/20 outline-none
                      checked:border-[0.5rem] checked:border-neutral-950
                      focus-visible:ring-1 focus-visible:ring-neutral-950
                      focus-visible:ring-offset-2"
                      on:change={(event) => {
                        data.budget.value = '75'
                      }}
                      value="75" />
                    <h3 class="text-base/6 ">$5K – $10K</h3>
                  </label>
                  <label class="flex gap-x-3">
                    <input
                      type="radio"
                      name="budget"
                      class="h-6 w-6 flex-none appearance-none rounded-full
                      border border-neutral-950/20 outline-none
                      checked:border-[0.5rem] checked:border-neutral-950
                      focus-visible:ring-1 focus-visible:ring-neutral-950
                      focus-visible:ring-offset-2"
                      on:change={(event) => {
                        data.budget.value = '100'
                      }}
                      value="100" />
                    <h3 class="text-base/6 ">$10K – $15K</h3>
                  </label>
                  <label class="flex gap-x-3">
                    <input
                      type="radio"
                      name="budget"
                      class="h-6 w-6 flex-none appearance-none rounded-full
                      border border-neutral-950/20 outline-none
                      checked:border-[0.5rem] checked:border-neutral-950
                      focus-visible:ring-1 focus-visible:ring-neutral-950
                      focus-visible:ring-offset-2"
                      on:change={(event) => {
                        data.budget.value = '150'
                      }}
                      value="150" />
                    <h3 class="text-base/6 ">More than $15K</h3>
                  </label>
                </div>
              </fieldset>
            </div>
            {#if data.budget.error}
            <h3 class="text-[red] py-3 pl-6">
              {data.budget.errorMessage}
            </h3>
          {/if}
          </div>
          <button
            class="text-md md:text-xl font-bold rounded-full border-spacing-1 border-2
            border-white p-4 md:p-6 lg:px-8 lg:py-4 xl:px-12 max-w-[350px] text-center mt-12"
            on:click|preventDefault|stopPropagation={submit}>
            <h3 class="relative py-2 px-8">Let’s work together</h3>
          </button>
        </form>
      </div>
      <div  class="max-w-[500px] font-comsans">
        <h2 class="text-base font-semibold mt-8">
          Our offices
        </h2>
        <p class="mt-6 text-base">
          Prefer doing things in person? We don’t but we have to list our
          addresses here for legal reasons.
        </p>
        <ul role="list" class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <li>
            <address class="text-sm not-italic ">
              <strong class="">Los Angeles</strong>
              <br />
              Santa Monica Blvd
              <br />
              California, USA
            </address>
          </li>
        </ul>
        <div
          class="mt-16 pt-16 relative before:absolute after:absolute
          before:bg-neutral-950 after:bg-neutral-950/10 before:left-0
          before:top-0 before:h-px before:w-6 after:left-8 after:right-0
          after:top-0 after:h-px">
          <h2 class="text-base font-semibold ">
            Email us
          </h2>
          <dl class="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
            <div>
              <dt class="font-semibold ">Careers</dt>
              <dd>
                <a
                  class=" hover:"
                  href="mailto:careers@mainblocs.com">
                  careers@mainblocs.com
                </a>
              </dd>
            </div>
            <div>
              <dt class="font-semibold ">Contact</dt>
              <dd>
                <a
                  class=" hover:"
                  href="mailto:support@mainblocs.com">
                  support@mainblocs.com
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
 </div>
</section>
  