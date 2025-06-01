const CONFIG = {
    // Model configuration
    MODEL_CONFIG: {
        inputShape: [1, 299, 299, 3],  // InceptionV3 input shape
        outputClasses: 5,  // Number of emotion classes
        emotions: [
            'Enojado',
            'Asustado',
            'Feliz',
            'Neutral',
            'Triste'
        ],
        // ImageNet normalization values
        normalization: {
            mean: [0.485, 0.456, 0.406],  // RGB mean
            std: [0.229, 0.224, 0.225]    // RGB std
        }
    },
    
    // Model paths
    MODEL_PATHS: {
        model: 'https://erictd9.github.io/ModeloMHAI/model/model.json',
        weights: 'https://erictd9.github.io/ModeloMHAI/model/group1-shard1of22.bin'
    },
    
    // API endpoints
    API_ENDPOINTS: {
        predict: '/predict'
    }
}; 