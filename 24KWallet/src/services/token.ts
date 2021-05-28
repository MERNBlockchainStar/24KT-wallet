import Web3 from 'web3';
import {executeTokenMethod, getTransferHistory, getEtherBalance} from '../contract/token';
import { provideWeb3 } from '../contract/web3';
import getAddressByTokenName from '../util/token';

export function getAccount(addressParam: any) {
    let contractAddress: string;
    let savedAddress: string;
    let savedBalance: number;
    let savedEthBalance: number;
    let savedSymbol: string;
    let savedName: string;
    let savedDecimals: number;
    let savedTotalSupply: number;

    const getContractAddress = () => new Promise((resolve, _) => {
        resolve(getAddressByTokenName(addressParam) || addressParam);
    })
        .then((address:any) => contractAddress = address);

    const loadDecimals = () => executeTokenMethod(
        contractAddress,
        (address:any, token:any) => (callback:any) => token.methods.decimals().call({from: address}, callback)
    )
        .then((decimals:any) => Number.parseInt(decimals))
        .then((decimals:any) => savedDecimals = Math.pow(10, decimals));

    const loadBalance = () => executeTokenMethod(
        contractAddress,
        (address:any, token:any) => {
            savedAddress = address;
            return (callback: any) => token.methods.balanceOf(address).call({from: address}, callback);
        }
    )
        .then((value:any) => Number.parseInt(value))
        .then((value:any) => value / savedDecimals)
        .then((balance:number) => savedBalance = balance);
    
    const loadEthBalance = () => getEtherBalance()
    .then((balance: any) => savedEthBalance = balance);

    const loadSymbol = () => executeTokenMethod(
        contractAddress,
        (address:any, token:any) => (callback:any) => token.methods.symbol().call({from: address}, callback)
    )
        .then((symbol:any) => savedSymbol = symbol);
    
    const loadName = () => executeTokenMethod(
        contractAddress,
        (address:any, token:any) => (callback:any) => token.methods.name().call({from: address}, callback)
    )
        .then((name:any) => savedName = name);
    
    const loadTotalSupply = () => executeTokenMethod(
        contractAddress,
        (address:any, token:any) => (callback:any) => token.methods.totalSupply().call({from: address}, callback)
    )
        .then((totalSupply:any) => Number.parseInt(totalSupply))
        .then((totalSupply:number) => totalSupply / savedDecimals)
        .then((number:number) => savedTotalSupply = number);

    return getContractAddress()
        .then(loadDecimals)
        .then(loadSymbol)
        .then(loadName)
        .then(loadBalance)
        .then(loadEthBalance)
        .then(loadTotalSupply)
        .then(() => {
            return {
                address: savedAddress,
                contractAddress: contractAddress,
                balance: savedBalance,
                ethBalance: savedEthBalance,
                decimals: savedDecimals,
                symbol: savedSymbol,
                name: savedName,
                totalSupply: savedTotalSupply
            }
        });
}

export function getTransactionHistory(contractAddress: string, decimals: number) {
    let inHistory:any;
    let outHistory:any;
    let history:any;

    const mapHistoryItem = (item:any, direction:any) => ({
        blockHash: item.blockHash,
        blockNumber: item.blockNumber,
        transactionHash: item.transactionHash,
        direction: direction,
        from: item.returnValues._from,
        to: item.returnValues._to,
        value: Number.parseInt(item.returnValues._value) / decimals
    });

    const loadInHistory = () => getTransferHistory(
        contractAddress,
        '_to'
    )
        .then((items:any) => items.map((item:any) => mapHistoryItem(item, 'In')))
        .then((items:any) => inHistory = items);

    const loadOutHistory = () => getTransferHistory(
        contractAddress,
        '_from'
    )
        .then((items:any) => items.map((item:any) => mapHistoryItem(item, 'Out')))
        .then((items:any) => outHistory = items);

    const combineHistory = () => {
        history = inHistory
            .concat(outHistory)
            .sort((first:any, second:any) => second.blockNumber - first.blockNumber);
    };

    return loadInHistory()
        .then(loadOutHistory)
        .then(combineHistory)
        .then(() => history);
}

export function sendTokenService(to:any, value:any, decimals:any, contractAddress:any, confirmFunc: any) {
    let transferTransactionHash:any;
    const sendTokenService = (tokens: any) => executeTokenMethod(
        contractAddress,
        (address:any, token:any) => (callback:any) => token.methods.transfer(to, tokens).send({from: address}, callback).on('receipt', confirmFunc)
    )
        .then((tx:any) => transferTransactionHash = tx)
        .catch((err) => console.log('Error during sending money' + err));

    return provideWeb3()
        .then((instance) => instance.utils.toWei(value.toString(), 'ether'))
        .then((BNTokens) => sendTokenService(BNTokens))
        .then(() => ({transferTransactionHash}));
}
