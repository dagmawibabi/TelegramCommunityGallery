<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

{#if $page.data.session}
 <div class="flex gap-3">
    {#if $page.data.session.user?.image}
    <img src={$page.data.session.user.image} alt="profile image" class="rounded-full w-7 h-7" />

	{/if}
	<button class="hover:text-blue-500 text-sm" on:click={() => signOut()}>Sign Out</button>
 </div>
	
{:else}
	<button class="hover:text-blue-500 text-sm" on:click={() => signIn('github')}>Sign In</button>
{/if}
