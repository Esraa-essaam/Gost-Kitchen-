const Space = require("../models/space"); // استيراد الموديل مرة واحدة فقط وبحرف كبير

// 1. إضافة مكان جديد
const addPlace = async (req, res) => {
    try {
        const spaceData = {
            ...req.body,
            owner: req.user._id 
        };

        const newSpace = await Space.create(spaceData);

        res.status(201).json({
            status: "Success",
            data: newSpace
        });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: error.message });
    }
};

// 2. البحث عن الأماكن
const userSearch = async (req, res) => {
    try {
        const spaces = await Space.find() 
            .populate("owner", "name phone") 
            .sort("-createdAt"); 

        res.status(200).json({ // التصحيح: res وليس req
            status: "Success",
            results: spaces.length,
            data: spaces // نرسل المتغير الذي جلبناه من قاعدة البيانات
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server Error: Data could not be retrieved"
        });
    }
};

// 3. حذف مكان
const deletePlace = async (req, res) => {
    try {
        // التصحيح: يجب تمرير الـ ID الموجود في الرابط (params)
        const id = req.params.id; 
        await Space.findByIdAndDelete(id);

        res.status(204).json({ // 204 تعني تم الحذف بنجاح ولا يوجد محتوى للإرسال
            status: "success",
            data: null
        });
    } catch (error) {
        res.status(400).json({ status: "Fail", message: error.message });
    }
};

// التصدير الصحيح لجميع الدوال
module.exports = {
    addPlace,
    userSearch,
    deletePlace
};

// 
// 
