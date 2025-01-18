"use strict";
// Optional: If you decide to use separate tables for status and priority
const statusSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
}, { timestamps: true });
const prioritySchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
}, { timestamps: true });
const Status = mongoose.model("Status", statusSchema); // Optional
const Priority = mongoose.model("Priority", prioritySchema); // Optional
