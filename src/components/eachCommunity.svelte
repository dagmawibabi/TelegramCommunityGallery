<script lang="ts">
	export let community;

	import { Rss, Users } from 'lucide-svelte';
</script>

<div
	class={community.type == 'channel'
		? 'group relative flex h-full flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900 hover:border-emerald-400 hover:scale-105 duration-300'
		: 'group relative flex h-full flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900 hover:border-cyan-400 hover:scale-105 duration-300'}
>
	{#if community.type == 'channel'}
		<div
			class="absolute -left-3 -top-3 z-10 rounded-full border border-emerald-900 bg-emerald-500 p-2 text-black"
		>
			<Rss size={14} />
		</div>
	{:else}
		<div class="absolute -left-3 -top-3 z-10 rounded-full bg-cyan-500 p-2">
			<Users size={14} class="text-black" />
		</div>
	{/if}

	<div>
		{#if community.image_url}
			<div class="aspect-square overflow-hidden rounded-t-xl bg-zinc-950">
				<img
					src={community.image_url}
					alt={community.name}
					class="h-full w-full object-contain object-center"
				/>
			</div>
		{/if}

		<div class="px-5 pt-4">
			{#if community.type == 'channel'}
				<p
					class="line-clamp-1 w-60 overflow-scroll text-lg font-semibold leading-relaxed no-scrollbar group-hover:text-emerald-500"
				>
					{community.name}
				</p>
			{:else}
				<p
					class="line-clamp-1 w-60 overflow-scroll text-lg font-semibold leading-relaxed no-scrollbar group-hover:text-cyan-500"
				>
					{community.name}
				</p>
			{/if}

			<p
				class="line-clamp-3 overflow-scroll py-2 pb-1 text-sm leading-relaxed text-zinc-400 no-scrollbar group-hover:text-white"
			>
				{community.description}
			</p>
		</div>
	</div>

	<div class="flex px-5 pb-4 pt-4 pr-40 line-clamp-1 overflow-scroll no-scrollbar">
		{#if community.tags.length > 0}
			{#each community.tags.slice(0, 3) as tag}
				<div class="pr-1">
					{#if community.type == 'channel'}
						<div
							class="line-clamp-1 whitespace-nowrap rounded-full border border-zinc-700 px-3 pb-1 text-sm hover:bg-emerald-500 hover:text-black"
						>
							{tag}
						</div>
					{:else}
						<div
							class="line-clamp-1 whitespace-nowrap rounded-full border border-zinc-700 px-3 pb-1 text-sm hover:bg-cyan-500 hover:text-black"
						>
							{tag}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>
