const EventRegistration = require("../schemas/teamEventRegistrationSchema");
const User = require("../schemas/userSchema")
const event = require("../schemas/eventSchema");
const HttpError = require("../utils/HttpError");

const postEventRegistration = async (req, res ,next) => {
  try {
    const {
      teamName,
      teamLeader,
      eventName,
      member = [{}],
      problemStatementChosen,
      fieldOfInterest,
      botWeight,
      driveLink,
    } = req.body;
    //console.log(member);
    const eventData = await event.findOne({ name: eventName });
    const sizeOfStage = eventData.stages.length;

    const stages = [];
    stages.push({
      qualified: true,
      attendance: false,
    });
    for (let i = 1; i < sizeOfStage; i++) {
      stages.push({
        qualified: false,
        attendance: false,
      });
    }

    const sizeofMember = member.length;
    for(let i = 0;i<sizeofMember;i++){
      let email = member[i].email;
      const data = await User.find({Email: email});
      if(!data){
        return next(new HttpError("Every member should be registered", 400));
      }
    }

    const newEventRegistration = new EventRegistration({
      teamName,
      teamLeader,
      eventName,
      member,
      stages,
      problemStatementChosen,
      fieldOfInterest,
      botWeight,
      driveLink,
    });

    //console.log(newEventRegistration);
    const team = await newEventRegistration.save();
    //console.log(team);
    //console.log(eventData);
    await event.updateOne(
      { _id: eventData._id },
      { $push: { teams: team._id } }
    );
    res.json({ msg: "Registration successful" });
  } catch (e) {
    return next(new HttpError("error occured try again", 400));
  }
};

exports.postEventRegistration = postEventRegistration;
