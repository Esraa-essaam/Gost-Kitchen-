const isProvider = (req, res, next) => {
    if (req.user && req.user.role === 'Provider') {
        next();
    } else {
        res.status(403).json({ msg: "هذا الفعل مسموح للملاك فقط" });
    }
};