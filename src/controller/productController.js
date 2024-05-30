const productModel = require("../model/productModel");

// C=Create
exports.createProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const createdProduct = await productModel.create(reqBody);
    res.status(200).json({ status: "success", data: createdProduct });
    // console.log(createdProduct)
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};

// R=Read
exports.readProduct = async (req, res) => {
  try {
    let data = await productModel.aggregate([
      {
        $project: {
          ProductName: 1,
          ProductCode: 1,
          Img: 1,
          UnitPrice: 1,
          Qty: 1,
          TotalPrice: 1,
          CreatedDate: 1,
        },
      },
    ]);
    // console.log("Read data:", data);
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    // console.error("Read error:", error);
    res.status(200).json({ status: "fail", error: error });
  }
};

// U=Update
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const Query = { _id: id };
    const reqBody = req.body;
    const updateProduct = await productModel.updateOne(Query, reqBody);
    res.status(200).json({ status: "success", data: updateProduct });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};

// D=Delete

exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let Query = { _id: id };
    const delProduct = await productModel.deleteOne(Query);
    res.status(200).json({ status: "success", data: delProduct });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error });
  }
};
