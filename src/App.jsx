// App.jsx

import React, { useState } from 'react';
import { AppContainer, Headline, MainContent, Column } from './styles/StyledComponents';
import GlobalStyle from './styles/GlobalStyles';
import InputForm from './components/InputForm';
import CostSummary from './components/CostSummary';
import Visualizations from './components/Visualizations';
import CalculationExplanations from './components/CalculationExplanations';
import Instructions from './components/Instructions';
import { calculateCost, calculateTokens } from './utils/calculations';
import { generateDistribution } from './utils/distributions';
import { models, speechModels, wordsPerMinute, tokensPerWord } from './utils/constants';

/* Main Component */
const CallCenterCostEstimator = () => {
  // State variables
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedSpeechModel, setSelectedSpeechModel] = useState(speechModels[0]);
  const [totalCalls, setTotalCalls] = useState(1000);
  const [avgCallDuration, setAvgCallDuration] = useState(5);
  const [callDistributionPattern, setCallDistributionPattern] = useState('uniform');
  const [durationDistributionPattern, setDurationDistributionPattern] = useState('uniform');
  const [callPeakFactor, setCallPeakFactor] = useState(2);
  const [durationPeakFactor, setDurationPeakFactor] = useState(2);
  const [callSkew, setCallSkew] = useState(0);
  const [durationSkew, setDurationSkew] = useState(0);
  const [contextTokens, setContextTokens] = useState(100);
  const [selectedTask, setSelectedTask] = useState('summarization');
  const [realTimeInterval, setRealTimeInterval] = useState(1);

  // Generate call and duration distributions
  const callDistribution = generateDistribution(callDistributionPattern, callPeakFactor, callSkew, totalCalls / 24, 'calls');
  const durationDistribution = generateDistribution(durationDistributionPattern, durationPeakFactor, durationSkew, avgCallDuration, 'duration');

  // Calculate costs
  const costs = calculateCost(
    callDistribution,
    durationDistribution,
    selectedModel,
    selectedSpeechModel,
    wordsPerMinute,
    selectedTask,
    contextTokens,
    realTimeInterval
  );

  // Calculate tokens per call for explanations
  const tokensPerCall = calculateTokens(
    avgCallDuration,
    selectedTask,
    contextTokens,
    realTimeInterval,
    wordsPerMinute,
    tokensPerWord
  );

  // Prepare data for charts
  const chartData = callDistribution.map((calls, hour) => {
    const tokens = calculateTokens(durationDistribution[hour]);
    return {
      hour,
      calls: Math.round(calls),
      duration: durationDistribution[hour].toFixed(2),
      inputTokens: Math.round(calls * tokens.input),
      outputTokens: Math.round(calls * tokens.output),
      totalTokens: Math.round(calls * tokens.total),
      sttHours: (calls * durationDistribution[hour]) / 60,
    };
  });

  return (
    <AppContainer>
      <GlobalStyle />
      <Instructions />  
  
      <Headline>  
        <CostSummary costs={costs} selectedModel={selectedModel} selectedSpeechModel={selectedSpeechModel} />  
      </Headline>  
  
      <MainContent>  
        <Column>  
          <InputForm  
            selectedModel={selectedModel}  
            setSelectedModel={setSelectedModel}  
            selectedSpeechModel={selectedSpeechModel}  
            setSelectedSpeechModel={setSelectedSpeechModel}  
            totalCalls={totalCalls}  
            setTotalCalls={setTotalCalls}  
            avgCallDuration={avgCallDuration}  
            setAvgCallDuration={setAvgCallDuration}  
            contextTokens={contextTokens}  
            setContextTokens={setContextTokens}  
            callDistributionPattern={callDistributionPattern}  
            setCallDistributionPattern={setCallDistributionPattern}  
            callPeakFactor={callPeakFactor}  
            setCallPeakFactor={setCallPeakFactor}  
            callSkew={callSkew}  
            setCallSkew={setCallSkew}  
            durationDistributionPattern={durationDistributionPattern}  
            setDurationDistributionPattern={setDurationDistributionPattern}  
            durationPeakFactor={durationPeakFactor}  
            setDurationPeakFactor={setDurationPeakFactor}  
            durationSkew={durationSkew}  
            setDurationSkew={setDurationSkew}  
            selectedTask={selectedTask}  
            setSelectedTask={setSelectedTask}  
            realTimeInterval={realTimeInterval}  
            setRealTimeInterval={setRealTimeInterval}  
          />  
        </Column>  
        <Column>  
          <Visualizations chartData={chartData} selectedSpeechModel={selectedSpeechModel} />  
        </Column>  
      </MainContent>  
  
      <CalculationExplanations
        avgCallDuration={avgCallDuration}
        contextTokens={contextTokens}
        wordsPerMinute={wordsPerMinute}
        tokensPerWord={tokensPerWord}
        tokensPerCall={tokensPerCall}
        totalCalls={totalCalls}
        totalInputTokens={costs.inputTokens}
        totalOutputTokens={costs.outputTokens}
        dailyCost={costs.daily}
        modelInputCost={costs.modelInputCost}
        modelOutputCost={costs.modelOutputCost}
        speechCost={costs.speechCost}
        selectedModel={selectedModel}
        selectedSpeechModel={selectedSpeechModel}
        totalHours={costs.totalHours}
        callDistribution={callDistribution}
        durationDistribution={durationDistribution}
        callDistributionPattern={callDistributionPattern}
        durationDistributionPattern={durationDistributionPattern}
        callPeakFactor={callPeakFactor}
        durationPeakFactor={durationPeakFactor}
        callSkew={callSkew}
        durationSkew={durationSkew}
        hourlyBreakdown={costs.hourlyBreakdown}
      /> 
  
    </AppContainer>  
  );  
};  
  
export default CallCenterCostEstimator;