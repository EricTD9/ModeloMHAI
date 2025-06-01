class PredictionAPI {
    constructor() {
        this.modelService = window.modelService;
    }

    async predictEmotion(imageElement) {
        try {
            // First ensure the model is loaded
            await this.modelService.loadModel();
            
            // Make the prediction
            const prediction = await this.modelService.predict(imageElement);
            
            return {
                success: true,
                prediction: prediction
            };
        } catch (error) {
            console.error('Prediction error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Helper method to convert base64 image to Image element
    async base64ToImage(base64String) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = base64String;
        });
    }

    // Method to handle base64 image input
    async predictFromBase64(base64Image) {
        try {
            const imageElement = await this.base64ToImage(base64Image);
            return await this.predictEmotion(imageElement);
        } catch (error) {
            console.error('Error processing base64 image:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Create a global instance
window.predictionAPI = new PredictionAPI(); 