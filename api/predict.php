<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load required scripts
require_once __DIR__ . '/../js/config.js';
require_once __DIR__ . '/../js/model-service.js';

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Get the image data from the request
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['image'])) {
        throw new Exception('No image data provided');
    }

    // Remove the data URL prefix if present
    $imageData = $input['image'];
    if (strpos($imageData, 'data:image') === 0) {
        $imageData = preg_replace('#^data:image/\w+;base64,#i', '', $imageData);
    }

    // Decode base64 image
    $imageData = base64_decode($imageData);
    if ($imageData === false) {
        throw new Exception('Invalid image data');
    }

    // Save image to temporary file
    $tempFile = tempnam(sys_get_temp_dir(), 'img_');
    file_put_contents($tempFile, $imageData);

    // Load model and make prediction
    $modelService = new ModelService();
    $modelService->loadModel();
    
    // Create image element from file
    $image = imagecreatefromstring($imageData);
    if ($image === false) {
        throw new Exception('Failed to create image from data');
    }

    // Make prediction
    $prediction = $modelService->predict($image);

    // Clean up
    imagedestroy($image);
    unlink($tempFile);

    // Return prediction
    echo json_encode([
        'success' => true,
        'prediction' => $prediction
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} 