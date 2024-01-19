const EventsData = require("../schemas/eventsRegistration");
const User = require("../schemas/userSchema");
const UserEvents = require("../schemas/userEventsSchema");
const HttpError = require("../utils/HttpError");

const registerForEvent = async (req, res, next) => {
  let check = true;
  //console.log(req.body.Teams[0].MembersList);
  for (let i = 0; i < req.body.Teams[0].MembersList.length; i++) {
    let Email = req.body.Teams[0].MembersList[i].Email;
    let dataCheck;
    try {
      dataCheck = await User.findOne({ Email: Email });
    } catch {
      return next(new HttpError("error", 404));
    }

    if (!dataCheck) {
      check = false;
      break;
    }
  }
 // console.log("CHECK", check);

  if (!check) {
    return next(
      new HttpError(
        "For registering in the Events all users first need to register",
        404
      )
    );
  }

  let response;
  try {
    response = await EventsData.findOne({ EventName: req.body.EventName });
  } catch {
    return next(new HttpError("Cannot get user try again", 404));
  }

  if (!response) {
    response = new EventsData({
      EventName: req.body.EventName,
      Teams: req.body.Teams[0],
    });
  } else {
    response.Teams.push({ ...req.body.Teams[0] });
  }
  let responseData;
  try {
    responseData = await response.save();
  } catch (error) {
    return next(new HttpError("error", 404));
  }

  if (!responseData) {
    return next(new HttpError("error", 404));
  }

  let EventName = req.body.EventName;
  for (let i = 0; i < req.body.Teams[0].MembersList.length; i++) {
    let Email = req.body.Teams[0].MembersList[i].Email;
    let user, UserEvent;

    try {
      UserEvent = await UserEvents.findOne({ Email: Email });
    } catch (error) {
      return next(new HttpError("error", 404));
    }

    if (!UserEvent) {
      UserEvent = new UserEvents({
        Email: Email,
        EventsRegistered: EventName
      })
    }
    else {
      UserEvent.EventsRegistered.push(EventName);
    }

    // console.log(user.EventsRegistered);
    // user.EventsRegistered.push(EventName);

    try {
      let resp = await UserEvent.save();
      // console.log(resp);
    } catch (error) {
      return next(new HttpError("error", 404))
    }
  }

  res.json({
    message: "Successfully registered for events",
    status: "Thank u",
  });
};
exports.registerForEvent = registerForEvent;




