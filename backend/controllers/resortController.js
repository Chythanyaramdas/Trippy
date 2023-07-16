const Location=require('../models/locationModel')

module.exports.resortLocation=async(req,res)=>{
    try {

        const locationData=await Location.find({is_delete:false}) 
        res.json({status:true,place:locationData})
        
    } catch (error) {

        console.log(error.message);
        
    }
}
module.exports.resort=async(req,res)=>{

    try {

        // const formValues=req.body.formValues;
        // console.log(req.body,"valus form");
        
        const formValues = req.body.formValues;
         console.log(JSON.parse(formValues));
        
    } catch (error) {
        console.log(error.message);
    }
}