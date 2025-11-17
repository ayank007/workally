interface EyeDropperResult {
    sRGBHex: string;
}

declare class EyeDropper {
    constructor();
    open(): Promise<EyeDropperResult>;
}

// Merge the new class definition into the global Window interface
interface Window {
    EyeDropper?: typeof EyeDropper;
}