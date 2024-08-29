import dotenv from "dotenv";
dotenv.config();
import express from "express";

//importing from default export
import connectDB from "./config/db.js";
import User from "./models/User.models.js";

const port = process.env.PORT;
const server = express();
connectDB();
//!creating a new person instance
const myPerson = new User({
  name: "Brian Harris",
  age: 29,
  favouriteFoods: ["pasta", "turkey", "burritos"],
  email: "BrianHarris@gmail.com",
  password: process.env.PASSWORD,
});
// console.log(myPerson);

//!save the myPerson to the database
myPerson
  .save()
  .then((savedData) => {
    console.log("user saved successsfully", savedData);
  })
  .catch((error) => {
    console.log(error);
  });

//! creating mutiple record of people in our database
User.create([
  {
    name: "Alice Donald",
    age: 25,
    favouriteFoods: ["Salad", "Soup", "burritos"],
    email: "donald@gmail.com",
    password: "welcome",
  },
  {
    name: "Bob Micheal",
    age: 35,
    favouriteFoods: ["Steak", "Fries", "burritos"],
    email: "michealbob@gmail.com",
    password: "mikebob",
  },
  {
    name: "Charlie Smith",
    age: 28,
    favouriteFoods: ["Burger", "Ice Cream", "burritos"],
    email: "smith@gmail.com",
    password: "charliesmith",
  },
])
  .then((createdUser) => {
    console.log("user created", createdUser);
  })
  .catch((error) => {
    console.log(error);
  });

//! Find all people with the name "Bob Micheal"
User.find({ name: "Bob Micheal" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//! Find one person who has "Pizza" in their favoriteFoods
User.findOne({ favouriteFoods: "pasta" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//!find a Person by _id
User.findById("66d07a5d58a4961b4ef9d360")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//! Find a person by _id and update their favoriteFoods
User.findByIdAndUpdate("66d07a5d58a4961b4ef9d360")
  .then((data) => {
    data.favouriteFoods.push("hambuger");
    data.save().then((dataUpdated) => {
      console.log(dataUpdated);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//! Find a person by name and update their age
User.findOneAndUpdate({ name: "Alice Donald" }, { age: 20 }, { new: true })
  .then((updatedUser) => {
    console.log(updatedUser);
  })
  .catch((err) => {
    console.log(err);
  });

//! find person by name and delete
User.findOneAndDelete({ name: "Bob Micheal" })
  .then((userDeleted) => {
    console.log(userDeleted);
  })
  .catch((err) => {
    console.log(err);
  });

//! Removing a person fron the database
User.deleteMany({ name: "Brian Harris" })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//! Find people who like burritos, sort by name, limit to 2 results, and hide age
User.find({ favouriteFoods: "burritos" })
  .sort({ name: 1 })
  .limit(2)
  .select("-age")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log(`server connected to port ${port}`);
});
