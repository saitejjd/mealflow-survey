document.getElementById('surveyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const suggestions = document.getElementById('suggestions').value;

    // **IMPORTANT: Replace with your actual Google Sheets API URL from Step 2**
    const googleSheetsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6MmfecJjd3Rjae9XmhxsPryLpZHI1qn-mPzYO-Ps5CdwbOU0SZCp9CoICNkWC4Pm24fAB9rDCZIvW/pub?gid=0&single=true&output=csv";

    // Construct the data string in CSV format (Email,Suggestions)
    const csvData = `Email,Suggestions\n"${email}","${suggestions}"`; // CSV with headers

    fetch(googleSheetsUrl, {
        method: 'POST', // Or 'GET' - GET might be simpler for Google Sheets, but POST is often preferred for form submissions
        headers: {
            'Content-Type': 'text/csv' // Tell Google Sheets we're sending CSV data
        },
        body: csvData, // Send the CSV data in the request body
        mode: 'no-cors' // Important for simple frontend Google Sheets writes in many cases - browser security restriction workaround
    })
    .then(response => {
        if (response.status === 200 || response.status === 204) { // Success response from Google Sheets might vary
            alert('Thank you for your feedback! We\'ll notify you when MealFlow launches.');
            document.getElementById('surveyForm').reset();
        } else {
            alert('Oops! Something went wrong. Please try again later.');
            console.error('Google Sheets submission error:', response.status, response.statusText);
        }
    })
    .catch(error => {
        alert('Oops! Something went wrong. Please try again later.');
        console.error('Error submitting to Google Sheets:', error);
    });
});