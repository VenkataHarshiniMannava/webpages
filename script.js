// Initialize contacts array from local storage or create an empty array
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Function to display the contacts on the UI
function displayContacts() {
  const contactListElement = document.getElementById("contact-list");
  contactListElement.innerHTML = ""; // Clear previous list

  contacts.forEach(contact => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${contact.name}</strong> - ${contact.email} - ${contact.phone}
      <button onclick="deleteContact(${contact.id})">Delete</button>
    `;
    contactListElement.appendChild(li);
  });
}

// Function to delete a contact
function deleteContact(contactId) {
  // Find the index of the contact in the array
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index !== -1) {
    // Remove the contact from the array
    contacts.splice(index, 1);

    // Update the UI to reflect the changes
    displayContacts();

    // Update local storage with the new list of contacts
    updateLocalStorage();
  }
}

// Function to add a new contact
function addContact(name, email, phone) {
  const newContact = {
    id: Date.now(),
    name: name,
    email: email,
    phone: phone
  };
  contacts.push(newContact);

  // Update the UI to reflect the changes
  displayContacts();

  // Update local storage with the new list of contacts
  updateLocalStorage();
}

// Function to update the local storage with the current list of contacts
function updateLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Event listener for the form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get values from the form
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Add the contact and clear the form fields
  addContact(name, email, phone);
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
});
  
// Load contacts from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
  displayContacts();
});
