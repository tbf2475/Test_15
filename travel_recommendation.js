const countries = document.getElementById("countries");
const addDestinationButton = document.getElementById("addDestination");
const report = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');
const destinations = [];
     function addDestination() {
      const name = document.getElementById("name").value;
      const gender = document.querySelector('input[name="gender"]:checked');
      const age = document.getElementById("age").value;
      const countries = document.getElementById("countries").value;
      const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const newYorkTime = new Date().toLocaleTimeString('en-US', options);
      console.log("Current time in New York:", newYorkTime);

      if (countries) {
        destinations.push({ name,description,countries});
        resetForm();
        generateReport();
      }
    }
         function resetForm() {
      document.getElementById("name").value = "";
      document.querySelector('input[name="gender"]:checked').checked = false;
      document.getElementById("age").value = "";
      document.getElementById("countries").value = "";
    }
        function generateReport() {
      const numDestinations = destinations.length;
      const countriesCount = {
        Australia: 0,
        BoraBora: 0,
        Indonesia: 0,
        Brazil: 0,
        India: 0,
        "Japan": 0,
      };
      const genderCountriesCount = {
        Male: {
            Australia: 0,
            BoraBora: 0,
            Indonesia: 0,
            Brazil: 0,
            India: 0,
            "Japan": 0,
        },
        Female: {
            Australia: 0,
            BoraBora: 0,
            Indonesia: 0,
            Brazil: 0,
            India: 0,
            "Japan": 0,
        },
      };

      for (const destination of destinations) {
        countriesCount[destination.countries]++;
        genderCountriesCount[destination.gender][destination.countries]++;
      }

      report.innerHTML = `Number of destinations: ${numDestinations}<br><br>`;
      report.innerHTML += `Conditions Breakdown:<br>`;
      for (const countries in countriesCount) {
        report.innerHTML += `${countries}: ${countriesCount[countries]}<br>`;
      }

      report.innerHTML += `<br>Gender-Based Conditions:<br>`;
      for (const gender in genderCountriesCount) {
        report.innerHTML += `${gender}:<br>`;
        for (const countries in genderCountriesCount[gender]) {
          report.innerHTML += `&nbsp;&nbsp;${countries}: ${genderCountriesCount[gender][countries]}<br>`;
        }
      }
    }

addDestinationButton.addEventListener("click", addDestination);
    function searchCountries() {
    const input = document.getElementById('countriesInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const countries = data.countries.find(item => item.name.toLowerCase() === input);

        if (countries) {
          const description = countries.description;
    


          resultDiv.innerHTML += `<h2>${countries.name}</h2>`;
          resultDiv.innerHTML += `<img src="${countries.cities.imageUrl}" alt="hjh">`;
          resultDiv.innerHTML += `<p><strong>description:</strong> ${description}</p>`;
          
        } else {
          resultDiv.innerHTML = 'Condition not found.';

        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchCountries);
