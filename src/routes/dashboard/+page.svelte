<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
</script>


<div class="m-3 mx-auto max-w-7xl space-y-4">
	<div class="rounded-2xl bg-neutral shadow p-4">
		<p class="text-lg font-semibold">Velkommen, {data.currentUser.username}</p>
	</div>

	{#if data.currentUser.verified}
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<a href="/dashboard/teams" class="card bg-base-100 shadow hover:shadow-md transition-shadow">
				<div class="card-body">
					<h2 class="card-title">Hold</h2>
					<p class="text-base-content/60 text-sm">Se og administrer tilmeldte hold</p>
					<div class="card-actions justify-end">
						<span class="btn btn-primary btn-sm">Åbn →</span>
					</div>
				</div>
			</a>

			<a href="/dashboard/runs" class="card bg-base-100 shadow hover:shadow-md transition-shadow">
				<div class="card-body">
					<h2 class="card-title">Løb</h2>
					<p class="text-base-content/60 text-sm">Opret og administrer løb med poster og check-in</p>
					<div class="card-actions justify-end">
						<span class="btn btn-primary btn-sm">Åbn →</span>
					</div>
				</div>
			</a>
		</div>
	{:else}
		<div class="alert alert-warning">
			<span>Din konto er ikke verificeret.</span>
		</div>
	{/if}
</div>

