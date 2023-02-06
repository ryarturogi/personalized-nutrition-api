import generateDescription from '../../utils/openai'

export default async function handler(req, res) {
  const {
    from,
    to,
    age,
    gender,
    height,
    weight,
    activityLevel,
    dietaryRestrictions,
    goals,
    healthConditions,
    foodPreferences,
    dailyCalorieIntake,
    macroRatios: { protein, fat, carbohydrates },
    microNutrientRequirements: { vitaminA, vitaminC, iron },
  } = req.body

  const prompt = `
  Act as Senior Nutritionist and generate a personalized nutrition plan using the following information:

  User Data: "
    Age: ${age}
    Gender: ${gender}
    Height: ${height}
    Weight: ${weight}
    Activity Level: ${activityLevel}
    Dietary Restrictions: ${dietaryRestrictions}
    goals: ${goals}
    Health Conditions: ${healthConditions}
    Food Preferences: ${foodPreferences}
    Daily Calorie Intake: ${dailyCalorieIntake}
    Macro Ratios: ${protein}, ${fat}, ${carbohydrates}
    Micro Nutrient Requirements: ${vitaminA}, ${vitaminC}, ${iron}
    From: ${from}
    To: ${to}
"

  serialize the following data, and return it as a JSON string in the response body, this will be used as the format to generate the personalized nutrition plan, this is just an example, don't use this data:
  "{
    personalizedNutritionPlan: {
      from: "2021-01-01",
      to: "2021-01-07",
      breakfast: [
        "1 cup oatmeal",
        "1 cup milk",
        "1 cup berries",
        "1 cup water"
      ],
      lunch: [
        "1 cup brown rice",
        "1 cup black beans",
        "1 cup broccoli",
        "1 cup water"
      ],
      dinner: [
        "1 cup brown rice",
        "1 cup black beans",
        "1 cup broccoli",
        "1 cup water"
      ],
      snacks: [
        "1 cup almonds",
        "1 cup water"
      ]
    },
    exerciseRecommendations: [
      "30 minutes of cardio",
      "30 minutes of strength training",
      "30 minutes of yoga",
      "30 minutes of stretching",
      "30 minutes of walking",
      "30 minutes of running"
    ],
    groceryListRecommendations: [
      "almonds",
      "oatmeal",
      "milk",
      "berries",
      "brown rice",
      "black beans",
      "broccoli"
    ]
  }"
  `
  const recommendNutritionData = await generateDescription(prompt)

  res.status(200).json(parseData(recommendNutritionData))
}

function parseData(data) {
  try {
    let parsedData = JSON.parse(data)
    return parsedData
  } catch (error) {
    console.error('Error in parsing data: ', error)
    return null
  }
}
