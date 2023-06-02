const headers = {
  "X-RapidAPI-Key": "6ff155c908msh4e71fb8b64a736ap1a37bajsn2c368becfb29",
  "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
};
const formElement = document.querySelector("form");
const inputElement = document.querySelector("input");
const countryElement = document.querySelector("#country");
const locationElement = document.querySelector("#location");
const tempElement = document.querySelector("#temp");
const celsiusButton = document.querySelector("#celsius");
const fahrenheitButton = document.querySelector("#fahrenheit");
const weatherConditionElement = document.querySelector("#weatherCondition");
const weatherImage = document.querySelector("#weatherImage");
const dayElement = document.querySelector("#day");
const dateTimeElement = document.querySelector("#dateTime");
const forecast = document.querySelector("#forecast");

const dayLists = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  dayElement.innerHTML = dayLists[date.getDay()];
  dateTimeElement.innerHTML = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
};

const getApi = async (data) => {
  try {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${data}&days=3`;
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    const result = await response.json();
    countryElement.innerHTML = result.location.country;
    locationElement.innerHTML = result.location.name;
    tempElement.innerHTML = Math.round(result.current.temp_c);
    weatherConditionElement.innerHTML = result.current.condition.text;
    weatherImage.src = result.current.condition.icon;
    formatDate(result.current.last_updated_epoch);

    // for forecast append child element
    result.forecast.forecastday.map((item) => {
      const getDate = new Date(item.date_epoch * 1000).getDay();

      forecast.innerHTML += `
      <div class='bg-slate-300 rounded-md p-10 shadow-md'>
        <h1 class='text-end font-bold text-lg'>${dayLists[getDate]}</h1>
        <div class='flex flex-col justify-center items-center'>
          <img src='${item.day.condition.icon}' class='my-5' alt='forecast' />
          <span class='text-md font-bold my-3'>${item.day.condition.text}</span>
          <h6 class='text-3xl my-5'>${Math.round(item.day.avgtemp_c)}˚C</h6>
        </div>
      </div>`;
    });

    // for celsius temp
    celsiusButton.addEventListener("click", (e) => {
      e.preventDefault();

      // for change Class
      celsiusButton.classList.add("bg-red-600", "text-white", "rounded-md");
      fahrenheitButton.classList.remove(
        "bg-red-600",
        "text-white",
        "rounded-md"
      );
      tempElement.innerHTML = Math.round(result.current.temp_c);
    });

    // for fahrenheit temp
    fahrenheitButton.addEventListener("click", (e) => {
      e.preventDefault();

      // for change Class
      fahrenheitButton.classList.add("bg-red-600", "text-white", "rounded-md");
      celsiusButton.classList.remove("bg-red-600", "text-white", "rounded-md");
      tempElement.innerHTML = Math.round(result.current.temp_f);
    });
  } catch (error) {
    console.error(error);
  }
};

getApi("Yangon");

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  getApi(inputElement.value);
  if (forecast.hasChildNodes) {
    forecast.innerHTML = "";
  }
});
