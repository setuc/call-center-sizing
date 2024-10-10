 // Function to calculate tokens based on duration and task type
 export const calculateTokens = (duration, selectedTask, contextTokens, realTimeInterval, wordsPerMinute, tokensPerWord) => {    const inputTokens = Math.ceil(duration * wordsPerMinute * tokensPerWord);
    let outputTokens;

    switch (selectedTask) {
      case 'summarization':
        outputTokens = Math.ceil(inputTokens * 0.2); // Assume summary is 20% of input
        break;
      case 'sentiment':
        outputTokens = 50; // Fixed output for sentiment
        break;
      case 'realTimeSentiment':
        outputTokens = Math.ceil(duration / realTimeInterval) * 50; // 50 tokens per interval
        break;
      case 'complexAnalysis':
        outputTokens = Math.ceil(inputTokens * 0.3); // 30% for summary + sentiment
        break;
      default:
        outputTokens = Math.ceil(inputTokens * 0.2);
    }

    return {
      input: inputTokens + contextTokens,
      output: outputTokens,
      total: inputTokens + contextTokens + outputTokens
    };
  };

// Function to calculate costs
export const calculateCost = (callDistribution, durationDistribution, selectedModel, selectedSpeechModel, wordsPerMinute) => {
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalHours = 0;
    let totalCharacters = 0;
    let hourlyBreakdown = [];
    
    callDistribution.forEach((calls, hour) => {
        const tokens = calculateTokens(durationDistribution[hour]);
        const hourlyHours = (calls * durationDistribution[hour]) / 60;
        totalInputTokens += calls * tokens.input;
        totalOutputTokens += calls * tokens.output;
        totalHours += hourlyHours;
        totalCharacters += calls * durationDistribution[hour] * wordsPerMinute * 5;
        
        hourlyBreakdown.push({
        hour,
        calls,
        duration: durationDistribution[hour],
        hours: hourlyHours
        });
    });
    
    const modelInputCost = (totalInputTokens * selectedModel.input) / 1000000;
    const modelOutputCost = (totalOutputTokens * selectedModel.output) / 1000000;
    const gptCost = modelInputCost + modelOutputCost;
    
    let speechCost = 0;
    if (selectedSpeechModel.type === 'azure') {
        const tier = selectedSpeechModel.tiers.reduce((prev, curr) =>
        (totalHours > prev.hours) ? curr : prev
        );
        speechCost = tier.price + Math.max(0, totalHours - tier.hours) * tier.overage;
    } else if (selectedSpeechModel.type === 'whisper') {
        speechCost = (totalCharacters / 1000000) * selectedSpeechModel.price;
    }
    
    const dailyCost = speechCost + gptCost;
    
    return {
        daily: dailyCost,
        monthly: dailyCost * 30,
        yearly: dailyCost * 365,
        totalTokens: totalInputTokens + totalOutputTokens,
        inputTokens: totalInputTokens,
        outputTokens: totalOutputTokens,
        modelInputCost,
        modelOutputCost,
        gptCost,
        speechCost,
        totalHours,
        totalCharacters,
        hourlyBreakdown
    };
    };