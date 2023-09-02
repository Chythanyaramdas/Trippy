const Location = require("../models/locationModel");
module.exports.locationCreation = async (req, res) => {
  try {
    
    try {
      const { district, places } = req.body;

      let newPlace = JSON.parse(places);
      console.log(req.body, "des");
      console.log(places, "fiiiiiii");
      const LocationData = new Location({
        district: district,
        places: newPlace,
        image: req.file.filename,
      });
      LocationData.save().then(() => console.log("hhh"));
      res.json({
        status:true,
        message:"success"
      })
      
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.location = async (req, res) => {
  try {
    const locationData = await Location.find({ is_delete: false });
    //   console.log( locationData);
    res.json({
      status: true,
      Location: locationData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.deleteLocation = async (req, res) => {
  try {
    console.log(req.body.id, "id");
    const locationData = await Location.findByIdAndUpdate(req.body.id, {
      is_delete: true,
    });
    if (locationData) {
      res.json({
        status: true,
        message: "Successfully deleted",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: false,
      message: "Can't find the data",
    });
  }
};
module.exports.getLocation = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "locationId");
    const locationData = await Location.findById(id);
    if (locationData) {
      res.json({
        status: true,
        location: locationData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports.updateLocation = async (req, res) => {
  try {
    console.log("update loccc");
    const id = req.params.id;
    console.log(req.body);
    if (req.file) {
      const locationData = await Location.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            image: req.file.filename,
          },
        }
      );
    }
    const locationData = await Location.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          district: req.body.district,
          places: JSON.parse(req.body.places),
        },
      }
    );

    if (locationData) {
      res.json({
        status: true,
        location: locationData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
