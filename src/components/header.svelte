<script lang="ts">
	import { allCommunitiesStore } from '../store/store';
	import Footer from './footer.svelte';

    type Community = {
        name: string,
        link: string,
        description: string,
        owner: string | null | undefined,
        tags: string[],
        type: string,
    };

    let allCommunities = <Community[]>[]
    allCommunitiesStore.subscribe((data) => {
        allCommunities = data;
    })

</script>

<div class="text-center">
    <p class="text-lg text-orange-500 pt-6 "> #{allCommunities.length} Communities Added! </p>
    <a href="/">
        <p class="text-5xl font-bold pt-2 leading-snug hover:text-blue-500"> Discover the Best <br/> Telegram Communities </p>
    </a>
    <div class="pt-5 pb-10">
        <p class="text-lg text-zinc-400"> Below are some of the most incredible channels and groups submitted by the public. <br />  
            <Footer />
            And was made with 🤍 by <a href="https://www.dagmawibabi.com" class="text-white underline underline-offset-4 hover:text-blue-500 hover:underline "> Dagmawi Babi </a>. </p>
    </div>
</div>
