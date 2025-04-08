import React, { useState, useEffect } from 'react';
import { Stack, Text, PrimaryButton, Link } from '@fluentui/react';

// Fluent projesine özel 10 soru (4 şıklı, doğru cevaplar eşleştirildi)
const questions = [
  {
    question: "What is the primary purpose of the Fluent project?",
    options: [
      { key: 'A', text: 'To create a new programming language for Ethereum' },
      { key: 'B', text: 'To enable blended execution of smart contracts across different VMs on Ethereum' },
      { key: 'C', text: 'To replace Ethereum with a new blockchain' },
      { key: 'D', text: 'To build a centralized application platform' },
    ],
    correctAnswer: 'B', // Doğru
  },
  {
    question: "Which virtual machines (VMs) does Fluent currently support for smart contract execution?",
    options: [
      { key: 'A', text: 'Only EVM' },
      { key: 'B', text: 'EVM and Wasm' },
      { key: 'C', text: 'EVM, Wasm, and SVM' },
      { key: 'D', text: 'Only Wasm' },
    ],
    correctAnswer: 'B', // Düzeltildi: D -> B
  },
  {
    question: "What type of network is Fluent built on?",
    options: [
      { key: 'A', text: 'A standalone blockchain' },
      { key: 'B', text: 'An Ethereum Layer-2 network' },
      { key: 'C', text: 'A centralized server' },
      { key: 'D', text: 'A hybrid cloud network' },
    ],
    correctAnswer: 'B', // Düzeltildi: A -> B
  },
  {
    question: "Which programming languages can developers use to write smart contracts on Fluent?",
    options: [
      { key: 'A', text: 'Only Solidity' },
      { key: 'B', text: 'Solidity, Vyper, and Rust' },
      { key: 'C', text: 'Java and Python' },
      { key: 'D', text: 'C++ and JavaScript' },
    ],
    correctAnswer: 'B', // Düzeltildi: C -> B
  },
  {
    question: "What is the name of the zero-knowledge technology Fluent uses for efficient execution?",
    options: [
      { key: 'A', text: 'zkEVM' },
      { key: 'B', text: 'zkWasm' },
      { key: 'C', text: 'zkProof' },
      { key: 'D', text: 'zkRollup' },
    ],
    correctAnswer: 'B', // Düzeltildi: A -> B
  },
  {
    question: "What does 'blended execution' mean in the context of Fluent?",
    options: [
      { key: 'A', text: 'Combining different blockchains into one' },
      { key: 'B', text: 'Allowing smart contracts from different VMs to interact in real-time' },
      { key: 'C', text: 'Blending user interfaces for better UX' },
      { key: 'D', text: 'Merging centralized and decentralized systems' },
    ],
    correctAnswer: 'B', // Düzeltildi: D -> B
  },
  {
    question: "What is one benefit of using Wasm in Fluent for developers?",
    options: [
      { key: 'A', text: 'It restricts developers to using only one language' },
      { key: 'B', text: 'It allows developers to use general-purpose languages like Rust and existing libraries' },
      { key: 'C', text: 'It eliminates the need for Ethereum compatibility' },
      { key: 'D', text: 'It reduces transaction fees on Ethereum' },
    ],
    correctAnswer: 'B', // Doğru
  },
  {
    question: "What stage is Fluent in as of June 2024?",
    options: [
      { key: 'A', text: 'Mainnet' },
      { key: 'B', text: 'Public Devnet' },
      { key: 'C', text: 'Private Testnet' },
      { key: 'D', text: 'Alpha Testing' },
    ],
    correctAnswer: 'B', // Düzeltildi: C -> B
  },
  {
    question: "Which of the following is an example of a blended application on Fluent?",
    options: [
      { key: 'A', text: 'A chess game combining Rust and Solidity smart contracts' },
      { key: 'B', text: 'A website with a new UI design' },
      { key: 'C', text: 'A centralized database system' },
      { key: 'D', text: 'A mobile app for social media' },
    ],
    correctAnswer: 'A', // Doğru
  },
  {
    question: "What is Fluent’s mission according to its official website?",
    options: [
      { key: 'A', text: 'To create the fastest blockchain in the world' },
      { key: 'B', text: 'To enable developers to build any app in any language on Ethereum' },
      { key: 'C', text: 'To replace smart contracts with traditional software' },
      { key: 'D', text: 'To develop a new consensus mechanism' },
    ],
    correctAnswer: 'B', // Düzeltildi: D -> B
  },
];

const QuizSection = ({ setQuizCompleted }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);

  const handleAnswer = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }

    // 2 saniye sonra otomatik olarak bir sonraki soruya geç
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswerStatus(null);

      if (currentQuestion + 1 === questions.length) {
        setQuizCompleted(true);
      }
    }, 2000); // 2 saniye bekle
  };

  return (
    <Stack
      styles={{
        root: {
          backgroundColor: '#FFFFFF',
          padding: 30,
          borderRadius: 8,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          width: 800,
          margin: '0 auto',
          position: 'relative',
        },
      }}
      tokens={{ childrenGap: 20 }}
    >
      {/* Sorular ve Şıklar: Ortalanmış */}
      <Stack horizontalAlign="center">
        {currentQuestion < questions.length ? (
          <>
            <Text
              variant="xxLarge"
              styles={{
                root: {
                  color: '#000000',
                  textAlign: 'center',
                },
              }}
            >
              Question {currentQuestion + 1} of {questions.length}
            </Text>
            <Text
              variant="xLarge"
              styles={{
                root: {
                  color: '#000000',
                  textAlign: 'center',
                },
              }}
            >
              {questions[currentQuestion].question}
            </Text>

            {/* Şıklar: İki sol, iki sağ */}
            <Stack horizontal tokens={{ childrenGap: 20 }} horizontalAlign="center">
              {/* Sol Taraftaki Şıklar (A ve B) */}
              <Stack tokens={{ childrenGap: 15 }}>
                {questions[currentQuestion].options.slice(0, 2).map((option) => (
                  <Stack
                    key={option.key}
                    onClick={() => setSelectedAnswer(option.key)}
                    styles={{
                      root: {
                        backgroundColor: selectedAnswer === option.key ? '#6C5CE7' : '#F0F4FA',
                        color: selectedAnswer === option.key ? '#FFFFFF' : '#2D3436',
                        padding: '15px 20px',
                        borderRadius: 12,
                        border: '2px solid #DFE6E9',
                        cursor: 'pointer',
                        width: 300,
                        height: 100,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ':hover': {
                          backgroundColor: selectedAnswer === option.key ? '#5A4BDB' : '#E2E8F0',
                          transform: 'scale(1.02)',
                        },
                      },
                    }}
                  >
                    <Text
                      variant="medium"
                      styles={{
                        root: {
                          whiteSpace: 'normal',
                          lineHeight: '1.4',
                        },
                      }}
                    >
                      {`${option.key}. ${option.text}`}
                    </Text>
                  </Stack>
                ))}
              </Stack>

              {/* Sağ Taraftaki Şıklar (C ve D) */}
              <Stack tokens={{ childrenGap: 15 }}>
                {questions[currentQuestion].options.slice(2, 4).map((option) => (
                  <Stack
                    key={option.key}
                    onClick={() => setSelectedAnswer(option.key)}
                    styles={{
                      root: {
                        backgroundColor: selectedAnswer === option.key ? '#6C5CE7' : '#F0F4FA',
                        color: selectedAnswer === option.key ? '#FFFFFF' : '#2D3436',
                        padding: '15px 20px',
                        borderRadius: 12,
                        border: '2px solid #DFE6E9',
                        cursor: 'pointer',
                        width: 300,
                        height: 100,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ':hover': {
                          backgroundColor: selectedAnswer === option.key ? '#5A4BDB' : '#E2E8F0',
                          transform: 'scale(1.02)',
                        },
                      },
                    }}
                  >
                    <Text
                      variant="medium"
                      styles={{
                        root: {
                          whiteSpace: 'normal',
                          lineHeight: '1.4',
                        },
                      }}
                    >
                      {`${option.key}. ${option.text}`}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            {/* Submit Butonu */}
            {answerStatus ? (
              <Text
                variant="large"
                styles={{
                  root: {
                    color: answerStatus === 'correct' ? '#28A745' : '#DC3545',
                    textAlign: 'center',
                    marginTop: 10,
                  },
                }}
              >
                {answerStatus === 'correct' ? 'Correct!' : `Incorrect! Correct answer: ${questions[currentQuestion].correctAnswer}`}
              </Text>
            ) : (
              <PrimaryButton
                text="Submit Answer"
                onClick={handleAnswer}
                disabled={!selectedAnswer}
                styles={{
                  root: {
                    backgroundColor: '#FE6901',
                    borderColor: '#FE6901',
                    borderRadius: 8,
                    marginTop: 20,
                  },
                  rootHovered: {
                    backgroundColor: '#E65D00',
                    borderColor: '#E65D00',
                  },
                  text: {
                    color: '#FFFFFF',
                  },
                }}
              />
            )}
          </>
        ) : (
          <Text
            variant="xxLarge"
            styles={{
              root: {
                color: '#000000',
                textAlign: 'center',
              },
            }}
          >
            Quiz Completed! Your Score: {score}/{questions.length}
          </Text>
        )}
      </Stack>

      {/* Twitter Linkleri: Sağ alt köşede */}
      <Stack
        styles={{
          root: {
            position: 'absolute',
            bottom: 10,
            right: 10,
          },
        }}
        tokens={{ childrenGap: 5 }} // Linkler arasında boşluk
      >
        <Link
          href="https://x.com/0xshawtyy"
          target="_blank"
          styles={{
            root: {
              color: '#1DA1F2',
              fontSize: 14,
            },
          }}
        >
          @0xshawtyy
        </Link>
        <Link
          href="https://x.com/fluentxyz"
          target="_blank"
          styles={{
            root: {
              color: '#1DA1F2',
              fontSize: 14,
            },
          }}
        >
          @fluentxyz
        </Link>
      </Stack>
    </Stack>
  );
};

export default QuizSection;