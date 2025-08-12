import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "81bce2b9-5583-4e70-ac82-c77b50acb7c9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="min-h-[80vh] !p-[5%] bg-black grid grid-cols-1  md:gap-[3rem]">
      <div className="w-full h-full  hidden md:flex flex-col gap-5 text-white items-center !py-6 !px-6">
        <p className="text-3xl  font-bold">
          GOT QUESTIONS? WE'RE HERE TO HELP!
        </p>
        <p className="font-semibold text-sm text-gray-500">
          Reach out to our customer care services and we will meet your needs
        </p>
      </div>
        <form
          onSubmit={onSubmit}
          className="w-full max-w-2xl mx-auto bg-gray-950 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-8"
        >
          <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight">
            Contact Us
          </h2>
          <p className="text-base text-gray-400 text-center mb-6">
            We'd love to hear from you! Fill out the form and our team will get
            back to you.
          </p>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col gap-4 flex-1">
              <Input
                type="text"
                name="Firstname"
                placeholder="First name"
                required
                className="rounded-lg border border-gray-700 h-12 text-white w-full px-5 bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
              />
              <Input
                type="email"
                name="Email"
                placeholder="Email address"
                required
                className="rounded-lg border border-gray-700 h-12 text-white w-full px-5 bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <Input
                type="text"
                name="Lastname"
                placeholder="Last name"
                required
                className="rounded-lg border border-gray-700 h-12 text-white w-full px-5 bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
              />
              <Input
                type="number"
                name="name"
                placeholder="Phone number"
                required
                className="rounded-lg border border-gray-700 h-12 text-white w-full px-5 bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
          </div>
          <Textarea
            name="message"
            row={6}
            required
            placeholder="Your message"
            className="rounded-lg border border-gray-700 h-24 text-white w-full px-5 bg-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 transition resize-none"
          />
          <Button
            type="submit"
            className="w-full md:w-[50%] !py-4 rounded-lg bg-white text-black cursor-pointer items-center justify-center font-bold text-lg shadow hover:bg-gray-900 hover:text-white  duration-500 transition-all"
          >
            Submit Form
          </Button>
          <span className="block text-center text-sm text-green-500 font-medium mt-2 min-h-[1.5em]">
            {result}
          </span>
        </form>
    </div>
  );
};

export default Contact;
