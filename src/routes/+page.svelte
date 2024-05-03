<script>
    import { Github, Rss, Send, Users } from 'lucide-svelte';

    import {Button} from "$lib/components/ui/button/index.ts";
    import * as Dialog from "$lib/components/ui/dialog/index.ts";
    import { Label } from "$lib/components/ui/label/index.ts";

    let communities = [
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
    ]

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
            <div class="flex justify-end pt-8 text-zinc-500">
                <div class="flex ">
                    <a href="https://github.com/dagmawibabi/TelegramCommunityGallery" class="hover:text-cyan-500">
                        <Github size={20} />
                    </a>
                    <div class="w-4"></div>
                    <a href="https://t.me/Dagmawi_Babi" class="hover:text-cyan-500">
                        <Send size={20}/>
                    </a>
                </div>
            </div>
            <!-- HEADER -->
            <div class="text-center">
                <p class="text-5xl font-bold pt-10 leading-snug"> Discover the Best <br/> Telegram Communities </p>
                <div class="pt-5 pb-10">
                    <p class="text-lg text-zinc-400"> Below are some of the most incredible channels and groups submitted by the public. <br /> This project was made with 🤍 by <a href="https://www.dagmawibabi.com" class="text-purple-400 hover:text-cyan-500 hover:underline underline-offset-4"> Dagmawi Babi </a> and it's completely opensource. </p>
                </div>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <div 
                            class="flex align-middle items-center rounded-full border border-zinc-700 w-fit py-2 px-6 text-center font-semibold mx-auto hover:bg-blue-500 hover:text-black"> 
                            <Send size={16} />
                            <p class="pl-3 text-xl">
                                Submit Your Channel / Group
                            </p>
                        </div>    
                    </Dialog.Trigger>

                    <Dialog.Content class="sm:max-w-[425px] bg-zinc-900 border-zinc-800 rounded-xl ">

                      <Dialog.Header>
                        <Dialog.Title> Add Channel / Group </Dialog.Title>
                        <Dialog.Description>
                          Make changes to your profile here. Click save when you're done.
                        </Dialog.Description>
                      </Dialog.Header>

                      <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right"> Name </Label>
                            <input 
                                id="name" 
                                placeholder="eg: Dagmawi Babi"
                                class="px-4 py-2 pb-2 col-span-3 border-none bg-zinc-950 rounded-xl placeholder-zinc-400" 
                            />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right"> Username </Label>
                            <input 
                                id="name" 
                                placeholder="eg: Dagmawi Babi"
                                class="px-4 py-2 pb-2 col-span-3 border-none bg-zinc-950 rounded-xl placeholder-zinc-400" 
                            />
                        </div>
                      </div>

                      <Dialog.Footer>
                        <Button type="submit">Save changes</Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Root>
                
            </div>

            <!-- COMMUNITIES -->
            <div class="grid grid-cols-3 gap-8 pt-28 pb-48">
                <!-- EACH COMMUNITY -->
                {#each communities as community}
                    <div class={
                        community.type == "channel" ? 
                            "group py-4 px-5 rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col justify-between hover:border-emerald-400 hover:scale-105 duration-300" 
                            : "group py-4 px-5 rounded-xl border border-zinc-800 bg-zinc-900 flex flex-col justify-between hover:border-cyan-400 hover:scale-105 duration-300"}>
                        <div>
                            <div class="flex justify-between">
                                <!-- NAME -->
                                {#if community.type == "channel"}
                                    <p class="text-2xl pb-2 w-60 leading-relaxed line-clamp-2 group-hover:text-emerald-500 font-semibold"> {community.name} </p>
                                {:else}                                
                                    <p class="text-2xl pb-2 w-60 leading-relaxed line-clamp-2 group-hover:text-cyan-500 font-semibold"> {community.name} </p>
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
                            <p class="text-xl text-zinc-400 leading-relaxed line-clamp-3 py-2 group-hover:text-white"> {community.description} </p>
                        </div>

                        <div class="flex pt-5 pb-1 ">
                            {#each community.tags as tag}
                                <div class="pr-3">
                                    {#if community.type == "channel"}
                                        <div class="rounded-full border border-zinc-700 pb-1 px-5 font-semibold hover:bg-emerald-500 hover:text-black"> {tag} </div>
                                    {:else}
                                        <div class="rounded-full border border-zinc-700 pb-1 px-5 font-semibold hover:bg-cyan-500 hover:text-black"> {tag} </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                        
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>



