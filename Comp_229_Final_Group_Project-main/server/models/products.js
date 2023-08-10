let mongoose = require("mongoose");
let productModel = mongoose.Schema(
  {
    person_name: String,
    contact_number: String,
    email_id: String,
  },
  {
    collection: "contact",
  }
);
module.exports = mongoose.model("products", productModel);
