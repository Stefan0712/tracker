import type { Exercise } from "../types/types";

export const MOCK_EXERCISES: Exercise[] = [
    {
        _id: "66591024b10cf716d120aef1",
        name: "Push-up",
        description: "A classic bodyweight exercise targeting the chest, shoulders, and triceps.",
        category: "strength",
        difficulty: "Beginner",
        isUnilateral: false,
        estimatedDuration: 60, // in seconds
        authorId: "system_curated_001",
        isCurated: true,
        isPrivate: false,
        isShared: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        
        // Array of target muscles involved
        muscles: [
            {
            _id: "66591024b10cf716d120am01",
            name: "Chest (Pectoralis Major)",
            region: "Upper Body",
            group: "Chest",
            isAnterior: true,
            isCustom: false
            },
            {
            _id: "66591024b10cf716d120am02",
            name: "Triceps Brachii",
            region: "Upper Body",
            group: "Arms",
            isAnterior: false,
            isCustom: false
            },
            {
            _id: "66591024b10cf716d120am03",
            name: "Anterior Deltoid",
            region: "Upper Body",
            group: "Shoulders",
            isAnterior: true,
            isCustom: false
            }
        ],

        tags: ["bodyweight", "compound", "push", "home-friendly"],

        equipment: [
            {
            _id: "66591024b10cf716d120ae00",
            name: "Bodyweight",
            description: "No external equipment required.",
            measurements: [],
            isCustom: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
            }
        ],

        trackingFields: [
            {
                _id: "66591024b10cf716d120at01",
                name: "Reps",
                type: "number",
                target: 10,
                isRequired: true,
                unit: 'reps'
            }
        ],

        instructions: [
            "Place your hands on the floor slightly wider than shoulder-width apart.",
            "Extend your legs straight behind you, balancing on your toes, keeping your body in a straight line from head to heels.",
            "Lower your body by bending your elbows until your chest nearly touches the floor.",
            "Keep your core engaged and elbows tucked at roughly a 45-degree angle.",
            "Push through your palms to return to the starting position, fully extending your arms."
        ],

        notes: [
            "Do not let your hips sag or your lower back arch during the movement.",
            "If standard push-ups are too difficult, modify by dropping your knees to the floor."
        ]
    },
    {
  "_id": "66591024b10cf716d120aef2",
  "name": "Dumbbell Bicep Curl",
  "description": "An isolation exercise focused on building strength and size in the biceps.",
  "category": "strength",
  "difficulty": "Beginner",
  "isUnilateral": true,
  "estimatedDuration": 45,
  "authorId": "system_curated_001",
  "isCurated": true,
  "isPrivate": false,
  "isShared": true,
  "createdAt": "2026-05-31T10:00:00.000Z",
  "updatedAt": "2026-05-31T10:00:00.000Z",
  "muscles": [
    {
      "_id": "66591024b10cf716d120am04",
      "name": "Biceps Brachii",
      "region": "Upper Body",
      "group": "Arms",
      "isAnterior": true,
      "isCustom": false
    },
    {
      "_id": "66591024b10cf716d120am05",
      "name": "Brachialis",
      "region": "Upper Body",
      "group": "Arms",
      "isAnterior": true,
      "isCustom": false
    }
  ],
  "tags": ["isolation", "arms", "pull", "hypertrophy"],
  "equipment": [
    {
      "_id": "66591024b10cf716d120ae01",
      "name": "Dumbbells",
      "description": "A pair of free-weight dumbbells.",
      "measurements": [],
      "isCustom": false,
      "createdAt": "2026-05-31T10:00:00.000Z",
      "updatedAt": "2026-05-31T10:00:00.000Z"
    }
  ],
  "trackingFields": [
    {
      "_id": "66591024b10cf716d120at02",
      "name": "Weight",
      "type": "number",
      "target": 12,
      "unit": "kg",
      "isRequired": true
    },
    {
      "_id": "66591024b10cf716d120at03",
      "name": "Reps",
      "type": "number",
      "target": 12,
      "isRequired": true
    }
  ],
  "instructions": [
    "Stand up straight with a dumbbell in each hand, arms extended down at your sides, and palms facing forward.",
    "Keep your elbows close to your torso and lock your upper arms in place.",
    "Exhale and curl the weights up toward shoulder level by contracting your biceps, keeping the rest of your body stationary.",
    "Continue to raise the dumbbells until your biceps are fully contracted and the weights are at shoulder height.",
    "Inhale and slowly begin to lower the dumbbells back down to the starting position."
  ],
  "notes": [
    "Avoid using momentum or swinging your back to lift the weight.",
    "Keep your wrists straight throughout the entire movement."
  ]
},
{
  "_id": "66591024b10cf716d120aef3",
  "name": "Incline Treadmill Walk",
  "description": "A low-impact cardio exercise that increases heart rate and glute engagement by walking on an upward slope.",
  "category": "cardio",
  "difficulty": "Beginner",
  "isUnilateral": false,
  "estimatedDuration": 1800,
  "authorId": "system_curated_001",
  "isCurated": true,
  "isPrivate": false,
  "isShared": true,
  "createdAt": "2026-05-31T10:00:00.000Z",
  "updatedAt": "2026-05-31T10:00:00.000Z",
  "muscles": [
    {
      "_id": "66591024b10cf716d120am06",
      "name": "Gluteus Maximus",
      "region": "Lower Body",
      "group": "Glutes",
      "isAnterior": false,
      "isCustom": false
    },
    {
      "_id": "66591024b10cf716d120am07",
      "name": "Gastrocnemius (Calves)",
      "region": "Lower Body",
      "group": "Calves",
      "isAnterior": false,
      "isCustom": false
    },
    {
      "_id": "66591024b10cf716d120am08",
      "name": "Hamstrings",
      "region": "Lower Body",
      "group": "Thighs",
      "isAnterior": false,
      "isCustom": false
    }
  ],
  "tags": ["cardio", "endurance", "low-impact", "fat-burn"],
  "equipment": [
    {
      "_id": "66591024b10cf716d120ae02",
      "name": "Treadmill",
      "description": "An electronic running/walking deck with adjustable speed and incline settings.",
      "measurements": [],
      "isCustom": false,
      "createdAt": "2026-05-31T10:00:00.000Z",
      "updatedAt": "2026-05-31T10:00:00.000Z"
    }
  ],
  "trackingFields": [
    {
      "_id": "66591024b10cf716d120at04",
      "name": "Duration",
      "type": "time",
      "target": 30,
      "unit": "min",
      "isRequired": true
    },
    {
      "_id": "66591024b10cf716d120at05",
      "name": "Incline Level",
      "type": "number",
      "target": 8,
      "isRequired": false
    },
    {
      "_id": "66591024b10cf716d120at06",
      "name": "Speed",
      "type": "number",
      "target": 5,
      "isRequired": false
    }
  ],
  "instructions": [
    "Step onto the treadmill rails and safely start the belt at a low speed.",
    "Adjust the incline setting to your target percentage grade (e.g., 8% to 12%).",
    "Increase the speed to a steady, brisk walking pace that forces a deep stride but prevents you from jogging.",
    "Maintain an upright posture, pumping your arms naturally at your sides."
  ],
  "notes": [
    "Avoid holding onto the treadmill handrails or leaning back, as this drastically reduces the caloric burn and muscle activation.",
    "Engage your core to help maintain your balance against the incline slope."
  ]
},
{
  "_id": "66591024b10cf716d120aef4",
  "name": "Dumbbell Chest Fly",
  "description": "An isolation exercise that isolates the pectoral muscles by mimicking a hugging motion, maximizing chest stretch and contraction.",
  "category": "strength",
  "difficulty": "Intermediate",
  "isUnilateral": false,
  "estimatedDuration": 50,
  "authorId": "system_curated_001",
  "isCurated": true,
  "isPrivate": false,
  "isShared": true,
  "createdAt": "2026-05-31T13:00:00.000Z",
  "updatedAt": "2026-05-31T13:00:00.000Z",
  "muscles": [
    {
      "_id": "66591024b10cf716d120am01",
      "name": "Chest (Pectoralis Major)",
      "region": "Upper Body",
      "group": "Chest",
      "isAnterior": true,
      "isCustom": false
    },
    {
      "_id": "66591024b10cf716d120am03",
      "name": "Anterior Deltoid",
      "region": "Upper Body",
      "group": "Shoulders",
      "isAnterior": true,
      "isCustom": false
    }
  ],
  "tags": ["isolation", "chest", "push", "hypertrophy"],
  "equipment": [
    {
      "_id": "66591024b10cf716d120ae01",
      "name": "Dumbbells",
      "description": "A pair of free-weight dumbbells.",
      "measurements": [],
      "isCustom": false,
      "createdAt": "2026-05-31T10:00:00.000Z",
      "updatedAt": "2026-05-31T10:00:00.000Z"
    },
    {
      "_id": "66591024b10cf716d120ae03",
      "name": "Flat Bench",
      "description": "A standard weightlifting bench.",
      "measurements": [],
      "isCustom": false,
      "createdAt": "2026-05-31T10:00:00.000Z",
      "updatedAt": "2026-05-31T10:00:00.000Z"
    }
  ],
  "trackingFields": [
    {
      "_id": "66591024b10cf716d120at07",
      "name": "Weight",
      "type": "number",
      "target": 10,
      "unit": "kg",
      "isRequired": true
    },
    {
      "_id": "66591024b10cf716d120at08",
      "name": "Reps",
      "type": "number",
      "target": 12,
      "isRequired": true
    }
  ],
  "instructions": [
    "Lie flat on a bench holding a dumbbell in each hand above your chest with palms facing each other and arms extended straight up.",
    "Lower your arms out to the sides in a wide arc, maintaining a slight, locked bend in your elbows to avoid joint strain.",
    "Continue lowering the weights until you feel a deep, comfortable stretch across your chest.",
    "Reverse the movement by squeezing your chest muscles together, following the same wide arc back up to the starting point."
  ],
  "notes": [
    "Do not allow the dumbbells to touch at the top of the movement to maintain continuous tension on the chest.",
    "Ensure your lower back remains pressed comfortably against the bench; do not excessively arch your spine."
  ]
}
]