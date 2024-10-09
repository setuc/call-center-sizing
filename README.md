Certainly! Below is a comprehensive README guide for the Call Center Simulator project based on the provided code. This guide aims to facilitate understanding and ease of use of the application.

---

# Call Center Simulator

The Call Center Simulator is an interactive web application designed to model and predict the costs and performance of various AI and speech recognition models in handling call center operations. It allows users to configure a multitude of parameters to see how different setups can affect call center efficiency and economics.

## Features

- **AI Model Selection:** Choose from several AI models for call handling, each with different input and output token costs.
- **Speech Model Selection:** Integrate different speech recognition models into the simulation.
- **Call and Duration Patterns:** Customize how call volume and duration vary throughout the day.
- **Cost Analysis:** Get detailed breakdowns of daily, monthly, and yearly costs based on your settings.
- **Visualization:** View dynamic charts that represent call handling and token distribution by the hour.
- **Task Analysis:** Select different types of AI tasks to run on the calls, including real-time sentiment analysis.
  
## How to Use

Follow these instructions to simulate your call center environment and analyze the costs:

1. **Select AI Models:**
   - Go to the "Model Selection" section.
   - Choose an AI model from the dropdown menu (e.g., GPT-4o Global Deployment).

2. **Enter Call Details:**
   - Specify the total number of daily calls.
   - Set the average call duration in minutes.
   - Input the context tokens, which is additional data added to each call.

3. **Configure Call and Duration Patterns:**
   - Choose a call volume pattern to see how your call volume changes over the day (e.g., Peak During Business Hours).
   - Set the peak call volume multiplier to simulate busy periods.
   - Adjust the time shift to simulate when these busy periods occur.

4. **Set Additional Task Settings:**
   - Select a task type (e.g., Sentiment Analysis) and configure any task-specific settings like real-time intervals.

5. **Review Results:**
   - Check the "Cost Summary" section for a breakdown of costs including daily, monthly, and yearly estimates.
   - Use the visualizations to observe how call and duration distributions vary by the hour.

6. **Understand Calculations:**
   - In the "Calculation Explanations" section, find detailed explanations of how input and output tokens are calculated per call and the overall cost computations.

## Detailed Component Breakdown

### Model and Speech Selection

- **AI Models:**
  - GPT-4o Global Deployment
  - GPT-4o Regional API
  - GPT-4o-mini Global Deployment
  - GPT-4o-mini Regional API

- **Speech Models:**
  - Whisper (no additional cost)
  - TTS (Text to Speech)
  - TTS HD

### Task Types

- **Call Summarization:** Generates a summary of the call.
- **Sentiment Analysis:** Analyzes the sentiment of the call.
- **Real-time Sentiment Analysis:** Evaluates sentiment at set intervals during the call.
- **Complex Analysis:** Combines summarization with detailed sentiment analysis.

### Cost Calculations

- **Token Calculation:** Based on average call duration, word count, and contextual data per call.
- **Model Input/Output Cost:** Calculated using token prices specified by selected AI models.
- **Speech Cost:** Factored by using model-specific pricing and duration of calls.

### Visualizations

The simulator provides two key charts:
- **Hourly Call and Duration Distribution:** Shows call volume and average duration by hour.
- **Hourly Token Distribution:** Displays the distribution between input and output tokens hourly.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

## Contributing
Your contributions are welcome! If you'd like to contribute to this project, please follow the guidelines below:

1. **Fork the Repository:**

   Click on the "Fork" button on the top right to copy the repository to your own GitHub account.

2. **Create a Feature Branch:**

   Checkout a new branch for your feature or bugfix.

   ```bash
   git checkout -b feature-name
   ```

3. **Make Your Changes:**

   Implement your changes and commit them with clear and descriptive messages.

   ```bash
   git commit -m "Description of changes"
   ```

4. **Push to Your Fork:**

   Push the changes to your forked repository.

   ```bash
   git push origin feature-name
   ```

5. **Submit a Pull Request:**

   Go to the main repository and submit a pull request with a description of your changes.

---
