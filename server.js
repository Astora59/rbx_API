"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, // Utilise le nouvel analyseur d'URL MongoDB (meilleure gestion des connexions).
    useUnifiedTopology: true, // Active le nouveau moteur de gestion des connexions MongoDB.
})
    .then(() => {
    console.log("MongoDB connected successfully!"); // ... affiche un message de succès.
})
    .catch((error) => {
    console.error("MongoDB connection error:", error.message); // ... affiche un message d'erreur avec la description.
});
// Définition d'une route de test
app.get("/", (req, res) => {
    res.send("API is running!"); // ... renvoie une réponse simple "API is running!".
});
// Lancement du serveur
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Affiche un message avec l'URL du serveur local.
});
const artistsRoutes_1 = __importDefault(require("./routes/artistsRoutes"));
app.use("/artists", artistsRoutes_1.default); // Montre les routes sur le chemin `/artists`
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("MongoDB connected successfully!");
})
    .catch((error) => {
    console.error("MongoDB connection error:", error.message);
});
