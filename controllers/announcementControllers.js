const Announcement = require("../schemas/announcementSchema");
const HttpError = require("../utils/HttpError");

const createAnnouncement = async (req, res, next) => {
  try {
    const { title, body } = req.body;
    const announcement = new Announcement({ title, body });
    await announcement.save();
    res.status(201).json({ message: "Announcement created successfully" });
  } catch (error) {
    next(new HttpError("Internal Server Error ", 500));
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ timestamp: "desc" })
      .select("title body timestamp _id");
    res.json(announcements);
  } catch (error) {
    next(new HttpError("Internal Server error", 500));
  }
};

exports.createAnnouncement = createAnnouncement;
exports.getAnnouncements=getAnnouncements
