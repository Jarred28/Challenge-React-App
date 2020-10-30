var seeder = require('mongoose-seed');
var randomMobile = require('random-mobile');
var random = require('random-name');

const connection = process.env.MONGODB_URI || 'mongodb://localhost/contact_db';

//Creating seed data with random name and phone number
const CreateData = () => {
  // creating 300 random contacts 
  const documents = Array(300).fill().map((x,i)=>i).map(itm => {
    const name = random();
    const phoneNumber = randomMobile();
    return {
      name,
      phoneNumber
    }
  })
  const data = [
    {
      'model': 'Contact',
      documents
    }
  ]
  return data;
}

// Connect to MongoDB via Mongoose
seeder.connect(connection, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'model/contact.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Contact'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(CreateData(), function() {
      seeder.disconnect();
    });
 
  });
});