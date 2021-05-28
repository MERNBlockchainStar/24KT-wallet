import Web3 from 'web3';
import onLoad from '../util/load';

declare let window: any;
let _cachedWeb3 : any;

const _provideWeb3 = () => {
    let result : any;

    if (_cachedWeb3) {
        return _cachedWeb3;
    }

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
        console.warn(`
            Using web3 detected from external source. If you find that your accounts 
            don't appear or you have 0 MetaCoin, ensure you've configured that source 
            properly. If using MetaMask, see the following link. 
            Feel free to delete this warning. :) 
            http://truffleframework.com/tutorials/truffle-and-metamask
        `);
        result = new Web3(window.ethereum);
    } else {
        throw new Error(`
            No web3 detected. Fall back is not enabled for production build.
        `);
    }

    _cachedWeb3 = result;

    return result;
}

export function provideWeb3() {
    return onLoad()
        .then(_ => _provideWeb3());
}

export function currentAccount() {
    return provideWeb3()
        .then(instance =>
            new Promise((resolve, reject) => {
                instance.eth.requestAccounts((error : any, accounts : Array<string>) => {
                    if (error) {
                        reject();
                    } else {
                        resolve(accounts[0]);
                    }
                });
            }));
}

export function currentBalance() {
    let web3Inst : any;
    return provideWeb3()
        .then(instance => { web3Inst = instance; return instance.eth.getAccounts() })
        .then(accounts => 
            new Promise((resolve, reject) => {
                web3Inst.eth.getBalance(accounts[0])
                .then( (balance: number) => {
                    resolve(web3Inst.utils.fromWei(balance, 'ether'));
                })
            }));
}
