const Categorey=require('../models/categoryModel');

module.exports.categoreyCreation=async(req,res)=>{

    try {

        const{name,description}=req.body
        const CategoreyData=new Categorey({
            name:name,
            description:description,
            image:req.file.filename
        }).save()

        if(CategoreyData){
            res.json({status:true,
                message:'successfully Created'

            })
        }
        
    } catch (error) {

        console.log(error.message);
        
    }
}

module.exports.categoreyManagement=async(req,res)=>{

    try {

        console.log("categorey");

        const categoreyData=await Categorey.find({})
        console.log(categoreyData);
        res.json({
            status:true,
            Categorys: categoreyData
        })
        
    } catch (error) {

        console.log(error.message);
        
    }
}
