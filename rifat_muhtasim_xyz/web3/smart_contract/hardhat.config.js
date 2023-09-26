// https://eth-rinkeby.alchemyapi.io/v2/r8hqh5s6GUcgfZZvLYpt8rqqdSM1x2Ra

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/r8hqh5s6GUcgfZZvLYpt8rqqdSM1x2Ra',
      accounts: ['5ac0f5f4a04d5afd3c95b18f5006bd1251b3ba6fd8a05f46efef32b4165a0a9c']
    }
  }
}

