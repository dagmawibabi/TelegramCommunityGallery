<script lang="ts">
	import { Github, Send } from 'lucide-svelte';
	import { allCommunitiesStore } from '../store/store';

	type Community = {
		name: string;
		link: string;
		description: string;
		owner: string | null | undefined;
		tags: string[];
		type: string;
	};

	let allCommunities = <Community[]>[];
	const year = new Date().getFullYear();

	allCommunitiesStore.subscribe((data) => {
		allCommunities = data;
	});
</script>

<footer class="px-5 pb-10 pt-6 md:px-0">
	<div
		class="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-black/40 px-5 py-5 backdrop-blur md:flex-row md:items-center md:justify-between"
	>
		<div>
			<p class="text-sm font-semibold text-zinc-100">Telegram Community Gallery</p>
			<p class="pt-1 text-sm text-zinc-400">
				Open directory for discovering Telegram channels and groups.
			</p>
		</div>

		<div class="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
			<span>{allCommunities.length} listed</span>
			<a
				href="https://github.com/dagmawibabi/TelegramCommunityGallery"
				class="inline-flex items-center gap-2 transition hover:text-blue-400"
			>
				<Github size={16} />
				GitHub
			</a>
			<a
				href="https://t.me/Dagmawi_Babi"
				class="inline-flex items-center gap-2 transition hover:text-cyan-400"
			>
				<Send size={16} />
				Telegram
			</a>
			<span class="text-zinc-500">{year}</span>
		</div>
	</div>
</footer>
