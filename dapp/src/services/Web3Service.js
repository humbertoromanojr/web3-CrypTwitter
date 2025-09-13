import Web3 from "web3";

import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export async function doLogin() {
  if (!window.ethereum) throw new Error("Metamask is not installed");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || !accounts.length)
    throw new Error("Wallet not found or allowed");

  localStorage.setItem("walletAddress", accounts[0]);

  return accounts[0];
}

function getContract() {
  // if Metamask installed
  if (!window.ethereum) throw new Error("Metamask is not installed");
  // start web3 library
  const web3 = new Web3(window.ethereum);
  // get wallet in localStorage
  const from = localStorage.getItem("walletAddress");

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addTweet(text) {
  const contract = getContract();

  await contract.methods.addTweet(text).send();
}

export async function changeUsername(newName) {
  const contract = getContract();

  await contract.methods.addTweet(newName).send();
}

export async function getLastTweets(page) {
  const contract = getContract();

  const tweets = await contract.methods.getLastTweets(page).call();

  return tweets.map((t) => {
    // Filter non-empty text
    return { ...t }.filter((t) => t.text !== "");
  });
}
