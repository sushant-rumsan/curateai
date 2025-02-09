export const getRecentPosts = `query GetRecentPosts {
  postCreateds(first: 10) {
    id
    contentHash
    transactionHash
    blockNumber
    blockTimestamp
    author
    internal_id
  }
}`