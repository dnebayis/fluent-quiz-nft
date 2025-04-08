import React, { useState } from 'react';
import { initializeIcons, PrimaryButton, Stack, Text, Image, DocumentCard, DocumentCardDetails } from '@fluentui/react';
import { ethers } from 'ethers';
import QuizSection from './QuizSection';

// Fluent UI ikonlarını başlat
initializeIcons();

// Kontrat adresi ve ABI
const contractAddress = '0xBFe8aA3faC14305AD30E29482410B12ce660c620';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const App = () => {
  const [nftMinted, setNftMinted] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Cüzdan bağlama fonksiyonu
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // NFT mint fonksiyonu
  const handleMintNFT = async () => {
    if (!walletConnected) {
      await connectWallet();
      if (!walletConnected) return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.mintNFT();
      await tx.wait();
      setNftMinted(true);
    } catch (error) {
      console.error("NFT minting failed:", error);
      alert("NFT minting failed: " + error.message);
    }
  };

  // Twitter paylaşım fonksiyonu
  const handleShareOnTwitter = () => {
    const tweetText = "I just completed the Fluent Quiz NFT Challenge! Join me and mint your own FluentNFT! 🚀 @fluentxyz #FluentNFT [YourPageLink]";
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <Stack
      styles={{
        root: {
          background: 'linear-gradient(135deg, #000000 0%, #b366a8 100%)',
          minHeight: '100vh',
          padding: 20,
          fontFamily: 'Roboto, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      tokens={{ childrenGap: 20 }}
    >
      {/* Logo ve Connect Wallet Butonu: Üstte, iki uçta */}
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        styles={{
          root: {
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
          },
        }}
      >
        {/* Logo: Sol üst köşede */}
        <Image src="/assets/new-fluent-logo.png" alt="FluentQuizNFT Logo" width={120} />

        {/* Connect Wallet Butonu: En sağ üst köşede */}
        {!walletConnected && (
          <PrimaryButton
            text="Connect Wallet"
            onClick={connectWallet}
            styles={{
              root: {
                backgroundColor: '#FE6901',
                borderColor: '#FE6901',
                borderRadius: 8,
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
      </Stack>

      {/* Quiz Bölümü */}
      <Stack horizontalAlign="center" verticalAlign="center">
        <QuizSection setQuizCompleted={setQuizCompleted} />
      </Stack>

      {/* NFT Mint Bölümü: Quiz tamamlandıktan sonra göster */}
      {quizCompleted && !nftMinted ? (
        <Stack
          horizontalAlign="center"
          tokens={{ childrenGap: 20 }}
          styles={{
            root: {
              width: 800,
              margin: '0 auto',
              textAlign: 'center',
            },
          }}
        >
          {/* NFT Önizlemesi: Ortada, estetik */}
          <Stack
            styles={{
              root: {
                backgroundColor: '#FFFFFF',
                padding: 20,
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
                ':hover': {
                  transform: 'scale(1.05)',
                },
              },
            }}
          >
            <Image
              src="/assets/fluent-nft.png"
              alt="FluentNFT Preview"
              width={300}
              style={{ margin: '0 auto', display: 'block', borderRadius: 8 }}
            />
          </Stack>

          {/* Mint NFT ve Share on Twitter Butonları */}
          <Stack horizontal tokens={{ childrenGap: 20 }} horizontalAlign="center">
            <PrimaryButton
              text="Mint NFT"
              onClick={handleMintNFT}
              styles={{
                root: {
                  backgroundColor: '#FE6901',
                  borderColor: '#FE6901',
                  borderRadius: 8,
                  padding: '10px 30px',
                  fontSize: 16,
                  transition: 'all 0.3s ease',
                },
                rootHovered: {
                  backgroundColor: '#E65D00',
                  borderColor: '#E65D00',
                  transform: 'scale(1.05)',
                },
                text: {
                  color: '#FFFFFF',
                },
              }}
            />
            <PrimaryButton
              text="Share on Twitter"
              onClick={handleShareOnTwitter}
              styles={{
                root: {
                  backgroundColor: '#1DA1F2',
                  borderColor: '#1DA1F2',
                  borderRadius: 8,
                  padding: '10px 30px',
                  fontSize: 16,
                  transition: 'all 0.3s ease',
                },
                rootHovered: {
                  backgroundColor: '#0D95E8',
                  borderColor: '#0D95E8',
                  transform: 'scale(1.05)',
                },
                text: {
                  color: '#FFFFFF',
                },
              }}
            />
          </Stack>
        </Stack>
      ) : walletConnected && nftMinted ? (
        <Stack
          horizontalAlign="center"
          tokens={{ childrenGap: 20 }}
          styles={{
            root: {
              width: 300,
              margin: '0 auto',
              textAlign: 'center',
            },
          }}
        >
          <DocumentCard
            styles={{
              root: {
                backgroundColor: 'white',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: 8,
                padding: 20,
                width: 300,
                margin: '0 auto',
              },
            }}
          >
            <DocumentCardDetails>
              <Text
                variant="xLarge"
                styles={{
                  root: {
                    color: '#323130',
                    textAlign: 'center',
                    display: 'block',
                  },
                }}
              >
                Successfully Minted!
              </Text>
              <Text
                variant="large"
                styles={{
                  root: {
                    textAlign: 'center',
                    display: 'block',
                  },
                }}
              >
                You’ve minted your FluentNFT!
              </Text>
            </DocumentCardDetails>
          </DocumentCard>

          {/* Share on Twitter Butonu */}
          <PrimaryButton
            text="Share on Twitter"
            onClick={handleShareOnTwitter}
            styles={{
              root: {
                backgroundColor: '#1DA1F2',
                borderColor: '#1DA1F2',
                borderRadius: 8,
                padding: '10px 30px',
                fontSize: 16,
                transition: 'all 0.3s ease',
              },
              rootHovered: {
                backgroundColor: '#0D95E8',
                borderColor: '#0D95E8',
                transform: 'scale(1.05)',
              },
              text: {
                color: '#FFFFFF',
              },
            }}
          />
        </Stack>
      ) : null}
    </Stack>
  );
};

export default App;