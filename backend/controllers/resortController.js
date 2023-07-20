const Location=require('../models/locationModel')
const resort=require('../models/resortModel')

module.exports.resortLocation=async(req,res)=>{
   
    try {
        console.log("niiiii");
        const locationData=await Location.find({is_delete:false}) 
        const resortData=await resort.find({})
        res.json({status:true,place:locationData,resort:resortData})
        
    } catch (error) {

        console.log(error.message);
        
    }
}



module.exports.resort = async (req, res) => {
    try {
      // const formValues = req.body.form;
      // console.log('formValues:', formValues);

      const{formValues,adventure}=req.body;


      let newAdventure=JSON.parse(adventure)
      let newFormValues=JSON.parse(formValues)
      console.log('formValues:',newFormValues.ownerName);
      console.log("image"+req.file.filename);
      console.log("update value");

      let newUser=new  resort({
        ownerName:newFormValues.ownerName,
          resortName:newFormValues.resortName,
          description:newFormValues.description,
          capacity:parseInt(newFormValues.capacity),
          price:parseInt(newFormValues.price),
          adventure:newAdventure,
          image:req.file.filename,
          phone:newFormValues.phone
      })
      console.log(newUser,"staff come");
      newUser.save().then((data)=>{
        console.log(data,"miiiioo");
        res.status(200).json({message:"Authenticated"})
      });
      
    } catch (error) {
      console.log(error.message);
    }
  };
  

