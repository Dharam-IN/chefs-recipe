import mongoose, { Document, Schema } from "mongoose";

export interface Recipe extends Document {
    title: string;
    description: string;
    author: string;
    tags: string[];
    image: string;
    ingredients: Ingredients[];
    instructions: string[];
    createdAt: Date;
}

export interface Ingredients extends Document {
    name: string;
    quantity: string;
}

const IngredientsSchema: Schema<Ingredients> = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    }
});

const RecipeSchema: Schema<Recipe> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ingredients: [IngredientsSchema],
    instructions: [{
        type: String,
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {timestamps: true});

const RecipeModel = mongoose.models.Recipe as mongoose.Model<Recipe> || mongoose.model<Recipe>("Recipe", RecipeSchema);

export default RecipeModel;
