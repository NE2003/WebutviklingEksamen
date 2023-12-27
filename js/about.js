document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.signupForm-message');
    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      // Submit the form data using fetch
      try {
        const response = await fetch('/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.querySelector('#name').value,
            Subject: form.querySelector('#Subject').value,
            message: form.querySelector('#message').value,
          }),
        });

        const result = await response.json();

        if (result.success) {
          // Show success notification
          showNotification('Message sent!', 'success');

        } else {
          // Show error notification
          showNotification('Message failed!', 'error');
        }
      } catch (error) {
        console.error(error);
        // Show error notification
        showNotification('Message failed!', 'error');
      }
    });

    function showNotification(message, type) {
      const notification = document.getElementById('notification');
      notification.innerText = message;
      notification.classList.remove('hidden');
      notification.classList.add(type);

      // Reset form fields
      form.querySelector('#name').value = '';
      form.querySelector('#Subject').value = '';
      form.querySelector('#message').value = '';

      // Hide the notification after 3 seconds (3000 milliseconds)
      setTimeout(function () {
        notification.classList.add('hidden');
        notification.classList.remove(type);
      }, 3000);
    }
  });