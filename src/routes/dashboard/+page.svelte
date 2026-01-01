<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
</script>


<div class="m-3 mx-auto max-w-7xl rounded bg-neutral shadow sm:rounded-2xl p-3">
	<p>Velkommen {data.currentUser.username}</p>
</div>

