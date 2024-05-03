<script lang="ts">

    import Socials from '../components/socials.svelte';
    import AddCommunity from '../components/addCommunity.svelte';
    import EachCommunity from '../components/eachCommunity.svelte';
	import Footer from '../components/footer.svelte';

    interface Community {
        name: String,
        link: String,
        description: String,
        owner: String | null | undefined,
        tags: String[],
        type: String,
    };
    let communities: Community[] = [
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "channel",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
        {
            "name": "Dagmawi Babi Chat",
            "link": "@DagmawiBabi",
            "description": "Believer | Creative Developer",
            "type": "group",
            "owner": "@DagmawiBabi",
            "tags": ["Tech", "Spiritual", "Personal"],
        },
    ]
    let communityCount = communities.length;

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
            <Socials />

            <!-- HEADER -->
            <div class="text-center">
                <p class="text-lg text-orange-500 pt-6 "> #{communityCount} Communities Added! </p>
                <p class="text-5xl font-bold pt-2 leading-snug"> Discover the Best <br/> Telegram Communities </p>
                <div class="pt-5 pb-10">
                    <p class="text-lg text-zinc-400"> Below are some of the most incredible channels and groups submitted by the public. <br /> This project was made with 🤍 by <a href="https://www.dagmawibabi.com" class="text-purple-400 hover:text-cyan-500 hover:underline underline-offset-4"> Dagmawi Babi </a> and it's completely opensource. </p>
                </div>

                <AddCommunity {communities}/>

            </div>

            <!-- COMMUNITIES -->
            <div class="grid grid-cols-3 gap-8 pt-28 pb-48">
                <!-- EACH COMMUNITY -->
                {#each communities as community}
                    <EachCommunity {community} />
                {/each}
            </div>

            <Footer />
        </div>
    </div>
</div>



