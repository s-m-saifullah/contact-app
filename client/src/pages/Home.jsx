import React, { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import "./Home.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [localContacts, setLocalContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://contact-app-server-sepia.vercel.app/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);
        setLocalContacts(data);
      });
  }, []);

  // Add a Contact
  const handleAddContact = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const firstName = form.fName.value;
    const lastName = form.lName.value;
    const email = form.email.value;
    const mobileNumber = form.phoneNumber.value;

    const contact = {
      firstName,
      lastName,
      email,
      mobileNumber,
    };
    console.log(contact);

    fetch("https://contact-app-server-sepia.vercel.app/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          contact["_id"] = data.insertedId;
          setLocalContacts((prevState) => [...prevState, contact]);
          setLoading(false);
          form.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  // Delete a Contact
  const handleDeleteContact = (id) => {
    setLoading(true);
    const consent = confirm("Do you want to delete the contact?");

    if (consent) {
      const remaining = localContacts.filter((contact) => contact._id !== id);
      setLocalContacts(remaining);

      fetch(
        `https://contact-app-server-sepia.vercel.app/api/contacts?id=${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.deletedCount > 0) {
            console.log("Successfully Deleted Contact");
          }
        });
    }
  };

  return (
    <div className="home">
      <div className="app">
        <h1 className="page-title">Contact App</h1>
        <ContactForm handleAddContact={handleAddContact} loading={loading} />
        {localContacts.length > 0 ? (
          <ContactList
            localContacts={localContacts}
            handleDeleteContact={handleDeleteContact}
            loading={loading}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
