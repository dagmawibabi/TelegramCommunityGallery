import { json } from '@sveltejs/kit';
import { Community } from '../../../models/community.model';

export async function POST({ request,  }) {
    const body = await request.json()
    body.link = body.link.toString().toLowerCase()
    // console.log("The body: ",body)
    const newCommunity = new Community({...body})

    try {
        await newCommunity.save();
        return json({ status: 200, body: "Successfully created community"});
      } catch (error) {
        console.error(error);
        return json({ status: 500, body: "Error creating document"});
      }
}