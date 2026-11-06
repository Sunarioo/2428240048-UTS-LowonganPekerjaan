// position, company, location, is_open
import mongoose from "mongoose";
import { boolean } from "zod";

const schema = new mongoose.Schema(
  {
    position:{
        type:String,
        required: true
    },
    company: {
         type:String,
        required: true
    }, 
    location:{
         type:String,
        required: true
    },
    is_open:{
        type: boolean,
        required: true
    }
  },
  {
    timestamps: true,
  },
);

const KerjaModel = mongoose.model("lowongankerja", schema);
export default KerjaModel;