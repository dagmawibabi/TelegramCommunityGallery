<script>
    let telegramWidgetLoaded = false;
    let userData = null;

    // Function to handle Telegram authentication
    function onTelegramAuth(user) {
        userData = user;
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
        script.dataset.onauth = 'onTelegramAuth(user)';
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

<div>
    {#await telegramWidgetLoaded}
        <div class="spinner"></div>
    {:then}
        {#if userData}
            <div class="user-info">
                <p>Logged in as: {userData.first_name} {userData.last_name}</p>
                <p>User ID: {userData.id}</p>
                {#if userData.username}
                    <p>Username: @{userData.username}</p>
                {/if}
            </div>
        {:else}
            <div class="flex gap-3 mt-5">
                <div id="telegram-login-widget"></div>
            </div>
        {/if}
    {:catch error}
        <p style="color: red">Error loading Telegram Login: {error.message}</p>
    {/await}
</div>

<style>
    .spinner {
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
    }

    .user-info {
        margin-top: 1rem;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
