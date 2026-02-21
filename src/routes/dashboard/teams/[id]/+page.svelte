<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let deleteModal: HTMLDialogElement | undefined;

	function fmt(iso: string) {
		if (!iso) return '';
		return new Date(iso).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
	}

	function fmtDate(iso: string) {
		if (!iso) return '';
		return new Date(iso).toLocaleDateString('da-DK');
	}

	const totalPoints = $derived(data.history.reduce((sum, h) => sum + h.total, 0));
	const completedPosts = $derived(data.history.filter((h) => h.checked_out).length);
</script>

<div class="m-3 mx-auto max-w-3xl space-y-6">

	<!-- Header -->
	<div class="flex flex-wrap items-center gap-3">
		<a href="/dashboard/teams" class="btn btn-ghost btn-sm">← Tilbage</a>
		<h1 class="text-2xl font-bold flex-1">{data.team.team_name}</h1>
		<button class="btn btn-error btn-sm" onclick={() => deleteModal?.showModal()}>Slet hold</button>
	</div>

	<!-- Team details card -->
	<div class="card bg-base-100 shadow">
		<div class="card-body">
			<h2 class="card-title text-base mb-3">Holdoplysninger</h2>
			<dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
				<div>
					<dt class="text-base-content/50 text-xs uppercase tracking-wide">Patruljenavn</dt>
					<dd class="font-medium mt-0.5">{data.team.team_name}</dd>
				</div>
				<div>
					<dt class="text-base-content/50 text-xs uppercase tracking-wide">Gruppenavn</dt>
					<dd class="font-medium mt-0.5">{data.team.group_name}</dd>
				</div>
				<div>
					<dt class="text-base-content/50 text-xs uppercase tracking-wide">Antal deltagere</dt>
					<dd class="font-medium mt-0.5">{data.team.team_number}</dd>
				</div>
				<div>
					<dt class="text-base-content/50 text-xs uppercase tracking-wide">Leder</dt>
					<dd class="font-medium mt-0.5">{data.team.contact_name}</dd>
				</div>
				<div>
					<dt class="text-base-content/50 text-xs uppercase tracking-wide">Telefon</dt>
					<dd class="font-medium mt-0.5">
						<a href="tel:{data.team.contact_phone}" class="link link-hover">{data.team.contact_phone}</a>
					</dd>
				</div>
				<div>
					<dt class="text-base-content/50 text-xs uppercase tracking-wide">Email</dt>
					<dd class="font-medium mt-0.5">
						<a href="mailto:{data.team.contact_email}" class="link link-hover">{data.team.contact_email}</a>
					</dd>
				</div>
			</dl>
		</div>
	</div>

	<!-- Members -->
	{#if data.members.length > 0}
		<div class="card bg-base-100 shadow">
			<div class="card-body p-0">
				<div class="px-4 pt-4 pb-2 flex items-center justify-between">
					<h2 class="font-semibold">Deltagere</h2>
					<span class="text-xs text-base-content/40">{data.members.length} person{data.members.length !== 1 ? 'er' : ''}</span>
				</div>
				<ul class="divide-y divide-base-200">
					{#each data.members as member}
						<li class="px-4 py-3 flex items-start gap-4">
							<div class="flex-1 min-w-0">
								<p class="font-medium text-sm">{member.name}</p>
								{#if member.notes}
									<p class="text-xs text-base-content/50 mt-0.5">{member.notes}</p>
								{/if}
							</div>
							{#if member.age}
								<span class="badge badge-ghost badge-sm shrink-0">{member.age} år</span>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	<!-- Stats row -->
	<div class="grid grid-cols-2 gap-4">
		<div class="card bg-base-100 shadow">
			<div class="card-body p-4 items-center text-center">
				<p class="text-3xl font-bold font-mono">{totalPoints}</p>
				<p class="text-xs text-base-content/50 uppercase tracking-wide mt-1">Samlede point</p>
			</div>
		</div>
		<div class="card bg-base-100 shadow">
			<div class="card-body p-4 items-center text-center">
				<p class="text-3xl font-bold font-mono">{completedPosts}</p>
				<p class="text-xs text-base-content/50 uppercase tracking-wide mt-1">Poster gennemført</p>
			</div>
		</div>
	</div>

	<!-- Check-in history -->
	{#if data.history.length === 0}
		<div class="card bg-base-100 shadow">
			<div class="card-body text-center text-base-content/50 text-sm">
				Ingen check-in historik endnu.
			</div>
		</div>
	{:else}
		<div class="card bg-base-100 shadow">
			<div class="card-body p-0">
				<div class="px-4 pt-4 pb-2">
					<h2 class="font-semibold">Historik</h2>
				</div>
				<ul class="divide-y divide-base-200">
					{#each data.history as entry}
						<li class="px-4 py-3 space-y-2">
							<div class="flex items-center justify-between gap-2">
								<span class="font-medium text-sm">{entry.postName}</span>
								<div class="flex items-center gap-2">
									{#if entry.checked_out}
										{#if entry.total > 0}
											<span class="badge badge-neutral badge-sm font-mono">{entry.total} pt</span>
										{/if}
										<span class="badge badge-success badge-sm">✓ Færdig</span>
									{:else}
										<span class="badge badge-warning badge-sm">⏳ Her nu</span>
									{/if}
								</div>
							</div>
							<div class="flex items-center gap-4 text-xs text-base-content/40">
								<span>Ind: {fmt(entry.checked_in)}</span>
								{#if entry.checked_out}
									<span>Ud: {fmt(entry.checked_out)}</span>
								{/if}
							</div>
							{#if entry.points.length > 0}
								<div class="flex flex-wrap gap-2 pt-0.5">
									{#each entry.points as p}
										<span class="badge badge-ghost badge-sm font-mono">{p.label}: {p.value}</span>
									{/each}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	{#if form?.error}
		<div role="alert" class="alert alert-error">
			<span>{form.message}</span>
		</div>
	{/if}
</div>

<!-- Delete confirmation modal -->
<dialog bind:this={deleteModal} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Slet hold</h3>
		<p class="py-4 text-base-content/70">
			Er du sikker på at du vil slette <strong>{data.team.team_name}</strong>?
			Dette kan ikke fortrydes og vil også slette alle check-in data for holdet.
		</p>
		<div class="modal-action">
			<button class="btn" onclick={() => deleteModal?.close()}>Annuller</button>
			<form method="POST" action="?/delete" use:enhance>
				<button class="btn btn-error">Ja, slet holdet</button>
			</form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
