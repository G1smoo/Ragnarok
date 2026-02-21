<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let createTeamModal: HTMLDialogElement;

	// Drives how many member rows are shown — kept in sync with antal input
	let memberCount: number = $state(3);

	function pad(n: number) {
		return String(n).padStart(2, '0');
	}
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
						<tr
							class="hover cursor-pointer"
							onclick={() => (window.location.href = `/dashboard/teams/${team.id}`)}
						>
							<td class="font-medium">{team.team_name}</td>
							<td>{team.group_name}</td>
							<td class="text-center">{team.team_number}</td>
							<td>{team.contact_name}</td>
							<td>{team.contact_phone}</td>
							<td>{team.contact_email}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<!-- Create team modal -->
<dialog bind:this={createTeamModal} class="modal">
	<div class="modal-box max-w-2xl">
		<h3 class="font-bold text-lg">Opret nyt hold</h3>
		<p class="text-sm text-base-content/50 mt-1 mb-6">Udfyld oplysninger om patruljen og den ansvarlige leder.</p>

		<form
			method="POST"
			action="?/create"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update();
					if (result.type === 'success') createTeamModal?.close();
				};
			}}
			class="space-y-5"
		>
			<!-- Patrulje section -->
			<div class="space-y-3">
				<p class="text-xs font-semibold uppercase tracking-wide text-base-content/40">Patrulje</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Patruljenavn</span></div>
						<input type="text" name="team_name" class="input input-bordered" placeholder="Ulvene" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Gruppenavn</span></div>
						<input type="text" name="group_name" class="input input-bordered" placeholder="1. Aarhus" required />
					</label>
				</div>
				<label class="form-control w-32">
					<div class="label">
						<span class="label-text">Antal deltagere</span>
						<span class="label-text-alt text-base-content/40">3–6</span>
					</div>
					<input
						type="number"
						name="team_number"
						class="input input-bordered"
						min="3"
						max="6"
						placeholder="4"
						required
						bind:value={memberCount}
					/>
				</label>
			</div>

			<div class="divider my-0"></div>

			<!-- Leder section -->
			<div class="space-y-3">
				<p class="text-xs font-semibold uppercase tracking-wide text-base-content/40">Ansvarlig leder</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Navn</span></div>
						<input type="text" name="contact_name" class="input input-bordered" placeholder="Anders Jensen" required />
					</label>
					<label class="form-control w-full">
						<div class="label"><span class="label-text">Telefon</span></div>
						<input type="text" name="contact_phone" class="input input-bordered" placeholder="12 34 56 78" required />
					</label>
				</div>
				<label class="form-control w-full">
					<div class="label"><span class="label-text">Email</span></div>
					<input type="email" name="contact_email" class="input input-bordered" placeholder="anders@spejder.dk" required />
				</label>
			</div>

			<div class="divider my-0"></div>

			<!-- Members section — count driven by antal input -->
			<div class="space-y-4">
				<p class="text-xs font-semibold uppercase tracking-wide text-base-content/40">
					Deltagere
					<span class="normal-case font-normal ml-1 text-base-content/30">({Math.min(Math.max(memberCount || 3, 3), 6)} personer)</span>
				</p>

				{#each Array.from({ length: Math.min(Math.max(memberCount || 3, 3), 6) }, (_, i) => i + 1) as num}
					<div class="border border-base-300 rounded-lg p-3 space-y-2">
						<p class="text-xs text-base-content/40 font-medium">Deltager {num}</p>
						<div class="grid grid-cols-2 gap-2">
							<label class="form-control col-span-2 sm:col-span-1">
								<div class="label py-0.5"><span class="label-text text-xs">Navn</span></div>
								<input
									type="text"
									name="member{pad(num)}_name"
									class="input input-bordered input-sm"
									placeholder="Fulde navn"
								/>
							</label>
							<label class="form-control">
								<div class="label py-0.5"><span class="label-text text-xs">Alder</span></div>
								<input
									type="text"
									name="member{pad(num)}_age"
									class="input input-bordered input-sm"
									placeholder="12"
								/>
							</label>
						</div>
						<label class="form-control w-full">
							<div class="label py-0.5"><span class="label-text text-xs">Noter <span class="text-base-content/30">(valgfrit)</span></span></div>
							<input
								type="text"
								name="member{pad(num)}_notes"
								class="input input-bordered input-sm"
								placeholder="Allergi, særlige behov..."
							/>
						</label>
					</div>
				{/each}
			</div>

			{#if form?.error}
				{#each form.errors ?? [] as err}
					<div role="alert" class="alert alert-error py-2">
						<span class="text-sm">{err.message}</span>
					</div>
				{/each}
			{/if}

			<div class="modal-action pt-2">
				<button type="button" class="btn btn-ghost" onclick={() => createTeamModal.close()}>Annuller</button>
				<button type="submit" class="btn btn-primary">Opret hold</button>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
