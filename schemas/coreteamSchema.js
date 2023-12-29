const mongoose = require('mongoose');

const coreTeamSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        linkedinURL: {
            type: String,
            required: true,
        },
        instaURL: {
            type: String,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
        },
    }
)

module.exports = mongoose.model("CoreTeam",coreTeamSchema); 