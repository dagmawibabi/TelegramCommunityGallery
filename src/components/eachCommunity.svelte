<script lang="ts">
    export let community;

    import { Rss, Users } from 'lucide-svelte';

</script>


<div class={
    community.type == "channel" ? 
        "group py-4 px-5 h-full rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col justify-between hover:border-emerald-400 hover:scale-105 duration-300" 
        : "group py-4 px-5 h-full rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col justify-between hover:border-cyan-400 hover:scale-105 duration-300"}>
    <div>
        <div class="flex justify-between">
            <!-- NAME -->
            {#if community.type == "channel"}
                <p class="text-lg w-60 leading-relaxed line-clamp-1 overflow-scroll no-scrollbar group-hover:text-emerald-500 font-semibold"> {community.name} </p>
            {:else}                                
                <p class="text-lg w-60 leading-relaxed line-clamp-1 overflow-scroll no-scrollbar group-hover:text-cyan-500 font-semibold"> {community.name} </p>
            {/if}

            <!-- CHANNEL OR GROUP -->
            {#if community.type == "channel"}
                <div class="rounded-full border border-emerald-900 bg-emerald-500 text-black p-2 absolute -m-8">
                    <Rss size={14}/>
                </div>
            {:else}                                
                <div class="rounded-full bg-cyan-500 p-2 absolute -m-8">
                    <Users size={14} class="text-black"/>
                    <!-- <Users size={18} class="text-cyan-500"/> -->
                </div>
            {/if}
        </div>

        <!-- DESCRIPTION -->
        <p class="pb-1 text-sm text-zinc-400 leading-relaxed line-clamp-3 overflow-scroll no-scrollbar py-2 group-hover:text-white"> {community.description} </p>
    </div>

    <div class="flex pt-4 pb-0 pr-40 line-clamp-1 overflow-scroll no-scrollbar">
        {#if community.tags.length > 0}            
            {#each community.tags.slice(0,3) as tag}
                <div class="pr-1">
                    {#if community.type == "channel"}
                        <div class="rounded-full border border-zinc-700 pb-1 px-3 text-sm line-clamp-1 whitespace-nowrap hover:bg-emerald-500 hover:text-black"> {tag} </div>
                    {:else}
                        <div class="rounded-full border border-zinc-700 pb-1 px-3 text-sm line-clamp-1 whitespace-nowrap hover:bg-cyan-500 hover:text-black"> {tag} </div>
                    {/if}
                </div>
            {/each}
        {/if}
    </div>
    
</div>