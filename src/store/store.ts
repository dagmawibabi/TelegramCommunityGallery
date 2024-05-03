import { writable } from 'svelte/store';

type Community = {
    name: string,
    link: string,
    description: string,
    owner: string | null | undefined,
    tags: string[],
    type: string,
};

export const currentCommunityStore = writable(<Community>{});
export const allCommunitiesStore = writable(<Community[]>[]);
export const filteredTagsStore = writable(<string[]>[]);
export const visitorCountStore = writable(0);


