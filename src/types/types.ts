export const TRACKING_TYPES = ['number', 'time', 'boolean', 'text'] as const;
export const NUMBER_UNITS = ['kg', 'lbs', 'km', 'mi', 'm', 'reps'] as const;
export const TIME_UNITS = ['sec', 'min', 'hrs'] as const;

export type TrackingType = typeof TRACKING_TYPES[number];
export type NumberUnit = typeof NUMBER_UNITS[number];
export type TimeUnit = typeof TIME_UNITS[number];

export const ALL_UNITS = [...NUMBER_UNITS, ...TIME_UNITS] as const;
export type Unit = typeof ALL_UNITS[number];

export type ExerciseCategory = 'strength' | 'cardio' | 'mobility' | 'isometric' | 'plyometric' | 'other';

export type ExerciseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';



export interface Exercise {
  _id: string;
  name: string;
  description?: string;
  category: ExerciseCategory;
  muscles?: MuscleDefinition[];
  tags?: string[];
  difficulty: ExerciseDifficulty;
  equipment?: Equipment[];
  trackingFields?: TrackingField[];
  isUnilateral?: boolean;
  estimatedDuration?: number;
  instructions?: string[];
  imgUrl?: string;
  videoUrl?: string;
  notes?: string[];
  authorId: string;
  isCurated: boolean;
  isPrivate: boolean;
  isShared: boolean;
  createdAt: string;
  updatedAt: string;
}


// Muscles

export type BodyRegion = 'Upper Body' | 'Lower Body' | 'Core';

export interface MuscleDefinition {
  _id: string;
  name: string;
  region: BodyRegion;
  group: string;
  isAnterior: boolean;
  isCustom: boolean;
  imageUrl?: string;
}


export interface EquipmentMeasurement {
  _id: string;
  name: string;
  value: number | string;
  unit?: string;
  description?: string;
}

export interface Equipment {
  _id: string;
  name: string;
  description?: string;
  measurements?: EquipmentMeasurement[];
  imgUrl?: string;
  isCustom: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface WorkoutExercise {
  _id: string;  
  sourceId: string;
  name: string;
  type: string;
  tags: string[];
  muscles: MuscleDefinition[];            
  exerciseId: string;       // Reference to Exercise._id
  order: number;            
  sets: PlannedSet[];       
  rest: number;             // In seconds
  notes?: string;           
  isOptional: boolean;    
  trackingFields: TrackingField[]; 
}

export interface PlannedSet {
  _id: string;              
  type?: 'Warmup' | 'Normal' | 'Drop' | 'Failure';
  order: number;
  fields: TrackingField[];
}


export interface TrackingField {
  _id: string;
  name: string;
  type?: TrackingType;
  target: number;
  unit?: Unit;
  isRequired: boolean;
  value: number;
}


export interface Workout {
  _id: string;
  name: string;             
  description?: string;
  notes?: string;           
  exercises: WorkoutExercise[];
  
  estimatedDuration?: number; 
  tags: string[];             
  
  // Media
  imageUrl?: string;
  videoUrl?: string;

  // Metadata & Social
  authorId: string;
  isCustom: boolean;
  isPrivate: boolean;
  isShared: boolean;
  isPinned: boolean;        // For public profile showcase
  isFavorite: boolean;      // For private library sorting
  
  createdAt: string;
  updatedAt: string;
}



export interface TagSuggestion {
  _id: string;        
  name: string;       // Lowercase version for querying
  displayName: string;// Display version
  usageCount: number; // To sort autocomplete by most used
  isCustom: boolean;  
}