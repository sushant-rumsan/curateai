export const ROUTES = {
    READ: (hash: string) => `/read/${hash}`,
    IPFS_FETCH: (hash: string) => `https://gateway.pinata.cloud/ipfs/${hash}`
}