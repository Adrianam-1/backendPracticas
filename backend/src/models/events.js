/*
campos
customerName
cantProducts
eventDate
*/

import {Schema, model } from "mongoose"

const eventSchema = new Schema({
    customerName:{type:String},
    cantProducts:{type:Number},
    eventDate:{type: Date}
},{
    timestamps: true,
    strict: false 
})

export default model ("Events", eventSchema)