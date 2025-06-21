import { Router } from "express";
import { getAllCharacters, getCharacterById, createCharacter } from "../controllers/character.controller.js";

const router = Router();

router.get("/", getAllCharacters);
router.get("/:id", getCharacterById);

router.post("/", createCharacter);

export default router;
