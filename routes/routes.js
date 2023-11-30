// Define a module exporting a function that takes a 'fuelConsumption' object as a parameter
export default function routes(fuelConsumption){

    // Initialize variables for message, fuelMessage, and ids
    let message="";
    let fuelMessage="";
    let ids=[];

    // Define an asynchronous function 'home' that takes 'req' and 'res' as parameters
    async function home(req, res){
        // Fetch vehicle IDs asynchronously and assign them to 'ids'
        ids = await fuelConsumption.vehicles(); 

        // Flash messages for the current request
        req.flash("message", message);
        req.flash("fuel", fuelMessage);

        // Render the 'index' view with 'ids'
        res.render("index", { ids });
    }

    // Define an asynchronous function 'addVehicle' that takes 'req' and 'res' as parameters
    async function addVehicle(req, res) {
        try {
            // Destructure 'description' and 'regNumber' from the request body
            const { description, regNumber } = req.body;

            // Check if 'description' and 'regNumber' are both empty
            if (!description && !regNumber){
                req.flash('error', 'Please enter description and reg_number');
            }
            // Check if 'description' is empty
            else if (!description) {
                req.flash('error', 'Description should not be blank');
                // message = "Description should not be blank";
            } 
            // Check if 'regNumber' is empty
            else if (!regNumber) {
                req.flash('error', 'Reg_Number should not be blank');
                // message = "Reg_Number should not be blank";
            } 
            // If both 'description' and 'regNumber' are provided, attempt to add the vehicle
            else {
                const result = await fuelConsumption.addVehicle({ description, regNumber });

                // Check the status of the result and update 'message' accordingly
                if (result.status === "error") {
                    message = result.message;
                } else {
                    req.flash('success', 'Successfully added new vehicle');
                    // message = "Successfully added new vehicle";
                }
            }
        } catch (error) {
            console.error("Error adding vehicle:", error);
            message = "An error occurred while adding the vehicle";
        }

        // Redirect to the home page
        res.redirect("/");
    }

    // Define an asynchronous function 'vehicles' that takes 'req' and 'res' as parameters
    async function vehicles(req, res){
        // Fetch vehicles asynchronously and assign them to 'vehicles'
        let vehicles = await fuelConsumption.vehicles();

        // Render the 'vehicles' view with 'vehicles'
        res.render("vehicles", { vehicles });
    }

  // Define an asynchronous function 'refuel' that takes 'req' and 'res' as parameters
async function refuel(req, res) {
    try {
        // Extract parameters from the request body
        let input = req.body.id;
        let id = input.slice(0, 2);
        let liters = req.body.liters;
        let amount = req.body.amount;
        let distance = req.body.distance;
        let isFull = req.body.filled;
        let filled = isFull == "Yes" ? true : false;
        let vehicle_id = Number(id);

        // Perform a refueling operation and update 'fuelMessage' based on the result
        let result = await fuelConsumption.refuel(vehicle_id, liters, amount, distance, filled);

        // Check the status of the result and update 'fuelMessage' accordingly
        if (result.status === "success") {
            req.flash('success', 'Successfully updated');
        } else {
            req.flash('error', result.message);
        }

    } catch (error) {
        console.error("Error refueling:", error);
        req.flash('error', 'An error occurred while refueling');
    }

    // Redirect to the home page
    res.redirect("/");
}


    // Return an object with the defined functions as properties
    return {
        home,
        addVehicle,
        vehicles,
        refuel
    }
}

