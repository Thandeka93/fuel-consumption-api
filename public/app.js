// Define API URLs
const apiUrl = 'https://your-api-url.com/api';
const vehiclesUrl = `${apiUrl}/vehicles`;
const addVehicleUrl = `${apiUrl}/vehicle`;
const recordRefuelUrl = `${apiUrl}/refuel`;

// Function to fetch and display vehicles
async function displayVehicles() {
    try {
        const response = await axios.get(vehiclesUrl);
        const vehicles = response.data.data;

        const vehiclesList = document.getElementById('vehicles-list');
        vehiclesList.innerHTML = ''; // Clear previous content

        vehicles.forEach(vehicle => {
            const vehicleDiv = document.createElement('div');
            vehicleDiv.innerHTML = `
                <p>Description: ${vehicle.description}</p>
                <p>Total Distance Traveled: ${vehicle.total_distance}</p>
                <p>Total Fuel Spent: ${vehicle.total_amount}</p>
                <p>Fuel Consumption: ${vehicle.fuel_consumption || 'N/A'}</p>
            `;
            vehiclesList.appendChild(vehicleDiv);
        });
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    }
}

// Function to add a new vehicle
async function addVehicle() {
    const description = document.getElementById('description').value;
    const regNumber = document.getElementById('regNumber').value;

    try {
        await axios.post(addVehicleUrl, { description, regNumber });
        // Refresh the vehicles list after adding a new vehicle
        displayVehicles();
    } catch (error) {
        console.error('Error adding vehicle:', error);
    }
}

// Function to record a car refuel
async function recordRefuel() {
    const vehicleId = document.getElementById('vehicleId').value;
    const liters = document.getElementById('liters').value;
    const amount = document.getElementById('amount').value;
    const distance = document.getElementById('distance').value;
    const filledUp = document.getElementById('filledUp').checked;

    try {
        await axios.post(recordRefuelUrl, { vehicleId, liters, amount, distance, filledUp });
        // Refresh the vehicles list after recording a refuel
        displayVehicles();
    } catch (error) {
        console.error('Error recording refuel:', error);
    }
}

// Initial display of vehicles
displayVehicles();
