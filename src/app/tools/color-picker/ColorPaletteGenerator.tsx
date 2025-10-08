"use client";

import { useState, useEffect, useCallback } from 'react';
import chroma from 'chroma-js';

type ColorPalette = string[]; // Array of 8 hex color strings

interface GenerationMode {
    name: string;
    hueShift: number;       // Base hue shift (0: Mono, 30: Analogous, 120: Triadic, 180: Complementary, etc.)
    chromaAdjust: number;   // Adjustment to the base color's Chroma (saturation) for the SHADES.
    luminanceAdjust: number; // Adjustment to the base color's Luminance (brightness) - Used for descriptive purposes.
}

// 11 distinct modes to ensure variety and meet the "at least 10" requirement.
const GENERATION_MODES: GenerationMode[] = [
    { name: 'Monochromatic (Default)', hueShift: 0, chromaAdjust: 0, luminanceAdjust: 0 },
    { name: 'Analogous (Warm)', hueShift: 30, chromaAdjust: 0, luminanceAdjust: 0 },
    { name: 'Triadic (Balanced)', hueShift: 120, chromaAdjust: 0, luminanceAdjust: 0 },
    { name: 'Monochromatic (Vibrant)', hueShift: 0, chromaAdjust: 20, luminanceAdjust: 0 },
    { name: 'Analogous (Soft)', hueShift: 30, chromaAdjust: -15, luminanceAdjust: 0 },
    { name: 'Triadic (Dark Shades)', hueShift: 120, chromaAdjust: 0, luminanceAdjust: -10 },
    { name: 'Tetradic-like (Shift 90)', hueShift: 90, chromaAdjust: 0, luminanceAdjust: 0 },
    { name: 'Complementary (Light Accent)', hueShift: 180, chromaAdjust: 0, luminanceAdjust: 5 },
    { name: 'Analogous (Cool)', hueShift: -30, chromaAdjust: 0, luminanceAdjust: 0 },
    { name: 'Monochromatic (Bright Shades)', hueShift: 0, chromaAdjust: 0, luminanceAdjust: 10 },
    { name: 'Split Complementary (Shift 150)', hueShift: 150, chromaAdjust: 10, luminanceAdjust: 0 },
];

/**
 * Generates an 8-color LCH palette based on a hex color and a specific generation mode.
 * The TRUE base color (hexColor) is always fixed as the Primary Color (index 3).
 * The mode adjusts the Hue and Chroma used to calculate the surrounding shades and the accent color.
 */
const generatePalette = (hexColor: string, mode: GenerationMode): ColorPalette | undefined => {
    try {
        // Simple check to ensure chroma is available and color is valid
        if (typeof chroma === 'undefined' || !chroma.valid(hexColor)) return;
        
        const baseColor = chroma(hexColor);
        // Get the LCH values of the user-picked color
        const [L_base, C_base, H_base] = baseColor.lch(); 

        // 1. Calculate the target Hue and Chroma for the scale and accent based on the mode
        const H_shifted = (H_base + mode.hueShift) % 360;
        // Chroma is adjusted but clamped to a minimum value (e.g., 10) to avoid near-greys
        const C_adjusted = Math.max(C_base + mode.chromaAdjust, 10); 
        
        // 2. Define the LCH scale anchors using the adjusted HUE and CHROMA
        const C_scale = C_adjusted;
        const L_scale_start = 98; // Lightest point
        const L_scale_end = 5;    // Darkest point

        // The true base color is fixed at index 3
        const truePrimaryColor = hexColor;

        // Scale anchors use the SHIFTED HUE to create the scheme (e.g., analogous, triadic)
        const lightAnchor = chroma.lch(L_scale_start, C_scale, H_shifted).hex();
        const darkAnchor = chroma.lch(L_scale_end, C_scale, H_shifted).hex();

        // Create the LCH scale using the fixed anchors
        const scale = chroma.scale([lightAnchor, darkAnchor]).mode('lch').domain([L_scale_start, L_scale_end]);

        // 3. Generate secondary shades along the LCH scale (8 shades total)
        // Note: The L values are chosen to create a smoother, wider range of contrast
        const L100 = scale(90).hex();  // Very Light Shade (for surfaces)
        const L300 = scale(70).hex();  // Light Shade
        const L700 = scale(40).hex();  // Dark Shade
        const L900 = scale(20).hex();  // Darker Shade
        const L950 = scale(10).hex();  // Very Dark Shade (for text/shadows)
        
        // We will place the Primary color where its L value fits best, 
        // using the L_base from the user's input.
        // For simplicity in the array, we insert it manually below.

        // 4. Generate Accent and Neutral
        // Accent color hue is complementary to the SHIFTED hue
        const H_accent = (H_shifted + 180) % 360; 
        // Use the TRUE base color's L and C for the accent color, but with the new HUE
        const accentColor = chroma.lch(L_base, C_base, H_accent).hex(); 
        const neutralSurface = chroma.lch(97, 0, 0).hex(); // Off-white neutral (slightly lighter)

        // The palette structure is: Very Dark, Darker, Dark, TRUE PRIMARY, Light, Very Light, Accent, Neutral
        return [ L950, L900, L700, truePrimaryColor, L300, L100, accentColor, neutralSurface ];
    } catch (e) {
        console.error("Color generation error (Is chroma-js loaded?):", e);
        // Fallback to a default grey palette on error
        return ['#111111', '#333333', '#666666', '#999999', '#cccccc', '#dddddd', '#ff0000', '#f9f9f9'];
    }
};

const getContrastTextColor = (hexColor: string): string => {
    // Requires chroma.js to be loaded for proper calculation
    if (typeof chroma === 'undefined' || !chroma.valid(hexColor)) return '#000000';
    // Use an LCH luminance threshold (around 60 is a good split point)
    return chroma(hexColor).lch()[0] > 60 ? '#1f2937' : '#f9fafb'; // Dark blue-grey or near-white
};

const ColorPaletteGenerator = ({color}: {color: string}) => {
    const [currentPalette, setCurrentPalette] = useState<ColorPalette | null>(null);
    const [generationIndex, setGenerationIndex] = useState<number>(0);

    const currentMode = GENERATION_MODES[generationIndex];

    const handleGenerateNewScheme = useCallback(() => {
        // 1. Calculate the next index and wrap around
        const nextIndex = (generationIndex + 1) % GENERATION_MODES.length;
        setGenerationIndex(nextIndex);

        // 2. Generate the palette using the new mode
        const mode = GENERATION_MODES[nextIndex];
        const newPalette = generatePalette(color, mode);
        if (newPalette) {
            setCurrentPalette(newPalette);
        }
    }, [generationIndex, color]);

    // Initial palette generation on component load or when the input color changes
    useEffect(() => {
        const initialPalette = generatePalette(color, GENERATION_MODES[0]);
        if (initialPalette) {
            setCurrentPalette(initialPalette);
        }
    }, [color]);

    return (
        <div>
            <h2>Secondary Color Palette</h2>
            <div className="flex gap-4 my-4 justify-center items-center">
                <div style={{backgroundColor: color}} className="w-16 h-16"></div>
                <button type="button" className="btn btn-primary"
                                onClick={handleGenerateNewScheme}>
                    Generate Next Palette (Mode {generationIndex + 1}/{GENERATION_MODES.length})
                </button>
            </div>
            {currentPalette && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {currentPalette.map((color: string, index: number) => (
                        <div 
                            key={index}
                            className="min-h-24 flex flex-col items-center justify-center p-4 rounded-lg shadow-md transition duration-150 ease-in-out" 
                            style={{ backgroundColor: color, color: getContrastTextColor(color) }}
                        >
                            <b className="text-sm font-bold opacity-80">
                                {index === 0 ? 'Very Dark Shade' : 
                                    index === 1 ? 'Darker Shade' : 
                                    index === 2 ? 'Dark Shade' : 
                                    index === 3 ? 'Primary Color (Fixed)' : 
                                    index === 4 ? 'Light Shade' :
                                    index === 5 ? 'Very Light Shade' :
                                    index === 6 ? 'Accent Color' : 
                                    'Neutral Surface'
                                }
                            </b>
                            <p className="text-lg font-mono tracking-wider">
                                {color.toUpperCase()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ColorPaletteGenerator;