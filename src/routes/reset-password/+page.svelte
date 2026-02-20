<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="m-3 mx-auto max-w-xl rounded-xl bg-base-100 shadow">
	<form method="POST" use:enhance action="?/reset" class="flex flex-col p-3 space-y-3">
		<h1 class="text-center text-2xl font-bold">Nulstil adgangskode</h1>

		<input type="hidden" name="token" value={data.token} />

		{#if form?.invalidToken}
			<div role="alert" class="alert alert-error">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>Linket er udløbet eller ugyldigt. <a href="/forgot-password" class="link">Anmod om et nyt.</a></span>
			</div>
		{:else}
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Ny adgangskode</span>
				</div>
				<input
					type="password"
					name="password"
					placeholder="Ny adgangskode"
					class="input input-bordered w-full"
					required
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Bekræft adgangskode</span>
				</div>
				<input
					type="password"
					name="passwordConfirm"
					placeholder="Bekræft adgangskode"
					class="input input-bordered w-full"
					required
				/>
			</label>

			{#if form?.error && form?.errors}
				<ul>
					{#each form.errors as error}
						<li>
							<div role="alert" class="alert alert-error m-2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>{error.message}</span>
							</div>
						</li>
					{/each}
				</ul>
			{/if}

			<button class="btn btn-outline btn-primary btn-wide m-3 mx-auto">Gem adgangskode</button>
		{/if}
	</form>
</div>
