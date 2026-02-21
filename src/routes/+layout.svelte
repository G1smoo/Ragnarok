<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
    import type { LayoutData } from './$types';
    import type { Snippet } from 'svelte';

	let { data, children }: { data: LayoutData; children: Snippet} = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="navbar bg-base-100 shadow-sm">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl items-center gap-2" href="/dashboard">
      <img src={favicon} alt="Ragnarok" class="w-50 h-8" />
    </a>
    {#if data.currentUser?.verified}
      <ul class="menu menu-horizontal px-1">
        <li><a href="/dashboard/runs">Løb</a></li>
        <li><a href="/dashboard/teams">Hold</a></li>
      </ul>
    {/if}
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1 space-x-2">
      {#if data.currentUser}
        <li><button>{data.currentUser?.email}</button></li>
        <li class="whitespace-nowrap">
          <form method="POST" action="/signout" class="whitespace-nowrap">
            <button>Log ud</button>
          </form>
        </li>
      {:else}
        <li><a href="/signin">Log ind</a></li>
      {/if}
    </ul>
  </div>
</div>


{@render children?.()}


