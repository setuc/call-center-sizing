import React, { useMemo } from 'react';
import { Card, CardTitle, Label, ChartContainer } from '../styles/StyledComponents';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line } from 'recharts';

/* Visualizations Component */
const Visualizations = React.memo(({ chartData, selectedSpeechModel }) => {
  const memoizedChartData = useMemo(() => chartData, [chartData]);

  return (
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
                <Bar dataKey="inputTokens" stackId="a" fill="#8884d8" name="Input Tokens" key="inputTokens" />
                <Bar dataKey="outputTokens" stackId="a" fill="#82ca9d" name="Output Tokens" key="outputTokens" />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
});

  export default Visualizations;
  