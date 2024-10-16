"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useCoordinates } from '@/contexts/CoordinatesContext';

const ImageProcessor: React.FC = () => {
  const { coordinates } = useCoordinates();
  const [pixelValue, setPixelValue] = useState<{ x: number; y: number } | null>(null);
  const [riskIndex, setRiskIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/WhaleOccurrence.png';
    img.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
      }
    };
    img.onerror = () => {
      setImageError("Failed to load the image. Please make sure 'WhaleOccurrence.png' is in the public folder.");
    };
  }, []);

  useEffect(() => {
    if (coordinates) {
      calculatePixelValue(coordinates.lat, coordinates.lng);
    }
  }, [coordinates]);

  const calculatePixelValue = (lat: number, lng: number) => {
    const x = Math.round(1 + (lng + 83.38) / 0.25567);
    const y = Math.round(1 + (lat + 19.2) / 0.16824);
    setPixelValue({ x, y });

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Clear previous highlight
        const img = new Image();
        img.src = '/WhaleOccurrence.png';
        ctx.drawImage(img, 0, 0);

        // Get pixel color
        const imageData = ctx.getImageData(x, y, 1, 1);
        const grayValue = imageData.data[0] / 255; // Assuming grayscale, we only need one channel
        setRiskIndex(grayValue);

        // Highlight selected pixel
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  return (
    <div className="w-full max-w-3xl">
      {imageError ? (
        <p className="text-red-500">{imageError}</p>
      ) : (
        <canvas
          ref={canvasRef}
          width={690}
          height={608}
          style={{ width: '690px', height: '608px' }}
          className="border border-gray-300"
        />
      )}
      <div className="mt-4">
        {pixelValue && (
          <>
            <p>X: {pixelValue.x}, Y: {pixelValue.y}</p>
            <p>PixelValue: X: {pixelValue.x}, Y: {pixelValue.y}</p>
          </>
        )}
        {riskIndex !== null && (
          <p>RiskIndex: {riskIndex.toFixed(4)}</p>
        )}
      </div>
    </div>
  );
};

export default ImageProcessor;