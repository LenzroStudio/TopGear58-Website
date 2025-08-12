import React from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const Contact = () => {

    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "81bce2b9-5583-4e70-ac82-c77b50acb7c9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
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
        <h1 className="font-bold text-lg">Contact us</h1>
        <p className="text-3xl  font-bold">
          GOT QUESTIONS? WE'RE HERE TO HELP!
        </p>
        <p className="font-semibold text-sm text-gray-500">
          Reach out to our customer care services and we will meet your needs
        </p>
      </div>
      <div className="w-full h-full rounded-2xl  flex flex-col justify-center items-center md:border border-gray-200 md:p-8 lg:p-10">
        <form
          onSubmit={onSubmit}
          className="w-full md:max-w-5xl flex flex-col gap-8 items-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full h-full  flex md:hidden flex-col md:gap-5 text-white items-center !py-6 md:!px-6">
              <h1 className="font-bold text-lg !mb-5">Contact us</h1>
              <p className="md:text-3xl  font-bold">
                GOT QUESTIONS? WE'RE HERE TO HELP!
              </p>
              <p className="font-semibold text-xs text-center md:text-sm text-gray-500">
                Reach out to our customer care services and we will meet your
                needs
              </p>
            </div>
          <p className="text-base hidden md:flex text-gray-500 mb-4 text-center">
            We'd love to hear from you! Fill out the form and our team will get
            back to you.
          </p>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                name="Firstname"
                placeholder="First name"
                required
                className="rounded-lg border border-gray-700 h-[7vh] text-white md:w-[30vw] !px-5 bg-transparent  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <Input
                type="email"
                name="Email"
                placeholder="Email address"
                required
                className="rounded-lg border border-gray-700 h-[7vh] text-white md:w-[30vw] !px-5 bg-transparent  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                name="Lastname"
                placeholder="Last name"
                required
                className="rounded-lg border border-gray-700 h-[7vh] text-white md:w-[30vw] !px-5 bg-transparent  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
              <Input
                type="number"
                name="name"
                placeholder="Phone number"
                required
                className="rounded-lg border border-gray-700 h-[7vh] text-white md:w-[30vw] !px-5 bg-transparent  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>
          <Textarea
            name="message"
            row={6}
            required
            placeholder="Your message"
            className="rounded-lg border border-gray-700 h-[7vh] text-white md:w-[30vw] !px-5 bg-transparent  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none"
          />
          <Button
            type="submit"
            className="max-w-lg !py-6 !px-[5rem]
      cursor-pointer rounded-lg  bg-white text-black  text-md shadow hover:from-blue-700 hover:to-blue-500 transition"
          >
            Submit Form
          </Button>
          <span className="block text-center text-sm text-green-600 font-medium !mt-2 min-h-[1.5em]">
            {result}
          </span>
        </form>
      </div>
    </div>
  );
}

export default Contact
