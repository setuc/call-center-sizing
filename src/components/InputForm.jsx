import React from 'react';
import { Card, CardTitle, Label, Input, Select, SliderContainer, Slider, SectionTitle } from '../styles/StyledComponents';
import { models, speechModels, callDistributionPatterns, durationDistributionPatterns, taskTypes } from '../utils/constants';

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

  export default InputForm;