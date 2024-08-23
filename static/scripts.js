document.addEventListener('DOMContentLoaded', function () {
  const themeToggleButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Load the user's theme preference from localStorage
  if (localStorage.getItem('theme') === 'dark') {
      body.classList.replace('bg-light', 'bg-dark');
      body.classList.replace('text-dark', 'text-light');
      themeIcon.classList.replace('bi-moon', 'bi-sun'); // Switch to sun icon
      themeToggleButton.classList.replace('btn-outline-secondary', 'btn-outline-light');
  } else {
      body.classList.replace('bg-dark', 'bg-light');
      body.classList.replace('text-light', 'text-dark');
      themeIcon.classList.replace('bi-sun', 'bi-moon'); // Switch to moon icon
      themeToggleButton.classList.replace('btn-outline-light', 'btn-outline-secondary');
  }

  // Toggle theme on button click
  themeToggleButton.addEventListener('click', function () {
      if (body.classList.contains('bg-light')) {
          body.classList.replace('bg-light', 'bg-dark');
          body.classList.replace('text-dark', 'text-light');
          themeIcon.classList.replace('bi-moon', 'bi-sun'); // Switch to sun icon
          themeToggleButton.classList.replace('btn-outline-secondary', 'btn-outline-light');
          localStorage.setItem('theme', 'dark');
      } else {
          body.classList.replace('bg-dark', 'bg-light');
          body.classList.replace('text-light', 'text-dark');
          themeIcon.classList.replace('bi-sun', 'bi-moon'); // Switch to moon icon
          themeToggleButton.classList.replace('btn-outline-light', 'btn-outline-secondary');
          localStorage.setItem('theme', 'light');
      }
  });
});

function getSummary() {
  let form = document.getElementById('summarize-form');
  let formData = new FormData(form);
  let loadingSpinner = document.getElementById('loading-spinner');
  let summaryResult = document.getElementById('summary-result');

  // Show the loading spinner
  loadingSpinner.classList.toggle('d-none');
  summaryResult.innerHTML = '';  // Clear previous results

  fetch('/summarize', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Hide the loading spinner
    loadingSpinner.classList.toggle('d-none');
    // Ensure the summary is a string
    const summaryText = data.summary ? String(data.summary) : 'No summary available';
    // Display the summary result
    summaryResult.innerHTML = '<h2>Summary:</h2><p>' + summaryText + '</p>';
  })
  .catch(error => {
    loadingSpinner.classList.toggle('d-none');
    console.error('Error:', error);
    summaryResult.innerHTML = '<p class="text-danger">An error occurred. Please try again.</p>';
  });
}

