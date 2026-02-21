<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let addPostModal: HTMLDialogElement | undefined;

	function fmt(iso: string) {
		if (!iso) return '';
		return new Date(iso).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
	}
</script>

<div class="m-3 mx-auto max-w-7xl space-y-6">

	<!-- Header -->
	<div class="flex flex-wrap items-center gap-3">
		<a href="/dashboard/runs" class="btn btn-ghost btn-sm">← Tilbage</a>
		<h1 class="text-2xl font-bold">{data.run.name}</h1>
		{#if data.run.date}
			<span class="badge badge-neutral">{new Date(data.run.date).toLocaleDateString('da-DK')}</span>
		{/if}
	</div>

	<!-- Overview matrix -->
	{#if data.posts.length > 0 && data.teams.length > 0}
		<div class="card bg-base-100 shadow">
			<div class="card-body p-4">
				<h2 class="text-lg font-semibold mb-2">Oversigt</h2>
				<div class="overflow-x-auto">
					<table class="table table-sm">
						<thead>
							<tr>
								<th class="min-w-32">Hold</th>
								{#each data.posts as post}
									<th class="text-center whitespace-nowrap">{post.name}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each data.matrix as row}
								<tr>
									<td class="font-medium whitespace-nowrap">{row.team.team_name}</td>
									{#each row.cells as cell}
										<td class="text-center">
											{#if cell.status === 'checked_out'}
												<span class="badge badge-success badge-sm gap-1">✓ {fmt(cell.until)}</span>
											{:else if cell.status === 'checked_in'}
												<span class="badge badge-warning badge-sm gap-1">⏳ {fmt(cell.since)}</span>
											{:else}
												<span class="text-base-content/20">—</span>
											{/if}
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Legend -->
				<div class="flex gap-4 mt-3 text-xs text-base-content/60">
					<span><span class="badge badge-warning badge-xs mr-1">⏳</span>Tjekket ind</span>
					<span><span class="badge badge-success badge-xs mr-1">✓</span>Færdig</span>
					<span><span class="opacity-30">—</span> Ikke besøgt</span>
				</div>
			</div>
		</div>
	{:else if data.teams.length === 0}
		<div role="alert" class="alert alert-info">
			<span>Ingen hold fundet. <a href="/dashboard/teams" class="link">Opret hold</a> for at komme i gang.</span>
		</div>
	{/if}

	<!-- Points leaderboard -->
	{#if data.teamScores.some((t) => t.total > 0) || data.postScores.some((p) => p.total > 0)}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

			<!-- Team leaderboard -->
			<div class="card bg-base-100 shadow">
				<div class="card-body p-4">
					<h2 class="text-lg font-semibold mb-3">Point — Hold</h2>
					<ol class="space-y-2">
						{#each data.teamScores as team, i}
							<li class="flex items-center gap-3">
								<span class="text-sm font-mono w-5 text-base-content/40 shrink-0">{i + 1}</span>
								<a
									href="/dashboard/teams/{team.id}"
									class="flex-1 text-sm font-medium truncate hover:underline"
								>{team.name}</a>
								<span class="text-xs text-base-content/40 shrink-0">{team.postsVisited} poster</span>
								<span class="badge badge-neutral font-mono shrink-0">{team.total} pt</span>
							</li>
						{/each}
					</ol>
				</div>
			</div>

			<!-- Post leaderboard -->
			<div class="card bg-base-100 shadow">
				<div class="card-body p-4">
					<h2 class="text-lg font-semibold mb-3">Point — Poster</h2>
					<ol class="space-y-2">
						{#each data.postScores as post, i}
							<li class="flex items-center gap-3">
								<span class="text-sm font-mono w-5 text-base-content/40 shrink-0">{i + 1}</span>
								<span class="flex-1 text-sm font-medium truncate">{post.name}</span>
								<span class="text-xs text-base-content/40 shrink-0">{post.teamsServed} hold</span>
								<span class="badge badge-neutral font-mono shrink-0">{post.total} pt</span>
							</li>
						{/each}
					</ol>
				</div>
			</div>

		</div>
	{/if}

	<!-- Posts section -->
	
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-semibold">Poster</h2>
		{#if data.currentUser}
			<button class="btn btn-primary btn-sm" onclick={() => addPostModal?.showModal()}>+ Tilføj post</button>
		{/if}
	</div>

	{#if data.postData.length === 0}
		<div class="card bg-base-100 shadow">
			<div class="card-body text-center text-base-content/50">
				Ingen poster endnu. Tilføj den første post.
			</div>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.postData as post}
				<div class="card bg-base-100 shadow">
					<div class="card-body p-4 space-y-3">
						<div class="flex items-center justify-between gap-2">
							<h3 class="font-semibold text-base">{post.name}</h3>
							<a
								href="/dashboard/runs/{data.run.id}/posts/{post.id}"
								class="btn btn-outline btn-xs gap-1"
								title="Åbn post-visning til mobil"
							>
								<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
								</svg>
								Post-visning
							</a>
						</div>

						<!-- Active check-ins -->
						{#if post.activeCheckIns.length === 0}
							<p class="text-sm text-base-content/40 italic">Ingen hold her nu</p>
						{:else}
							<div class="space-y-2">
								{#each post.activeCheckIns as ci}
									<div class="flex items-center justify-between bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
										<div>
											<p class="font-medium text-sm">{ci.teamName}</p>
											<p class="text-xs text-base-content/50">Ind kl. {fmt(ci.checked_in)}</p>
										</div>
										<form method="POST" action="?/checkOut" use:enhance>
											<input type="hidden" name="checkInId" value={ci.id} />
											<button class="btn btn-xs btn-success">Ud ✓</button>
										</form>
									</div>
								{/each}
							</div>
						{/if}

						<!-- Check in form -->
						{#if post.availableTeams.length > 0}
							<form method="POST" action="?/checkIn" use:enhance class="flex gap-2 pt-1">
								<input type="hidden" name="post" value={post.id} />
								<select name="team" class="select select-bordered select-xs flex-1 min-w-0">
									<option value="">Vælg hold...</option>
									{#each post.availableTeams as team}
										<option value={team.id}>{team.team_name}</option>
									{/each}
								</select>
								<button class="btn btn-primary btn-xs whitespace-nowrap">Check ind</button>
							</form>
						{:else}
							<p class="text-xs text-base-content/40 italic">Alle hold er tjekket ind</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Add post modal -->
<dialog bind:this={addPostModal} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg mb-4">Tilføj post</h3>
		<form
			method="POST"
			action="?/addPost"
			use:enhance={() => {
				return async ({ result, update }) => {
					await update();
					if (result.type === 'success') {
						addPostModal?.close();
					}
				};
			}}
			class="space-y-3"
		>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Post navn</span></div>
				<input type="text" name="name" class="input input-bordered" placeholder="Post 1" required />
			</label>
			<label class="form-control w-full">
				<div class="label"><span class="label-text">Rækkefølge (valgfrit)</span></div>
				<input type="number" name="order" class="input input-bordered" placeholder="1" min="0" />
			</label>

			{#if form?.error && form?.action === 'addPost'}
				<div role="alert" class="alert alert-error py-2">
					<span class="text-sm">{form.message}</span>
				</div>
			{/if}

			<div class="modal-action">
				<button type="button" class="btn" onclick={() => addPostModal?.close()}>Annuller</button>
				<button type="submit" class="btn btn-primary">Tilføj</button>
			</div>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
