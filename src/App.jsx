import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f4f8;
  color: #333;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
`;

const CostDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  text-align: center;
`;

const CostItem = styled.div`
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
`;

const CostLabel = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 5px;
`;

const CostValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #2980b9;
`;

const Instructions = styled.div`
  background-color: #e8f4fd;
  border-left: 5px solid #3498db;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const models = [
  { name: "GPT-4o Global Deployment", input: 5, output: 15, ptu: true, ptuPrice: 2 },
  { name: "GPT-4o Regional API", input: 5, output: 15, ptu: true, ptuPrice: 2 },
  { name: "GPT-4o-mini Global Deployment", input: 0.15, output: 0.60, ptu: true, ptuPrice: 2 },
  { name: "GPT-4o-mini Regional API", input: 0.165, output: 0.66, ptu: true, ptuPrice: 2 },
];

const speechModels = [
  { name: "Whisper", price: 0 },
  { name: "TTS (Text to Speech)", price: 15 },
  { name: "TTS HD", price: 30 },
];

const distributionPatterns = {
  uniform: "Uniform",
  normalBusiness: "Normal Business Hours",
  nightShift: "Night Shift",
  heavyMorning: "Heavy Morning",
  heavyEvening: "Heavy Evening",
};

const durationPatterns = {
  uniform: "Uniform",
  busyHoursLonger: "Busy Hours Longer",
  quietHoursLonger: "Quiet Hours Longer",
  morningLonger: "Morning Longer",
  eveningLonger: "Evening Longer",
};

const CallCenterSimulator = () => {
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedSpeechModel, setSelectedSpeechModel] = useState(speechModels[0]);
  const [totalCalls, setTotalCalls] = useState(1000);
  const [avgCallDuration, setAvgCallDuration] = useState(5);
  const [callDistributionPattern, setCallDistributionPattern] = useState('uniform');
  const [durationDistributionPattern, setDurationDistributionPattern] = useState('uniform');
  const [callPeakFactor, setCallPeakFactor] = useState(2);
  const [durationPeakFactor, setDurationPeakFactor] = useState(1.5);
  const [callSkew, setCallSkew] = useState(0);
  const [durationSkew, setDurationSkew] = useState(0);

  const wordsPerMinute = 150;
  const tokensPerWord = 1.5;

  const generateDistribution = (pattern, peakFactor, skew, baseValue) => {
    let distribution = Array(24).fill(baseValue);
    
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
    }

    // Apply skew
    const skewedDistribution = distribution.map((value, hour) => {
      const skewEffect = Math.sin((hour / 24 + skew / 12) * 2 * Math.PI);
      return value * (1 + skewEffect * 0.5);
    });

    // Normalize
    const totalSkewed = skewedDistribution.reduce((a, b) => a + b, 0);
    return skewedDistribution.map(value => (value / totalSkewed) * baseValue * 24);
  };

  const callDistribution = generateDistribution(callDistributionPattern, callPeakFactor, callSkew, totalCalls / 24);
  const durationDistribution = generateDistribution(durationDistributionPattern, durationPeakFactor, durationSkew, avgCallDuration);

  const calculateCost = () => {
    const totalCallMinutes = callDistribution.reduce((sum, calls, hour) => sum + calls * durationDistribution[hour], 0);
    const totalWords = totalCallMinutes * wordsPerMinute;
    const totalTokens = totalWords * tokensPerWord;
    
    const modelCost = (totalTokens * selectedModel.input) / 1000000;
    const speechCost = (totalWords / 1000000) * selectedSpeechModel.price;
    
    const dailyCost = modelCost + speechCost;
    return {
      daily: dailyCost.toFixed(2),
      monthly: (dailyCost * 30).toFixed(2),
      yearly: (dailyCost * 365).toFixed(2),
    };
  };

  const costs = calculateCost();

  const chartData = callDistribution.map((calls, hour) => ({
    hour,
    calls: Math.round(calls),
    duration: durationDistribution[hour].toFixed(2),
    agents: Math.ceil(calls * durationDistribution[hour] / 60)
  }));

  return (
    <AppContainer>
      <Instructions>
        <h3>How to Use This Calculator:</h3>
        <ol>
          <li>Select the GPT model and speech model you want to simulate.</li>
          <li>Enter the total number of daily calls and average call duration.</li>
          <li>Choose distribution patterns for call volume and duration.</li>
          <li>Adjust peak factors and time skews to fine-tune the distribution.</li>
          <li>View the visualizations below to see how your settings affect call patterns and costs.</li>
        </ol>
      </Instructions>

      <Card>
        <CardTitle>Call Center Cost Simulator</CardTitle>
        <Grid>
          <div>
            <Label>Model</Label>
            <Select onChange={(e) => setSelectedModel(models.find(m => m.name === e.target.value))}>
              {models.map((model) => (
                <option key={model.name} value={model.name}>{model.name}</option>
              ))}
            </Select>
            
            <Label>Speech Model</Label>
            <Select onChange={(e) => setSelectedSpeechModel(speechModels.find(m => m.name === e.target.value))}>
              {speechModels.map((model) => (
                <option key={model.name} value={model.name}>{model.name}</option>
              ))}
            </Select>
            
            <Label>Total Daily Calls</Label>
            <Input type="number" value={totalCalls} onChange={(e) => setTotalCalls(Number(e.target.value))} />
            
            <Label>Average Call Duration (minutes)</Label>
            <Input type="number" value={avgCallDuration} onChange={(e) => setAvgCallDuration(Number(e.target.value))} />
          </div>
          <div>
            <Label>Call Distribution Pattern</Label>
            <Select onChange={(e) => setCallDistributionPattern(e.target.value)}>
              {Object.entries(distributionPatterns).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </Select>
            
            <SliderContainer>
              <Label>Call Peak Factor: {callPeakFactor.toFixed(1)}x</Label>
              <Slider min={1} max={5} step={0.1} value={callPeakFactor} onChange={(e) => setCallPeakFactor(Number(e.target.value))} />
            </SliderContainer>
            
            <SliderContainer>
              <Label>Call Time Skew: {callSkew.toFixed(1)} hours</Label>
              <Slider min={-12} max={12} step={0.1} value={callSkew} onChange={(e) => setCallSkew(Number(e.target.value))} />
            </SliderContainer>
            
            <Label>Duration Distribution Pattern</Label>
            <Select onChange={(e) => setDurationDistributionPattern(e.target.value)}>
              {Object.entries(durationPatterns).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </Select>
            
            <SliderContainer>
              <Label>Duration Peak Factor: {durationPeakFactor.toFixed(1)}x</Label>
              <Slider min={1} max={3} step={0.1} value={durationPeakFactor} onChange={(e) => setDurationPeakFactor(Number(e.target.value))} />
            </SliderContainer>
            
            <SliderContainer>
              <Label>Duration Time Skew: {durationSkew.toFixed(1)} hours</Label>
              <Slider min={-12} max={12} step={0.1} value={durationSkew} onChange={(e) => setDurationSkew(Number(e.target.value))} />
            </SliderContainer>
          </div>
        </Grid>

        <CostDisplay>
          <CostItem>
            <CostLabel>Daily Cost</CostLabel>
            <CostValue>${costs.daily}</CostValue>
          </CostItem>
          <CostItem>
            <CostLabel>Monthly Cost</CostLabel>
            <CostValue>${costs.monthly}</CostValue>
          </CostItem>
          <CostItem>
            <CostLabel>Yearly Cost</CostLabel>
            <CostValue>${costs.yearly}</CostValue>
          </CostItem>
        </CostDisplay>
      </Card>

      <Card>
        <CardTitle>Visualizations</CardTitle>
        <ChartContainer>
          <Label>Call and Duration Distribution</Label>
          <ResponsiveContainer width="100%" height={400}>
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
          <Label>Agents Needed Distribution</Label>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="agents" fill="#ffc658" name="Agents Needed" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Card>
    </AppContainer>
  );
};

export default CallCenterSimulator;