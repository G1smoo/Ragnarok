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
				<span class="label-text">Brugernavn</span>
			</div>
			<input
				type="text"
				name="username"
				placeholder="Brugernavn"
			
				class="input input-bordered w-full"
			/>
		</label>
        
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
        
        <label class="form-control w-full">
			<div class="label">
				<span class="label-text">Bekræft Password</span>
			</div>
			<input
				type="password"
				name="passwordConfirm"
				placeholder="Bekræft password"
				class="input input-bordered w-full"
			/>
		</label>

        <button class="btn btn-outline btn-primary btn-wide m-3 mx-auto" formaction="?/login">Log ind</button>
		
		
		
	</form>
</div>