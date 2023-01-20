import React from "react";
import "./ContactList.css";

const ContactList = ({ localContacts, handleDeleteContact, loading }) => {
  return (
    <div>
      <h2 className="page-title">List of All Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {localContacts.map((localContact, i) => (
            <tr key={localContact._id}>
              <td className="text-center">{i + 1}</td>
              <td>
                {localContact.firstName} {localContact.lastName}
              </td>
              <td>{localContact.email}</td>
              <td>{localContact.mobileNumber}</td>
              <td
                onClick={() => handleDeleteContact(localContact._id)}
                className={`text-center ${
                  loading ? "del-cel-loading" : "del-cel"
                }`}
              >
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
