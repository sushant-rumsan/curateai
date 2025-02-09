export const getRecentPosts = `query FetchRecentPosts {
  postCreateds(orderBy: blockNumber, orderDirection: desc) {
    id
    internal_id
    transactionHash
    contentHash
    blockTimestamp
    blockNumber
    author
  }
}`