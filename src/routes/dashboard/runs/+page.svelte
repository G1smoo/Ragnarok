<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let createRunModal: HTMLDialogElement | undefined;
	$effect(() => {
		if (form?.success && form?.runId) {
			goto(`/dashboard/runs/${form.runId}`);
		}
	});

	function formatDate(d: string) {
		if (!d) return '';
		return new Date(d).toLocaleDateString('da-DK');
	}
</script>

<div class="m-3 mx-auto max-w-7xl space-y-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<a href="/dashboard" class="btn btn-ghost btn-sm">← Tilbage</a>
			<h1 class="text-2xl font-bold">Løb</h1>
		</div>
		<button class="btn btn-primary btn-sm" onclick={() => createRunModal?.showModal()}>+ Nyt løb</button>
	</div>

	{#if data.runs.length === 0}
		<div class="card bg-base-100 shadow">
			<div class="card-body text-center text-base-content/50">
				Ingen løb endnu. Opret det første løb.
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.runs as run}
				<a href="/dashboard/runs/{run.id}" class="card bg-base-100 shadow hover:shadow-md transition-shadow">
					<div class="card-body">
						<h2 class="card-title">{run.name}</h2>
						{#if run.date}
							<p class="text-sm text-base-content/60">{formatDate(run.date)}</p>
						{/if}
						<div class="card-actions justify-end mt-2">
							<span class="btn btn-sm btn-outline">Åbn →</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<!-- Create run modal -->
<dialog bind:this={createRunModal} class="modal">
	<div class="modal-box max-w-md">
		<h3 class="font-bold text-lg">Nyt løb</h3>
		<p class="text-sm text-base-content/50 mt-1 mb-6">Giv løbet et navn og valgfrit en dato.</p>

		<form method="POST" action="?/create" use:enhance class="space-y-4">
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Navn</span></div>
				<input
					type="text"
					name="name"
					class="input input-bordered"
					placeholder="Ragnarok 2026"
					required
				/>
			</label>
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Dato</span>
					<span class="label-text-alt text-base-content/40">Valgfrit</span>
				</div>
				<input type="date" name="date" class="input input-bordered" />
			</label>

			{#if form?.error}
				{#each form.errors ?? [] as err}
					<div role="alert" class="alert alert-error py-2">
						<span class="text-sm">{err.message}</span>
					</div>
				{/each}
			{/if}

			<div class="modal-action pt-2">
				<button type="button" class="btn btn-ghost" onclick={() => createRunModal?.close()}>Annuller</button>
				<button type="submit" class="btn btn-primary">Opret løb</button>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
