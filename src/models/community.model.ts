import * as mongoose from 'mongoose';


const CommunityModel = new mongoose.Schema(
  {
    name: {type: String, required: true},
    link: {type: String, required: true, unique: true},
    description: {type: String},
    owner: { type: String, default: ''},
    tags: [
        {type: String}
    ],
    type: { type: String }
  },
  { timestamps: true}
);

export type Community = mongoose.InferSchemaType<typeof CommunityModel>;
export const Community = mongoose.model('Community', CommunityModel);