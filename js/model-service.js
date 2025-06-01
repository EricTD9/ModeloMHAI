// Model service for emotion prediction
class ModelService {
    constructor() {
        this.model = null;
        this.isModelLoaded = false;
    }

    async loadModel() {
        if (this.isModelLoaded) return;

        try {
            console.log('Loading model from:', CONFIG.MODEL_PATHS.model);
            this.model = await tf.loadLayersModel(CONFIG.MODEL_PATHS.model);
            this.isModelLoaded = true;
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Error loading model:', error);
            throw error;
        }
    }

    async predict(imageElement) {
        if (!this.isModelLoaded) {
            await this.loadModel();
        }

        try {
            // Preprocess the image for InceptionV3
            const tensor = tf.tidy(() => {
                // Convert image to tensor and resize to 299x299
                const img = tf.browser.fromPixels(imageElement)
                    .resizeNearestNeighbor([299, 299])
                    .toFloat();

                // Normalize using ImageNet mean and std
                const normalized = tf.div(
                    tf.sub(img, tf.tensor1d(CONFIG.MODEL_CONFIG.normalization.mean)),
                    tf.tensor1d(CONFIG.MODEL_CONFIG.normalization.std)
                );

                // Add batch dimension
                return normalized.expandDims(0);
            });

            // Make prediction
            const prediction = await this.model.predict(tensor).data();
            
            // Clean up tensors
            tensor.dispose();

            // Get the emotion with highest probability
            const emotions = CONFIG.MODEL_CONFIG.emotions;
            const maxIndex = prediction.indexOf(Math.max(...prediction));
            
            return {
                emotion: emotions[maxIndex],
                confidence: prediction[maxIndex]
            };
        } catch (error) {
            console.error('Error making prediction:', error);
            throw error;
        }
    }
}

// Create and export the model service instance
window.modelService = new ModelService(); 