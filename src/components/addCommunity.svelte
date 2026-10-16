<script lang="ts">
	import { Send } from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button/index.ts';
	import * as Dialog from '$lib/components/ui/dialog/index.ts';

	import RadioComponent from './radioComponent.svelte';
	// import axios from 'axios';

	import { TAGS } from '$lib/constants';
	import { page } from '$app/stores';
	import type { Community } from '$lib/types';

	$: supabase = $page.data.supabase;
	$: claims = $page.data.claims;

	// export let communities: Community[];
	let errors: string[] = [];
	// let foundDuplicateLink = false

	const options = [
		{
			value: 'channel',
			label: 'Channel'
		},
		{
			value: 'group',
			label: 'Group'
		}
	];

	let submitting = false;

	// export let getCommunities: Function;

	function replaceTelegramLink(str: string) {
		if (str.startsWith('t.me/')) {
			return str.replace('t.me/', '@');
		}
		if (str.startsWith('https://t.me/')) {
			return str.replace('https://t.me/', '@');
		}
		return str;
	}

	let name = '';
	let link = '';
	let owner: string | null | undefined = '';

	$: if (name) name = replaceTelegramLink(name!);
	$: if (link) link = replaceTelegramLink(link!);
	$: if (owner) owner = replaceTelegramLink(owner!);

	let description = '';
	let selectedTags: string[] = [];
	let type = '';
	let imageFile: FileList | undefined;

	function addRemoveTag(tag: string) {
		if (selectedTags.indexOf(tag) == -1) {
			selectedTags.push(tag);
		} else {
			const index = selectedTags.indexOf(tag);
			if (index > -1) {
				selectedTags.splice(index, 1);
			}
		}
		selectedTags = selectedTags;
	}

	async function uploadImage(): Promise<string | null> {
		const file = imageFile?.[0];
		if (!file || !claims?.sub || !supabase) return null;

		const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
		const path = `${claims.sub}/${crypto.randomUUID()}.${ext}`;
		const { error } = await supabase.storage.from('community-images').upload(path, file, {
			cacheControl: '3600',
			upsert: false
		});

		if (error) {
			throw error;
		}

		const { data } = supabase.storage.from('community-images').getPublicUrl(path);
		return data.publicUrl;
	}

	async function submitCommunity() {
		errors = [];
		submitting = true;

		if (!claims) {
			errors = ['Please sign in to submit a community'];
			submitting = false;
			return;
		}

		if (!name || !link || !description || !type) {
			errors = ['Please fill in name, link, description, and type'];
			submitting = false;
			return;
		}

		try {
			const image_url = await uploadImage();
			const newCommunity: Community = {
				name,
				link: link.toString().toLowerCase(),
				description,
				owner,
				tags: selectedTags.length > 0 ? selectedTags : ['untagged'],
				type,
				image_url
			};

			const results = await fetch('/api/create-community', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newCommunity)
			});
			const re = await results.json();

			if (!results.ok || re.error) {
				errors = [re.body || 'Error creating community'];
			} else {
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
			errors = ['Error uploading image or creating community'];
		}

		selectedTags = [];
		submitting = false;
	}
</script>

<div class="text-center pt-3">
	<Dialog.Root>
		<!-- TRIGGER -->
		<Dialog.Trigger>
			<div
				class="flex align-middle items-center rounded-full border border-zinc-700 w-fit py-1 px-4 text-center font-semibold mx-auto hover:bg-blue-500 hover:text-black"
			>
				<Send size={16} />
				<p
					class="pl-2 text-sm pb-1
                md:text-md
            "
				>
					Submit Your Channel / Group
				</p>
			</div>
		</Dialog.Trigger>

		<Dialog.Content
			class="h-[400px] md:h-3/4 overflow-scroll no-scrollbar w-[350px] sm:max-w-[425px] bg-zinc-900 border-zinc-800 rounded-xl "
		>
			<!-- HEADER -->
			<Dialog.Header class="text-left">
				<Dialog.Title class="text-md font-semibold">Add Channel / Group</Dialog.Title>
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
					bind:value={name}
					required
				/>
				<label for="communityLink" class="pt-3 pb-3 text-sm font-semibold"> Community Link </label>
				<!-- Check duplicate - api route -->
				<input
					id="communityLink"
					class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm"
					placeholder="eg: @Durov or @+OZ9Ul_rSBAQ0MjNk "
					autocomplete="off"
					bind:value={link}
					required
				/>
				<div class="pl-4 pt-1">
					<ul>
						{#each errors as error}
							<li class="text-red-500 text-sm list-disc">{error}</li>
						{/each}
					</ul>
				</div>
				<label for="communityDescription" class="pt-3 pb-3 text-sm font-semibold">
					Community Description
				</label>
				<textarea
					id="communityDescription"
					class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm"
					placeholder="eg: Announcement channel of Telegram's CEO "
					rows="4"
					maxlength="1000"
					bind:value={description}
					required
				/>
				<label for="communityOwner" class="pt-3 pb-3 text-sm font-semibold">
					Community Owner <span class="font-normal text-zinc-500"> [Optional] </span>
				</label>
				<input
					id="communityOwner"
					class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm"
					placeholder="eg: @PavelDurov"
					autocomplete="off"
					bind:value={owner}
				/>
				<label for="communityImage" class="pt-3 pb-3 text-sm font-semibold">
					Community Image <span class="font-normal text-zinc-500"> [Optional] </span>
				</label>
				<input
					id="communityImage"
					class="bg-zinc-800 rounded-xl p-1 pb-2 px-3 outline-none text-sm file:mr-3 file:rounded-full file:border-0 file:bg-zinc-700 file:px-3 file:py-1 file:text-xs file:text-zinc-200"
					type="file"
					accept="image/*"
					bind:files={imageFile}
				/>
				{#if !claims}
					<p class="pt-3 text-sm text-amber-400">Sign in to submit a community and upload an image.</p>
				{/if}
				<label for="communityTypes" class="pt-3 pb-2 text-sm font-semibold"> Community Type </label>
				<div class="flex" id="communityTypes">
					<RadioComponent {options} fontSize={16} legend="" bind:userSelected={type} />
				</div>

				<div class="pt-6 pb-3 text-sm">
					<span class="text-sm font-semibold"> Community Tags </span>
					<div class="flex flex-row flex-wrap w-full pt-4">
						{#each TAGS as tag}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div class="p-1 lowercase cursor-pointer">
								{#if type == 'channel'}
									{#if !selectedTags.includes(tag)}
										<span
											on:click={(e) => addRemoveTag(tag)}
											class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap hover:bg-emerald-400 hover:text-black overflow-scroll no-scrollbar"
										>
											{tag}
										</span>
									{:else}
										<span
											on:click={(e) => addRemoveTag(tag)}
											class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap bg-emerald-400 text-black overflow-scroll no-scrollbar"
										>
											{tag}
										</span>
									{/if}
								{:else if !selectedTags.includes(tag)}
									<span
										on:click={(e) => addRemoveTag(tag)}
										class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap hover:bg-cyan-400 hover:text-black overflow-scroll no-scrollbar"
									>
										{tag}
									</span>
								{:else}
									<span
										on:click={(e) => addRemoveTag(tag)}
										class="rounded-full border border-zinc-700 w-fit pb-1 px-3 line-clamp-1 whitespace-nowrap bg-cyan-400 text-black overflow-scroll no-scrollbar"
									>
										{tag}
									</span>
								{/if}
							</div>
						{/each}
					</div>
				</div>
				<Button
					on:click={submitCommunity}
					disabled={submitting || !claims}
					class={`${type == 'channel' ? ' hover:bg-emerald-400' : 'hover:bg-cyan-400'} rounded-full px-2 py-0 bg-white text-black text-sm font-semibold`}
				>
					Save Changes
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>
