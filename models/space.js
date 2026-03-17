
const mongoose = require("mongoose"); 

const spaceSchema = new mongoose.Schema({
    // الجزء الخاص بالربط بين 2 اسكيما
    owner: {
        type: mongoose.Schema.Types.ObjectId, // استخدام المعرف الفريد الخاص بـ MongoDB
        ref: "user", // يجب أن يطابق تماماً الاسم الذي سجلتِ به موديل المستخدم
        required: [true, "Space must belong to a provider"],
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: ['Kitchen', 'FoodCourt', 'Restaurant']
    },

    location: {
        address: { type: String, required: true }, // تعديل بسيط لتنظيم العنوان
        addressDetail: String,
    },

    area: {
        type: Number, // المساحة بالمتر المربع مثلاً
    },

    price: {
        type: Number,
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Space", spaceSchema);