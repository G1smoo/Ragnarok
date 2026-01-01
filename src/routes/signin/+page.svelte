<script lang="ts">
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	$effect(() => {
		console.log(form);
	});
</script>


<div class="m-3 mx-auto max-w-xl rounded-xl bg-base-100 shadow">
	<form method="POST" use:enhance class="flex flex-col p-3 space-y-3">
		<h1 class="text-center text-2xl font-bold">Log ind</h1>
        
        <label class="form-control w-full">
			<div class="label">
				<span class="label-text">Email</span>
			</div>
			<input
				type="email"
				name="email"
				placeholder="Email"
				class="input input-bordered w-full"
			/>
		</label>

		

		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Password</span>
			</div>
			<input
				type="password"
				name="password"
				placeholder="Password"
			
				class="input input-bordered w-full"
			/>
		</label>

        <button class="btn btn-outline btn-primary btn-wide m-3 mx-auto" formaction="?/register">Log ind</button>
		
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