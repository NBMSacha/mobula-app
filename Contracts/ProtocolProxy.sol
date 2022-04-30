//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

interface API {
    struct Token {
        string ipfsHash;
        address[] contractAddresses;
        uint256 id;
        address[] totalSupply;
        address[] excludedFromCirculation;
        uint256 lastUpdate;
        uint256 utilityScore;
        uint256 socialScore;
        uint256 trustScore;
        uint256 marketScore;
    }

    function addAssetData(Token memory token) external;
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function decimals() external view returns (uint8);

    function symbol() external view returns (string memory);

    function name() external view returns (string memory);

    function getOwner() external view returns (address);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address _owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract ProtocolProxy is Initializable {
    address public owner;
    uint256 public submitPrice;

    uint256 public firstSortMaxVotes;
    uint256 public firstSortValidationsNeeded;
    uint256 public finalDecisionValidationsNeeded;
    uint256 public finalDecisionMaxVotes;
    uint256 public tokensPerVote;

    uint256 public membersToPromoteToRankI;
    uint256 public membersToPromoteToRankII;
    uint256 public votesNeededToRankIPromotion;
    uint256 public votesNeededToRankIIPromotion;
    uint256 public membersToDemoteFromRankI;
    uint256 public membersToDemoteFromRankII;
    uint256 public votesNeededToRankIDemotion;
    uint256 public votesNeededToRankIIDemotion;
    uint256 public voteCooldown;

    mapping(address => mapping(uint256 => bool)) public firstSortVotes;
    mapping(address => mapping(uint256 => bool)) public finalDecisionVotes;
    mapping(uint256 => address[]) public tokenFirstValidations;
    mapping(uint256 => address[]) public tokenFirstRejections;
    mapping(uint256 => address[]) public tokenFinalValidations;
    mapping(uint256 => address[]) public tokenFinalRejections;

    mapping(uint256 => uint256[]) public tokenUtilityScore;
    mapping(uint256 => uint256[]) public tokenSocialScore;
    mapping(uint256 => uint256[]) public tokenTrustScore;
    mapping(uint256 => uint256[]) public tokenMarketScore;

    mapping(address => uint256) public rank;
    mapping(address => uint256) public promoteVotes;
    mapping(address => uint256) public demoteVotes;
    mapping(address => uint256) public goodFirstVotes;
    mapping(address => uint256) public badFirstVotes;
    mapping(address => uint256) public paidFirstVotes;
    mapping(address => uint256) public badFinalVotes;
    mapping(address => uint256) public goodFinalVotes;
    mapping(address => uint256) public paidFinalVotes;

    API.Token[] public submittedTokens;

    API.Token[] public firstSortTokens;
    mapping(uint256 => uint256) public indexOfFirstSortTokens;
    API.Token[] public finalValidationTokens;
    mapping(uint256 => uint256) public indexOfFinalValidationTokens;

    IERC20 MOBL;
    API ProtocolAPI;

    event DataSubmitted(API.Token token);
    event FirstSortVote(
        API.Token token,
        address voter,
        bool validated,
        uint256 utilityScore,
        uint256 socialScore,
        uint256 trustScore,
        uint256 marketScore
    );
    event FinalValidationVote(
        API.Token token,
        address voter,
        bool validated,
        uint256 utilityScore,
        uint256 socialScore,
        uint256 trustScore,
        uint256 marketScore
    );
    event FirstSortValidated(API.Token token, uint256 validations);
    event FirstSortRejected(API.Token token, uint256 validations);
    event FinalDecisionValidated(API.Token token, uint256 validations);
    event FinalDecisionRejected(API.Token token, uint256 validations);

    function initialize(address _owner, address _mobulaTokenAddress)
        public
        initializer
    {
        owner = _owner;
        MOBL = IERC20(_mobulaTokenAddress);
    }

    // Getters for public arrays

    function getSubmittedTokens() external view returns (API.Token[] memory) {
        return submittedTokens;
    }

    function getFirstSortTokens() external view returns (API.Token[] memory) {
        return firstSortTokens;
    }

    function getFinalValidationTokens()
        external
        view
        returns (API.Token[] memory)
    {
        return finalValidationTokens;
    }

    //Protocol variables updaters

    function updateProtocolAPIAddress(address _protocolAPIAddress) external {
        require(owner == msg.sender, "DAO Only");
        ProtocolAPI = API(_protocolAPIAddress);
    }

    function updateSubmitPrice(uint256 _submitPrice) external {
        require(owner == msg.sender, "DAO Only");
        submitPrice = _submitPrice;
    }

    function updateFirstSortMaxVotes(uint256 _firstSortMaxVotes) external {
        require(owner == msg.sender, "DAO Only");
        firstSortMaxVotes = _firstSortMaxVotes;
    }

    function updateFinalDecisionMaxVotes(uint256 _finalDecisionMaxVotes)
        external
    {
        require(owner == msg.sender, "DAO Only");
        finalDecisionMaxVotes = _finalDecisionMaxVotes;
    }

    function updateFirstSortValidationsNeeded(
        uint256 _firstSortValidationsNeeded
    ) external {
        require(owner == msg.sender, "DAO Only");
        firstSortValidationsNeeded = _firstSortValidationsNeeded;
    }

    function updateFinalDecisionValidationsNeeded(
        uint256 _finalDecisionValidationsNeeded
    ) external {
        require(owner == msg.sender, "DAO Only");
        finalDecisionValidationsNeeded = _finalDecisionValidationsNeeded;
    }

    function updateTokensPerVote(uint256 _tokensPerVote) external {
        require(owner == msg.sender, "DAO Only");
        tokensPerVote = _tokensPerVote;
    }

    function updateMembersToPromoteToRankI(uint256 _membersToPromoteToRankI)
        external
    {
        require(owner == msg.sender, "DAO Only");
        membersToPromoteToRankI = _membersToPromoteToRankI;
    }

    function updateMembersToPromoteToRankII(uint256 _membersToPromoteToRankII)
        external
    {
        require(owner == msg.sender, "DAO Only");
        membersToPromoteToRankII = _membersToPromoteToRankII;
    }

    function updateMembersToDemoteFromRankI(uint256 _membersToDemoteToRankI)
        external
    {
        require(owner == msg.sender, "DAO Only");
        membersToDemoteFromRankI = _membersToDemoteToRankI;
    }

    function updateMembersToDemoteFromRankII(uint256 _membersToDemoteToRankII)
        external
    {
        require(owner == msg.sender, "DAO Only");
        membersToDemoteFromRankII = _membersToDemoteToRankII;
    }

    function updateVotesNeededToRankIPromotion(
        uint256 _votesNeededToRankIPromotion
    ) external {
        require(owner == msg.sender, "DAO Only");
        votesNeededToRankIPromotion = _votesNeededToRankIPromotion;
    }

    function updateVotesNeededToRankIIPromotion(
        uint256 _votesNeededToRankIIPromotion
    ) external {
        require(owner == msg.sender, "DAO Only");
        votesNeededToRankIIPromotion = _votesNeededToRankIIPromotion;
    }

    function updateVotesNeededToRankIDemotion(
        uint256 _votesNeededToRankIDemotion
    ) external {
        require(owner == msg.sender, "DAO Only");
        votesNeededToRankIDemotion = _votesNeededToRankIDemotion;
    }

    function updateVotesNeededToRankIIDemotion(
        uint256 _votesNeededToRankIIDemotion
    ) external {
        require(owner == msg.sender, "DAO Only");
        votesNeededToRankIIDemotion = _votesNeededToRankIIDemotion;
    }

    function updateVoteCooldown(uint256 _voteCooldown) external {
        require(owner == msg.sender, "DAO Only");
        voteCooldown = _voteCooldown;
    }

    //Protocol data processing

    function submitIPFS(
        address[] memory contractAddresses,
        address[] memory totalSupplyAddresses,
        address[] memory excludedCirculationAddresses,
        string memory ipfsHash
    ) external payable {
        require(msg.value >= submitPrice, "You must pay the submit fee.");
        require(
            contractAddresses.length > 0,
            "You must submit at least one contract."
        );
        for (uint256 i = 0; i < firstSortTokens.length; i++) {
            for (
                uint256 j = 0;
                j < firstSortTokens[i].contractAddresses.length;
                j++
            ) {
                for (uint256 k = 0; k < contractAddresses.length; k++) {
                    require(
                        firstSortTokens[i].contractAddresses[j] !=
                            contractAddresses[k],
                        "One of the smart-contracts is already in the listing process."
                    );
                }
            }
        }

        for (uint256 i = 0; i < finalValidationTokens.length; i++) {
            for (
                uint256 j = 0;
                j < finalValidationTokens[i].contractAddresses.length;
                j++
            ) {
                for (uint256 k = 0; k < contractAddresses.length; k++) {
                    require(
                        finalValidationTokens[i].contractAddresses[j] !=
                            contractAddresses[k],
                        "One of the smart-contracts is already in the listing process."
                    );
                }
            }
        }

        API.Token memory submittedToken = API.Token(
            ipfsHash,
            contractAddresses,
            submittedTokens.length,
            totalSupplyAddresses,
            excludedCirculationAddresses,
            block.timestamp,
            0,
            0,
            0,
            0
        );

        submittedTokens.push(submittedToken);
        indexOfFirstSortTokens[submittedToken.id] = firstSortTokens.length;
        firstSortTokens.push(submittedToken);
        emit DataSubmitted(submittedToken);
    }

    function firstSortVote(
        uint256 tokenId,
        bool validate,
        uint256 utilityScore,
        uint256 socialScore,
        uint256 trustScore,
        uint256 marketScore
    ) external {
        require(rank[msg.sender] >= 1, "You must be Rank I or higher to vote.");
        require(
            firstSortTokens[indexOfFirstSortTokens[tokenId]]
                .contractAddresses
                .length > 0,
            "Token not submitted."
        );
        require(
            !firstSortVotes[msg.sender][tokenId],
            "You cannot vote twice for the same token."
        );
        require(
            block.timestamp >
                firstSortTokens[indexOfFirstSortTokens[tokenId]].lastUpdate +
                    voteCooldown,
            "You must wait before the end of the cooldown to vote."
        );
        require(
            utilityScore <= 5 &&
                socialScore <= 5 &&
                trustScore <= 5 &&
                marketScore <= 5,
            "Scores must be between 0 and 5."
        );

        tokenUtilityScore[tokenId].push(utilityScore);
        tokenSocialScore[tokenId].push(socialScore);
        tokenTrustScore[tokenId].push(trustScore);
        tokenMarketScore[tokenId].push(marketScore);

        firstSortVotes[msg.sender][tokenId] = true;

        if (validate) {
            tokenFirstValidations[tokenId].push(msg.sender);
        } else {
            tokenFirstRejections[tokenId].push(msg.sender);
        }

        if (
            tokenFirstValidations[tokenId].length +
                tokenFirstRejections[tokenId].length >=
            firstSortMaxVotes
        ) {
            if (
                tokenFirstValidations[tokenId].length >=
                firstSortValidationsNeeded
            ) {
                indexOfFinalValidationTokens[tokenId] = finalValidationTokens
                    .length;
                finalValidationTokens.push(
                    firstSortTokens[indexOfFirstSortTokens[tokenId]]
                );
                emit FirstSortValidated(
                    firstSortTokens[indexOfFirstSortTokens[tokenId]],
                    tokenFirstValidations[tokenId].length
                );
            } else {
                emit FirstSortRejected(
                    firstSortTokens[indexOfFirstSortTokens[tokenId]],
                    tokenFirstValidations[tokenId].length
                );
            }

            firstSortTokens[indexOfFirstSortTokens[tokenId]] = firstSortTokens[
                firstSortTokens.length - 1
            ];
            indexOfFirstSortTokens[
                firstSortTokens[firstSortTokens.length - 1].id
            ] = indexOfFirstSortTokens[tokenId];
            firstSortTokens.pop();
        }

        emit FirstSortVote(
            firstSortTokens[indexOfFirstSortTokens[tokenId]],
            msg.sender,
            validate,
            utilityScore,
            socialScore,
            trustScore,
            marketScore
        );
    }

    function finalDecisionVote(
        uint256 tokenId,
        bool validate,
        uint256 utilityScore,
        uint256 socialScore,
        uint256 trustScore,
        uint256 marketScore
    ) external {
        require(
            rank[msg.sender] >= 2,
            "You must be Rank II or higher to vote."
        );
        require(
            finalValidationTokens[indexOfFinalValidationTokens[tokenId]]
                .contractAddresses
                .length > 0,
            "Token not submitted."
        );
        require(
            !finalDecisionVotes[msg.sender][tokenId],
            "You cannot vote twice for the same token."
        );

        finalDecisionVotes[msg.sender][tokenId] = true;

        tokenUtilityScore[tokenId].push(utilityScore);
        tokenSocialScore[tokenId].push(socialScore);
        tokenTrustScore[tokenId].push(trustScore);
        tokenMarketScore[tokenId].push(marketScore);

        if (validate) {
            tokenFinalValidations[tokenId].push(msg.sender);
        } else {
            tokenFinalRejections[tokenId].push(msg.sender);
        }

        if (
            tokenFinalValidations[tokenId].length +
                tokenFinalRejections[tokenId].length ==
            finalDecisionMaxVotes
        ) {
            if (
                tokenFinalValidations[tokenId].length >=
                finalDecisionValidationsNeeded
            ) {
                for (
                    uint256 i = 0;
                    i < tokenFirstValidations[tokenId].length;
                    i++
                ) {
                    delete firstSortVotes[tokenFirstValidations[tokenId][i]][
                        tokenId
                    ];
                    goodFirstVotes[tokenFirstValidations[tokenId][i]]++;
                }

                for (
                    uint256 i = 0;
                    i < tokenFirstRejections[tokenId].length;
                    i++
                ) {
                    delete firstSortVotes[tokenFirstRejections[tokenId][i]][
                        tokenId
                    ];
                    badFirstVotes[tokenFirstRejections[tokenId][i]]++;
                }

                // Reward good final voters
                for (
                    uint256 i = 0;
                    i < tokenFinalValidations[tokenId].length;
                    i++
                ) {
                    delete finalDecisionVotes[
                        tokenFinalValidations[tokenId][i]
                    ][tokenId];
                    goodFinalVotes[tokenFinalValidations[tokenId][i]]++;
                }

                // Punish wrong final voters
                for (
                    uint256 i = 0;
                    i < tokenFinalRejections[tokenId].length;
                    i++
                ) {
                    delete finalDecisionVotes[tokenFinalRejections[tokenId][i]][
                        tokenId
                    ];
                    badFinalVotes[tokenFinalRejections[tokenId][i]]++;
                }

                uint256 tokenUtilityScoreAverage;

                for (
                    uint256 i = 0;
                    i < tokenUtilityScore[tokenId].length;
                    i++
                ) {
                    tokenUtilityScoreAverage += tokenUtilityScore[tokenId][i];
                }

                tokenUtilityScoreAverage /= tokenUtilityScore[tokenId].length;

                uint256 tokenSocialScoreAverage;

                for (uint256 i = 0; i < tokenSocialScore[tokenId].length; i++) {
                    tokenSocialScoreAverage += tokenSocialScore[tokenId][i];
                }

                tokenSocialScoreAverage /= tokenSocialScore[tokenId].length;

                uint256 tokenTrustScoreAverage;

                for (uint256 i = 0; i < tokenTrustScore[tokenId].length; i++) {
                    tokenTrustScoreAverage += tokenTrustScore[tokenId][i];
                }

                tokenTrustScoreAverage /= tokenTrustScore[tokenId].length;

                uint256 tokenMarketScoreAverage;

                for (uint256 i = 0; i < tokenMarketScore[tokenId].length; i++) {
                    tokenMarketScoreAverage += tokenMarketScore[tokenId][i];
                }

                tokenMarketScoreAverage /= tokenMarketScore[tokenId].length;

                finalValidationTokens[indexOfFinalValidationTokens[tokenId]]
                    .utilityScore = tokenUtilityScoreAverage;
                finalValidationTokens[indexOfFinalValidationTokens[tokenId]]
                    .socialScore = tokenSocialScoreAverage;
                finalValidationTokens[indexOfFinalValidationTokens[tokenId]]
                    .trustScore = tokenTrustScoreAverage;
                finalValidationTokens[indexOfFinalValidationTokens[tokenId]]
                    .marketScore = tokenMarketScoreAverage;

                ProtocolAPI.addAssetData(
                    finalValidationTokens[indexOfFinalValidationTokens[tokenId]]
                );

                emit FinalDecisionValidated(
                    finalValidationTokens[
                        indexOfFinalValidationTokens[tokenId]
                    ],
                    tokenFinalValidations[tokenId].length
                );
            } else {
                // Punish wrong first voters
                for (
                    uint256 i = 0;
                    i < tokenFirstValidations[tokenId].length;
                    i++
                ) {
                    delete firstSortVotes[tokenFirstValidations[tokenId][i]][
                        tokenId
                    ];
                    badFirstVotes[tokenFirstValidations[tokenId][i]]++;
                }

                // Reward good first voters
                for (
                    uint256 i = 0;
                    i < tokenFirstRejections[tokenId].length;
                    i++
                ) {
                    delete firstSortVotes[tokenFirstRejections[tokenId][i]][
                        tokenId
                    ];
                    goodFirstVotes[tokenFirstRejections[tokenId][i]]++;
                }

                // Punish wrong final voters
                for (
                    uint256 i = 0;
                    i < tokenFinalValidations[tokenId].length;
                    i++
                ) {
                    delete finalDecisionVotes[
                        tokenFinalValidations[tokenId][i]
                    ][tokenId];
                    badFinalVotes[tokenFinalValidations[tokenId][i]]++;
                }

                // Reward good final voters
                for (
                    uint256 i = 0;
                    i < tokenFinalRejections[tokenId].length;
                    i++
                ) {
                    delete finalDecisionVotes[tokenFinalRejections[tokenId][i]][
                        tokenId
                    ];
                    goodFinalVotes[tokenFinalRejections[tokenId][i]]++;
                }

                emit FinalDecisionRejected(
                    finalValidationTokens[
                        indexOfFinalValidationTokens[tokenId]
                    ],
                    tokenFinalValidations[tokenId].length
                );
            }

            finalValidationTokens[
                indexOfFinalValidationTokens[tokenId]
            ] = finalValidationTokens[finalValidationTokens.length - 1];
            indexOfFinalValidationTokens[
                finalValidationTokens[finalValidationTokens.length - 1].id
            ] = indexOfFinalValidationTokens[tokenId];
            finalValidationTokens.pop();

            delete tokenUtilityScore[tokenId];
            delete tokenSocialScore[tokenId];
            delete tokenTrustScore[tokenId];
            delete tokenMarketScore[tokenId];
        }

        emit FinalValidationVote(
            firstSortTokens[indexOfFirstSortTokens[tokenId]],
            msg.sender,
            validate,
            utilityScore,
            socialScore,
            trustScore,
            marketScore
        );
    }

    function claimRewards() external {
        uint256 amountToPay = (goodFirstVotes[msg.sender] -
            paidFirstVotes[msg.sender]) * tokensPerVote;
        require(amountToPay > 0, "You don't have anything to claim.");
        paidFirstVotes[msg.sender] = goodFirstVotes[msg.sender];
        MOBL.transfer(msg.sender, amountToPay);
    }

    function claimFinalRewards() external {
        uint256 amountToPay = (goodFinalVotes[msg.sender] -
            paidFinalVotes[msg.sender]) * tokensPerVote;
        require(amountToPay > 0, "You don't have anything to claim.");
        paidFinalVotes[msg.sender] = goodFinalVotes[msg.sender];
        MOBL.transfer(msg.sender, amountToPay);
    }

    // Hierarchy management

    function emergencyPromote(address promoted) external {
        require(owner == msg.sender, "DAO Only");
        require(rank[promoted] <= 1, "Impossible");
        rank[promoted]++;
    }

    function emergencyDemote(address demoted) external {
        require(owner == msg.sender, "DAO Only");
        require(rank[demoted] >= 1, "Impossible");
        rank[demoted]--;
    }

    function promote(address promoted) external {
        require(
            rank[msg.sender] >= 2,
            "You must be Rank II or higher to promote."
        );
        require(rank[promoted] <= 1, "Impossible");

        if (rank[promoted] == 0) {
            require(membersToPromoteToRankI > 0, "No promotions yet.");
            promoteVotes[promoted]++;

            if (promoteVotes[promoted] == votesNeededToRankIPromotion) {
                membersToPromoteToRankI--;
                delete promoteVotes[promoted];
                rank[promoted]++;
            }
        } else {
            require(membersToPromoteToRankII > 0, "No promotions yet.");
            promoteVotes[promoted]++;

            if (promoteVotes[promoted] == votesNeededToRankIIPromotion) {
                membersToPromoteToRankII--;
                delete promoteVotes[promoted];
                rank[promoted]++;
            }
        }
    }

    function demote(address demoted) external {
        require(
            rank[msg.sender] >= 2,
            "You must be Rank II or higher to demote."
        );
        require(rank[demoted] >= 1, "Impossible");

        if (rank[demoted] == 0) {
            require(membersToDemoteFromRankI > 0, "No demotion yet.");
            demoteVotes[demoted]++;

            if (demoteVotes[demoted] == votesNeededToRankIDemotion) {
                membersToDemoteFromRankI--;
                delete demoteVotes[demoted];
                rank[demoted]++;
            }
        } else {
            require(membersToDemoteFromRankII > 0, "No demotion yet.");
            demoteVotes[demoted]++;

            if (demoteVotes[demoted] == votesNeededToRankIIDemotion) {
                membersToDemoteFromRankII--;
                delete demoteVotes[demoted];
                rank[demoted]--;
            }
        }
    }

    // Funds management

    function withdrawFunds(uint256 amount) external {
        require(owner == msg.sender, "DAO Only.");
        payable(msg.sender).transfer(amount);
    }
}
