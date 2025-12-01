const mongoose = require('mongoose');
require('dotenv').config();

// Import Mongoose models
const Trainer = require('../models/trainer-model-mongoose');
const Event = require('../models/event-model-mongoose');
const Course = require('../models/course-model-mongoose');
const Contact = require('../models/contact-model-mongoose');
const Testimonial = require('../models/testimonial-model-mongoose');

// Import Model Data
const trainerData = require('./trainer-info.json');
const eventData = require('./event-info.json');
const courseData = require('./course-info.json');
const testimonialData = require('./testimonial-info.json');
const contactData = require('./contact-entries.json');

async function initDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB!");
    
    // Clear existing data
    await Promise.all([
      Trainer.deleteMany({}),
      Event.deleteMany({}),
      Course.deleteMany({}),
      Testimonial.deleteMany({}),
      Contact.deleteMany({})
    ]);
    console.log("✅ Cleared existing data");
    
    // Insert Trainers first
    const trainers = await Trainer.insertMany(trainerData);
    console.log(`✅ Trainers inserted: ${trainers.length}`);
    
    // Insert Events
    const events = await Event.insertMany(eventData);
    console.log(`✅ Events inserted: ${events.length}`);
    
    // Transform and insert Courses
    const coursesToInsert = courseData.map((course) => {
      const trainerIndex = course.trainer - 1; // Convert 1-6 to 0-5
      
      return {
        title: course.title,
        image: course.image,
        summary: course.summary,
        description: course.description,
        price: course.price,
        capacity: course.capacity,
        registrants: [], // Empty array instead of number
        likes: course.likes,
        trainer: trainers[trainerIndex]._id, // Use actual ObjectId
        schedule: "TBD" // Add schedule field
      };
    });
    
    const courses = await Course.insertMany(coursesToInsert);
    console.log(`✅ Courses inserted: ${courses.length}`);
    
    // Insert Testimonials
    const testimonials = await Testimonial.insertMany(testimonialData);
    console.log(`✅ Testimonials inserted: ${testimonials.length}`);
    
    // Insert Contacts
    const contacts = await Contact.insertMany(contactData);
    console.log(`✅ Contacts inserted: ${contacts.length}`);
    
    console.log("\n🎉 Database initialization complete!");
    process.exit(0);
    
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

initDatabase();