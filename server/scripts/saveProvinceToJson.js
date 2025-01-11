const axios = require("axios");
const fs = require("fs");
const path = require("path");

const apiUrl = "https://provinces.open-api.vn/api?depth=3"; // with depth = 3 we get all info of the provinces
const fetchAndSaveProvincesToJson = async () => {
  try {
    const dataDir = path.join("data");
    const filePath = path.join(dataDir, "provinces.json");

    if (fs.existsSync(filePath)) {
      console.log("Data file already exists. Reading from provinces.json...");

      const fileData = fs.readFileSync(filePath, "utf-8");
      const provincesData = JSON.parse(fileData);

      console.log("Returning data from provinces.json");
      return provincesData;
    }

    console.log("Fetching data from the API...");
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Ensure the "data" directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir); // Create the "data" directory if it doesn't exist
    }

    // Save the fetched data to a JSON file
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);

    console.log("Data successfully fetched and saved to provinces.json");
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching or saving data:", error);
    throw error; // Propagate the error
  }
};

fetchAndSaveProvincesToJson();
