import React from 'react';
import { Card, CardTitle, CostDisplay, CostItem, CostLabel, CostValue, SmallText, OperatorIcon } from '../styles/StyledComponents';
import { FaTimes, FaEquals, FaPlus } from 'react-icons/fa';

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
  
  export default CostSummary;