import React from 'react';
import { FaRobot, FaPhone, FaCog, FaInfoCircle, FaChartLine } from 'react-icons/fa';
import { InstructionsBox } from '../styles/StyledComponents';
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

  export default Instructions;