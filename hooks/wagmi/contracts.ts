import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Curate Posts
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const curatePostsAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'author',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'contentHash',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'tags',
        internalType: 'string[]',
        type: 'string[]',
        indexed: false,
      },
    ],
    name: 'PostCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'postId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Voted',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VOTES_PER_DAY_MULTIPLIER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'postId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'aiVote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'contentHash', internalType: 'string', type: 'string' },
      { name: 'tags', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'createPost',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'dailyVoteTotals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'postId', internalType: 'uint256', type: 'uint256' }],
    name: 'getPostScore',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'lastVoteResetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'postCounter',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'postVotes',
    outputs: [
      { name: 'voter', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'posts',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'author', internalType: 'address', type: 'address' },
      { name: 'contentHash', internalType: 'string', type: 'string' },
      { name: 'totalScore', internalType: 'uint256', type: 'uint256' },
      { name: 'claimedScore', internalType: 'uint256', type: 'uint256' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'newVote', internalType: 'bool', type: 'bool' },
      { name: 'aiVoted', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: '', internalType: 'contract ISocialMediaToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'postId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'votesUsedToday',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Curate Settle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const curateSettleAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      {
        name: 'votingContractAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'totalTokensDistributed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DailySettlement',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'claimedRewards',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'dailyMintAllocation',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastSettlementTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'settleDailyTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [
      { name: '', internalType: 'contract ISocialMediaToken', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'votingContract',
    outputs: [
      { name: '', internalType: 'contract SocialMediaVoting', type: 'address' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Curate Token
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const curateTokenAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'distributeTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mintDailyTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'AI_SUPPLY_PERCENTAGE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'aiAgent',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DAILY_MINT_AMOUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__
 */
export const useReadCuratePosts = /*#__PURE__*/ createUseReadContract({
  abi: curatePostsAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"VOTES_PER_DAY_MULTIPLIER"`
 */
export const useReadCuratePostsVotesPerDayMultiplier =
  /*#__PURE__*/ createUseReadContract({
    abi: curatePostsAbi,
    functionName: 'VOTES_PER_DAY_MULTIPLIER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"dailyVoteTotals"`
 */
export const useReadCuratePostsDailyVoteTotals =
  /*#__PURE__*/ createUseReadContract({
    abi: curatePostsAbi,
    functionName: 'dailyVoteTotals',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"getPostScore"`
 */
export const useReadCuratePostsGetPostScore =
  /*#__PURE__*/ createUseReadContract({
    abi: curatePostsAbi,
    functionName: 'getPostScore',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"lastVoteResetTime"`
 */
export const useReadCuratePostsLastVoteResetTime =
  /*#__PURE__*/ createUseReadContract({
    abi: curatePostsAbi,
    functionName: 'lastVoteResetTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"owner"`
 */
export const useReadCuratePostsOwner = /*#__PURE__*/ createUseReadContract({
  abi: curatePostsAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"postCounter"`
 */
export const useReadCuratePostsPostCounter =
  /*#__PURE__*/ createUseReadContract({
    abi: curatePostsAbi,
    functionName: 'postCounter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"postVotes"`
 */
export const useReadCuratePostsPostVotes = /*#__PURE__*/ createUseReadContract({
  abi: curatePostsAbi,
  functionName: 'postVotes',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"posts"`
 */
export const useReadCuratePostsPosts = /*#__PURE__*/ createUseReadContract({
  abi: curatePostsAbi,
  functionName: 'posts',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"token"`
 */
export const useReadCuratePostsToken = /*#__PURE__*/ createUseReadContract({
  abi: curatePostsAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"votesUsedToday"`
 */
export const useReadCuratePostsVotesUsedToday =
  /*#__PURE__*/ createUseReadContract({
    abi: curatePostsAbi,
    functionName: 'votesUsedToday',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curatePostsAbi}__
 */
export const useWriteCuratePosts = /*#__PURE__*/ createUseWriteContract({
  abi: curatePostsAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"aiVote"`
 */
export const useWriteCuratePostsAiVote = /*#__PURE__*/ createUseWriteContract({
  abi: curatePostsAbi,
  functionName: 'aiVote',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"createPost"`
 */
export const useWriteCuratePostsCreatePost =
  /*#__PURE__*/ createUseWriteContract({
    abi: curatePostsAbi,
    functionName: 'createPost',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteCuratePostsRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: curatePostsAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteCuratePostsTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: curatePostsAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"vote"`
 */
export const useWriteCuratePostsVote = /*#__PURE__*/ createUseWriteContract({
  abi: curatePostsAbi,
  functionName: 'vote',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curatePostsAbi}__
 */
export const useSimulateCuratePosts = /*#__PURE__*/ createUseSimulateContract({
  abi: curatePostsAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"aiVote"`
 */
export const useSimulateCuratePostsAiVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curatePostsAbi,
    functionName: 'aiVote',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"createPost"`
 */
export const useSimulateCuratePostsCreatePost =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curatePostsAbi,
    functionName: 'createPost',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateCuratePostsRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curatePostsAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateCuratePostsTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curatePostsAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curatePostsAbi}__ and `functionName` set to `"vote"`
 */
export const useSimulateCuratePostsVote =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curatePostsAbi,
    functionName: 'vote',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curatePostsAbi}__
 */
export const useWatchCuratePostsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: curatePostsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curatePostsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchCuratePostsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curatePostsAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curatePostsAbi}__ and `eventName` set to `"PostCreated"`
 */
export const useWatchCuratePostsPostCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curatePostsAbi,
    eventName: 'PostCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curatePostsAbi}__ and `eventName` set to `"Voted"`
 */
export const useWatchCuratePostsVotedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curatePostsAbi,
    eventName: 'Voted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateSettleAbi}__
 */
export const useReadCurateSettle = /*#__PURE__*/ createUseReadContract({
  abi: curateSettleAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"claimedRewards"`
 */
export const useReadCurateSettleClaimedRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: curateSettleAbi,
    functionName: 'claimedRewards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"dailyMintAllocation"`
 */
export const useReadCurateSettleDailyMintAllocation =
  /*#__PURE__*/ createUseReadContract({
    abi: curateSettleAbi,
    functionName: 'dailyMintAllocation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"lastSettlementTime"`
 */
export const useReadCurateSettleLastSettlementTime =
  /*#__PURE__*/ createUseReadContract({
    abi: curateSettleAbi,
    functionName: 'lastSettlementTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"owner"`
 */
export const useReadCurateSettleOwner = /*#__PURE__*/ createUseReadContract({
  abi: curateSettleAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"token"`
 */
export const useReadCurateSettleToken = /*#__PURE__*/ createUseReadContract({
  abi: curateSettleAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"votingContract"`
 */
export const useReadCurateSettleVotingContract =
  /*#__PURE__*/ createUseReadContract({
    abi: curateSettleAbi,
    functionName: 'votingContract',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateSettleAbi}__
 */
export const useWriteCurateSettle = /*#__PURE__*/ createUseWriteContract({
  abi: curateSettleAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteCurateSettleRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateSettleAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"settleDailyTokens"`
 */
export const useWriteCurateSettleSettleDailyTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateSettleAbi,
    functionName: 'settleDailyTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteCurateSettleTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateSettleAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateSettleAbi}__
 */
export const useSimulateCurateSettle = /*#__PURE__*/ createUseSimulateContract({
  abi: curateSettleAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateCurateSettleRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateSettleAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"settleDailyTokens"`
 */
export const useSimulateCurateSettleSettleDailyTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateSettleAbi,
    functionName: 'settleDailyTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateSettleAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateCurateSettleTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateSettleAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curateSettleAbi}__
 */
export const useWatchCurateSettleEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: curateSettleAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curateSettleAbi}__ and `eventName` set to `"DailySettlement"`
 */
export const useWatchCurateSettleDailySettlementEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curateSettleAbi,
    eventName: 'DailySettlement',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curateSettleAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchCurateSettleOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curateSettleAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__
 */
export const useReadCurateToken = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"AI_SUPPLY_PERCENTAGE"`
 */
export const useReadCurateTokenAiSupplyPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: curateTokenAbi,
    functionName: 'AI_SUPPLY_PERCENTAGE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"aiAgent"`
 */
export const useReadCurateTokenAiAgent = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
  functionName: 'aiAgent',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadCurateTokenAllowance = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadCurateTokenBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"DAILY_MINT_AMOUNT"`
 */
export const useReadCurateTokenDailyMintAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: curateTokenAbi,
    functionName: 'DAILY_MINT_AMOUNT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadCurateTokenDecimals = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"name"`
 */
export const useReadCurateTokenName = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"owner"`
 */
export const useReadCurateTokenOwner = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadCurateTokenSymbol = /*#__PURE__*/ createUseReadContract({
  abi: curateTokenAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadCurateTokenTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: curateTokenAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__
 */
export const useWriteCurateToken = /*#__PURE__*/ createUseWriteContract({
  abi: curateTokenAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteCurateTokenApprove = /*#__PURE__*/ createUseWriteContract({
  abi: curateTokenAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"distributeTokens"`
 */
export const useWriteCurateTokenDistributeTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateTokenAbi,
    functionName: 'distributeTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"mintDailyTokens"`
 */
export const useWriteCurateTokenMintDailyTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateTokenAbi,
    functionName: 'mintDailyTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteCurateTokenRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteCurateTokenTransfer = /*#__PURE__*/ createUseWriteContract(
  { abi: curateTokenAbi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteCurateTokenTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteCurateTokenTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: curateTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__
 */
export const useSimulateCurateToken = /*#__PURE__*/ createUseSimulateContract({
  abi: curateTokenAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateCurateTokenApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateTokenAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"distributeTokens"`
 */
export const useSimulateCurateTokenDistributeTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateTokenAbi,
    functionName: 'distributeTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"mintDailyTokens"`
 */
export const useSimulateCurateTokenMintDailyTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateTokenAbi,
    functionName: 'mintDailyTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateCurateTokenRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateTokenAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateCurateTokenTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateTokenAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateCurateTokenTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateTokenAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link curateTokenAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateCurateTokenTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: curateTokenAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curateTokenAbi}__
 */
export const useWatchCurateTokenEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: curateTokenAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curateTokenAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchCurateTokenApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curateTokenAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curateTokenAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchCurateTokenOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curateTokenAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link curateTokenAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchCurateTokenTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: curateTokenAbi,
    eventName: 'Transfer',
  })
