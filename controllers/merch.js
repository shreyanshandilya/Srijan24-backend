const Purchase = require("../schemas/merchSchema");

exports.postTshirt = async (req, res) => {
    try {

        const {
            name,
            admissionNumber,
            mobileNumber,
            tshirtSize,
            hostel,
            roomNumber,
            imageURL,
        } = req.body;

        // const resp = await Purchase.findOne({ orderID });
        // if (resp) {
        //     console.log("repeated transaction id");
        //     return res.status(400).send({ msg: "Transaction already recorded !" });
        // }

        //const { path: imageURL } = req.file;
        const newPurchase = new Purchase({
            name,
            admissionNumber,
            mobileNumber,
            tshirtSize,
            hostel,
            roomNumber,
            imageURL,
        });
        const data = await newPurchase.save();
        //console.log(data);

        return res.status(200).send({
            msg: "Your order has been confirmed successfully! ",
        })

    } catch (e) {
        return res.status(400).send({ msg: e.message });
    }
}