<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let createTeamModal: HTMLDialogElement;
</script>

<div class="m-3 mx-auto max-w-7xl space-y-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<a href="/dashboard" class="btn btn-ghost btn-sm">← Tilbage</a>
			<h1 class="text-2xl font-bold">Hold</h1>
		</div>
		<button class="btn btn-primary btn-sm" onclick={() => createTeamModal.showModal()}>+ Nyt hold</button>
	</div>

	<!-- Teams table -->
	{#if data.teams.length === 0}
		<div class="card bg-base-100 shadow">
			<div class="card-body text-center text-base-content/50">
				Ingen hold endnu. Opret det første hold.
			</div>
		</div>
	{:else}
		<div class="card bg-base-100 shadow overflow-x-auto">
			<table class="table table-zebra">
				<thead>
					<tr>
						<th>Patruljenavn</th>
						<th>Gruppenavn</th>
						<th class="text-center">Antal</th>
						<th>Leder</th>
						<th>Telefon</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{#each data.teams as team}
						<tr>
							<td class="font-medium">{team.patruljenavn}</td>
							<td>{team.gruppenavn}</td>
							<td class="text-center">{team.antal}</td>
							<td>{team.leder_navn}</td>
							<td>{team.telefonnummer}</td>
							<td>{team.email}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<!-- Create team modal -->
<dialog bind:this={createTeamModal} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg mb-4">Opret nyt hold</h3>
		<form
			method="POST"
			action="?/create"
			use:enhance
			onsubmit={() => {
				if (!form?.error) createTeamModal?.close();
			}}
			class="space-y-3"
		>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Patruljenavn</span></div>
				<input type="text" name="patruljenavn" class="input input-bordered" required />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Gruppenavn</span></div>
				<input type="text" name="gruppenavn" class="input input-bordered" required />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Antal deltagere (3–6)</span></div>
				<input type="number" name="antal" class="input input-bordered" min="3" max="6" required />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Leder navn</span></div>
				<input type="text" name="leder_navn" class="input input-bordered" required />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Telefonnummer</span></div>
				<input type="text" name="telefonnummer" class="input input-bordered" required />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Email</span></div>
				<input type="email" name="email" class="input input-bordered" required />
			</label>

			{#if form?.error}
				{#each form.errors ?? [] as err}
					<div role="alert" class="alert alert-error py-2">
						<span class="text-sm">{err.message}</span>
					</div>
				{/each}
			{/if}

			<div class="modal-action">
				<button type="button" class="btn" onclick={() => createTeamModal.close()}>Annuller</button>
				<button type="submit" class="btn btn-primary">Opret</button>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
