export interface ERC20TokenInterface {
    logo?: string;
    contractAddress : string;
    name: string;
    symbol: string;
    balance: number;
    price?: number;
    isPending: boolean;
};

export interface ERC20TokenState {
    tokens: Map<string, ERC20TokenInterface>
}