<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	// Checkout modal state
	let checkoutModal: HTMLDialogElement | undefined;
	let pendingCheckIn: { id: string; teamName: string } | null = $state(null);
	let pointSets: { label: string; value: string }[] = $state([
		{ label: 'Disciplin 1', value: '' },
		{ label: 'Disciplin 2', value: '' }
	]);

	function openCheckout(ci: { id: string; teamName: string }) {
		pendingCheckIn = ci;
		const presets = (data.post as any).point_presets;
		if (Array.isArray(presets) && presets.length > 0) {
			pointSets = presets.map((label: string) => ({ label, value: '' }));
		} else {
			pointSets = [{ label: 'Opgaven', value: '' }, { label: 'Turnout', value: '' }];
		}
		checkoutModal?.showModal();
	}

	function addPointSet() {
		pointSets = [...pointSets, { label: `Disciplin ${pointSets.length + 1}`, value: '' }];
	}

	function removePointSet(i: number) {
		if (pointSets.length <= 1) return;
		pointSets = pointSets.filter((_, idx) => idx !== i);
	}

	function totalPoints() {
		return pointSets.reduce((sum, p) => sum + (parseFloat(p.value) || 0), 0);
	}

	function fmt(iso: string) {
		if (!iso) return '';
		return new Date(iso).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
	}
</script>

<div class="min-h-screen bg-base-200 flex flex-col">

	<!-- Top bar -->
	<div class="bg-base-100 shadow-sm sticky top-0 z-10">
		<div class="flex items-center gap-3 px-4 py-3">
			<a href="/dashboard/runs/{data.run.id}" class="btn btn-ghost btn-sm btn-square" aria-label="Tilbage til løb">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</a>
			<div class="flex-1 min-w-0">
				<p class="text-xs text-base-content/50 truncate">{data.run.name}</p>
				<h1 class="text-lg font-bold leading-tight truncate">{data.post.name}</h1>
			</div>
			<span class="flex items-center gap-1 text-xs text-success font-medium">
				<span class="relative flex h-2 w-2">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
					<span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
				</span>
				Live
			</span>
		</div>
	</div>

	<div class="flex-1 p-4 space-y-5 max-w-lg mx-auto w-full">

		<!-- Active check-ins -->
		<section>
			<h2 class="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-3">
				Her nu
				{#if data.activeCheckIns.length > 0}
					<span class="badge badge-warning badge-sm ml-1">{data.activeCheckIns.length}</span>
				{/if}
			</h2>

			{#if data.activeCheckIns.length === 0}
				<div class="card bg-base-100 shadow-sm">
					<div class="card-body items-center py-8 text-base-content/40">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
						</svg>
						<p class="text-sm">Ingen hold her nu</p>
					</div>
				</div>
			{:else}
				<div class="space-y-3">
					{#each data.activeCheckIns as ci}
						<div class="card bg-warning/10 border border-warning/30 shadow-sm">
							<div class="card-body p-4">
								<div class="flex items-center justify-between gap-3">
									<div class="min-w-0">
										<p class="font-bold text-lg leading-tight truncate">{ci.teamName}</p>
										<p class="text-sm text-base-content/50 mt-0.5">Tjekket ind kl. {fmt(ci.checked_in)}</p>
									</div>
									<button
										class="btn btn-success btn-lg gap-2 min-w-[100px]"
										onclick={() => openCheckout(ci)}
									>
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
										</svg>
										Ud
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		<!-- Check-in form -->
		<section>
			<h2 class="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-3">Check ind</h2>

			{#if data.availableTeams.length === 0}
				<div class="card bg-base-100 shadow-sm">
					<div class="card-body py-5 items-center text-base-content/40 text-sm">
						Alle hold er tjekket ind
					</div>
				</div>
			{:else}
				<div class="card bg-base-100 shadow-sm">
					<div class="card-body p-4">
						<form method="POST" action="?/checkIn" use:enhance class="flex flex-col gap-3">
							<select name="team" class="select select-bordered select-lg w-full text-base" required>
								<option value="">Vælg hold...</option>
								{#each data.availableTeams as team}
									<option value={team.id}>{team.team_name}</option>
								{/each}
							</select>
							{#if form?.error && form?.action === 'checkIn'}
								<div role="alert" class="alert alert-error py-2">
									<span class="text-sm">{form.message ?? 'Fejl ved check-in'}</span>
								</div>
							{/if}
							<button class="btn btn-primary btn-lg w-full gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
								</svg>
								Check ind
							</button>
						</form>
					</div>
				</div>
			{/if}
		</section>

		<!-- Recent completed -->
		{#if data.recentCheckOuts.length > 0}
			<section>
				<h2 class="text-sm font-semibold text-base-content/50 uppercase tracking-wide mb-3">Senest færdige</h2>
				<div class="card bg-base-100 shadow-sm">
					<div class="card-body p-0">
						<ul class="divide-y divide-base-200">
							{#each data.recentCheckOuts as co}
								<li class="flex items-center justify-between px-4 py-3 gap-2">
									<div class="min-w-0">
										<span class="font-medium text-sm truncate block">{co.teamName}</span>
										<span class="text-xs text-base-content/40">{fmt(co.checked_in)} → {fmt(co.checked_out)}</span>
									</div>
									<div class="flex items-center gap-2 shrink-0">
										{#if co.total > 0}
											<span class="badge badge-neutral badge-sm font-mono">{co.total} pt</span>
										{/if}
										<span class="badge badge-success badge-sm">✓</span>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</section>
		{/if}

	</div>
</div>

<!-- Checkout + points modal -->
<dialog bind:this={checkoutModal} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box w-full max-w-lg">
		<h3 class="font-bold text-lg mb-1">Check ud</h3>
		{#if pendingCheckIn}
			<p class="text-base-content/60 mb-5 text-sm">{pendingCheckIn.teamName}</p>
		{/if}

		<form
			method="POST"
			action="?/checkOut"
			use:enhance={({ formData }) => {
				// Capture current pointSets state at submit time — reliable in Svelte 5
				formData.set(
					'points',
					JSON.stringify(pointSets.map((p) => ({ label: p.label, value: parseFloat(p.value) || 0 })))
				);
				return async ({ result, update }) => {
					await update();
					if (result.type === 'success') {
						checkoutModal?.close();
						pendingCheckIn = null;
					}
				};
			}}
			class="space-y-4"
		>
			<input type="hidden" name="checkInId" value={pendingCheckIn?.id ?? ''} />

			<!-- Point inputs -->
			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<span class="text-sm font-semibold">Point</span>
					{#if pointSets.length > 0}
						<span class="text-xs text-base-content/40 font-mono">
							Total: {totalPoints()}
						</span>
					{/if}
				</div>

				{#each pointSets as ps, i}
					<div class="flex items-center gap-2">
						<input
							type="text"
							class="input input-bordered input-sm flex-1 min-w-0"
							placeholder="Navn (f.eks. Opgave 1)"
							bind:value={ps.label}
						/>
						<input
							type="number"
							class="input input-bordered input-sm w-24 font-mono text-right"
							placeholder="0"
							max="1000"
							min="0"
							bind:value={ps.value}
							inputmode="numeric"
						/>
						<button
							type="button"
							class="btn btn-ghost btn-sm btn-square text-error"
							onclick={() => removePointSet(i)}
							disabled={pointSets.length <= 1}
							aria-label="Fjern"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				{/each}

				<button
					type="button"
					class="btn btn-ghost btn-sm w-full border border-dashed border-base-content/20"
					onclick={addPointSet}
				>
					+ Tilføj point
				</button>
			</div>

			<div class="modal-action mt-4">
				<button
					type="button"
					class="btn btn-ghost"
					onclick={() => { checkoutModal?.close(); pendingCheckIn = null; }}
				>
					Annuller
				</button>
				<button type="submit" class="btn btn-success gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
					</svg>
					Gem & check ud
				</button>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
