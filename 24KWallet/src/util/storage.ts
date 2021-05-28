import { ERC20TokenInterface, ERC20TokenState } from '../types/token'
import { CONTRACT_24KT, LOGO_URL } from '../constants'

export const saveTokenInfo = (state: ERC20TokenState) => {
    let address: Array<ERC20TokenInterface | undefined> = [];
    for (let key of state.tokens.keys()) {
        address.push(state.tokens.get(key));
    }
    localStorage.setItem('token', JSON.stringify(address));
}

export const loadTokenInfo = () : ERC20TokenState => {
    let localData = localStorage.getItem('token');
    let mapTokens: Map<string, ERC20TokenInterface> = new Map<string, ERC20TokenInterface>();

    if (localData == null) {
        mapTokens.set(CONTRACT_24KT, {     
            logo: LOGO_URL,
            contractAddress : CONTRACT_24KT,
            name: '24K Token',
            symbol: '24KT',
            balance: 0,
            price: 0,
            isPending: false,
        });
    } else {
        let tokens: Array<ERC20TokenInterface> = JSON.parse(localData? localData: '');
        for (let key of tokens.keys()) {
            mapTokens.set(tokens[key].contractAddress, tokens[key]);
        }
    }
    let state : ERC20TokenState = {
        tokens: mapTokens
    }
    return state;
}