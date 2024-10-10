import React from 'react';
import { ExplanationBox } from '../styles/StyledComponents';

/* CalculationExplanations Component */
const CalculationExplanations = ({
    avgCallDuration,
    contextTokens,
    wordsPerMinute,
    tokensPerWord,
    tokensPerCall,
    totalCalls,
    totalInputTokens,
    totalOutputTokens,
    dailyCost,
    modelInputCost,
    modelOutputCost,
    speechCost,
    selectedModel,
    selectedSpeechModel,
    totalHours,
    callDistribution,
    durationDistribution,
    callDistributionPattern,
    durationDistributionPattern,
    callPeakFactor,
    durationPeakFactor,
    callSkew,
    durationSkew,
    hourlyBreakdown
  }) => {
    const formatNumber = (num) => num.toLocaleString(undefined, {maximumFractionDigits: 2});
  
    const calculateHourlyBreakdown = () => {
      let breakdown = '';
      let totalCalculatedHours = 0;
  
      hourlyBreakdown.forEach(({ hour, calls, duration, hours }) => {
        totalCalculatedHours += hours;
        breakdown += `Hour ${hour}: ${formatNumber(calls)} calls * ${formatNumber(duration)} minutes = ${formatNumber(hours)} hours\n`;
      });
  
      breakdown += `\nTotal Calculated Hours: ${formatNumber(totalCalculatedHours)}`;
      return breakdown;
    };
  
    return (
      <ExplanationBox>
        <h3>Calculation Explanations</h3>
        
        <p><strong>Hourly Breakdown:</strong></p>
        <pre>
          {calculateHourlyBreakdown()}
        </pre>
  
        <p><strong>Distribution Patterns:</strong></p>
        <pre>
          {`Call Distribution: ${callDistributionPattern} (Peak Factor: ${callPeakFactor}, Skew: ${callSkew})
  Duration Distribution: ${durationDistributionPattern} (Peak Factor: ${durationPeakFactor}, Skew: ${durationSkew})`}
        </pre>
  
        {selectedSpeechModel.type === 'azure' ? (
          <>
            <p><strong>Azure Speech to Text Cost Calculation:</strong></p>
            <pre>
              {`Total Calls: ${totalCalls.toLocaleString()}
  Average Call Duration: ${avgCallDuration} minutes
  Total Minutes: ${totalCalls} * ${avgCallDuration} = ${(totalCalls * avgCallDuration).toLocaleString()} minutes
  Total Hours Used: ${(totalCalls * avgCallDuration).toLocaleString()} / 60 = ${totalHours.toFixed(2)} hours
  
  Selected Tier: ${selectedSpeechModel.tiers.find(tier => totalHours <= tier.hours)?.hours || selectedSpeechModel.tiers[selectedSpeechModel.tiers.length - 1].hours} hours
  Base Price: $${selectedSpeechModel.tiers.find(tier => totalHours <= tier.hours)?.price || selectedSpeechModel.tiers[selectedSpeechModel.tiers.length - 1].price}
  Overage Hours: ${Math.max(0, totalHours - (selectedSpeechModel.tiers.find(tier => totalHours <= tier.hours)?.hours || selectedSpeechModel.tiers[selectedSpeechModel.tiers.length - 1].hours)).toFixed(2)}
  Overage Rate: $${selectedSpeechModel.tiers.find(tier => totalHours <= tier.hours)?.overage || selectedSpeechModel.tiers[selectedSpeechModel.tiers.length - 1].overage} per hour
  Total Speech to Text Cost: $${speechCost.toFixed(2)}`}
            </pre>
          </>
        ) : (
          <>
            <p><strong>Token Calculation per Call:</strong></p>
            <pre>
              {`Input Tokens = (Call Duration (${avgCallDuration} min) * Words per Minute (${wordsPerMinute}) * Tokens per Word (${tokensPerWord})) + Context Tokens (${contextTokens})
  Input Tokens = (${avgCallDuration} * ${wordsPerMinute} * ${tokensPerWord}) + ${contextTokens}
  Input Tokens = ${((avgCallDuration * wordsPerMinute * tokensPerWord) + contextTokens).toLocaleString(undefined, {maximumFractionDigits: 0})}
  
  Output Tokens = Calculated based on task type (see below)
  Total Tokens per Call = Input Tokens + Output Tokens`}
            </pre>
          </>
        )}
  
        <p><strong>Total Tokens for All Calls:</strong></p>
        <pre>
          {`Total Input Tokens = Input Tokens per Call * Total Calls
  Total Input Tokens = ${tokensPerCall.input.toLocaleString()} * ${totalCalls.toLocaleString()} = ${totalInputTokens.toLocaleString()}
  
  Total Output Tokens = Output Tokens per Call * Total Calls
  Total Output Tokens = ${tokensPerCall.output.toLocaleString()} * ${totalCalls.toLocaleString()} = ${totalOutputTokens.toLocaleString()}`}
        </pre>
  
        <p><strong>Cost Calculation:</strong></p>
        <pre>
          {`Model Input Cost = (Total Input Tokens * Model Input Price) / 1,000,000
  Model Input Cost = (${totalInputTokens.toLocaleString()} * $${selectedModel.input}) / 1,000,000 = $${modelInputCost.toFixed(2)}
  
  Model Output Cost = (Total Output Tokens * Model Output Price) / 1,000,000
  Model Output Cost = (${totalOutputTokens.toLocaleString()} * $${selectedModel.output}) / 1,000,000 = $${modelOutputCost.toFixed(2)}
  
  Speech Cost = ${selectedSpeechModel.type === 'azure' ? 
    `Calculated based on Azure pricing tiers (see above)` : 
    `(Total Calls * Avg Call Duration * Words per Minute / 1,000,000) * Speech Model Price
  Speech Cost = (${totalCalls.toLocaleString()} * ${avgCallDuration} * ${wordsPerMinute} / 1,000,000) * $${selectedSpeechModel.price} = $${speechCost.toFixed(2)}`}
  
  Total Daily Cost = Model Input Cost + Model Output Cost + Speech Cost
  Total Daily Cost = $${modelInputCost.toFixed(2)} + $${modelOutputCost.toFixed(2)} + $${speechCost.toFixed(2)} = $${dailyCost.toFixed(2)}`}
        </pre>
  
        <p><strong>Task Type Explanations:</strong></p>
        <ul>
          <li><strong>Call Summarization:</strong> Output tokens are 20% of input tokens, simulating a concise summary.</li>
          <li><strong>Sentiment Analysis:</strong> Fixed output of 50 tokens per call, representing a brief sentiment score and explanation.</li>
          <li><strong>Real-time Sentiment Analysis:</strong> 50 tokens per interval during the call, allowing for sentiment tracking over time.</li>
          <li><strong>Complex Analysis:</strong> Output tokens are 30% of input tokens, accounting for both summary and detailed sentiment analysis.</li>
        </ul>
      </ExplanationBox>
    );
  };

  export default CalculationExplanations;