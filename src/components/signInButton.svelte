<script>
    import { signIn, signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores';

    let telegramWidgetLoaded = false;

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

    async function loadTelegramWidget() {
        telegramWidgetLoaded = true;
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.dataset.telegramLogin = 'BasketoDevBot';
        script.dataset.onauth = 'onTelegramAuth';
        script.dataset.requestAccess = 'write';
        script.onerror = () => {
            console.error('Error loading Telegram Login script');
            // Display an error message to the user
        };
        document.querySelector('#telegram-login-widget').appendChild(script);
    }

    // Load Telegram widget when component is mounted
    import { onMount } from 'svelte';
    onMount(loadTelegramWidget);
</script>

<div class="auth-buttons">
    {#await telegramWidgetLoaded}
        <div class="spinner"></div>
    {:then}
        <div class="flex gap-3">
            {#if $page.data.session}
                {#if $page.data.session.user?.image}
                    <img src={$page.data.session.user.image} alt="profile image" class="rounded-full w-7 h-7" />
                {/if}
                <button class="hover:text-blue-500 text-sm" on:click={() => signOut()}>Sign Out</button>
            {:else}
                <div id="telegram-login-widget"></div>
                <button class="sign-in-button hover:text-blue-500 text-sm" on:click={() => signIn('github')}>
                    Sign In with GitHub
                </button>

            {/if}
        </div>
    {:catch error}
        <p style="color: red">Error loading Telegram Login: {error.message}</p>
    {/await}
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

    .spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
