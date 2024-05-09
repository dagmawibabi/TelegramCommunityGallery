<script lang="ts">

    import * as Select from "$lib/components/ui/select";
    import Socials from '../components/socials.svelte';
    import AddCommunity from '../components/addCommunity.svelte';
    import EachCommunity from '../components/eachCommunity.svelte';
	import Footer from '../components/footer.svelte';
	import axios from 'axios';
	import { currentCommunityStore, allCommunitiesStore, filteredTagsStore } from '../store/store';
	import Header from '../components/header.svelte';
	import { CircleX } from "lucide-svelte";

    import { TAGS } from "$lib/constants.js";
	import { onMount } from "svelte";

    export let data;

    type Community = {
        name: string,
        link: string,
        description: string,
        owner: string | null | undefined,
        tags: string[],
        type: string,
    };
    let communities: Community[] = []

    let allCommunities = <Community[]>[]
    allCommunitiesStore.subscribe((data) => {
        allCommunities = data;
    })

    allCommunitiesStore.set(communities)

    // async function getCommunities() {
    //     let results = await axios({
    //         method: 'get',
    //         url: `https://telegramcommunitygalleryapi.onrender.com/getCommunities`,
    //         withCredentials: false,
    //     })
    //     communities = results["data"]
    //     allCommunitiesStore.set(communities)
    // }
    // getCommunities()


    onMount(()=>{
        allCommunitiesStore.set(data.allCommunities)
    })

    let filterFeedTags = <string[]>[]
    filteredTagsStore.subscribe((data) => {
        filterFeedTags = data;
    })
    function filterFeed(tag: string) {
        if(filterFeedTags.indexOf(tag) == -1){
            filterFeedTags.push(tag)
        } else {
            const index = filterFeedTags.indexOf(tag);
            if (index > -1) { 
                filterFeedTags.splice(index, 1); 
            }
        }
        // filterFeedTags = filterFeedTags;
        filteredTagsStore.set(filterFeedTags)
    }

    function clearFilter() {
        filterFeedTags = []
        filteredTagsStore.set(filterFeedTags)
    }

    function allElementsInArray(arr1: string[], arr2: string[]) {
        return arr1.every(item => arr2.includes(item));
    }

    let isChannels:any = "all"

</script>

<svelte:head>
    <title> Telegram Community Gallery </title> 
</svelte:head>

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

                <!-- ADD NEW COMMUNITY -->
                <AddCommunity />

                <!-- FILTERS -->
                <div class="flex flex-row flex-wrap justify-center gap-1 overflow-scroll no-scrollbar pt-8">
                    {#each TAGS as tag}
                        <div class="pr-0 py-1
                            md:pr-2 md:py-1
                        ">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            {#if filterFeedTags.indexOf(tag) == -1}
                                <span on:click={(e) => filterFeed(tag)} 
                                    class="lowercase pb-1 bg-[#09090b] rounded-full border border-zinc-800 h-fit w-fit px-4 text-sm text-zinc-400 hover:bg-blue-500 hover:text-black line-clamp-1
                                        md:text-base md:px-3
                                    "> 
                                    {tag} 
                                </span>
                            {:else}
                                <span on:click={(e) => filterFeed(tag)} 
                                    class="lowercase pb-1 bg-blue-500 rounded-full border border-zinc-800 h-fit w-fit px-3 text-base text-black font-semibold  hover:text-black line-clamp-1"> 
                                    {tag} 
                                </span>
                            {/if}

                        </div>
                    {/each}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="flex items-center text-zinc-500 py-1 hover:text-white" on:click={(e) => clearFilter()}>
                        <CircleX size={17} />
                    </div>
                </div>

                <!-- GROUP OR CHANNEL FILTER -->
                <div class="pt-6 flex justify-end">
                    <Select.Root>
                        <Select.Trigger class="w-[150px] bg-[#09090b] border-zinc-800 pb-3 pl-4 rounded-full">
                            <Select.Value placeholder="All" />
                        </Select.Trigger>
                        <Select.Content class="bg-zinc-950 border-zinc-800 text-sm">
                            <Select.Item value="All" class="hover:bg-zinc-600 text-sm" on:click={(e) => {isChannels = "all"}}> All </Select.Item>
                            <Select.Item value="Channels" class="hover:bg-zinc-600 text-sm" on:click={(e) => {isChannels = true}}> Channels </Select.Item>
                            <Select.Item value="Groups" class="hover:bg-zinc-600 text-sm" on:click={(e) => {isChannels = false}}> Groups </Select.Item>
                        </Select.Content>
                    </Select.Root>
                </div>
            </div>

            <!-- COMMUNITIES -->
            {#if allCommunities.length > 0}
                <div class="grid grid-cols-1 gap-5 pt-14 pb-48 px-10
                    md:grid md:grid-cols-3 md:px-0
                ">
                    <!-- EACH COMMUNITY -->
                    {#each allCommunities as community}
                        {#if isChannels == "all"}
                            {#if filterFeedTags.length == 0}
                                <a href="/{community.link}" on:click={(e) => currentCommunityStore.set(community)} >
                                    <EachCommunity {community}/>
                                </a>                                                    
                            {:else if allElementsInArray(filterFeedTags, community.tags)}
                                <a href="/{community.link}" on:click={(e) => currentCommunityStore.set(community)} >
                                    <EachCommunity {community}/>
                                </a>                            
                            {/if}
                        {:else if isChannels == true}
                            {#if community.type == "channel"}
                                {#if filterFeedTags.length == 0}
                                <a href="/{community.link}" on:click={(e) => currentCommunityStore.set(community)} >
                                    <EachCommunity {community}/>
                                </a>                                                    
                                {:else if allElementsInArray(filterFeedTags, community.tags)}
                                <a href="/{community.link}" on:click={(e) => currentCommunityStore.set(community)} >
                                    <EachCommunity {community}/>
                                </a>                            
                                {/if}                
                            {/if}
                        {:else if isChannels == false}
                                {#if community.type == "group"}
                                    {#if filterFeedTags.length == 0}
                                    <a href="/{community.link}" on:click={(e) => currentCommunityStore.set(community)} >
                                        <EachCommunity {community}/>
                                    </a>                                                    
                                    {:else if allElementsInArray(filterFeedTags, community.tags)}
                                    <a href="/{community.link}" on:click={(e) => currentCommunityStore.set(community)} >
                                        <EachCommunity {community}/>
                                    </a>                            
                                    {/if}                
                                {/if}
                            {/if}
                        {/each}                    
                </div>
            {:else}
                <div class="pt-40 pb-60 text-center w-full">
                    <span class="text-md text-zinc-300"> Loading Communities... </span>
                </div>
            {/if}


            
        </div>
    </div>
    
    
    <!-- FOOTER -->
    <!-- <Footer /> -->
    
</div>



