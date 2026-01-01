<script lang="ts">
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	$effect(() => {
		console.log(form);
	});
</script>


<div class=" mx-auto max-w-7xl">
	<form method="POST" use:enhance class="flex flex-col p-3 space-y-3">
        <div class="p-3 space-y-3 bg-base-100 rounded-xl shadow ">
            <h1 class="text-center text-2xl font-bold">Tildmeld Patrulije</h1>

            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text">Patruljenavn</span>
                </div>
                <input
                    type="text"
                    name="patruljenavn"
                    placeholder="patruljenavn"
                
                    class="input input-bordered w-full"
                />
            </label>
            
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text">Gruppenavn</span>
                </div>
                <input
                    type="text"
                    name="gruppenavn"
                    placeholder="gruppenavn"
                    class="input input-bordered w-full"
                />
            </label>

            

            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Antal deltager (min 3, max 6)</span>
                </div>
                <input
                    type="number"
                    name="antal"
                    placeholder="antal"
                    min="3"
                    max="6"
                    class="input input-bordered w-full"
                />
            </label>

        </div>
		
        <div class="p-3 space-y-3 bg-base-100 rounded-xl shadow ">
            <h1 class="text-center text-2xl font-bold">Kontakt person</h1>

            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text">Leder navn</span>
                </div>
                <input
                    type="text"
                    name="leder_navn"
                    placeholder="leder_navn"
                
                    class="input input-bordered w-full"
                />
            </label>
            
            <label class="form-control w-full ">
                <div class="label">
                    <span class="label-text">Telefonnummer</span>
                </div>
                <input
                    type="text"
                    name="telefonnummer"
                    placeholder="telefonnummer"
                    class="input input-bordered w-full"
                />
            </label>

            

            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Emaill</span>
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                   
                    class="input input-bordered w-full"
                />
            </label>

        </div>
        
        
        <div class="p-3 space-y-3 bg-base-100 rounded-xl shadow flex">
            <button class="btn btn-outline btn-primary btn-wide m-3 mx-auto">Tildmeld</button>
        </div>
		{#if form?.error}
    	<ul class="notice-error">
      	{#each form.errors as error}
        	<li>
				<div role="alert" class="alert alert-error m-2">
  					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
   					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  					</svg>
  					<span>{error.field}: {error.message}</span>
				</div>
			</li>
      	{/each}
   		</ul>
 	{/if}
		
	</form>
</div>