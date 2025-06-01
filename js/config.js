const CONFIG = {
    // Model configuration
    MODEL_CONFIG: {
        inputShape: [1, 224, 224, 3],  // Standard input shape for emotion detection
        outputClasses: 7,  // Number of emotion classes
        emotions: [
            'angry',
            'disgust',
            'fear',
            'happy',
            'sad',
            'surprise',
            'neutral'
        ]
    },
    
    // Model paths
    MODEL_PATHS: {
        model: 'model/model.json',
        weights: 'model/weights.bin'
    },
    
    // API endpoints
    API_ENDPOINTS: {
        predict: '/predict'
    }
}; 