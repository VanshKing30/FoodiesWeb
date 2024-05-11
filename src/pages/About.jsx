import React from "react";
import logo from "../assets/logo2.png";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mt-4 text-green-500">About Us</h1>

        <p>
          Hey there, lovely Foodies! We're the passionate minds behind the
          scenes, and we're thrilled to tell you a little bit about who we are
          and why we created Foodies.
        </p>

        <h2 className="text-xl font-semibold mt-4 underline">Our Journey</h2>

        <p>
          Picture a bustling college campus, students on the move, and the
          delightful aroma of food wafting from the canteens. That's where our
          story begins. We're a group of college students just like you, and
          we've been through the daily struggle of deciding where to eat. It's
          not always easy, especially when you have multiple canteens to choose
          from.
        </p>

        <p>
          We realized that the quest for the perfect meal needed an upgrade.
          That's when the idea for Foodies was born. We set out to create a web
          app that would make the lives of fellow students simpler, tastier, and
          healthier.
        </p>

        <h2 className="text-xl font-semibold mt-4 underline">Our Mission</h2>

        <p>
          Our mission is pretty straightforward - to connect you with your
          college canteens in the most hassle-free way possible. We believe in
          making your food adventures on campus more convenient and enjoyable.
          We want you to explore your options, discover new dishes, and make
          choices that suit your taste and health goals.
        </p>

        <h2 className="text-xl font-semibold mt-4 underline">Why Foodies?</h2>

        <p>
          Foodies is more than just a web app; it's our way of giving back to the
          student community. We've been in your shoes, so we understand the
          challenges you face when deciding where to eat. We wanted to create a
          solution that would save you time, reduce the guesswork, and bring the
          fun back into food hunting.
        </p>

        <h2 className="text-xl font-semibold mt-4 underline">Our Team</h2>

        <p>
          We're the API Alchemists, a bunch of creative and tech-savvy students
          who believe in the power of innovation. We've combined our skills and
          knowledge to bring Foodies to life, and we couldn't be more excited to
          share it with you.
        </p>

        <p>
          Join Us on This Foodie Adventure
        </p>

        <p>
          Foodies is a labor of love, and we're thrilled to have you on this
          journey with us. We're committed to improving your campus dining
          experience and helping canteen owners offer the best of their menus.
        </p>

        <p>
          So, what are you waiting for? Dive into Foodies, explore your campus
          canteens, discover delicious dishes, and make mealtime decisions with
          ease. We're here to make your food adventures memorable and
          mouth-watering.
        </p>

        <p>
          Thank you for being a part of our Foodies family. We look forward to
          serving you delightful dining experiences, one click at a time.
        </p>

        <p>
          Hungry for More?
        </p>

        <p>
          If you have any questions, suggestions, or just want to chat about
          food, feel free to reach out to us. We love hearing from fellow Foodies
          like you.
        </p>

        <p>
          Happy eating and happy exploring!
        </p>
      </div>
    </div>
  );
};

export default About;
