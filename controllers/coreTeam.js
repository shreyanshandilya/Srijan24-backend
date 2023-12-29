const CoreTeam = require('../schemas/coreteamSchema');

exports.getCoreTeam = async (req, res) => {
    try {
        const team = await CoreTeam.find({}).sort({ priority: 1 });
        res.status(200).json({success: true, team});
    }
    catch (e) {
        return res.status(400).send({ msg: e.message });
    }
}