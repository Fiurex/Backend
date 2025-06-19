    import { Schema, Types, model } from "mongoose";

    const collection = "products";
    const schema = new Schema(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        category: { type: String, default: "laptops", enum: ["laptops", "smarthphones", "hardware", "electrodomesticos"] },
        image: { type: String, default: "https://pixabay.com/vectors/package-packaging-pack-cardboard-4986026/" },
        price: { type: Number, default: 10 },
        stock: { type: Number, default: 10 },
        onsale: { type: Boolean, default: false },
        owner_id: { type: Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
    );

    schema.pre(/^find/, function () {
    this.populate("owner_id", "email avatar");
    });

    const Product = model(collection, schema);
    export default Product;
