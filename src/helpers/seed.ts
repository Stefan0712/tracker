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
export const resetExercisesDatabase = async ()=> {
  try {    
    await db.exercises.clear();
    await db.exercises.bulkAdd(MOCK_EXERCISES);
    console.log(`Exercises database was reset. Successfully seeded ${MOCK_EXERCISES.length} exercises.`);
  } catch (error) {
    console.error("Failed to reset exercises:", error);
  }
};
export const resetWorkoutsDatabase = async ()=> {
  try {    
    await db.workouts.clear();
    console.log(`Workouts database was reset.`);
  } catch (error) {
    console.error("Failed to reset workouts:", error);
  }
};