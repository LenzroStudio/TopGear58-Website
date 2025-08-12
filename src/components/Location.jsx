import { WorkingHours } from '@/assets/assets';
import { MapPin, Phone } from 'lucide-react';
import React from 'react'

const Location = () => {
  return (
    <div className="flex flex-col  items-center justify-center bg-gray-100 ">
      <div className="px-[5%] min-h-[50vh] outfit !p-[5%] bg-purple-950 text-white flex flex-col items-center gap-6 w-full">
        <h1 className="outfit text-lg">INFORMATION</h1>
        <div className="flex flex-col gap-[2rem] items-center">
          <h1 className="!p-1 text-sm md:text-lg border-b ">
            NAIROBI OFFICE WORKING HOURS AND LOCATION{" "}
          </h1>
          {/* working hours table and contact info*/}
          <div className="grid md:grid-cols-2">
            <div className="md:border-r md:border-white !p-2 !px-5 flex flex-col gap-2">
              {/* working hours */}
              <h1>TOPGEAR 58 VIP AUTO REPAIR SERVICES</h1>
              <p>NAIROBI</p>
              <div className="flex text-sm md:text-md items-center gap-3">
                <MapPin className="text-white w-5 h-5" />
                43 Enterprise Road, PO Box 01100, Nairobi, <br />
                Nairobi , Kenya
              </div>
              <p className="text-zinc-400 font-light w-fit !p-1 border-b">
                Opening times:
              </p>
              <div>
                {WorkingHours.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <h1 className="font-light">{item.day}</h1>
                      <p className="text-sm">
                        <span>{item.Openingtime}</span>
                        <span> - </span>
                        <span>{item.ClosingTime}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md:border-l md:border-white !p-2 !px-5 flex flex-col gap-2">
              <p className="flex flex-col gap-2">
                <span className="text-zinc-400 font-light !pb-1 border-b w-fit">
                  Lead Engineer:
                </span>
                <span className="border-none text-sm">
                  Mr. Bassam Abboud Wajih{" "}
                </span>
              </p>
              <p className="flex flex-col gap-2">
                <span className="text-zinc-400 font-light !pb-1 border-b w-fit">
                  Contact
                </span>
                <span className="border-none flex items-center gap-3 text-sm">
                  <Phone className="w-4" />
                  +25422160780 / +254717721103
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31910.590823329087!2d36.8380108!3d-1.2792793!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11a66a8b5077%3A0x52d611a099b8730e!2sTopGear58!5e0!3m2!1sen!2ske!4v1754911585791!5m2!1sen!2ske"
          style={{ border: 0 }}
          className="w-[100%] h-[60vh] hidden md:flex"
          allowFullScreen=""
          loading="lazy"
          about=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Location
