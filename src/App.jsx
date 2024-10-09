// App.jsx

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, ComposedChart,
} from 'recharts';
import { FaRobot, FaPhone, FaChartLine, FaCog, FaInfoCircle, FaPlus, FaEquals, FaTimes } from 'react-icons/fa';

/* Global Styles */
const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background-color: #f0f4f8;
    margin: 0;
    padding: 0;
  }
`;

/* Styled Components */
const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  width: 90vw;
  margin: 0 auto;
  padding: 5vw 5vw;
  background-color: #f0f4f8;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Headline = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 0; // Prevents flex items from overflowing
  width: 100%; // Ensures the column takes full width in mobile view
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  height: 100%; // Makes the card take full height of its container
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #34495e;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
`;

const SliderContainer = styled.div`
  margin-bottom: 15px;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
`;

const ChartContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 400px; // Set a fixed height for the chart
`;

const CostDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const CostItem = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CostLabel = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
`;

const CostValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const OperatorIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6c757d;
`;

const SmallText = styled.div`
  font-size: 10px;
  color: #6c757d;
  margin-top: 2px;
`;

const ExplanationBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const InstructionsBox = styled.div`
  background-color: #e8f4fd;
  border-left: 5px solid #3498db;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

/* Constants */
const models = [
  { name: "GPT-4o Global Deployment", input: 5, output: 15, ptu: true, ptuPrice: 2 },
  { name: "GPT-4o Regional API", input: 5, output: 15, ptu: true, ptuPrice: 2 },
  { name: "GPT-4o-mini Global Deployment", input: 0.15, output: 0.60, ptu: true, ptuPrice: 2 },
  { name: "GPT-4o-mini Regional API", input: 0.165, output: 0.66, ptu: true, ptuPrice: 2 },
];

const speechModels = [
  { name: "Whisper TTS (Text to Speech)",  type: "whisper", price: 15 },
  { name: "Whisper TTS HD",  type: "whisper", price: 30 },
  { name: "Azure STT - Standard", type: "azure", tiers: [
    { hours: 2000, price: 1600, overage: 0.80 },
    { hours: 10000, price: 6500, overage: 0.65 },
    { hours: 50000, price: 25000, overage: 0.50 }
  ]},
  { name: "Azure STT - Custom", type: "azure", tiers: [
    { hours: 2000, price: 1920, overage: 0.96 },
    { hours: 10000, price: 7800, overage: 0.78 },
    { hours: 50000, price: 30000, overage: 0.60 }
  ]}
];

/* Updated Distribution Patterns with clearer names */
const callDistributionPatterns = {
  uniform: "Uniform Call Volume",
  normalBusiness: "Peak During Business Hours",
  nightShift: "Peak During Night Hours",
  heavyMorning: "Heavy Morning Calls",
  heavyEvening: "Heavy Evening Calls",
};

const durationDistributionPatterns = {
  uniform: "Consistent Call Duration",
  shorterPeak: "Shorter During Peak Hours",
  longerPeak: "Longer During Peak Hours",
  variable: "Variable Call Duration",
};

const taskTypes = {
  summarization: "Call Summarization",
  sentiment: "Sentiment Analysis",
  realTimeSentiment: "Real-time Sentiment Analysis",
  complexAnalysis: "Complex Analysis (Summary + Sentiment)",
};

/* Instructions Component */
const Instructions = () => (
  <InstructionsBox>
    <h3>How to Use the Call Center Cost Estimator:</h3>
    <ol>
      <li>
        <FaRobot /><strong> Select AI Models:</strong> Choose the AI models for call handling and speech recognition you'd like to simulate.
      </li>
      <li>
        <FaPhone /><strong> Enter Call Details:</strong> Input the total number of calls your center handles each day and the average length of each call.
      </li>
      <li>
        <FaPhone /><strong> Choose Call Patterns:</strong> Select how your call volume and call durations change throughout the day.
      </li>
      <li>
        <FaPhone /><strong> Adjust Peak Times:</strong> Modify settings to simulate busy periods and different customer calling behaviors.
      </li>
      <li>
        <FaPhone /><strong> Set Call Complexity:</strong> Specify any additional information or context you'd like each call to include.
      </li>
      <li>
        <FaCog/> <strong> Select Analysis Type:</strong> Choose the kind of analysis you want the estimator to perform on the calls.
      </li>
      <li>
        <FaInfoCircle /><strong> Configure Real-Time Settings:</strong> If you want real-time analysis, set how frequently you'd like the analysis to run.
      </li>
      <li>
        <FaChartLine /><strong> Review Results:</strong> View the visualizations and cost summary to see how your settings impact the simulation.
      </li>
    </ol>
  </InstructionsBox>
);

/* InputForm Component */
const InputForm = ({
  selectedModel, setSelectedModel,
  selectedSpeechModel, setSelectedSpeechModel,
  totalCalls, setTotalCalls,
  avgCallDuration, setAvgCallDuration,
  contextTokens, setContextTokens,
  callDistributionPattern, setCallDistributionPattern,
  callPeakFactor, setCallPeakFactor,
  callSkew, setCallSkew,
  durationDistributionPattern, setDurationDistributionPattern,
  durationPeakFactor, setDurationPeakFactor,
  durationSkew, setDurationSkew,
  selectedTask, setSelectedTask,
  realTimeInterval, setRealTimeInterval,
}) => (
  <Card>
    <CardTitle>Configure Cost Parameters</CardTitle>
    <div>
      <SectionTitle>Model Selection</SectionTitle>
      <Label>Model</Label>
      <Select
        value={selectedModel.name}
        onChange={(e) => setSelectedModel(models.find(m => m.name === e.target.value))}
      >
        {models.map((model) => (
          <option key={model.name} value={model.name}>{model.name}</option>
        ))}
      </Select>

      <Label>Speech Model</Label>
      <Select
        value={selectedSpeechModel.name}
        onChange={(e) => setSelectedSpeechModel(speechModels.find(m => m.name === e.target.value))}
      >
        {speechModels.map((model) => (
          <option key={model.name} value={model.name}>{model.name}</option>
        ))}
      </Select>

      <SectionTitle>Call Settings</SectionTitle>

      <Label>Total Daily Calls</Label>
      <Input type="number" value={totalCalls} onChange={(e) => setTotalCalls(Number(e.target.value))} />

      <Label>Average Call Duration (minutes)</Label>
      <Input type="number" value={avgCallDuration} onChange={(e) => setAvgCallDuration(Number(e.target.value))} />

      <Label>Context Tokens</Label>
      <Input type="number" value={contextTokens} onChange={(e) => setContextTokens(Number(e.target.value))} />

      <SectionTitle>Distribution Settings</SectionTitle>

      <Label>Call Volume Pattern</Label>
      <Select value={callDistributionPattern} onChange={(e) => setCallDistributionPattern(e.target.value)}>
        {Object.entries(callDistributionPatterns).map(([key, value]) => (
          <option key={key} value={key}>{value}</option>
        ))}
      </Select>

      <SliderContainer>
        <Label>Peak Call Volume Multiplier: {callPeakFactor.toFixed(1)}x</Label>
        <Slider min={1} max={5} step={0.1} value={callPeakFactor} onChange={(e) => setCallPeakFactor(Number(e.target.value))} />
      </SliderContainer>

      <SliderContainer>
        <Label>Call Volume Time Shift: {callSkew.toFixed(1)} hours</Label>
        <Slider min={-12} max={12} step={0.1} value={callSkew} onChange={(e) => setCallSkew(Number(e.target.value))} />
      </SliderContainer>

      <Label>Call Duration Variation Pattern</Label>
      <Select value={durationDistributionPattern} onChange={(e) => setDurationDistributionPattern(e.target.value)}>
        {Object.entries(durationDistributionPatterns).map(([key, value]) => (
          <option key={key} value={key}>{value}</option>
        ))}
      </Select>

      <SliderContainer>
        <Label>Peak Duration Multiplier: {durationPeakFactor.toFixed(1)}x</Label>
        <Slider min={1} max={5} step={0.1} value={durationPeakFactor} onChange={(e) => setDurationPeakFactor(Number(e.target.value))} />
      </SliderContainer>

      <SliderContainer>
        <Label>Duration Time Shift: {durationSkew.toFixed(1)} hours</Label>
        <Slider min={-12} max={12} step={0.1} value={durationSkew} onChange={(e) => setDurationSkew(Number(e.target.value))} />
      </SliderContainer>

      <SectionTitle>Task Settings</SectionTitle>

      <Label>Task Type</Label>
      <Select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
        {Object.entries(taskTypes).map(([key, value]) => (
          <option key={key} value={key}>{value}</option>
        ))}
      </Select>

      {selectedTask === 'realTimeSentiment' && (
        <div>
          <Label>Real-time Interval (minutes)</Label>
          <Input type="number" value={realTimeInterval} onChange={(e) => setRealTimeInterval(Number(e.target.value))} />
        </div>
      )}
    </div>
  </Card>
);

/* CostSummary Component */
const CostSummary = ({ costs, selectedModel, selectedSpeechModel }) => {
  const formatNumber = (num) => num.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <Card>
      <CardTitle>Cost Summary</CardTitle>

      {selectedSpeechModel.type === 'azure' ? (
        <>
          <CostDisplay>
            <CostItem>
              <CostLabel>Total Hours Used</CostLabel>
              <CostValue>{formatNumber(costs.totalHours)}</CostValue>
              <SmallText>
                (Total Calls * Avg Duration) / 60 = {formatNumber(costs.totalHours)} hours
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaTimes size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>Tier Price (per hour)</CostLabel>
              <CostValue>${selectedSpeechModel.tiers[0].price / selectedSpeechModel.tiers[0].hours}</CostValue>
              <SmallText>
                Tier: {selectedSpeechModel.tiers[0].hours} hours at ${selectedSpeechModel.tiers[0].price}
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaEquals size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>Azure STT Cost</CostLabel>
              <CostValue>${formatNumber(costs.speechCost)}</CostValue>
              <SmallText>
                Base cost + Overage = ${formatNumber(costs.speechCost)}
              </SmallText>
            </CostItem>
          </CostDisplay>

          <CostDisplay>
            <CostItem>
              <CostLabel>Total Tokens</CostLabel>
              <CostValue>{formatNumber(costs.totalTokens)}</CostValue>
              <SmallText>
                Input: {formatNumber(costs.inputTokens)}, Output: {formatNumber(costs.outputTokens)}
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaTimes size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>GPT Price (per 1M tokens)</CostLabel>
              <CostValue>${selectedModel.input}/${selectedModel.output}</CostValue>
              <SmallText>
                Input: ${selectedModel.input}, Output: ${selectedModel.output}
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaEquals size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>GPT Cost</CostLabel>
              <CostValue>${formatNumber(costs.gptCost)}</CostValue>
              <SmallText>
                Input: ${formatNumber(costs.modelInputCost)}, Output: ${formatNumber(costs.modelOutputCost)}
              </SmallText>
            </CostItem>
          </CostDisplay>
        </>
      ) : (
        <>
          <CostDisplay>
            <CostItem>
              <CostLabel>Total Characters</CostLabel>
              <CostValue>{formatNumber(costs.totalCharacters)}</CostValue>
              <SmallText>
                Total Calls * Avg Duration * Words/Min * 5 chars/word
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaTimes size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>Price (per 1M chars)</CostLabel>
              <CostValue>${selectedSpeechModel.price}</CostValue>
              <SmallText>
                Whisper {selectedSpeechModel.name} pricing
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaEquals size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>Whisper Cost</CostLabel>
              <CostValue>${formatNumber(costs.speechCost)}</CostValue>
              <SmallText>
                (Total Characters / 1M) * Price per 1M
              </SmallText>
            </CostItem>
          </CostDisplay>

          <CostDisplay>
            <CostItem>
              <CostLabel>Total Tokens</CostLabel>
              <CostValue>{formatNumber(costs.totalTokens)}</CostValue>
              <SmallText>
                Input: {formatNumber(costs.inputTokens)}, Output: {formatNumber(costs.outputTokens)}
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaTimes size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>GPT Price (per 1M tokens)</CostLabel>
              <CostValue>${selectedModel.input} / ${selectedModel.output}</CostValue>
              <SmallText>
                Input: ${selectedModel.input}, Output: ${selectedModel.output}
              </SmallText>
            </CostItem>
            <OperatorIcon>
              <FaEquals size={20} />
            </OperatorIcon>
            <CostItem>
              <CostLabel>GPT Cost</CostLabel>
              <CostValue>${formatNumber(costs.gptCost)}</CostValue>
              <SmallText>
                Input: ${formatNumber(costs.modelInputCost)}, Output: ${formatNumber(costs.modelOutputCost)}
              </SmallText>
            </CostItem>
          </CostDisplay>
        </>
      )}

      <CostDisplay>
        <CostItem>
          <CostLabel>{selectedSpeechModel.type === 'azure' ? 'Azure STT Cost' : 'Whisper Cost'}</CostLabel>
          <CostValue>${formatNumber(costs.speechCost)}</CostValue>
        </CostItem>
        <OperatorIcon>
          <FaPlus size={20} />
        </OperatorIcon>
        <CostItem>
          <CostLabel>GPT Cost</CostLabel>
          <CostValue>${formatNumber(costs.gptCost)}</CostValue>
        </CostItem>
        <OperatorIcon>
          <FaEquals size={20} />
        </OperatorIcon>
        <CostItem>
          <CostLabel>Total Daily Cost</CostLabel>
          <CostValue>${formatNumber(costs.daily)}</CostValue>
        </CostItem>
      </CostDisplay>

      <CostDisplay>
        <CostItem>
          <CostLabel>Daily Cost</CostLabel>
          <CostValue>${formatNumber(costs.daily)}</CostValue>
        </CostItem>
        <OperatorIcon>
          <FaTimes size={20} />
        </OperatorIcon>
        <CostItem>
          <CostLabel>Days</CostLabel>
          <CostValue>30</CostValue>
        </CostItem>
        <OperatorIcon>
          <FaEquals size={20} />
        </OperatorIcon>
        <CostItem>
          <CostLabel>Monthly Cost</CostLabel>
          <CostValue>${formatNumber(costs.monthly)}</CostValue>
        </CostItem>
      </CostDisplay>

      <CostDisplay>
        <CostItem>
          <CostLabel>Daily Cost</CostLabel>
          <CostValue>${formatNumber(costs.daily)}</CostValue>
        </CostItem>
        <OperatorIcon>
          <FaTimes size={20} />
        </OperatorIcon>
        <CostItem>
          <CostLabel>Days</CostLabel>
          <CostValue>365</CostValue>
        </CostItem>
        <OperatorIcon>
          <FaEquals size={20} />
        </OperatorIcon>
        <CostItem>
          <CostLabel>Yearly Cost</CostLabel>
          <CostValue>${formatNumber(costs.yearly)}</CostValue>
        </CostItem>
      </CostDisplay>
    </Card>
  );
};

/* Visualizations Component */
const Visualizations = ({ chartData, selectedSpeechModel }) => (
  <Card>
    <CardTitle>Visualizations</CardTitle>
    <ChartContainer>
      <Label>Hourly Call and Duration Distribution</Label>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <XAxis dataKey="hour" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="calls" fill="#8884d8" name="Calls" />
          <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#82ca9d" name="Avg Duration (min)" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
    <ChartContainer>
      <Label>{selectedSpeechModel && selectedSpeechModel.type === 'azure' ? 'Hourly Speech to Text Usage' : 'Hourly Token Distribution'}</Label>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedSpeechModel && selectedSpeechModel.type === 'azure' ? (
            <Bar dataKey="sttHours" fill="#82ca9d" name="STT Hours" />
          ) : (
            <>
              <Bar dataKey="inputTokens" stackId="a" fill="#8884d8" name="Input Tokens" />
              <Bar dataKey="outputTokens" stackId="a" fill="#82ca9d" name="Output Tokens" />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Card>
);

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
}) => (
  <ExplanationBox>
    <h3>Calculation Explanations</h3>
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

  const wordsPerMinute = 150;
  const tokensPerWord = 1.5;

  // Function to generate distribution based on pattern
  const generateDistribution = (pattern, peakFactor, skew, baseValue, type = 'calls') => {
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

  // Generate call and duration distributions
  const callDistribution = generateDistribution(callDistributionPattern, callPeakFactor, callSkew, totalCalls / 24, 'calls');
  const durationDistribution = generateDistribution(durationDistributionPattern, durationPeakFactor, durationSkew, avgCallDuration, 'duration');

  // Function to calculate tokens based on duration and task type
  const calculateTokens = (duration) => {
    const inputTokens = Math.ceil(duration * wordsPerMinute * tokensPerWord);
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
  const calculateCost = () => {
    let totalInputTokens = 0;
    let totalOutputTokens = 0;
    let totalHours = 0;
    let totalCharacters = 0;
  
    callDistribution.forEach((calls, hour) => {
      const tokens = calculateTokens(durationDistribution[hour]);
      totalInputTokens += calls * tokens.input;
      totalOutputTokens += calls * tokens.output;
      totalHours += (calls * durationDistribution[hour]) / 60;
      totalCharacters += calls * durationDistribution[hour] * wordsPerMinute * 5;
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
    };
  };

  const costs = calculateCost();

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

  // Calculate tokens per call for explanations
  const tokensPerCall = calculateTokens(avgCallDuration);

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
        totalHours={costs.totalHours}  // Add this line
      /> 
  
    </AppContainer>  
  );  
};  
  
export default CallCenterCostEstimator;  
