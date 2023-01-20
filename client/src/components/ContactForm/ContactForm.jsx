import React from "react";
import "./ContactForm.css";

const ContactForm = ({ handleAddContact, loading }) => {
  return (
    <div>
      <form onSubmit={handleAddContact}>
        <div className="col-2-input">
          {/* First Name */}
          <label htmlFor="fName" className="form-control w-half">
            First Name <br />
            <input
              className="form-input first-name"
              type="text"
              name="fName"
              id="fName"
              required
            />
          </label>
          {/* Last Name */}
          <label htmlFor="lName" className="form-control w-half">
            Last Name <br />
            <input
              className="form-input last-name"
              type="text"
              name="lName"
              id="lName"
              required
            />
          </label>
        </div>
        <div className="col-2-input">
          {/* Email */}
          <label htmlFor="email" className="form-control w-half">
            Email <br />
            <input
              className="form-input email"
              type="email"
              name="email"
              id="email"
              required
            />
          </label>
          {/* Last Name */}
          <label htmlFor="phone-number" className="form-control w-half">
            Mobile Number <br />
            <input
              className="form-input phone-number"
              type="number"
              name="phoneNumber"
              id="phone-number"
              required
            />
          </label>
        </div>
        <button
          className={`btn ${loading ? "btn-loading" : "btn-not-loading"}`}
          type="submit"
          disabled={loading}
        >
          ADD CONTACT
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
