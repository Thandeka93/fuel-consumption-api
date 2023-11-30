import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import pgPromise from 'pg-promise';
import Handlebars from 'handlebars';
import 'dotenv/config';
import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionAPI from './fuel-consumption-api.js';
import routes from './routes/routes.js';

const app = express();

// Define the database connection string
const connectionString = process.env.PGDATABASE_URL ||
  'postgres://wifupwqs:wpIluzICkbJNGJBP_xkrE2igdvOze1ve@ella.db.elephantsql.com/wifupwqs'

// Create a PostgreSQL database instance and connect to it
const pgp = pgPromise();
const db = pgp(connectionString);

const fuelConsumption = FuelConsumption(db);
const fuelConsumptionAPI = FuelConsumptionAPI(fuelConsumption);
const route= routes(fuelConsumption);



const PORT = process.env.PORT || 3000;

// Set up Handlebars as the template engine
app.engine(
    'handlebars',
    engine({
      handlebars: Handlebars,
      helpers: {
        json: function (context) {
          return JSON.stringify(context);
        },
      },
    })
  );
  
  // Set the view engine to Handlebars
  app.set('view engine', 'handlebars');
  
  // Serve static files from the 'public' directory
  app.use(express.static('public'));
  
  // Configure middleware for parsing request bodies
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  // Set up session management with a secret key
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
    })
  );
  
  // Use the 'express-flash' middleware for flash messages
  app.use(flash());

app.use(express.json());

//routes
app.get("/",route.home);
app.post('/vehicle', route.addVehicle);
app.get("/vehicles",route.vehicles);
app.post("/refuel",route.refuel);


app.get('/api/vehicles', fuelConsumptionAPI.vehicles);
app.get('/api/vehicle', fuelConsumptionAPI.vehicle);
app.post('/api/vehicle', fuelConsumptionAPI.addVehicle);
app.post('/api/refuel', fuelConsumptionAPI.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

