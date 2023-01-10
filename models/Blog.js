const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please add a name"],
		unique: true,
		trim: true,
		maxlength: [50, "Name cannot be more than 50 characters"],
	},
	slug: String,
	description: {
		type: String,
		required: [true, "Please add a description"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: "true",
	},
});

// Create blog slug from the name
BlogSchema.pre("save", function () {
	// console.log(`pre hook is triggered ${this.name}`.silly);
	this.slug = slugify(this.title, { lower: true });
});

module.exports = mongoose.model("Blog", BlogSchema);
