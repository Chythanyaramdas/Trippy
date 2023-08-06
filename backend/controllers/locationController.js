
const Location=require('../models/locationModel')
module.exports.locationCreation=async(req,res)=>{

    try {

       
        // const LocationData = [
        //     {
        //         district:district,
        //         places:fields
        //     },
        //     {
        //         district:"another district",
        //         places:["place1","place2"]
        //     }
        // ];
        // await Location.insertMany(LocationData);
        // res.json({
        //     status:true,
        //     message:'successfully created'
        // });
        try {

            const{district,places}=req.body
            
            let newPlace=JSON.parse(places)
            console.log(req.body,"des");
            console.log(places,"fiiiiiii");
            const LocationData=  new Location({
                district:district,
                places:newPlace,
                image:req.file.filename  
            })
            LocationData.save().then(()=> console.log('hhh'))
            // Location.insertOne({district:district,places:fields},function(err,result){
    
            //     if(err){
            //         console.log(err);
            //     }
            //     else{
            //         console.log("success");
            //     }
            // })
    
            // if(LocationData){
            //     res.json({
            //         status:true,
            //         message:'successfully created'
            //     })
            // }
            
        } catch (error) {
    
            console.log(error.message);
            
        }
        
    } catch (error) {
    
        console.log(error.message);
        
    } 
    
}

module.exports.location=async(req,res)=>{
    try {
      const locationData=await Location.find({is_delete:false})
    //   console.log( locationData);
      res.json({
        status:true,
        Location:locationData
      })
        
    } catch (error) {

        console.log(error.message);
        
    }
}

module.exports.deleteLocation=async(req,res)=>{
    try{



      console.log(req.body.id,"id");
      const locationData = await Location .findByIdAndUpdate(req.body.id,{is_delete:true})
      if(locationData){
          res.json({
              status:true,
              message:'Successfully deleted'
          })
      }
      

    }

    catch(error){

        console.log(error.message);
        res.json({
          status:false,
          message:"Can't find the data"
      })
      }

}
module.exports.getLocation=async(req,res)=>{
    try {

        const id=req.params.id;
        console.log(id,"locationId");
        const locationData=await Location.findById(id)
        if(locationData){
            res.json({
                status:true,
                location:locationData
            })
        }
        
    } catch (error) {

        console.log(error.message);
        
    }
}
module.exports.updateLocation=async(req,res)=>{
    try {

        console.log("update loccc");
        const id=req.params.id;
        console.log(req.body);
        const locationData=await Location.findOneAndUpdate(

            {_id:id},
            {
                $set:{
                    district:req.body.district,
                    places:req.body.places

                }
            }

        )

        if(locationData){
            res.json({
                status:true,
                location:locationData
            })
        }
        
    } catch (error) {

        console.log(error.message);
        
    }
}

