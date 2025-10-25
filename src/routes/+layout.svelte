<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="navbar bg-base-100 shadow-sm">
  <div class="flex-1">
	<a class="btn btn-ghost text-xl items-center gap-2" href="/dashboard">
<!-- FIX: Make the sizes corect to look good -->
      <img src={favicon} alt="VFH" class="w-15 h-15" />
      <span>Ragnarok</span>
    </a>  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1 space-x-2">
      <li><a class="btn bth-ghost" href="/signin">Log Ind</a></li>
      <li><a class="btn bth-ghost" href="/signup">Opret</a></li>
    </ul>
  </div>
</div>


{@render children?.()}


