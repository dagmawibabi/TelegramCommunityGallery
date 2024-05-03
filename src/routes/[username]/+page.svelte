<script lang="ts">
    import { Rss, Users } from 'lucide-svelte';

    import { currentCommunityStore, allCommunitiesStore } from "../../store/store";
	import Socials from '../../components/socials.svelte';
	import Header from '../../components/header.svelte';
	import Footer from '../../components/footer.svelte';

    type Community = {
        name: string,
        link: string,
        description: string,
        owner: string | null | undefined,
        tags: string[],
        type: string,
    };
    let currentCommunity = <Community>{}
	
    currentCommunityStore.subscribe((data) => {
        currentCommunity = data;
    })

    let allCommunities = <Community[]>[]
    allCommunitiesStore.subscribe((data) => {
        allCommunities = data;
    })


</script>

<div class="relative h-screen w-screen">
    <!-- BACKGROUND -->
    <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
    </div>
    <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#63e_100%)]"></div>

    <!-- MAIN SECTION -->
    <div class="absolute bottom-0 left-0 right-0 top-0 z-50 w-full h-screen overflow-scroll">
        <div class="w-1/2 m-auto">
            <!-- SOCIALS -->
            <Socials />

            <!-- HEADER -->
            <Header />
            
            <!-- CURRENT COMMUNITY -->
            <div class="py-20 px-40 pb-40">
                <div class={
                    currentCommunity.type == "channel" ? 
                    "w-fit min-w-[400px] mx-auto px-10 py-10 rounded-2xl border border-emerald-500 bg-zinc-950" : 
                    "w-fit min-w-[400px] mx-auto px-10 py-10 rounded-2xl border border-cyan-500 bg-zinc-950"}>

                    {#if currentCommunity.type == "channel"}
                        <div class="absolute -m-16 text-black rounded-full bg-emerald-500 w-fit p-3">
                            <Rss size={25} />
                        </div>
                    {:else}
                        <div class="absolute -m-16 text-black rounded-full bg-cyan-500 w-fit p-3">
                            <Users size={25}/>
                        </div>
                    {/if}
                    <div class={currentCommunity.type == "channel" ? "text-4xl font-bold pb-3 text-emerald-500" : "text-4xl font-bold pb-3 text-cyan-500"}>
                        {currentCommunity.name}
                    </div>

                    <a href={`https://t.me/${currentCommunity.link.substring(1)}`}>
                        <div class={currentCommunity.type == "channel" ? "w-fit text-xl pb-6 text-cyan-500 font-semibold" : "text-xl pb-6 text-emerald-500 font-semibold"}>
                            {currentCommunity.link}
                        </div>
                    </a>

                    <div class="text-2xl text-zinc-400 pb-5 flex flex-wrap">
                        {#each currentCommunity.description.split(" ") as letters}
                        <span class={currentCommunity.type == "channel" ? "hover:text-emerald-500" : "hover:text-cyan-500"}>
                            {letters}&nbsp;
                        </span>
                        <!-- {currentCommunity.description} -->
                        {/each}
                    </div>

                    {#if currentCommunity.owner != ""}
                        <a href={`https://t.me/${currentCommunity.owner?.substring(1)}`}>
                            <div class="text-xl font-semibold">
                                Owner: <span class={currentCommunity.type == "channel" ? "text-cyan-500" : "text-emerald-500"}>{currentCommunity.owner}</span>
                            </div>
                        </a>
                    {/if}

                    <div class="flex flex-row flex-wrap pt-6">
                        {#each currentCommunity.tags as tag}
                        <div class="pr-3 pb-3">
                            <div class={currentCommunity.type == "channel" ? "rounded-full px-6 bg-emerald-500 w-fit text-xl text-black font-semibold" : "rounded-full px-6 bg-cyan-500 w-fit text-xl text-black font-semibold"}>
                                {tag}
                            </div>                            
                        </div>
                        {/each}

                    </div>

                </div>
            </div>

            
        </div>
    </div>

    <!-- FOOTER -->
    <Footer />

</div>
