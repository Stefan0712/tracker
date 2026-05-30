import Dexie, { type Table } from 'dexie';
import type { 
  Exercise, 
  Workout, 
  MuscleDefinition, 
  Equipment, 
  TagSuggestion 
} from './types/types';

export class FitnessDatabase extends Dexie {
  exercises!: Table<Exercise, string>;
  workouts!: Table<Workout, string>;
  muscles!: Table<MuscleDefinition, string>;
  equipment!: Table<Equipment, string>;
  tagSuggestions!: Table<TagSuggestion, string>;

  constructor() {
    super('FitnessAppDB');

    this.version(1).stores({
      exercises: '_id, category, authorId, isPrivate, isCurated, *tags, createdAt',
      workouts: '_id, authorId, isFavorite, isPinned, *tags, createdAt',
      muscles: '_id, region, group, isCustom',
      equipment: '_id, isCustom',
      tagSuggestions: '_id, &name, usageCount, isCustom'
    });
  }
}

export const db = new FitnessDatabase();