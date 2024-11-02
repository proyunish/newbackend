const Meeting = require("../model/MeetingModel");

exports.createMeetings = async (req, res) => {
    const {  email, options } = req.body;

    if (!options || !email) {
        return res.status(400).json({
            message: "Please fill all fields",
        });
    }

        const existingUserEmail = await Meeting.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({
                message: "You have already requested the meeting.",
            });
        }

  

        const user = await Meeting.create({
            email,
         option:options
        });
   res.status(200).json({message:"Meeting create Successfully"})
};
exports.getallMeetings=async(req,res)=>{
    const kycs = await Meeting.find({})
           

        res.status(200).json(kycs);
}