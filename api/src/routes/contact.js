const router = require("express").Router();
const contact = require("../controllers/contact.js");
// Create a new Contact
router.post("/", contact.create);

// Retrieve all contacts
router.get("/", contact.findAll);

// Retrieve a single Contact with id
router.get("/:id", contact.findOne);

// Update a Contact with id
router.put("/:id", contact.update);

// Delete a Contact with id
router.delete("/:id", contact.delete);

// Create a new Contact
router.delete("/", contact.deleteAll);

module.exports = router;