const Categorey = require("../models/categoryModel");
const resort = require("../models/resortModel");

module.exports.categoreyCreation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const CategoreyData = new Categorey({
      name: name,
      description: description,
      image: req.file.filename,
    }).save();

    if (CategoreyData) {
      res.json({ status: true, message: "successfully Created" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.categoreyManagement = async (req, res) => {
  try {
    console.log("categorey");

    const categoreyData = await Categorey.find({ is_delete: false });
    
    res.json({
      status: true,
      Categorys: categoreyData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    console.log(req.body.id, "idss");
    const categoryData = await Categorey.findByIdAndUpdate(req.body.id, {
      is_delete: true,
    });
    if (categoryData) {
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

module.exports.getCategory = async (req, res) => {
  try {
    const categoreyData = await Categorey.findOne({ name: req.params.id });
    if (categoreyData) {
      res.json({
        status: true,
        banner: categoreyData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    console.log("ethiuuuuu");
    console.log(req.body, "bodyyyy");
    if (req.file) {
      const categoryData = await Categorey.updateOne(
        { name: req.body.id },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
          },
        }
      );
      if (categoryData) {
        console.log("done");
        res.json({
          status: true,
          banner: categoryData,
        });
      }
    } else {
      const categoryData = await Categorey.updateOne(
        { name: req.body.id },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
          },
        }
      );
      if (categoryData) {
        console.log("done");
        res.json({
          status: true,
          banner: categoryData,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.searchService = async (req, res) => {
  try {
    const filter = req.query.service || "";
    console.log(filter, "filter");
    const id = req.query.search || "";

    const categoryId = req.params.id;

    console.log(id, "search");

    let search = id.toLowerCase();

    let query = {
      category: categoryId,
      is_blocked: false,
      is_delete: false,
    };

    if (id) {
      query["services"] = search;
    }

    if (filter) {
      const servicesArray = filter
        .slice(1, -1) // Remove the square brackets at the beginning and end
        .split(",") // Split the remaining string by commas
        .filter((service) => service.trim());
      console.log(servicesArray);
      if (servicesArray.length) query["services"] = { $all: servicesArray };

      console.log(query, "filter");
    }

    // const resortData=await resort.find({ $and:[{services:search},{
    //   category:categoryId}]})
    const resortData = await resort.find(query);

    console.log(resortData, "rdssss");

    if (resortData) {
      res.json({
        status: true,
        search: resortData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
