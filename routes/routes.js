// This function defines routes for handling various actions related to fuel consumption

// The function takes a parameter 'fuelConsumption', for handling fuel consumption data

export default function routes(fuelConsumption) {

    // Variable to store flash message
    let message = "";

    // Route handler for the home page
    async function home(req, res) {
        // Flash the message and render the index page
        req.flash("message", message);
        res.render("index");
    }

    // Route handler for adding a new vehicle
    async function addVehicle(req, res) {
        // Extract data from the request body
        let description = req.body.description;
        let reg_number = req.body.regNumber;

        // Call the 'addVehicle' method from the 'fuelConsumption' object
        let result = await fuelConsumption.addVehicle(description, reg_number);

        // Check if there is a message in the result, update 'message' accordingly
        if (result.message) {
            message = result.message;
        } else {
            message = "Successfully added a new vehicle";
        }

        // Redirect to the home page
        res.redirect("/");
    }

    // Route handler for displaying the list of vehicles
    async function vehicles(req, res) {
        // Call the 'vehicles' method from the 'fuelConsumption' object
        let vehicles = await fuelConsumption.vehicles();

        // Render the 'vehicles' page with the retrieved vehicle data
        res.render("vehicles", { vehicles });
    }

    // Route handler for refueling a vehicle
    async function refuel(req, res) {
        // Extract data from the request body
        let id = req.body.id;
        let liters = req.body.liters;
        let amount = req.body.amount;
        let distance = req.body.distance;
        let isFull = req.body.filled;
        let filled = isFull == "Yes" ? true : false;

        // Call the 'refuel' method from the 'fuelConsumption' object
        let result = await fuelConsumption.refuel(id, liters, amount, distance, filled);

        // Log the result to the console (you might want to handle or log this result appropriately)
        console.log(result);
    }

    // Return an object containing the defined route handlers
    return {
        home,
        addVehicle,
        vehicles,
        refuel
    };
}
