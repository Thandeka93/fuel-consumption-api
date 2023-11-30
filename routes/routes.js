// This function defines routes for handling various actions related to fuel consumption

// The function takes a parameter 'fuelConsumption', for handling fuel consumption data
export default function routes(fuelConsumption){

    let message="";
    let ids=[];
async function home(req,res){

    ids=await fuelConsumption.vehicles(); 
req.flash("message",message);
    res.render("index",{ids,

    });

}

// async function addVehicle(req,res){

//     let description=req.body.description;
//     let reg_number=req.body.regNumber;

  

//     let result=await fuelConsumption.addVehicle(description,reg_number);
   
//     console.log(result)

//     if(result.message){
//         message=result.message;
//     }
//     else{
//         message="Sucessfuly added new vehicle";
//     }


//     res.redirect("/");

// }
// async function addVehicle(req, res) {
//     let description = req.body.description;
//     let reg_number = req.body.regNumber;

//     let result = await fuelConsumption.addVehicle(description, reg_number);

//     console.log(result);

//     if (result.message) {
//         message = result.message;
//     } else {
//         message = "Successfully added new vehicle";
//     }

//     res.redirect("/");
// }
async function addVehicle(req, res) {
    try {
        const { description, regNumber } = req.body;

        if(!description && !regNumber){
            req.flash('error', 'Please enter description and reg_number');
        }
        else if (!description) {
            req.flash('error', 'Description should not be blank');
            // message = "Description should not be blank";
        } else if (!regNumber) {
            req.flash('error', 'Reg_Number should not be blank');
            // message = "Reg_Number should not be blank";
        } else {
            const result = await fuelConsumption.addVehicle({ description, regNumber });

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

    res.redirect("/");
}




async function vehicles(req,res){

    let vehicles= await fuelConsumption.vehicles();

    res.render("vehicles",{vehicles,

    });
}


async function refuel(req,res){

    let id=req.body.id;
    let liters=req.body.liters;
    let amount= req.body.amount;
    let distance=req.body.distance;
    let isFull= req.body.filled;
    let filled= isFull=="Yes"? true:false;
    let vehicle_id=Number(id);

let result= await fuelConsumption.refuel(vehicle_id,liters,amount,distance,filled);

console.log(result);
res.redirect("/");


}

return{
    home,
    addVehicle,
    vehicles,
    refuel
}
}
