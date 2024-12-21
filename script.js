document.getElementById('btnAdd').onclick = function() {
    // Clear input fields
    document.getElementById('PaymentID').value = '';
    document.getElementById('Customer').value = '';
    document.getElementById('Location').value = '';
    document.getElementById('Mobile').value = '';
    document.getElementById('Amount').value = '';

    // Set current date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Populate date and time inputs
    document.getElementById('PaymentDate').value = `${year}-${month}-${day}`;
    document.getElementById('PaymentTime').value = `${hours}:${minutes}`;
};

document.getElementById('btnSave').onclick = function() {
    const paymentID = document.getElementById('PaymentID').value;
    const customer = document.getElementById('Customer').value;
    const location = document.getElementById('Location').value;
    const mobile = document.getElementById('Mobile').value;
    const amount = parseFloat(document.getElementById('Amount').value);
    const paymentDate = document.getElementById('PaymentDate').value;
    const paymentTime = document.getElementById('PaymentTime').value;

    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ PaymentID, Customer: customer, Location: location, Mobile: mobile, Amount: amount, PaymentDate: paymentDate, PaymentTime: paymentTime })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            // Optionally clear fields after saving
            document.getElementById('btnAdd').click();
        }
    })
    .catch(error => console.error('Error:', error));
};

document.getElementById('btnSearchName').onclick = function() {
    const customer = document.getElementById('Customer').value;

    fetch(`/search?Customer=${customer}`)
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        if (data.length > 0) {
            data.forEach(record => {
                resultsDiv.innerHTML += `<p>Payment ID: ${record.PaymentID}, Customer: ${record.Customer}, Location: ${record.Location}, Mobile: ${record.Mobile}, Amount: ${record.Amount}, Date: ${record.PaymentDate}, Time: ${record.PaymentTime}</p>`;
            });
        } else {
            resultsDiv.innerHTML = '<p>No records found.</p>';
        }
    })
    .catch(error => console.error('Error:', error));
};

document.getElementById('btnViewAll').onclick = function() {
    fetch('/records')
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results
        if (data.length > 0) {
            data.forEach(record => {
                resultsDiv.innerHTML += `<p>Payment ID: ${record.PaymentID}, Customer: ${record.Customer}, Location: ${record.Location}, Mobile: ${record.Mobile}, Amount: ${record.Amount}, Date: ${record.PaymentDate}, Time: ${record.PaymentTime}</p>`;
            });
        } else {
            resultsDiv.innerHTML = '<p>No records found.</p>'; // Inform user if no records exist
        }
    })
    .catch(error => console.error('Error:', error));
};