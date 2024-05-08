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
    <p class="text-sm text-orange-500 pt-5
        md:pt-0
    "> 
        #{allCommunities.length} Communities Added! 
    </p>
    <a href="/">
        <p class="text-2xl font-bold pt-1 leading-snug hover:text-blue-500
            md:text-4xl
        "> 
            Discover the Best <br/> Telegram Communities 
        </p>
    </a>
    <div class="pt-3 pb-2">
        <p class="text-sm text-zinc-400"> Here are some of the most incredible channels and groups submitted by the public. 
            <br class="hidden md:block"/>  
            <Footer />
        </p>
    </div>
</div>
