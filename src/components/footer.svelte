<script>
    import axios from 'axios';

    import { visitorCountStore } from '../store/store';

    let LOGLIP_API_KEY = "site_viqku2vjon"

    // DateTime
    let date = new Date();
    let humanReadableDate = date.toDateString();

    // Get and Set Visitor Count 
    let visitorCount = 0;
    visitorCountStore.subscribe((data) => {
        visitorCount = data;
    })
    async function getVisitorCount() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(currentDate.getDate() + 1).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;    
        let visitorCountResult = await axios({
            method: 'get',
            url: `https://api.loglib.io/v1/insight?apiKey=${LOGLIP_API_KEY}&startDate=2023-08-10&endDate=${formattedDate}&timeZone=Africa/Addis_Ababa`,
            withCredentials: false,
        });
        visitorCountStore.set(visitorCountResult.data.insight.totalPageViews.current);        
    }
    getVisitorCount()
    
</script>

<span class="hidden md:visible">
    This gallery has been visited <span class="text-white" > {visitorCount} times </span> and was made with love by <a href="https://www.dagmawibabi.com" class="text-white underline underline-offset-4 hover:text-blue-500 hover:underline"> Dagmawi Babi</a>.
</span>

<!-- <div class="absolute left-0 right-0 bottom-0 justify-center text-zinc-300 text-center pb-10 text-lg">
    <span class=""> 
        This gallery has been visited <span > {visitorCount} </span> times. 🤍 
    </span>
    <span>
        {humanReadableDate} &copy; Dagmawi Babi
    </span>
</div> -->