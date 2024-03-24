import GenerateMCLClass, { borderWidthType, colorType, scaleType, textType, } from '.';
export const generateClass = (type, value) => {
    const mclGenerate = new GenerateMCLClass(type, value);
    if (colorType.includes(type)) {
        return mclGenerate.generateColorClass();
    }
    if (textType.includes(type)) {
        return mclGenerate.generateTextClass();
    }
    if (borderWidthType.includes(type)) {
        return mclGenerate.generateBorderWidthClass();
    }
    if (scaleType.includes(type)) {
        return mclGenerate.generateScaleClass();
    }
    // return spacing type if all of above is false
    return mclGenerate.generateSpacingClass();
};
