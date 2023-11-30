export default function routes(fuelConsumption){

    let message="";
async function home(req,res){

    
req.flash("message",message);
    res.render("index");

}

async function addVehicle(req,res){

    let description=req.body.description;
    let reg_number=req.body.regNumber;

  

    let result=await fuelConsumption.addVehicle(description,reg_number);

    if(result.message){
        message=result.message;
    }
    else{
        message="Sucessfuly added new vehicle";
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

let result= await fuelConsumption.refuel(id,liters,amount,distance,filled);

console.log(result);



}

return{
    home,
    addVehicle,
    vehicles,
    refuel
}
}