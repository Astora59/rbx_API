"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const artists_1 = __importDefault(require("../models/artists")); // Importe le modèle `Artist`
const router = express_1.default.Router(); // Crée une instance de routeur Express
// Route POST : Ajouter un nouvel artiste
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newArtist = new artists_1.default(req.body); // Utilise directement le modèle pour créer un nouvel artiste
        const savedArtist = yield newArtist.save(); // Sauvegarde l'artiste dans MongoDB
        res.status(201).json(savedArtist); // Renvoie une réponse avec le document créé
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
        res.status(400).json({ error: errorMessage }); // En cas d'erreur, renvoie une réponse 400
    }
}));
// Route GET : Récupérer tous les artistes
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield artists_1.default.find(); // Utilise le modèle pour récupérer tous les documents
        res.status(200).json(artists); // Renvoie les artistes récupérés
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
        res.status(500).json({ error: errorMessage }); // En cas d'erreur, renvoie une réponse 500
    }
}));
exports.default = router; // Exporte le routeur
