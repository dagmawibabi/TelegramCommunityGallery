<script>
    import { signIn, signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores';

    // Function to handle Telegram authentication
    function onTelegramAuth(user) {
        alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    }
</script>

<style>
    /* Adjust parent container to flex layout */
    .auth-buttons {
        display: flex;
        align-items: center; /* Align items vertically */
    }

    /* Adjust size of Telegram button */
    #telegram-login-widget .telegram-login-button {
        width: 30px; /* Set desired width */
        height: 30px; /* Set desired height */
        margin-right: 10px; /* Add some margin for spacing */
    }
</style>

<div class="auth-buttons">
    {#if $page.data.session}
        <div class="flex gap-3">
            {#if $page.data.session.user?.image}
                <img src={$page.data.session.user.image} alt="profile image" class="rounded-full w-7 h-7" />
            {/if}
            <button class="hover:text-blue-500 text-sm" on:click={() => signOut()}>Sign Out</button>
        </div>
    {:else}
		<button class="hover:text-blue-500 text-sm" on:click={() => signIn('github')}>Sign In</button>
        <!-- Embed Telegram login widget -->
        <div id="telegram-login-widget"></div>
        <script async src="https://telegram.org/js/telegram-widget.js?22" 
                data-telegram-login="BasketoDevBot"
                data-onauth="onTelegramAuth(user)" 
                data-request-access="write">
				class="rounded-md p-2 bg-blue-500 text-white hover:bg-blue-600">
        </script>
        
    {/if}
</div>
