import { writable } from 'svelte/store';
import type { Community } from '$lib/types';

export const currentCommunityStore = writable(<Community>{});
export const allCommunitiesStore = writable(<Community[]>[]);
export const filteredTagsStore = writable(<string[]>[]);
export const visitorCountStore = writable(0);


