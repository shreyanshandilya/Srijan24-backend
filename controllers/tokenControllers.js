const Token = require("../schemas/tokenSchema");

const addToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).send({ message: "Token required" });
        }

        const data = new Token({ token });
        const saved = await data.save();
        console.log(saved);
        return res.status(200).send({ message: "ALL OK!!" });
    } catch (e) {
        return res.status(400).send({ message: e.message });
    }
};

const getToken = async (req, res, next) => {
    try {
        const data = await Token.find({}).select("_id token");
        //const finalArray = data.map((e) => e.token);
        return res.status(200).send({ success:true, data:data, error:""});
    } catch (e) {
        return res.status(400).send({success: false, data:null, error:e.message});
    }
};

exports.addToken = addToken;
exports.getToken = getToken;
