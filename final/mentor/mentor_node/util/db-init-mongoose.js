const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Import Mongoose models
const Trainer = require('../models/trainer-model-mongoose');
const Event = require('../models/event-model-mongoose');
const Course = require('../models/course-model-mongoose');
const Contact = require('../models/contact-model-mongoose');
const Testimonial = require('../models/testimonial-model-mongoose');
const User = require('../models/user-model-mongoose');

// Import Model Data
const trainerData = require('./trainer-info.json');
const eventData = require('./event-info.json');
const courseData = require('./course-info.json');
const testimonialData = require('./testimonial-info.json');
const contactData = require('./contact-entries.json');

// Test Users Data
const userData = [
  {
    firstName: 'Test',
    lastName: 'User1',
    email: 'test1@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User2',
    email: 'test2@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User3',
    email: 'test3@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User4',
    email: 'test4@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User5',
    email: 'test5@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User6',
    email: 'test6@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User7',
    email: 'test7@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User8',
    email: 'test8@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User9',
    email: 'test9@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Test',
    lastName: 'User10',
    email: 'test10@test.com',
    password: 'test123',
    roles: ['user']
  },
  {
    firstName: 'Frosty',
    lastName: 'Snowman',
    email: 'frostythesnowman@northpole.com',
    password: 'frostyisthebest',
    roles: ['user', 'admin']
  },
  {
    firstName: 'Jack',
    lastName: 'Frost',
    email: 'jackfrost@northpole.com',
    password: 'jackfrostiscool',
    roles: ['user']
  },
];

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
      Contact.deleteMany({}),
      User.deleteMany({})
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
      const trainerIndex = course.trainer - 1;
      
      return {
        title: course.title,
        image: course.image,
        summary: course.summary,
        description: course.description,
        price: course.price,
        capacity: course.capacity,
        registrants: [],
        likes: course.likes,
        trainer: trainers[trainerIndex]._id,
        schedule: "TBD"
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
    
    // Insert Test Users (hash passwords first)
    const usersWithHashedPasswords = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    const users = await User.insertMany(usersWithHashedPasswords);
    console.log(`✅ Test Users inserted: ${users.length}`);
    
    console.log("\n🎉 Database initialization complete!");
    console.log("\n📋 Test User Credentials:");
    console.log("All users: test1@test.com - test10@test.com (password: test123)");
    console.log("\n📝 User IDs for testing registrants:");
    users.forEach((user, index) => {
      console.log(`${user.email}: ${user._id}`);
    });
    
    process.exit(0);
    
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

initDatabase();