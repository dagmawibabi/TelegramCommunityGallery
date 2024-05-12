<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	// Function to handle Telegram authentication
	function onTelegramAuth(user) {
		alert(
			'Logged in as ' +
				user.first_name +
				' ' +
				user.last_name +
				' (' +
				user.id +
				(user.username ? ', @' + user.username : '') +
				')'
		);
	}
</script>

<div class="auth-buttons">
	{#if $page.data.session}
		<div class="flex gap-3">
			{#if $page.data.session.user?.image}
				<img src={$page.data.session.user.image} alt="profile image" class="rounded-full w-7 h-7" />
			{/if}
			<button class="hover:text-blue-500 text-sm" on:click={() => signOut()}>Sign Out</button>
		</div>
	{:else}
		<!-- Embed Telegram login widget -->
		<div id="telegram-login-widget"></div>
		<script
			async
			src="https://telegram.org/js/telegram-widget.js?22"
			data-telegram-login="BasketoDevBot"
			data-onauth="onTelegramAuth"
			data-request-access="write"
		>
		</script>

		<button class="sign-in-button hover:text-blue-500 text-sm" on:click={() => signIn('github')}
			>Sign In with GitHub</button
		>
	{/if}
</div>

<style>
	.auth-buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		top: 20px;
		left: 20px;
		width: calc(100% - 40px);
	}

	#telegram-login-widget .telegram-login-button {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	.sign-in-button {
		margin-left: auto;
		background-color: rgb(45, 45, 45);
		height: 30px;
		padding-left: 20px;
		padding-right: 20px;
		border-radius: 5px;
		box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
	}
	.test {
		padding-left: 20px;
		padding-right: 20px;
		margin-right: 20px;
		height: 30px;
		background-color: rgb(45, 45, 45);
		box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.5);
	}
</style>
