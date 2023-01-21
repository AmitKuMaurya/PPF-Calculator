const { Router } = require("express");
const {ROIModel} = require("../models/roi.model");
const { UserModel } = require("../models/user.model");

const roiController = Router();

roiController.get("/getProfile", async (req, res) => {
    const {user_id} = req.body;
    const user =await  UserModel.findOne({_id : user_id})
    const {name, email} = user
    res.send({name, email});
})

roiController.post("/calculateROI",async(req,res)=>{

    const {Maturity_Value,Annual_Instalment, Rate_of_Interest,Number_of_Years, user_id} = req.body;

    let ROI = +(Rate_of_Interest / 100)

    const TMV = Number(Annual_Instalment) * ( ( ( (1+ ROI) ^ Number(Number_of_Years)/12) - 1) / ROI )
    console.log(TMV);

    const TIA = Math.max(+(Annual_Instalment) * +(Number_of_Years));
    console.log(TIA);
    
    const TIG = Number(TMV) - Number(TIA);

    console.log(TIG);
    // const F = P * [({(1+i) ^n} -1)/i]
    
     const new_roi = new ROIModel({
        TMV : TMV,
        TIA : TIA,
        TIG : TIG,
        user_id
     })

     await new_roi.save();
     res.send({"mgs" : "done"});

})


module.exports = {
    roiController
}
