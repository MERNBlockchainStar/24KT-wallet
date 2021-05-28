import tokens from './tokens/tokens.json';

const tokenAddress = (param : string) : string => {
    let address : any = tokens.find((element) => param === element['symbol']);

    if (address) {
        address = address['address'];
    }

    return address;
}

export default tokenAddress;
