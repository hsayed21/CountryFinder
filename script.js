let countries = [];

// Fetch country data
fetch('country.json')
	.then(response => response.json())
	.then(data => {
		countries = data;
	})
	.catch(error => console.error('Error fetching country data:', error));



document.getElementById("findCountryBtn").addEventListener("click", function () {
	const phoneInput = document.getElementById("phoneInput").value;

	try {
		const phoneNumber = libphonenumber.parsePhoneNumber(phoneInput);
		if (phoneNumber && phoneNumber.country) {
			const countryCode = phoneNumber.country;

			// Find the country data from country.json
			const countryData = countries.find(country => country.code === countryCode);

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
});
