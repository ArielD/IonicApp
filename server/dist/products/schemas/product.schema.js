"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    ingredients: [String]
});
//# sourceMappingURL=product.schema.js.map