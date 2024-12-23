import express, { Request, Response } from "express";
import Artist from "../models/artists"; // Importe le modèle `Artist`

const router = express.Router(); // Crée une instance de routeur Express

// Route POST : Ajouter un nouvel artiste
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const newArtist = new Artist(req.body); // Utilise directement le modèle pour créer un nouvel artiste
    const savedArtist = await newArtist.save(); // Sauvegarde l'artiste dans MongoDB
    res.status(201).json(savedArtist); // Renvoie une réponse avec le document créé
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
    res.status(400).json({ error: errorMessage }); // En cas d'erreur, renvoie une réponse 400
  }
});

// Route GET : Récupérer tous les artistes
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const artists = await Artist.find(); // Utilise le modèle pour récupérer tous les documents
    res.status(200).json(artists); // Renvoie les artistes récupérés
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
    res.status(500).json({ error: errorMessage }); // En cas d'erreur, renvoie une réponse 500
  }
});

export default router; // Exporte le routeur
