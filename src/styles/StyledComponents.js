import styled from 'styled-components';

export const AppContainer = styled.div`
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

export const Headline = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  height: 100%;
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #34495e;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 16px;
`;

export const SliderContainer = styled.div`
  margin-bottom: 15px;
`;

export const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
`;

export const ChartContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 400px; // Set a fixed height for the chart
`;

export const CostDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

export const CostItem = styled.div`
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

export const CostLabel = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
`;

export const CostValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

export const OperatorIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6c757d;
`;

export const SmallText = styled.div`
  font-size: 10px;
  color: #6c757d;
  margin-top: 2px;
`;

export const ExplanationBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #2c3e50;
`;

export const InstructionsBox = styled.div`
  background-color: #e8f4fd;
  border-left: 5px solid #3498db;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
`;