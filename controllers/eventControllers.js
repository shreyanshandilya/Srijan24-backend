const Event = require("../schemas/eventSchema");
const HttpError = require("../utils/HttpError");

const getEventsByZone = async (req, res, next) => {

  let Zone = req.params.zone ;
  try{
   let  Events = await  Event.find({Zone : Zone });

   if( !Events){
    return next(new HttpError("Error occrued try again" ,404));
   };
   res.json(Events);

  }catch(error){
    return next (new HttpError("Can not get events" ,404))
  }

};


const getParticularEvent = async (req ,res ,next)=>{
  let EventID = req.params.eventID;

  try{
    let response = await Event.findByID(EventID);

     if( !response ){
      return next(new HttpError("Can not get event " , 404));
     }
     res.json(response);
  }catch(error){
    return next(new HttpError("error occured " ,404))
  }
}

exports.getEventsByZone = getEventsByZone;
exports.getParticularEvent=getParticularEvent;