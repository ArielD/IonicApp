"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    _id: String,
    username: String,
    firstName: String,
    LastName: String,
    password: String,
    birthDay: Date,
    gender: Number,
    registrationDate: Date
});
//# sourceMappingURL=product.schema.js.map