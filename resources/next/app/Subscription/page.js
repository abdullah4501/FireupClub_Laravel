"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "world-countries";
import axios from "axios";



const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 4;
  const [showCustomInput, setShowCustomInput] = useState(false); 
  const [customIndustry, setCustomIndustry] = useState(""); 
  const [showOccupationField, setShowOccupationField] = useState(false);
  const [loading, setLoading] = useState(false);


  const industries = [
    { value: "retail", label: "Retail" },
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "food_beverages", label: "Food & Beverages" },
    { value: "realestate", label: "Consulting Real Estate" },
    { value: "advertisement", label: "Advertisement Agency" },
    { value: "education", label: "Education" },
    { value: "realestate", label: "Consulting Real Estate" },
    { value: "manufacturing/wholesale", label: "Manufacturing / Wholesale" },
    { value: "media/entertainment", label: "Media / Entertainent" },
    { value: "transportation", label: "Transportation Logistics" },
    { value: "event_management", label: "Event Management" },
    { value: "travel_tourism", label: "Travel & Tourism" },
    { value: "factory_production", label: "Factory Production Facility" },
    { value: "home_decor", label: "Home Decor" },
    { value: "rent_car", label: "Rent a Car" },
    { value: "legal_service", label: "Legal Service" },
    { value: "photography", label: "Photography" },
    { value: "artisanal_handcraft", label: "Artisanal Handcraft" },
    { value: "pets", label: "Pets" },
    { value: "online_store", label: "Online Store" },
    { value: "pr_agency", label: "PR agency" },
    { value: "other", label: "Other" },
  ];
  const { handleSubmit, control, trigger, formState: { errors } } = useForm({
    defaultValues: {
        name: "",
        phone: "",
        email: "",
        nationality: "",
        residence: "",
        age: "",
        linkedin: "",
        occupation: "",
        industry: "",
        experience: "",
        income: "",
        financial_goals: "", // Multi-select as an array
        specify_financial_goals: "", // Multi-select as an array
        net_worth: "",
        skills: "", // Multi-select as an array
        retire_years: "",
    },
});


  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true); // Show loading state while submitting
      // Convert the 'skills' and 'specify_financial_goals' to a comma-separated string if they're arrays
      if (Array.isArray(data.specify_financial_goals)) {
        data.specify_financial_goals = data.specify_financial_goals.map(option => option.value).join(',');
      }

      if (Array.isArray(data.skills)) {
        data.skills = data.skills.map(option => option.value).join(',');
      }

      const response = await axios.post("http://127.0.0.1:8000/api/subscription", data);
      setTimeout(() => {
        setLoading(false);
        setStep(5);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Failed to submit the form. Please try again.");
    }
  };
  

  

  const stepAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };
  const upToDownAnimation = {
    hidden: { opacity: 0, y: -50 }, 
    visible: { opacity: 1, y: 0 }, // Move to normal position
    exit: { opacity: 0, y: -50 }, // Optional: Exit back up
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      if (step === 0) {
        setStep(1); // Move to the first form step
      } else {
        const isValid = await trigger(); // Validate current step fields
        if (isValid) {
          nextStep(); // Move to the next step if valid
        }
      }
    }
  };


  return (
    <section className="multiform-section">
      <div className="multi-form-progress">
        <div className="progress-bar-track">
          <motion.div
            className="multi-form-bar-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
      <div className="bg-cover w-100 h-100 section-padding">
        <div className="container">
          {step === 0 ? (
            <div className="row align-items-center">
              <div className="col-12 col-lg-6 col-xl-6 col-md-6 mx-auto">
                <div className="section-title text-start">
                  <h2 className=" mb-4 text-white">
                    Welcome to the FireUpClub Subscription
                  </h2>
                </div>
                <p className="mb-4">
                  Begin your journey with us. Fill out the form and get
                  registered with FireupClub.
                </p>
                <button
                  type="button"
                  className="theme-btn bg-2"
                  onClick={() => setStep(1)}
                >
                  Get Started <i className="fa fa-long-arrow-right"></i>
                </button>
              </div>
              <div className="col-md-6"></div>
            </div>
          ) : (
            <div className="multiform-wrapper">
              <form
                onKeyDown={handleKeyDown}
                onSubmit={handleSubmit(onSubmit)}
                className="multi-form-items"
                noValidate
              >
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      className="step step-1"
                      key="step-1"
                      variants={stepAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <div className="row justify-content-between">
                        <div className="col-12 col-xl-5 col-lg-5">
                          <div className="form-group mb-5">
                            <label>Enter Full Name *</label>
                            <Controller
                              name="name"
                              control={control}
                              rules={{ required: "Name is required." }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="Full Name"
                                />
                              )}
                            />
                            {errors.name && (
                              <p className="error-text">{errors.name.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Enter Email *</label>
                            <Controller
                              name="email"
                              control={control}
                              rules={{
                                required: "Email is required.",
                                pattern: {
                                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                  message: "Invalid email format.",
                                },
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="email"
                                  placeholder="Email"
                                  className={errors.email ? "input-error" : ""}
                                />
                              )}
                            />
                            {errors.email && <p className="error-text">{errors.email.message}</p>}
                          </div>
                          <div className="form-group mb-5">
                            <label>Enter Phone Number *</label>
                            <Controller
                              name="phone"
                              control={control}
                              rules={{
                                required: "Phone number is required.",
                                validate: (value) =>
                                  value && value.length >= 10
                                    ? true
                                    : "Invalid phone number.",
                              }}
                              render={({ field }) => (
                                <PhoneInput
                                  {...field}
                                  country={"us"}
                                  inputStyle={{
                                    width: "100%",
                                    padding: "10px",
                                    border: errors.phone
                                      ? "1px solid red"
                                      : "1px solid #ccc",
                                  }}
                                  dropdownStyle={{
                                    maxHeight: "200px",
                                    overflow: "auto",
                                  }}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                            {errors.phone && (
                              <p className="error-text">{errors.phone.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>LinkedIn URL (If any)</label>
                            <Controller
                              name="linkedin"
                              control={control}
                              rules={{
                                pattern: {
                                  value: /^https?:\/\/.+$/i, // Use regex object, not string
                                  message: "Invalid URL format. The URL must start with http:// or https://",
                                },
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="LinkedIn URL"
                                />
                              )}
                            />
                            {errors.linkedin && (
                              <p className="error-text">{errors.linkedin.message}</p>
                            )}
                          </div>

                        </div>
                        <div className="col-12 col-xl-5 col-lg-5">
                          <div className="form-group mb-5">
                            <label>Select Nationality *</label>
                            <Controller
                              name="nationality"
                              control={control}
                              rules={{ required: "Nationality is required." }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={countryOptions}
                                  placeholder="Select Country"
                                  value={countryOptions.find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => field.onChange(selectedOption.label)}
                                />
                              )}
                            />
                            {errors.nationality && (
                              <p className="error-text">{errors.nationality.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Country of Residence *</label>
                            <Controller
                              name="residence"
                              control={control}
                              rules={{ required: "Country of Residence is required." }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={countryOptions}
                                  placeholder="Select Country"
                                  value={countryOptions.find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => field.onChange(selectedOption.label)}
                                />
                              )}
                            />
                            {errors.residence && (
                              <p className="error-text">{errors.residence.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Enter Your Age *</label>
                            <Controller
                              name="age"
                              control={control}
                              rules={{
                                required: "Age is required.",
                                min: { value: 10, message: "Limited Digits." },
                              }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  placeholder="Age"
                                  min="1"
                                  max="100"
                                />
                              )}
                            />
                            {errors.age && (
                              <p className="error-text">{errors.age.message}</p>
                            )}
                          </div>

                        </div>
                      </div>


                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-next theme-btn bg-2 d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      className="step step-2"
                      key="step-2"
                      variants={stepAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <div className="row justify-content-between">
                        <div className="col-12">
                          <div className="form-group mb-5">
                            <label>Occupation *</label>
                            <Controller
                              name="occupation"
                              control={control}
                              rules={{ required: "Occupation is required." }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="Occupation"
                                />
                              )}
                            />
                            {errors.occupatiuon && (
                              <p className="error-text">{errors.occupation.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Select Industry *</label>
                            <Controller
                              name="industry"
                              control={control}
                              rules={{
                                validate: (value) => {
                                  if (!value) return "Industry is required.";
                                  if (value === "other" && !customIndustry.trim()) {
                                    return "Please provide a industry below.";
                                  }
                                  return true;
                                },
                              }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={industries}
                                  placeholder="Select Industry"
                                  value={industries.find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => {
                                    field.onChange(selectedOption.value);
                                    setShowCustomInput(selectedOption.value === "other");
                                  }}
                                  noOptionsMessage={() => "No options available"}
                                  filterOption={(candidate, input) => {
                                    if (candidate.data.value === "other") return true; // Always show "Other"
                                    if (!input) return true; // Show all options if no search input
                                    return candidate.label.toLowerCase().includes(input.toLowerCase());
                                  }}
                                />
                              )}
                            />
                            {errors.industry && (
                              <p className="error-text">{errors.industry.message}</p>
                            )}

                            {/* Show custom input when "Other" is selected */}
                            {showCustomInput && (
                              <input
                                type="text"
                                className={`mt-3 ${!customIndustry.trim() && showCustomInput ? "input-error" : ""
                                  }`}
                                value={customIndustry}
                                name="industry"
                                onChange={(e) => setCustomIndustry(e.target.value)}
                                placeholder="Enter your industry"
                              />

                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Years of Experience *</label>
                            <Controller
                              name="experience"
                              control={control}
                              rules={{ required: "Years of experience is required." }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={[
                                    { value: "0-2", label: "0-2" },
                                    { value: "2-5", label: "2-5" },
                                    { value: "5-10", label: "5-10" },
                                    { value: "10+", label: "10+" },
                                  ]}
                                  placeholder="Select Years of Experience"
                                  value={[
                                    { value: "0-2", label: "0-2" },
                                    { value: "2-5", label: "2-5" },
                                    { value: "5-10", label: "5-10" },
                                    { value: "10+", label: "10+" },
                                  ].find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => field.onChange(selectedOption.value)}
                                />
                              )}
                            />
                            {errors.experience && (
                              <p className="error-text">{errors.experience.message}</p>
                            )}
                          </div>
                          <div className="form-group mb-5">
                            <label>Annual Income *</label>
                            <Controller
                              name="income"
                              control={control}
                              rules={{ required: "Annual Income is required." }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={[
                                    { value: "20,000", label: "Less than $20,000" },
                                    { value: "20,000-49,000", label: "$20,000 - $49,000" },
                                    { value: "200,000-300,000", label: "$200,000-$300,000" },
                                    { value: "300,000+", label: "Greater than $300,000" },
                                  ]}
                                  placeholder="Select Years of Experience"
                                  value={[
                                    { value: "20,000", label: "Less than $20,000" },
                                    { value: "20,000-49,000", label: "$20,000 - $49,000" },
                                    { value: "200,000-300,000", label: "$200,000-$300,000" },
                                    { value: "300,000+", label: "Greater than $300,000" },
                                  ].find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => field.onChange(selectedOption.value)}
                                />
                              )}
                            />
                            {errors.experience && (
                              <p className="error-text">{errors.income.message}</p>
                            )}
                          </div>


                        </div>
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button
                          type="button"
                          className="multi-next theme-btn bg-2 d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      className="step step-3"
                      key="step-3"
                      variants={stepAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <div className="row justify-content-between">
                        <div className="col-12">
                          <div className="form-group mb-5">
                            <label>What are your financial goals?</label>
                            <Controller
                              name="financial_goals"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={[
                                    { value: "short_term", label: "Short-term goals (less than 5 years)" },
                                    { value: "medium_term", label: "Medium-term goals (3-7 years):" },
                                    { value: "long_term", label: "Long-term goals (5 to 10+ years)" },
                                    { value: "aditional_goals", label: "Additional goals:" },
                                  ]}
                                  placeholder="Select"
                                  value={[
                                    { value: "short_term", label: "Short-term goals (less than 5 years)" },
                                    { value: "medium_term", label: "Medium-term goals (3-7 years):" },
                                    { value: "long_term", label: "Long-term goals (5 to 10+ years)" },
                                    { value: "aditional_goals", label: "Additional goals:" },
                                  ].find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => {
                                    field.onChange(selectedOption.value);
                                    setShowOccupationField(!!selectedOption.value); // Show the input field if an option is selected
                                  }}
                                />
                              )}
                            />
                          </div>
                          
                          {showOccupationField && (
                                  
                            <motion.div
                              className="form-group mb-5"
                              key="occupation-field"
                              variants={upToDownAnimation} 
                              initial="hidden"
                              animate="visible"
                              transition={{ duration: 0.6, ease: "easeInOut" }} // Add optional transition overrides if needed
                            >
                              <label>Specify your Financial Goals *</label>
                              <Controller
                                name="specify_financial_goals"
                                control={control}
                                rules={{
                                  validate: (value) =>
                                    value && value.length > 0
                                      ? true
                                      : "Please select at least one financial goal.",
                                }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    isMulti // Enable multiple selection
                                    options={[
                                      { value: "worth_milestone", label: "Achieve a net worth milestone (e.g., $500,000, $1,000,000)" },
                                      { value: "frugality", label: "Reduce expenses and increase frugality" },
                                      { value: "lifestyle", label: "Develop a sustainable lifestyle that aligns with FI values" },
                                      { value: "volunteering", label: "Give back through philanthropy or volunteering" },
                                      { value: "other", label: "Other" },
                                    ]}
                                    placeholder="Select"
                                    value={field.value}
                                    onChange={(selectedOptions) => {
                                      field.onChange(selectedOptions); // Update selected options in state
                                    }}
                                  />
                                )}
                              />
                              {errors.specify_financial_goals && (
                                <p className="error-text">
                                  {errors.specify_financial_goals.message}
                                </p>
                              )}
                            </motion.div>
                          )}


                          <div className="form-group mb-5">
                            <label>What is your current Net Worth? *</label>
                            <Controller
                              name="net_worth"
                              control={control}
                              rules={{ required: "Net Worth is required." }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={[
                                    { value: "50,000", label: "Less than $50,000" },
                                    { value: "50,000-99,000", label: "$50,000 - $99,000" },
                                    { value: "100,000-199,999", label: "$100,000-$199,999" },
                                    { value: "200,000-300,000", label: "$200,000-$300,000" },
                                    { value: "300,000+", label: "Greater than $300,000" },
                                  ]}
                                  placeholder="Select Years of Experience"
                                  value={[
                                    { value: "50,000", label: "Less than $50,000" },
                                    { value: "50,000-99,000", label: "$50,000 - $99,000" },
                                    { value: "100,000-199,999", label: "$100,000-$199,999" },
                                    { value: "200,000-300,000", label: "$200,000-$300,000" },
                                    { value: "300,000+", label: "Greater than $300,000" },
                                  ].find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => field.onChange(selectedOption.value)}
                                />
                              )}
                            />
                            {errors.net_worth && (
                              <p className="error-text">{errors.net_worth.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button
                          type="button"
                          className="multi-next theme-btn bg-2 d-flex gap-2"
                          onClick={nextStep}
                        >
                          Next <i className="fal fa-long-arrow-right"></i>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      className="step step-4 select"
                      key="step-4"
                      variants={stepAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <div className="form-group mb-5 ">
                        <label>What skills do you wish to gain from fire up club? *</label>
                        <Controller
                          name="skills"
                          control={control}
                          rules={{
                            validate: (value) =>
                              value && value.length > 0
                                ? true
                                : "Please select at least one skill.",
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              isMulti // Enable multiple selection
                              options={[
                                { value: "ecommerce", label: "E-Commerce:" },
                                { value: "digital_books", label: "Digital Books Creationy" },
                                { value: "crypto_tading", label: "Crypto Trading" },
                                { value: "financial_planning", label: "Financial Planning" },
                                { value: "real_estate_investment", label: "Real Estate Investment" },
                                { value: "personal_branding", label: "Personal Branding" },
                                { value: "affilate_marketing", label: "Affiliate Marketing" },
                                { value: "digital_marketing", label: "Digital Marketing" },
                                { value: "portfolio_management", label: "Portfolio Management" },
                                { value: "risk_management", label: "Risk Management Techniques" },
                                { value: "global_investment", label: "Global Investment" },
                                { value: "startup", label: "Startup" },
                              ]}
                              placeholder="Select"
                              value={field.value}
                              onChange={(selectedOptions) => {
                                field.onChange(selectedOptions); 
                              }}
                            />
                          )}
                        />
                        {errors.skills && (
                          <p className="error-text">
                            {errors.skills.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group mb-5">
                            <label>How Early do you want to retire? *</label>
                            <Controller
                              name="retire_years"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  options={[
                                    { value: "5", label: "5" },
                                    { value: "7", label: "7" },
                                    { value: "12", label: "12" },
                                    { value: "15", label: "15" },
                                  ]}
                                  placeholder="Select"
                                  value={[
                                    { value: "5", label: "5" },
                                    { value: "7", label: "7" },
                                    { value: "12", label: "12" },
                                    { value: "15", label: "15" },
                                  ].find((option) => option.value === field.value)}
                                  onChange={(selectedOption) => {
                                    field.onChange(selectedOption.value);
                                    setShowOccupationField(!!selectedOption.value); // Show the input field if an option is selected
                                  }}
                                />
                                
                              )}
                            />
                            {errors.retire_years && (
                              <p className="error-text">{errors.retire_years.message}</p>
                            )}
                      </div>
                      <div className="button-group d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="multi-prev d-flex gap-2"
                          onClick={prevStep}
                        >
                          <i className="fal fa-long-arrow-left"></i> Back
                        </button>
                        <button type="submit" className="theme-btn multi-submit d-flex gap-2">
                        {loading ? (
                          <div className="spinner-border custom-spinner " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          ""
                        )}
                          Submit
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </form>
            </div>
          )}
          {step === 5 && (
            <motion.div
              key="step-5"
              variants={stepAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="success-step"
            >
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                    <div className="section-title mb-5">
                      <h2 className="text-white">Congratulations! You've Successfully Submitted the Form</h2>
                    </div>
                    <p>Since you've filled out the Fireupclub subscription form, your details have been recorded successfully. You can expect to receive a confirmation email shortly</p>

                    <div className="button-group d-flex gap-3 align-items-center mt-5">
                    <Link href="/" className="theme-btn">
                      Go Back
                    </Link>
                    <span className="small text-white"> Go back to home page</span>
                  </div>
                </div>
                </div>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;
