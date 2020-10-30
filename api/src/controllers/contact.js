const Contact = require('../model/contact');
const getPagination = require('../utils');

// Create a new Contact
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "name can not be empty!" });
    return;
  }
  // Create a Contact
  const contact = new Contact({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
  });

  // Save Contact in the database
  Contact
    .save(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });  
};

// Search and Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
  const { name, phoneNumber } = req.query;
  const page = parseInt(req.query.page); 
  const pageSize = parseInt(req.query.pageSize);
  const { limit, offset } = getPagination(page, pageSize)
  var condition = {}
  if ( !!name ) {
    condition = { ...condition, name: { $regex: new RegExp(name), $options: "i" } }
  }
  if ( !!phoneNumber ) {
    condition = { ...condition, phoneNumber: { $regex: new RegExp(phoneNumber), $options: "i" } }
  }
  Contact.paginate(condition, { offset, limit })
    .then(data => {
      res.send({
        contacts: data.docs,
        totalCounts: data.totalDocs,
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving contacts."
      });
    });  
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Contact.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with id=" + id });
    });  
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
    }
  
  const id = req.params.id;

  Contact.findByIdAndUpdate(id, req.body, {new: true})
    .then(updatedOne => {
      if (!updatedOne) {
        res.status(404).send({ message: `Cannot update Contact. Maybe Contact was not found!` });
      } else res.send({ updatedOne, message: "Contact was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id
      });
    });  
};

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Contacts from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Contacts
exports.findAllPublished = (req, res) => {
  
};