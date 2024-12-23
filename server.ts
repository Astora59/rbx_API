const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const app = express(); // Création d'une instance de l'application Express.
const port = process.env.PORT || 3000; // Définit le port sur lequel le serveur va écouter (par défaut 3000, sinon depuis les variables d'environnement).

// Middleware
app.use(express.json()); // Middleware pour analyser le corps des requêtes en JSON.
app.use(cors()); // Active CORS pour autoriser les requêtes depuis d'autres domaines.
app.use(morgan("dev")); // Active Morgan pour logguer les requêtes HTTP dans la console (mode 'dev' pour des logs colorés).

// Connexion à MongoDB Atlas
mongoose
  .connect(process.env.DATABASE_URL, { // `process.env.DATABASE_URL` contient l'URL de connexion à MongoDB (récupérée du fichier `.env`).
    useNewUrlParser: true, // Utilise le nouvel analyseur d'URL MongoDB (meilleure gestion des connexions).
    useUnifiedTopology: true, // Active le nouveau moteur de gestion des connexions MongoDB.
  })
  .then(() => { // Si la connexion réussit...
    console.log("MongoDB connected successfully!"); // ... affiche un message de succès.
  })
  .catch((error: { message: any; }) => { // Si la connexion échoue...
    console.error("MongoDB connection error:", error.message); // ... affiche un message d'erreur avec la description.
  });

// Définition d'une route de test
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => { // Quand une requête GET est envoyée à la racine `/`...
  res.send("API is running!"); // ... renvoie une réponse simple "API is running!".
});

// Lancement du serveur
app.listen(port, () => { // Lance le serveur en écoutant sur le port défini.
  console.log(`Server is running on http://localhost:${port}`); // Affiche un message avec l'URL du serveur local.
});

import artistsRoutes from "./routes/artistsRoutes";

app.use("/artists", artistsRoutes); // Montre les routes sur le chemin `/artists`


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error: any) => {
    console.error("MongoDB connection error:", error.message);
  });

