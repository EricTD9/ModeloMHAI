# Emotions Prediction Model Service

This repository hosts a TensorFlow.js model for emotion prediction, designed to be used with GitHub Pages.

## Structure

```
├── index.html          # Main entry point
├── js/
│   ├── config.js       # Configuration settings
│   ├── model-service.js # Model loading and prediction logic
│   └── prediction-api.js # API interface for predictions
└── model/             # Model files (to be added)
    ├── model.json
    └── weights.bin
```

## Setup

1. Clone this repository
2. Add your TensorFlow.js model files to the `model/` directory
3. Enable GitHub Pages in the repository settings
4. Update the `config.js` file with your model's specific settings

## Usage

In your main website, include these scripts:

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://[your-github-username].github.io/[repository-name]/js/config.js"></script>
<script src="https://[your-github-username].github.io/[repository-name]/js/model-service.js"></script>
<script src="https://[your-github-username].github.io/[repository-name]/js/prediction-api.js"></script>
```

Then use the API in your code:

```javascript
// Example: Predict emotion from an image element
const result = await window.predictionAPI.predictEmotion(imageElement);
if (result.success) {
    console.log('Detected emotion:', result.prediction.emotion);
    console.log('Confidence:', result.prediction.confidence);
}

// Example: Predict from base64 image
const base64Image = 'data:image/jpeg;base64,...';
const result = await window.predictionAPI.predictFromBase64(base64Image);
```

## Model Requirements

- Input shape: 224x224x3 (RGB image)
- Output: 7 emotion classes (angry, disgust, fear, happy, sad, surprise, neutral)
- Format: TensorFlow.js model (model.json + weights.bin)

## License

[Your chosen license] 