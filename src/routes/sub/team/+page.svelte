<script lang="ts">
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	$effect(() => {
		console.log(form);
	});
</script>


<div class=" mx-auto max-w-xl">
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
            <button class="btn btn-outline btn-primary btn-wide m-3 mx-auto" formaction="?/login">Log ind</button>
        </div>
		
		
	</form>
</div>