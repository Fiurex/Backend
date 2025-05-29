    import { Schema, Types, model } from "mongoose";

    const collection = "products";
    const schema = new Schema(
    {
        title: { type: String, required: true, index: true },
        description: { type: String },
        category: { type: String, default: "laptops", enum: ["laptops", "smarthphones", "hardware", "electrodomesticos"] },
        image: { type: String, default: "https://cdn.pixabay.com/photo/2017/01/10/23/52/artificial-intelligence-1969826_960_720.png" },
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
