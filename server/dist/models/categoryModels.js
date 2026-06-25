"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    catImg: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
categorySchema.pre("save", function (slug) {
    this.slug = (0, slugify_1.default)(this.name, {
        lower: true,
        strict: true,
        trim: true,
    });
});
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
