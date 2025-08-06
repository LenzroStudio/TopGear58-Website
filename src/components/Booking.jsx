"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  Car,
  ArrowLeft,
} from "lucide-react";

const Booking = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    carBrand: "",
    year: "",
    preferredDate: null,
    preferredTime: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [submitMessage, setSubmitMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  const serviceTypes = [
    "Oil Change",
    "Brake Service",
    "Engine Repair",
    "Transmission Service",
    "Tire Service",
    "General Inspection",
    "Emergency Repair",
    "Other",
  ];

  // Generate years from 1990 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) =>
    (1990 + i).toString()
  );

  const carBrands = [
    "Toyota",
    "Honda",
    "Nissan",
    "Mazda",
    "Mitsubishi",
    "Subaru",
    "Suzuki",
    "Lexus",
    "Acura",
    "Infiniti",
    "Hyundai",
    "Kia",
    "Ford",
    "Chevrolet",
    "GMC",
    "Dodge",
    "Jeep",
    "Chrysler",
    "Volkswagen",
    "Audi",
    "BMW",
    "Mercedes-Benz",
    "Porsche",
    "Volvo",
    "Jaguar",
    "Land Rover",
    "Mini",
    "Fiat",
    "Peugeot",
    "Renault",
    "Skoda",
    "Seat",
    "Tesla",
    "Other",
  ];

  // Generate time slots based on selected date
  const getTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];

    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // No work on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return [];
    }

    // Friday: 8:00 AM to 12:30 PM
    if (dayOfWeek === 5) {
      return [
        "08:00 AM",
        "08:30 AM",
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
      ];
    }

    // Monday to Thursday: 8:00 AM to 5:00 PM
    return [
      "08:00 AM",
      "08:30 AM",
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
      "05:00 PM",
    ];
  };

  // Check if date is a working day
  const isWorkingDay = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday only
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      // Format the date for submission
      const submissionData = {
        ...formData,
        preferredDate: formData.preferredDate
          ? format(formData.preferredDate, "yyyy-MM-dd")
          : "",
      };

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setSubmitStatus("success");
        setBookingDetails(result);

        // Show Sonner toast to user
        toast.success(
          "Your appointment has been submitted. Please check your email for confirmation and further details."
        );

        // Success message for the confirmation screen
        setSubmitMessage(
          "Your appointment has been received! You will get a confirmation email shortly. Our team will contact you to finalize your appointment."
        );

        // Reset form data but keep success screen
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            serviceType: "",
            carType: "", // <-- add this
            vehicleInfo: "",
            preferredDate: null,
            preferredTime: "",
            message: "",
          });
        }, 1000);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.error ||
            "There was an error submitting your booking. Please try again."
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      setSubmitStatus("error");
      setSubmitMessage(
        "There was a network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full text-center !px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center !mb-6 ${
            submitStatus === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {submitStatus === "success" ? (
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            )}
          </motion.svg>
        </motion.div>

        <h2
          className={`text-2xl font-bold !mb-4 ${
            submitStatus === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {submitStatus === "success" ? "Booking Confirmed!" : "Booking Failed"}
        </h2>

        <div className="max-w-md text-gray-300 !mb-6">
          <p className="!mb-4 leading-relaxed">{submitMessage}</p>

          {submitStatus === "success" && bookingDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-800/50 rounded-lg !p-4 text-left"
            >
              <h3 className="text-lg font-semibold text-white !mb-3">
                Booking Details:
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-400">Service:</span>{" "}
                  <span className="text-white">{formData.serviceType}</span>
                </p>
                <p>
                  <span className="text-gray-400">Date:</span>{" "}
                  <span className="text-white">
                    {formData.preferredDate
                      ? format(formData.preferredDate, "EEEE, MMMM d, yyyy")
                      : "Not selected"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Time:</span>{" "}
                  <span className="text-white">{formData.preferredTime}</span>
                </p>
                <p>
                  <span className="text-gray-400">Vehicle:</span>{" "}
                  <span className="text-white">{formData.vehicleInfo}</span>
                </p>
                <p>
                  <span className="text-gray-400">Car Brand:</span>{" "}
                  <span className="text-white">{formData.carType}</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {submitStatus === "success" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              setSubmitted(false);
              setSubmitStatus(null);
              setSubmitMessage("");
              setBookingDetails(null);
              onBack();
            }}
            className="bg-[#ff2c2c] hover:bg-[#ff2c2c]/90 text-white !px-8 !py-3 rounded-lg transition-colors font-semibold"
          >
            Close
          </motion.button>
        )}

        {submitStatus === "error" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              setSubmitted(false);
              setSubmitStatus(null);
              setSubmitMessage("");
            }}
            className="bg-red-600 hover:bg-red-700 text-white !px-6 !py-2 rounded-lg transition-colors"
          >
            Try Again
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col h-full w-full"
    >
      {/* Header */}
      <div className="flex items-center !p-6 border-b border-white/10 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white border border-gray-400 rounded-full !p-2 !mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-bold text-white">Book Appointment</h2>
      </div>

      {/* Form Container with proper scrolling */}
      <div
        className="flex-1 overflow-y-scroll !p-3"
        style={{ maxHeight: "calc(90vh - 140px)" }}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-md mx-auto !pb-8"
        >
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white !mb-4 border-b border-white/20 !pb-2">
              Personal Information
            </h3>

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gray-300 text-sm flex items-center gap-2 !mb-3"
              >
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-300 text-sm flex items-center gap-2 !mb-3"
              >
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-gray-300 text-sm flex items-center gap-2 !mb-3"
              >
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Service Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white !mb-4 border-b border-white/20 !pb-2">
              Service Details
            </h3>

            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-2 !mb-3">
                Service Type *
              </Label>
              <Select
                onValueChange={(value) =>
                  handleInputChange("serviceType", value)
                }
              >
                <SelectTrigger className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-white/20 z-[80]">
                  {serviceTypes.map((service) => (
                    <SelectItem
                      key={service}
                      value={service}
                      className="text-white hover:bg-white/10"
                    >
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Car Brand Dropdown */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-2 !mb-3">
                <Car className="w-4 h-4" />
                Car Brand *
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("carBrand", value)}
                value={formData.carBrand}
                required
              >
                <SelectTrigger className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none">
                  <SelectValue placeholder="Select car brand" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-white/20 z-[80]">
                  {carBrands.map((brand) => (
                    <SelectItem
                      key={brand}
                      value={brand}
                      className="text-white hover:bg-white/10"
                    >
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Dropdown */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm flex items-center gap-2 !mb-3">
                <span className="w-4 h-4" />
                Year *
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("year", value)}
                value={formData.year}
                required
              >
                <SelectTrigger className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-white/20 z-[80]">
                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={year}
                      className="text-white hover:bg-white/10"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Scheduling Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white !mb-4 border-b border-white/20 !pb-2">
              Appointment Scheduling
            </h3>

            <div className="space-y-4">
              {/* Date Picker */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm flex items-center gap-2 !mb-3">
                  <CalendarIcon className="w-4 h-4" />
                  Preferred Date *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white  justify-start text-left font-normal outline-none focus:outline-none ${
                        !formData.preferredDate && "text-gray-400"
                      }`}
                    >
                      <CalendarIcon className="!mr-2 h-4 w-4" />
                      {formData.preferredDate ? (
                        format(formData.preferredDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto !p-0 bg-black border border-white/20 z-[80]"
                    align="start"
                    sideOffset={5}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Calendar
                      mode="single"
                      selected={formData.preferredDate}
                      onSelect={(date) =>
                        handleInputChange("preferredDate", date)
                      }
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        // Disable past dates and weekends
                        return date < today || !isWorkingDay(date);
                      }}
                      initialFocus
                      className="bg-black text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Picker */}
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm flex items-center gap-2 !mb-3">
                  <Clock className="w-4 h-4" />
                  Preferred Time *
                </Label>
                {formData.preferredDate ? (
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("preferredTime", value)
                    }
                  >
                    <SelectTrigger className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-white/20 z-[80]">
                      {getTimeSlots(formData.preferredDate).map((time) => (
                        <SelectItem
                          key={time}
                          value={time}
                          className="text-white hover:bg-white/10"
                        >
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="w-full h-11 !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-gray-400 flex items-center">
                    Please select a date first
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white !mb-4 border-b border-white/20 !pb-2">
              Additional Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white !mb-2">
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="message"
                placeholder="Any additional information about your vehicle or service needs..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="w-full min-h-[100px] !px-4 !py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-gray-400 resize-none focus:border-[#ff2c2c] focus:ring-1 focus:ring-[#ff2c2c] transition-all outline-none focus:outline-none"
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="!pt-6 !pb-8 border-t border-white/10">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#ff2c2c] hover:bg-[#ff2c2c]/90 text-white font-semibold rounded-lg border-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </div>
              ) : (
                "Book Appointment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Booking;
