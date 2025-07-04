import { Router } from "express";
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  searchCharacterByName,
  searchCharacters
} from "../controllers/character.controller.js";

const router = Router();

router.get("/", getAllCharacters);
router.get("/search", searchCharacterByName);
router.get("/filter", searchCharacters);
router.get("/:id", getCharacterById);


router.post("/", createCharacter);

router.patch("/:id", updateCharacter);

router.delete("/:id", deleteCharacter);

export default router;
