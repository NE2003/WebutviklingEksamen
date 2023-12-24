
async function sendMessage() {
  try {
      // Get input values
      var name = document.getElementById("name").value;
      var subject = document.getElementById("Subject").value;
      var message = document.getElementById("message").value;

      // Clear the input fields
      document.getElementById("name").value = "";
      document.getElementById("Subject").value = "";
      document.getElementById("message").value = "";

      // Show a custom notification
      var notification = document.getElementById("notification");
      notification.innerText = "Message sent!";
      notification.classList.remove("hidden");

      // Hide the notification after 3 seconds (3000 milliseconds)
      setTimeout(function () {
          notification.classList.add("hidden");
      }, 3000);

      // Add data to Firestore
      const messagesCollection = collection(firestore, 'messages');

      await addDoc(messagesCollection, {
          name: name,
          subject: subject,
          message: message
      });

      console.log("Message sent successfully!");
  } catch (error) {
      console.error("Error sending message:", error);
  }
}