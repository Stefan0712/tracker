import { db } from "../db";
import { MOCK_EXERCISES } from "./mock";

export const seedExercises = async ()=> {
  try {
    const count = await db.exercises.count();
    
    if (count === 0) {
      await db.exercises.bulkAdd(MOCK_EXERCISES);
      console.log(`Successfully seeded ${MOCK_EXERCISES.length} exercises.`);
    }
  } catch (error) {
    console.error("Failed to seed exercises:", error);
  }
};