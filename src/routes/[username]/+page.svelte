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
    <div class="absolute bottom-0 left-0 right-0 top-0 z-50 w-full h-screen overflow-scroll no-scrollbar">
        <div class="w-full m-auto
            md:w-1/2 md:px-0
        ">
            <div class="px-5
                md:px-0
            ">            
                <!-- SOCIALS -->
                <Socials />

                <!-- HEADER -->
                <Header />
            </div>
            
            <!-- CURRENT COMMUNITY -->
            <div class="py-10 px-6 pb-40
                md:px-20
            ">
                <div class={
                    currentCommunity.type == "channel" ? 
                    "w-fit mx-auto px-4 py-3 rounded-2xl border border-emerald-500 bg-zinc-950 md:min-w-[400px] md:px-8 md:py-6" : 
                    "w-fit mx-auto px-4 py-3 rounded-2xl border border-cyan-500 bg-zinc-950 min-w-[400px] md:px-8 md:py-6"}>

                    {#if currentCommunity.type == "channel"}
                        <div class="absolute -m-12 text-black rounded-full bg-emerald-500 w-fit p-3 hidden md:visible">
                            <Rss size={25} />
                        </div>
                    {:else}
                        <div class="absolute -m-12 text-black rounded-full bg-cyan-500 w-fit p-3 hidden md:visible">
                            <Users size={25}/>
                        </div>
                    {/if}
                    <div class={currentCommunity.type == "channel" ? "text-lg font-bold pb-1 text-emerald-500 md:text-md" : "text-lg font-bold pb-1 text-cyan-500"}>
                        {currentCommunity.name}
                    </div>

                    <a href={`https://t.me/${currentCommunity.link.substring(1)}`}>
                        <div class={currentCommunity.type == "channel" ? "w-fit text-sm pb-6 text-cyan-500 font-semibold md:text-md" : "text-md pb-6 text-emerald-500 font-semibold"}>
                            {currentCommunity.link}
                        </div>
                    </a>

            <!-- {currentCommunity.description} -->
                    <div class="text-md text-zinc-200 line-clamp-none pb-5 flex flex-wrap md:text-md">
                        <!-- <p> {currentCommunity.description} </p> -->
                        {#if currentCommunity.description.includes("\n") == true}
                            {#each currentCommunity.description.split("\n") as letters}
                            <span class={currentCommunity.type == "channel" ? "hover:text-emerald-500" : "hover:text-cyan-500"}>
                                {letters}&nbsp;
                            </span>
                            {/each}
                        {:else}                            
                            {#each currentCommunity.description.split(" ") as letters}
                            <span class={currentCommunity.type == "channel" ? "hover:text-emerald-500" : "hover:text-cyan-500"}>
                                {letters}&nbsp;
                            </span>
                        {/each}
                    {/if}
                    </div>

                    {#if currentCommunity.owner != ""}
                        <a href={`https://t.me/${currentCommunity.owner?.substring(1)}`}>
                            <div class="text-md font-semibold">
                                Owner: <span class={currentCommunity.type == "channel" ? "text-cyan-500" : "text-emerald-500"}>{currentCommunity.owner}</span>
                            </div>
                        </a>
                    {/if}

                    <div class="flex flex-row flex-wrap pt-6">
                        {#each currentCommunity.tags as tag}
                        <div class="pr-2 pb-3">
                            <div class={currentCommunity.type == "channel" ? "rounded-full px-3 bg-emerald-500 w-fit text-sm text-black font-semibold" : "rounded-full px-3 bg-cyan-500 w-fit text-sm text-black font-semibold"}>
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
    <!-- <Footer /> -->

</div>
