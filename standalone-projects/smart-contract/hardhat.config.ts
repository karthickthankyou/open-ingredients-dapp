import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
require('@openzeppelin/hardhat-upgrades')

require('dotenv').config()

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  defaultNetwork: 'mumbai',
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
  },
}

export default config
