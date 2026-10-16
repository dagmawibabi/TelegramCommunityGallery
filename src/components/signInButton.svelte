<script>
	import { page } from '$app/stores';
	import * as Dialog from '$lib/components/ui/dialog/index.ts';
	import { Button } from '$lib/components/ui/button/index.ts';
	import { getAuthRedirectUrl } from '$lib/site';

	$: supabase = $page.data.supabase;
	$: claims = $page.data.claims;
	$: avatar =
		claims?.user_metadata?.avatar_url ??
		claims?.user_metadata?.picture ??
		claims?.user_metadata?.avatar;
	$: displayName =
		claims?.user_metadata?.full_name ??
		claims?.user_metadata?.name ??
		claims?.email ??
		'';

	let email = '';
	let password = '';
	let message = '';
	let sending = false;
	let mode = 'signin';

	async function signInWithPassword() {
		if (!supabase) return;
		message = '';
		sending = true;
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		sending = false;
		if (error) {
			message = error.message;
			return;
		}
		window.location.assign('/');
	}

	async function signUpWithPassword() {
		if (!supabase) return;
		message = '';
		sending = true;
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: getAuthRedirectUrl(window.location.origin)
			}
		});
		sending = false;
		if (error) {
			message = error.message;
			return;
		}
		if (data.session) {
			window.location.assign('/');
			return;
		}
		message = 'Check your Gmail for a confirmation link.';
	}

	async function submit() {
		if (mode === 'signup') {
			await signUpWithPassword();
			return;
		}
		await signInWithPassword();
	}

	async function signOut() {
		if (!supabase) return;
		await supabase.auth.signOut();
		window.location.assign('/');
	}
</script>

{#if claims}
	<div class="flex gap-3 items-center">
		{#if avatar}
			<img src={avatar} alt="profile pic" class="rounded-full w-7 h-7" />
		{/if}
		{#if displayName}
			<span class="text-xs text-zinc-400 hidden sm:inline">{displayName}</span>
		{/if}
		<button class="hover:text-blue-500 text-sm" on:click={signOut}>Sign Out</button>
	</div>
{:else}
	<Dialog.Root>
		<Dialog.Trigger>
			<button class="hover:text-blue-500 text-sm">Sign In</button>
		</Dialog.Trigger>
		<Dialog.Content class="bg-zinc-900 border-zinc-800 rounded-xl sm:max-w-[360px]">
			<Dialog.Header class="text-left">
				<Dialog.Title class="text-md font-semibold">
					{mode === 'signup' ? 'Create account' : 'Sign in'}
				</Dialog.Title>
				<Dialog.Description class="text-zinc-300 text-sm">
					Use your Gmail and password to submit communities and images.
				</Dialog.Description>
			</Dialog.Header>
			<form
				class="flex flex-col gap-3 pt-2"
				on:submit|preventDefault={submit}
			>
				<input
					class="bg-zinc-800 rounded-xl p-2 px-3 outline-none text-sm"
					type="email"
					placeholder="you@gmail.com"
					autocomplete="email"
					required
					bind:value={email}
				/>
				<input
					class="bg-zinc-800 rounded-xl p-2 px-3 outline-none text-sm"
					type="password"
					placeholder="Password"
					autocomplete={mode === 'signup' ? 'new-password' : 'current-password'}
					minlength="6"
					required
					bind:value={password}
				/>
				<Button
					type="submit"
					class="rounded-full bg-white text-black text-sm font-semibold hover:bg-blue-500"
					disabled={sending || !email || !password}
				>
					{#if sending}
						{mode === 'signup' ? 'Creating account…' : 'Signing in…'}
					{:else}
						{mode === 'signup' ? 'Create account' : 'Sign in'}
					{/if}
				</Button>
				<button
					type="button"
					class="text-xs text-zinc-400 hover:text-blue-500"
					on:click={() => {
						mode = mode === 'signup' ? 'signin' : 'signup';
						message = '';
					}}
				>
					{mode === 'signup' ? 'Already have an account? Sign in' : 'Need an account? Create one'}
				</button>
				{#if message}
					<p class="text-sm text-zinc-300">{message}</p>
				{/if}
			</form>
		</Dialog.Content>
	</Dialog.Root>
{/if}
