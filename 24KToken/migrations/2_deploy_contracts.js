// const ERC20TOKEN = artifacts.require("ERC20");
const _24KTOKEN = artifacts.require("_24K_Token");
const _24KDEX = artifacts.require("_24K_Exchange");

module.exports = async function (deployer, network, accounts) {
  // deployer.deploy(ERC20TOKEN);
  // deployer.link(_24KTOKEN, ERC20TOKEN);
  // deployer.deploy(_24KTOKEN);
  // _24KTOKEN.deployed().then( tokenInstance => {
  //     console.log(tokenInstance.address);
  //     // deployer.deploy(_24KDEX, tokenInstance.address); // constructor takes the token contract's address as a param
  //     _24KDEX.deployed().then( dexInstance => {
  //         console.log(tokenInstance.address);
  //         console.log(dexInstance.address);
  //         console.log("Deploy Success");
  //     });
  // });

  await deployer.deploy(_24KTOKEN, {from : "0x21B41D1254b6E47f3217d42191Cf75356dc7c2Fe"});
  // await deployer.deploy(_24KTOKEN);
  const token = await _24KTOKEN.deployed();
  console.log(token.address);

  // await deployer.deploy(_24KDEX, token.address);
  // const dex = await _24KDEX.deployed();
  // console.log(dex.address);

  console.log("Successfully Deployed");
};
