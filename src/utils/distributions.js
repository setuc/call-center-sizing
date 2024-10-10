// Function to generate distribution based on pattern
export const generateDistribution = (pattern, peakFactor, skew, baseValue, type = 'calls') => {
let distribution = Array(24).fill(baseValue);

if (pattern !== 'uniform') {
    switch (pattern) {
    case 'normalBusiness':
        distribution = distribution.map((value, hour) =>
        hour >= 9 && hour < 17 ? value * peakFactor : value / peakFactor);
        break;
    case 'nightShift':
        distribution = distribution.map((value, hour) =>
        hour >= 22 || hour < 6 ? value * peakFactor : value / peakFactor);
        break;
    case 'heavyMorning':
        distribution = distribution.map((value, hour) =>
        hour >= 6 && hour < 12 ? value * peakFactor : value / peakFactor);
        break;
    case 'heavyEvening':
        distribution = distribution.map((value, hour) =>
        hour >= 17 && hour < 23 ? value * peakFactor : value / peakFactor);
        break;
    case 'shorterPeak':
        distribution = distribution.map((value, hour) =>
        (hour >= 9 && hour < 17) ? value / peakFactor : value * peakFactor);
        break;
    case 'longerPeak':
        distribution = distribution.map((value, hour) =>
        (hour >= 9 && hour < 17) ? value * peakFactor : value / peakFactor);
        break;
    case 'variable':
        distribution = distribution.map((value) => value * (Math.random() * (peakFactor - 1) + 1));
        break;
    default:
        break;
    }

    // Apply skew
    distribution = distribution.map((value, hour) => {
    const skewEffect = Math.sin(((hour + skew) / 24) * 2 * Math.PI);
    return value * (1 + skewEffect * 0.5);
    });

    // Normalize to keep total constant
    const totalDistribution = distribution.reduce((a, b) => a + b, 0);
    distribution = distribution.map(value => (value / totalDistribution) * baseValue * 24);
}

return distribution;
};
