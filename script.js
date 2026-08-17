let countries = [];

function findCountry(phoneInput) {
	try {
    // Strip everything except digits, then add the leading +
    const digitsOnly = phoneInput.replace(/[^\d]/g, "");
    const normalizedPhone = "+" + digitsOnly;

    const phoneNumber = libphonenumber.parsePhoneNumber(normalizedPhone);
    if (phoneNumber && phoneNumber.country) {
      const countryCode = phoneNumber.country;
      const countryData = countries.find((country) => country.code === countryCode);
      if (countryData) {
        document.getElementById("result").innerHTML = `
                    Country: ${countryData.name} <br>
                    <img src="${countryData.image}" alt="${countryData.name} Flag">
                `;
      } else {
        document.getElementById("result").textContent = "Country not found in database.";
      }
    } else {
      document.getElementById("result").textContent = "Invalid phone number.";
    }
  } catch (error) {
		document.getElementById("result").textContent = "Error: Please enter a valid phone number.";
	}
}

// Fetch country data
fetch('country.json')
	.then(response => response.json())
	.then(data => {
		countries = data;

		// If a phone number was passed in the URL, run automatically once data is ready
		const params = new URLSearchParams(window.location.search);
		const phone = params.get('phone');
		if (phone) {
			document.getElementById("phoneInput").value = phone;

			// Hide the form, show only the result
			document.querySelector('h1').style.display = 'none';
			document.getElementById("phoneInput").style.display = 'none';
			document.getElementById("findCountryBtn").style.display = 'none';

			findCountry(phone);
		}
	})
	.catch(error => console.error('Error fetching country data:', error));

document.getElementById("findCountryBtn").addEventListener("click", function () {
	const phoneInput = document.getElementById("phoneInput").value;
	findCountry(phoneInput);
});