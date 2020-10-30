const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new mongoose.Schema({
  name: {
    type: String
  },
  phoneNumber: {
    type: String
  }
});
contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
