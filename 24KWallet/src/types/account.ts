export interface Account {
    address: string,
    contractAddress: string,
    balance: number,
    ethBalance: number,
    decimals: number,
    symbol: string,
    name?: string,
    totalSupply: number
}

export interface AccountState {
    account: Account | null,
    isPending: boolean,
    isConnected: boolean,
    error: any
}