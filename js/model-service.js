class ModelService {
    constructor() {
        this.model = null;
        this.isModelLoaded = false;
        this.emotions = CONFIG.MODEL_CONFIG.emotions;
    }

    async loadModel() {
        if (this.isModelLoaded) return;

        try {
            this.model = await tf.loadLayersModel(CONFIG.MODEL_PATHS.model);
            this.isModelLoaded = true;
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Error loading model:', error);
            throw error;
        }
    }

    async preprocessImage(imageElement) {
        // Convert image to tensor
        const tensor = tf.browser.fromPixels(imageElement)
            .resizeNearestNeighbor([224, 224]) // Resize to model input size
            .toFloat()
            .expandDims()
            .div(255.0); // Normalize to [0,1]
        
        return tensor;
    }

    async predict(imageElement) {
        if (!this.isModelLoaded) {
            await this.loadModel();
        }

        try {
            // Preprocess the image
            const tensor = await this.preprocessImage(imageElement);
            
            // Make prediction
            const prediction = await this.model.predict(tensor);
            const probabilities = await prediction.data();
            
            // Clean up tensors
            tensor.dispose();
            prediction.dispose();

            // Get the emotion with highest probability
            const maxIndex = probabilities.indexOf(Math.max(...probabilities));
            const emotion = this.emotions[maxIndex];
            const confidence = probabilities[maxIndex];

            return {
                emotion,
                confidence,
                probabilities: Object.fromEntries(
                    this.emotions.map((emotion, index) => [emotion, probabilities[index]])
                )
            };
        } catch (error) {
            console.error('Error making prediction:', error);
            throw error;
        }
    }
}

// Create a global instance
window.modelService = new ModelService(); 