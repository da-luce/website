<script>
	import { page } from '$app/stores'
</script>

<div class="container">
	<div class="error">
		<h1 id="status">{$page.status}</h1>
		<h2 id="message"> {$page.error?.message}</h2>
	</div>
</div>

<style>
	.container {
		height: 100vh; /* Full viewport height */
		display: grid;
		place-items: center; /* Centers both vertically and horizontally */
	}

	.error {
		text-align: right;
	}

	#status, #message {
		font-family: var(--mono-font);
		text-shadow: 0 0 10vh var(--foreground), 1vh 1vh 10vh #ff4c4c, -1vh -1vh 10vh #274fff; /* Glowing effect */
	}

	#status {
		font-size: var(--size-1);
	}

	#message {
		font-size: var(--size-3);
		font-weight: bold;
	}

</style>