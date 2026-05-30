export type ExerciseCategory = 'strength' | 'cardio' | 'mobility' | 'isometric' | 'plyometric' | 'other';

export type TrackingType = 'number' | 'time' | 'boolean' | 'text';

export type NumberUnit = 'kg' | 'lbs' | 'km' | 'mi' | 'm';

export type TimeUnit = 'sec' | 'min' | 'hrs';

export interface TrackingField {
  id: string;
  name: string;
  type: TrackingType;
  unit?: NumberUnit | TimeUnit;
  isRequired: boolean;
}

export interface Exercise {
  _id: string;
  name: string;
  description?: string;
  category: ExerciseCategory;
  muscles: MuscleDefinition[];
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: Equipment[];
  trackingFields: TrackingField[];
  isUnilateral: boolean;
  estimatedDuration?: number;
  instructions: string[];
  imgUrl?: string;
  videoUrl?: string;
  notes?: string;
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
  measurements: EquipmentMeasurement[];
  imgUrl?: string;
  isCustom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlannedSet {
  _id: string;              
  type: 'Warmup' | 'Normal' | 'Drop' | 'Failure';
  targets: Record<string, number | string>; 
}

export interface WorkoutExercise {
  _id: string;              
  exerciseId: string;       // Reference to Exercise._id
  order: number;            
  sets: PlannedSet[];       
  rest: number;             // In seconds
  notes?: string;           
  isOptional: boolean;      // Great addition for time-crunched days
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