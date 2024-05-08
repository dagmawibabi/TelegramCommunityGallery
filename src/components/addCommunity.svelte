<script lang="ts">
    import { Send } from 'lucide-svelte';

    import {Button} from "$lib/components/ui/button/index.ts";
    import * as Dialog from "$lib/components/ui/dialog/index.ts";

    import RadioComponent from './radioComponent.svelte';
	import axios from 'axios';
	let radioValue: any;
	
	const options = [
        {
		    value: 'channel',
		    label: 'Channel',
	    }, 
        {
		    value: 'group',
		    label: 'Group',
	    },
    ]

    let selectedTags: String[] = []
    function addRemoveTag(tag: String){
        if(selectedTags.indexOf(tag) == -1){
            selectedTags.push(tag)
        } else {
            const index = selectedTags.indexOf(tag);
            if (index > -1) { 
                selectedTags.splice(index, 1); 
            }
        }
        selectedTags = selectedTags
    }

    export let getCommunities: Function;

    async function submitCommunity() {
        let communityNameInput = document.getElementById("communityName") as HTMLInputElement;
        let communityLinkInput = document.getElementById("communityLink") as HTMLInputElement;
        let communityDescriptionInput = document.getElementById("communityDescription") as HTMLInputElement;
        let communityOwnerInput = document.getElementById("communityOwner") as HTMLInputElement;
        let newCommunity: Community = {
            name: communityNameInput.value,
            link: communityLinkInput.value,
            description: communityDescriptionInput.value,
            owner: communityOwnerInput.value,
            tags: selectedTags.length > 0 ? selectedTags : ["untagged"],
            type: radioValue
        }
        // SEND REQUIEST
        let results = await axios({
            method: 'post',
            url: `https://telegramcommunitygalleryapi.onrender.com/submitCommunity`,
            withCredentials: false,
            data: newCommunity
        })
        communities = results["data"]
        selectedTags = []
        getCommunities()
    }


    export let communities: Community[];
    let foundDuplicateLink = false
    interface Community {
        name: String,
        link: String,
        description: String,
        owner: String | null | undefined,
        tags: String[],
        type: String,
    };
    function changeDuplicates(e: any) {
        communities.forEach((value, index) => {
            if(value.link.toLowerCase() == e.target.value.toLowerCase()){
                foundDuplicateLink = true;
            } else {
                foundDuplicateLink = false;
            }
        })
    }

    let tags = [
    "Spiritual",
    "Tech",
    "News",
    "Coding",
    "Books",
    "Company",
    "School",
    "Food",
    "Pets",
    "Music",
    "Crafts",
    "Travel",
    "Science",
    "Fitness",
    "NSFW",
    "Education",
    "Photography",
    "Humor",
    "Politics",
    "Nature",
    "Literature",
    "e-Commerce",
    "Film / TV",
    "Fashion / Beauty",
    "Art / Design",
    "Games / Apps",
    ];

</script>

<div class="text-center pt-3">

<Dialog.Root>
    <!-- TRIGGER -->
    <Dialog.Trigger>
        <div 
            class="flex align-middle items-center rounded-full border border-zinc-700 w-fit py-1 px-4 text-center font-semibold mx-auto hover:bg-blue-500 hover:text-black"> 
            <Send size={16}/>
            <p class="pl-2 text-sm pb-1
                md:text-md
            ">
                Submit Your Channel / Group
            </p>
        </div>    
    </Dialog.Trigger>

    <Dialog.Content class="h-[400px] md:h-3/4 overflow-scroll no-scrollbar w-[350px] sm:max-w-[425px] bg-zinc-900 border-zinc-800 rounded-xl ">
        <!-- HEADER -->
        <Dialog.Header class="text-left">
            <Dialog.Title class="text-md font-semibold"> Add Channel / Group </Dialog.Title>
            <Dialog.Description class="text-zinc-300 text-sm">
                Add your community and click save when you're done!
            </Dialog.Description>
        </Dialog.Header>
        
        <!-- FORM -->
        <div class="flex flex-col pt-0">
            <label for="communityName" class="pb-3 text-sm font-semibold"> Community Name </label>
            <input 
                id="communityName"
                class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm"
                placeholder="eg: Pavel Durov"
                autocomplete="off"
                required
            />
            <label for="communityLink" class="pt-3 pb-3 text-sm font-semibold"> Community Link </label>
            <input 
                id="communityLink"
                class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm"
                placeholder="eg: @Durov"
                autocomplete="off"
                on:input={(e) => changeDuplicates(e)}
                required
            />
            {#if foundDuplicateLink == true}
                <span class="text-red-500 text-sm pt-2 pl-2"> Username is duplicate! </span>
            {/if}
            <label for="communityDescription" class="pt-3 pb-3 text-sm font-semibold"> Community Description </label>
            <textarea 
                id="communityDescription"
                class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm"
                placeholder="eg: Announcement channel of Telegram's CEO "
                rows="4"
                maxlength="1000"
                required
            />
            <label for="communityOwner" class="pt-3 pb-3 text-sm font-semibold"> Community Owner <span class="font-normal text-zinc-500"> [Optional]  </span> </label>
            <input 
                id="communityOwner"
                class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm"
                placeholder="eg: @PavelDurov"
                autocomplete="off"
            />
            <label for="communityTypes" class="pt-3 pb-2 text-sm font-semibold"> Community Type </label>
            <div class="flex" id="communityTypes">
                <RadioComponent {options} fontSize={16} legend='' bind:userSelected={radioValue}/>
            </div>

            <div class="pt-6 pb-3 text-sm">
                <span class="text-sm font-semibold"> Community Tags </span>
                <div class="flex flex-row flex-wrap w-full pt-4">
                    {#each tags as tag}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="p-1 lowercase">
                            {#if radioValue == "channel"}
                                {#if selectedTags.indexOf(tag) == -1}
                                    <span on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap hover:bg-emerald-400 hover:text-black overflow-scroll no-scrollbar"> {tag} </span>
                                {:else}
                                    <span on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap bg-emerald-400 text-black overflow-scroll no-scrollbar"> {tag} </span>
                                {/if}
                            {:else}
                                {#if selectedTags.indexOf(tag) == -1}
                                    <span  on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap hover:bg-cyan-400 hover:text-black overflow-scroll no-scrollbar"> {tag} </span>
                                {:else}
                                    <span  on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap bg-cyan-400 text-black overflow-scroll no-scrollbar"> {tag} </span>
                                {/if}
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

        </div>

        <!-- FOOTER -->
        <Dialog.Footer>
            <Dialog.Close>
                <div class={radioValue == "channel" ? "rounded-full px-2 py-0 bg-white text-black hover:bg-emerald-400" : "rounded-full px-2 py-0 bg-white text-black hover:bg-cyan-400"}>
                    <Button on:click={(e) => submitCommunity()} disabled={foundDuplicateLink} class="text-sm font-semibold"> Save Changes </Button>
                </div>
            </Dialog.Close>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
</div>
