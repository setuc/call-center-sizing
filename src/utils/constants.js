export const models = [
    { name: "GPT-4o Global Deployment", input: 5, output: 15, ptu: true, ptuPrice: 2 },
    { name: "GPT-4o Regional API", input: 5, output: 15, ptu: true, ptuPrice: 2 },
    { name: "GPT-4o-mini Global Deployment", input: 0.15, output: 0.60, ptu: true, ptuPrice: 2 },
    { name: "GPT-4o-mini Regional API", input: 0.165, output: 0.66, ptu: true, ptuPrice: 2 },
  ];
  
  export const speechModels = [
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
  
  export const callDistributionPatterns = {
    uniform: "Uniform Call Volume",
    normalBusiness: "Peak During Business Hours",
    nightShift: "Peak During Night Hours",
    heavyMorning: "Heavy Morning Calls",
    heavyEvening: "Heavy Evening Calls",
  };
  
  export const durationDistributionPatterns = {
    uniform: "Consistent Call Duration",
    shorterPeak: "Shorter During Peak Hours",
    longerPeak: "Longer During Peak Hours",
    variable: "Variable Call Duration",
  };
  
  export const taskTypes = {
    summarization: "Call Summarization",
    sentiment: "Sentiment Analysis",
    realTimeSentiment: "Real-time Sentiment Analysis",
    complexAnalysis: "Complex Analysis (Summary + Sentiment)",
  };
  
  export const wordsPerMinute = 150;
  export const tokensPerWord = 1.5;