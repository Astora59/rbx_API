import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript pour typer un artiste
export interface IArtist extends Document {
  name: string;
  genre: string;
  contact: string;
  vid: string;
  img: string;
  description: string;
}

// Schéma Mongoose
const artistSchema: Schema = new Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  contact: { type: String, required: true },
  vid: { type: String, required: false },
  img: { type: String, required: false },
  description: { type: String, required: true },
});

// Modèle Mongoose
const Artist = mongoose.model<IArtist>("Artist", artistSchema);

export default mongoose.model("Artist", artistSchema);
