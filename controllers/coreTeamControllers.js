const CoreTeam = require('../schemas/coreTeamSchema');
const HttpError =require('../utils/HttpError');

const getCoreTeam = async (req, res ,next) => {
    try {
        const team = await CoreTeam.find({}).sort({ priority: 1 });
        res.status(200).json({success: true, team});
    }
    catch (e) {
        return next(new HttpError("cant not get information" ,404))
    }
}

exports.getCoreTeam=getCoreTeam;