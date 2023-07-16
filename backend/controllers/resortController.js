const Location=require('../models/locationModel')
const resort=require('../models/resortModel')

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
        
        // const formValues = req.body.formValues;
        //  console.log(JSON.parse(formValues));

        const{formValues,adventure}=req.body

        let newFormValues=JSON.parse(formValues)
        let newAdventure=JSON.parse(adventure)

        const updateResort=await resort.findOneAndUpdate({
            _id:newFormValues.id
        },{
            $set:{

               ownerName:newFormValues.ownerName,
               resortName:newFormValues.resortName,
               description:newFormValues.description,
               capacity:parseInt(newFormValues.capacity),
               price:parseInt(newFormValues.price),
               phone:newFormValues.phone,
               image:req.file.filename,
                adventure:newAdventure,
                approved:'processing',
                place:newFormValues.place


            }
        }) 


        if(updateResort){
            console.log("true");
            res.json({
                status:true,
                message:"successfully updated"
            })
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

