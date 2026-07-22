const User = require('../models/userModel')
const { GoogleGenAI, Type } = require('@google/genai')
const GEMINI_API_KEY = process.env.GEMINI_API

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

const profile = async (req, res) => {
    try {
        res.status(200).json({user: req.user})
    } catch (err) {
        res.status(500).json({message: 'Server error fetching user profile', error: err.message})
    }
}

// @acces GET /api/v1/users/recipe/:humor
const getRecipe = async (req, res) => {
    try {
        const { humor } = req.params
        const randomSeed = Math.floor(Math.random() * 2147483647)
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash-lite',
            contents: `[Request ID: ${Date.now()}-${randomSeed}] Génère une recette de cuisine en français adapté à cette humeur : ${humor}.
            La recette doit être réaliste et comporter des quantités bien définies`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        cookingTime: { type: Type.STRING },
                        ingredients: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        steps: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING}
                        }
                    },
                    required: ['title', 'cookingTime', 'ingredients', 'steps']
                }
            }
        })

        res.status(200).json(JSON.parse(response.text))
    } catch (err) {
        res.status(500).json({message: 'Server error fetching receipe'})
    }
}

module.exports = {
    profile,
    getRecipe
}