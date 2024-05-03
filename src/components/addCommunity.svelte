<script lang="ts">
    import { Send } from 'lucide-svelte';

    import {Button} from "$lib/components/ui/button/index.ts";
    import * as Dialog from "$lib/components/ui/dialog/index.ts";

    import RadioComponent from './radioComponent.svelte';
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
        console.log(selectedTags)
    }

    function submitCommunity() {
        let communityNameInput = document.getElementById("communityName") as HTMLInputElement;
        let communityLinkInput = document.getElementById("communityLink") as HTMLInputElement;
        let communityDescriptionInput = document.getElementById("communityDescription") as HTMLInputElement;
        let communityOwnerInput = document.getElementById("communityOwner") as HTMLInputElement;
        let newCommunity: Community = {
            name: communityNameInput.value,
            link: communityLinkInput.value,
            description: communityDescriptionInput.value,
            owner: communityOwnerInput.value,
            tags: selectedTags,
            type: radioValue
        }
        if (newCommunity.name.length > 1 && newCommunity.link.length > 1 && newCommunity.description.length > 1 && newCommunity.tags.length > 1){
            // SEND REQUIEST
        }
        console.log(newCommunity);
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
    "Fashion",
    "Food",
    "Pets",
    "Music",
    "Crafts",
    "Travel",
    "Science",
    "Fitness",
    "Education",
    "Photography",
    "Humor",
    "Politics",
    "Nature",
    "Literature",
    "NSFW",
    "e-Commerce",
    "Film / TV",
    "Fashion / Beauty",
    "Art / Design",
    "Games / Apps",
  ];

</script>

<Dialog.Root>
    <!-- TRIGGER -->
    <Dialog.Trigger>
        <div 
            class="flex align-middle items-center rounded-full border border-zinc-700 w-fit py-2 px-6 text-center font-semibold mx-auto hover:bg-blue-500 hover:text-black"> 
            <Send size={16} />
            <p class="pl-3 text-xl">
                Submit Your Channel / Group
            </p>
        </div>    
    </Dialog.Trigger>

    <Dialog.Content class="sm:max-w-[425px]  bg-zinc-900 border-zinc-800 rounded-xl ">
        <!-- HEADER -->
        <Dialog.Header>
            <Dialog.Title class="text-2xl font-semibold"> Add Channel / Group </Dialog.Title>
            <Dialog.Description class="text-zinc-300 text-lg">
                Add your community and click save when you're done!
            </Dialog.Description>
        </Dialog.Header>
        
        <!-- FORM -->
        <div class="flex flex-col">
            <label for="communityName" class="pt-3 pb-3 text-lg font-semibold"> Community Name </label>
            <input 
                id="communityName"
                class="bg-zinc-800 rounded-xl p-2 px-4 outline-none"
                placeholder="eg: Pavel Durov"
                autocomplete="off"
                required
            />
            <label for="communityLink" class="pt-5 pb-3 text-lg font-semibold"> Community Link </label>
            <input 
                id="communityLink"
                class="bg-zinc-800 rounded-xl p-2 px-4 outline-none"
                placeholder="eg: @Durov"
                autocomplete="off"
                on:input={(e) => changeDuplicates(e)}
                required
            />
            {#if foundDuplicateLink == true}
                <span class="text-red-500 text-lg pt-2 pl-2"> Username is duplicate! </span>
            {/if}
            <label for="communityDescription" class="pt-5 pb-3 text-lg font-semibold"> Community Description </label>
            <textarea 
                id="communityDescription"
                class="bg-zinc-800 rounded-xl p-2 px-4 outline-none"
                placeholder="eg: Announcement channel of Telegram's CEO "
                rows="4"
                maxlength="1000"
                required
            />
            <label for="communityOwner" class="pt-5 pb-3 text-lg font-semibold"> Community Owner <span class="text-zinc-500">[Optional]</span> </label>
            <input 
                id="communityOwner"
                class="bg-zinc-800 rounded-xl p-2 px-4 outline-none"
                placeholder="eg: @PavelDurov"
                autocomplete="off"
            />
            <label for="communityTypes" class="pt-5 pb-3 text-lg font-semibold"> Community Type </label>
            <div class="flex" id="communityTypes">
                <RadioComponent {options} fontSize={16} legend='' bind:userSelected={radioValue}/>
            </div>

            <div class="pt-6 pb-3 text-lg">
                <span class="text-lg font-semibold"> Community Tags </span>
                <div class="flex flex-row flex-wrap w-full pt-4">
                    {#each tags as tag}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="p-2">
                            {#if radioValue == "channel"}
                                {#if selectedTags.indexOf(tag) == -1}
                                    <span on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit py-1 px-4 hover:bg-emerald-400 hover:text-black"> {tag} </span>
                                {:else}
                                    <span on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit py-1 px-4 bg-emerald-400 text-black"> {tag} </span>
                                {/if}
                            {:else}
                                {#if selectedTags.indexOf(tag) == -1}
                                    <span  on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit py-1 px-4 hover:bg-cyan-400 hover:text-black"> {tag} </span>
                                {:else}
                                    <span  on:click={(e) => addRemoveTag(tag)} class="rounded-full border border-zinc-700 w-fit py-1 px-4 bg-cyan-400 text-black"> {tag} </span>
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
                <div class={radioValue == "channel" ? "rounded-full px-2 py-1 bg-white text-black hover:bg-emerald-400" : "rounded-full px-2 py-1 bg-white text-black hover:bg-cyan-400"}>
                    <Button on:click={(e) => submitCommunity()} disabled={foundDuplicateLink} class="text-xl"> Save Changes </Button>
                </div>
            </Dialog.Close>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
