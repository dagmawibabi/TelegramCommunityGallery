<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import Socials from '../components/socials.svelte';
	import SignIn from '../components/signInButton.svelte';
	import AddCommunity from '../components/addCommunity.svelte';
	import EachCommunity from '../components/eachCommunity.svelte';
	import Footer from '../components/footer.svelte';
	import axios from 'axios';
	import { currentCommunityStore, allCommunitiesStore, filteredTagsStore } from '../store/store';
	import Header from '../components/header.svelte';
	import { CircleX, Search } from 'lucide-svelte';

	import { TAGS } from '$lib/constants.js';
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';

	export let data;

	type Community = {
		name: string;
		link: string;
		description: string;
		owner: string | null | undefined;
		tags: string[];
		type: string;
	};
	let communities: Community[] = [];

	let allCommunities = <Community[]>[];
	allCommunitiesStore.subscribe((data) => {
		allCommunities = data;
	});

	allCommunitiesStore.set(communities);

	onMount(() => {
		allCommunitiesStore.set(data.allCommunities);
	});

	let filterFeedTags = <string[]>[];
	filteredTagsStore.subscribe((data) => {
		filterFeedTags = data;
	});

	function filterFeed(tag: string) {
		if (filterFeedTags.indexOf(tag) == -1) {
			filterFeedTags.push(tag);
		} else {
			const index = filterFeedTags.indexOf(tag);
			if (index > -1) {
				filterFeedTags.splice(index, 1);
			}
		}
		filteredTagsStore.set(filterFeedTags);
	}

	function clearFilter() {
		filterFeedTags = [];
		filteredTagsStore.set(filterFeedTags);
	}

	function allElementsInArray(arr1: string[], arr2: string[]) {
		const lowerArr1 = arr1.map((item) => item.toLowerCase());
		const lowerArr2 = arr2.map((item) => item.toLowerCase());
		return lowerArr1.every((item) => lowerArr2.includes(item));
	}

	// Define isChannels as a writable store
	const isChannels = writable('all');
	const searchTerm = writable('');

	// Define the derived store
	const filteredCommunities = derived(
		[allCommunitiesStore, filteredTagsStore, searchTerm, isChannels],
		([$allCommunities, $filteredTags, $searchTerm, $isChannels]) => {
			return $allCommunities.filter((community) => {
				const matchesTags =
					$filteredTags.length === 0 || allElementsInArray($filteredTags, community.tags);
				const matchesType = $isChannels === community.type || $isChannels === 'all';
				const matchesSearch =
					$searchTerm === '' ||
					community.name.toLowerCase().includes($searchTerm.toLowerCase()) ||
					community.description.toLowerCase().includes($searchTerm.toLowerCase());

				return matchesTags && matchesType && matchesSearch;
			});
		}
	);
</script>

<svelte:head>
	<title>Telegram Community Gallery</title>
</svelte:head>

<div class="relative h-screen w-screen">
	<div
		class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
	></div>
	<div
		class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#63e_100%)]"
	></div>

	<div
		class="absolute bottom-0 left-0 right-0 top-0 z-50 w-full h-screen overflow-scroll no-scrollbar"
	>
		<div
			class="w-full m-auto
          md:w-1/2 md:px-0
      "
		>
			<div
				class="px-5
            md:px-0
        "
			>
				<div class="flex justify-between items-center">
					<div>
						<SignIn />
					</div>

					<div>
						<Socials />
					</div>
				</div>

				<Header />

				<AddCommunity />

				<div class="relative mt-6">
					<Search class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
					<input
						type="text"
						class="w-full bg-[#09090b] rounded-full border border-zinc-800 py-2 pl-10 pr-4 text-zinc-400 focus:outline-none focus:border-blue-500"
						placeholder="Search communities..."
						bind:value={$searchTerm}
					/>
				</div>

				<div class="flex flex-row flex-wrap justify-center gap-1 overflow-scroll no-scrollbar pt-8">
					{#each TAGS as tag}
						<div
							class="pr-0 py-1 cursor-pointer
                  md:pr-2 md:py-1
              "
						>
							{#if filterFeedTags.indexOf(tag) == -1}
								<span
									on:click={(e) => filterFeed(tag)}
									class="lowercase pb-1 bg-[#09090b] rounded-full border border-zinc-800 h-fit w-fit px-4 text-sm text-zinc-400 hover:bg-blue-500 cursor-pointer hover:text-black line-clamp-1
                        md:text-base md:px-3
                    "
								>
									{tag}
								</span>
							{:else}
								<span
									on:click={(e) => filterFeed(tag)}
									class="lowercase pb-1 bg-blue-500 rounded-full border border-zinc-800 h-fit w-fit px-3 text-base text-black font-semibold cursor-pointer hover:text-black line-clamp-1"
								>
									{tag}
								</span>
							{/if}
						</div>
					{/each}
					<div
						class="flex items-center text-zinc-500 py-1 hover:text-white"
						on:click={(e) => clearFilter()}
					>
						<CircleX size={17} />
					</div>
				</div>

				<div class="pt-6 flex justify-end">
					<Select.Root>
						<Select.Trigger class="w-[150px] bg-[#09090b] border-zinc-800 pb-3 pl-4 rounded-full">
							<Select.Value placeholder="All" />
						</Select.Trigger>
						<Select.Content class="bg-zinc-950 border-zinc-800 text-sm">
							<Select.Item
								value="All"
								class="hover:bg-zinc-600 text-sm"
								on:click={(e) => {
									isChannels.set('all');
								}}
							>
								All
							</Select.Item>
							<Select.Item
								value="Channels"
								class="hover:bg-zinc-600 text-sm"
								on:click={(e) => {
									isChannels.set('channel');
								}}
							>
								Channels
							</Select.Item>
							<Select.Item
								value="Groups"
								class="hover:bg-zinc-600 text-sm"
								on:click={(e) => {
									isChannels.set('group');
								}}
							>
								Groups
							</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			{#if $allCommunitiesStore.length > 0}
				{#if $filteredCommunities.length > 0}
					<div
						class="grid grid-cols-1 gap-5 pt-14 pb-48 px-10
              md:grid md:grid-cols-3 md:px-0
          "
					>
						{#each $filteredCommunities as community}
							<a href="/{community.link}" on:click={(e) => currentCommunityStore.set(community)}>
								<EachCommunity {community} />
							</a>
						{/each}
					</div>
				{:else}
					<div class="pt-40 pb-60 text-center w-full">
						<span class="text-md text-zinc-300">
							No communities found matching your criteria.
						</span>
					</div>
				{/if}
			{:else}
				<div class="pt-40 pb-60 text-center w-full">
					<span class="text-md text-zinc-300"> Loading Communities... </span>
				</div>
			{/if}
		</div>
	</div>
</div>
