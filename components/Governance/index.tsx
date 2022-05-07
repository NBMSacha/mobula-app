import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { ethers } from "ethers";
import {
  Heading,
  Text,
  Box,
  Flex,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import styles from "./governance.module.scss";

import { MOBL_ADDRESS, GOVERNOR_ADDRESS, RPC_URL } from "../../constants";

function Governance() {
  const alert = useAlert();
  const [shares, setShares] = useState("0");
  const [deposit, setDeposit] = useState("");
  const [withdrawal, setWithdrawal] = useState("");
  const [proposal, setProposal] = useState("");
  const [liveProposals, setLiveProposals] = useState([
    <Text>No proposals currently voted.</Text>,
  ]);

  const [opacityUp, setopacityUp] = useState("1");
  const [opacityDown, setopacityDown] = useState("1");
  const [BGcolor, setBGcolor] = useState("#a3d4f440");

  var provider: any;
  var account: string;

  async function initValues() {
    try {
      provider = new ethers.providers.JsonRpcProvider(RPC_URL);

      const governorContract = new ethers.Contract(
        GOVERNOR_ADDRESS,
        [
          {
            inputs: [
              {
                //@ts-ignore
                internalType: "uint256",
                name: "top",
                type: "uint256",
              },
            ],
            name: "getLiveProposals",
            outputs: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "author",
                    type: "address",
                  },
                  {
                    internalType: "string",
                    name: "name",
                    type: "string",
                  },
                  {
                    internalType: "uint256",
                    name: "createdAt",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "votesForYes",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "votesForNo",
                    type: "uint256",
                  },
                  {
                    internalType: "enum MobulaGovernor.Status",
                    name: "status",
                    type: "uint8",
                  },
                ],
                //@ts-ignore
                internalType: "struct MobulaGovernor.Proposal[]",
                name: "",
                type: "tuple[]",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                //@ts-ignore
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "shares",
            outputs: [
              {
                //@ts-ignore
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                //@ts-ignore
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            name: "proposals",
            outputs: [
              {
                //@ts-ignore
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                //@ts-ignore
                internalType: "address",
                name: "author",
                type: "address",
              },
              {
                //@ts-ignore
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                //@ts-ignore
                internalType: "uint256",
                name: "createdAt",
                type: "uint256",
              },
              {
                //@ts-ignore
                internalType: "uint256",
                name: "votesForYes",
                type: "uint256",
              },
              {
                //@ts-ignore
                internalType: "uint256",
                name: "votesForNo",
                type: "uint256",
              },
              {
                //@ts-ignore
                internalType: "enum MobulaGovernor.Status",
                name: "status",
                type: "uint8",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        provider
      );

      try {
        const walletProvider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const accounts = await provider.listAccounts();
        account = accounts[0];

        if (account) {
          const shares = ethers.utils.formatEther(
            await governorContract.shares(account)
          );
          setShares(shares);
        }
      } catch (e) {}

      let nextProposals = await governorContract.getLiveProposals(5);

      const newLiveProposals = [];

      console.log(nextProposals);

      nextProposals.forEach((prop, index) => {
        if (prop.name) {
          newLiveProposals.push(
            <div key={index}>
              <div className="form-input">
                <div>
                  <input
                    className="long"
                    value={prop.name}
                    onChange={(e) => e}
                    placeholder="0x..."
                    required
                  ></input>
                </div>
              </div>
              <div className="buttonsDiv">
                <button
                  className="button"
                  onClick={async (e) => {
                    e.preventDefault();

                    try {
                      var provider = new ethers.providers.Web3Provider(
                        (window as any).ethereum
                      );
                      var signer = provider.getSigner();
                    } catch (e) {
                      alert.show(
                        "You must connect your wallet to access the Dashboard."
                      );
                    }

                    try {
                      const value = await new ethers.Contract(
                        GOVERNOR_ADDRESS,
                        [
                          {
                            inputs: [
                              {
                                //@ts-ignore
                                internalType: "uint256",
                                name: "_proposalId",
                                type: "uint256",
                              },
                              {
                                //@ts-ignore
                                internalType:
                                  "enum MobulaGovernor.VotingOptions",
                                name: "_vote",
                                type: "uint8",
                              },
                            ],
                            name: "vote",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                          },
                        ],
                        signer
                      ).vote(prop.id.toNumber(), 1);
                    } catch (e) {
                      if (e.data && e.data.message) {
                        alert.error(e.data.message);
                      } else {
                        alert.error("Something went wrong.");
                      }
                      console.log(e);
                    }
                  }}
                >
                  No
                </button>
                <button
                  className="button"
                  onClick={async (e) => {
                    e.preventDefault();

                    try {
                      var provider = new ethers.providers.Web3Provider(
                        (window as any).ethereum
                      );
                      var signer = provider.getSigner();
                    } catch (e) {
                      alert.show(
                        "You must connect your wallet to access the Dashboard."
                      );
                    }

                    try {
                      const value = await new ethers.Contract(
                        GOVERNOR_ADDRESS,
                        [
                          {
                            inputs: [
                              {
                                //@ts-ignore
                                internalType: "uint256",
                                name: "_proposalId",
                                type: "uint256",
                              },
                              {
                                //@ts-ignore
                                internalType:
                                  "enum MobulaGovernor.VotingOptions",
                                name: "_vote",
                                type: "uint8",
                              },
                            ],
                            name: "vote",
                            outputs: [],
                            stateMutability: "nonpayable",
                            type: "function",
                          },
                        ],
                        signer
                      ).vote(prop.id.toNumber(), 0);
                    } catch (e) {
                      if (e.data && e.data.message) {
                        alert.error(e.data.message);
                      } else {
                        alert.error("Something went wrong.");
                      }
                      console.log(e);
                    }
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          );
        }
      });

      setLiveProposals(newLiveProposals);
    } catch (e) {
      //alert.show('You must connect your wallet to submit the form.')
      console.log(e);
    }
  }

  useEffect(() => {
    initValues();
    console.log(liveProposals);
  }, []);

  return (
    <div className="listing">
      <div className="container">
        <header>
          <Heading as="h1" mb={"20px"}>
            Governance
          </Heading>

          <Text fontSize={["14px", "14px", "16px", "17px"]}>
            You are in charge : deposit MOBL to be able to vote.
            <a
              className={styles.link}
              href="https://docs.mobula.finance/app/governance"
            >
              Learn more here
            </a>
          </Text>
        </header>

        <div className={styles.line}></div>
        <Flex
          paddingTop="60px"
          justifyContent={["space-evenly"]}
          flexDir={["column", "column", "column", "row"]}
          alignItems={["center", "center", "center", "stretch"]}
        >
          {/* Voting Power */}
          <Box
            p="10px"
            bg={"#a3d4f440"}
            borderRadius="10px"
            w={["90%", "90%", "90%", "30%"]}
            mb={[7, 7, 7, 0]}
            textAlign={["center", "center", "center", "left"]}
          >
            <Heading as="h2">Voting power</Heading>
            <Box fontSize="15px" mb={5}>
              <Text mb={2}>You currently deposited</Text>
              <Text fontWeight="800"> {shares + "  $MOBL"}</Text>
            </Box>

            <FormControl>
              <FormLabel htmlFor="contract">Deposit new tokens</FormLabel>
              <Input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                placeholder="2000"
                isRequired
                background="#a3d4f433"
              />
              <Flex
                width="100%"
                justifyContent={["center", "center", "center", "left"]}
              >
                <button
                  className="button"
                  style={{ marginBottom: "1.5rem" }}
                  onClick={async (e) => {
                    e.preventDefault();

                    try {
                      var provider = new ethers.providers.Web3Provider(
                        (window as any).ethereum
                      );
                      var signer = provider.getSigner();
                    } catch (e) {
                      alert.show(
                        "You must connect your wallet to access the Dashboard."
                      );
                    }

                    try {
                      const approval = await new ethers.Contract(
                        MOBL_ADDRESS,
                        [
                          "function approve(address spender, uint256 amount) public returns (bool)",
                        ],
                        signer
                      ).approve(
                        GOVERNOR_ADDRESS,
                        ethers.utils.parseEther(deposit)
                      );

                      const success = await new ethers.Contract(
                        GOVERNOR_ADDRESS,
                        ["function deposit(uint256 amount) external"],
                        signer
                      ).deposit(ethers.utils.parseEther(deposit));

                      console.log(parseFloat(deposit));
                      const newShares =
                        parseFloat(shares) + parseFloat(deposit);
                      setShares(String(newShares));
                      setDeposit("0");
                      alert.show("Deposit successful.");
                    } catch (e) {
                      if (e.data && e.data.message) {
                        alert.error(e.data.message);
                      } else {
                        alert.error("Something went wrong.");
                      }
                    }
                  }}
                >
                  Deposit
                </button>
              </Flex>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="contract">Withdraw your tokens</FormLabel>
              <Input
                type="number"
                value={withdrawal}
                onChange={(e) => setWithdrawal(e.target.value)}
                placeholder="150"
                isRequired
                background="#a3d4f433"
              />

              {/* Button */}
              <Flex
                width="100%"
                justifyContent={["center", "center", "center", "left"]}
              >
                <button
                  className="button"
                  onClick={async (e) => {
                    e.preventDefault();

                    try {
                      var provider = new ethers.providers.Web3Provider(
                        (window as any).ethereum
                      );
                      var signer = provider.getSigner();
                    } catch (e) {
                      alert.show(
                        "You must connect your wallet to access the Dashboard."
                      );
                    }

                    try {
                      const success = await new ethers.Contract(
                        GOVERNOR_ADDRESS,
                        ["function withdraw(uint256 amount) external"],
                        signer
                      ).withdraw(ethers.utils.parseEther(withdrawal));

                      const newShares =
                        parseFloat(shares) - parseFloat(withdrawal);
                      setShares(String(newShares));
                      setWithdrawal("0");
                      alert.show("Withdrawal successful.");
                    } catch (e) {
                      if (e.data && e.data.message) {
                        alert.error(e.data.message);
                      } else {
                        alert.error("Something went wrong.");
                      }
                    }
                  }}
                >
                  Withdraw
                </button>
              </Flex>
            </FormControl>
          </Box>

          {/* Governance Process */}
          <Box
            p="10px"
            bg={"#a3d4f440"}
            borderRadius="10px"
            w={["90%", "90%", "90%", "30%"]}
            textAlign={["center", "center", "center", "left"]}
          >
            <Heading as="h2">Governance process</Heading>
            <Box fontSize="15px" mb={5}>
              <Text mb={3}>Create a proposal</Text>

              <Textarea
                variant="outline"
                background="#a3d4f433"
                p="8px"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="The listing fee should be reduced to 10$"
                isRequired
                size="sm"
                minH="200px"
                border="none"
                borderRadius="10px"
                width="100%"
              />
            </Box>
            {/* Button */}
            <Flex
              width="100%"
              justifyContent={["center", "center", "center", "left"]}
            >
              <button
                className="button"
                style={{ marginBottom: "1.5rem" }}
                onClick={async (e) => {
                  e.preventDefault();

                  try {
                    var provider = new ethers.providers.Web3Provider(
                      (window as any).ethereum
                    );
                    var signer = provider.getSigner();
                  } catch (e) {
                    alert.show(
                      "You must connect your wallet to access the Dashboard."
                    );
                  }

                  try {
                    const success = await new ethers.Contract(
                      GOVERNOR_ADDRESS,
                      ["function createProposal(string name) external"],
                      signer
                    ).createProposal(proposal);

                    setProposal("");
                    initValues();
                    alert.show("Proposal created successfully.");
                  } catch (e) {
                    if (e.data && e.data.message) {
                      alert.error(e.data.message);
                    } else {
                      alert.error("Something went wrong.");
                    }
                  }
                }}
              >
                Create
              </button>
            </Flex>
          </Box>

          {/* Currents Proposals */}
          <Box
            w={["90%", "90%", "90%", "30%"]}
            p="10px"
            textAlign={["center", "center", "center", "left"]}
          >
            <Text mb="20px" fontSize="25px" fontWeight="900">
              Vote For current proposals
            </Text>

            {/* map current proposal */}
            <Flex
              justifyContent="space-evenly"
              p="20px"
              borderRadius="10px"
              background={BGcolor}
              alignItems="center"
            >
              <Text
                fontSize={["12px", "15px", "20px", "12px"]}
                width="60%"
                fontWeight="800"
              >
                the listing fee should be reduced to 10$
              </Text>
              <Flex>
                <Button
                  variant="unstyled"
                  mr={3}
                  opacity={opacityUp}
                  fontSize="28px"
                  onClick={() => {
                    setBGcolor("#16c784");
                    setopacityDown("0.3");
                  }}
                >
                  👍
                </Button>
                <Button
                  variant="unstyled"
                  fontSize="28px"
                  opacity={opacityDown}
                  onClick={() => {
                    setBGcolor("#ea3943");
                    setopacityUp("0.3");
                  }}
                >
                  👎
                </Button>
              </Flex>
            </Flex>
            <Text fontSize="15px" textAlign="center">
              {liveProposals}
            </Text>
          </Box>
        </Flex>
      </div>
    </div>
  );
}

export default Governance;
