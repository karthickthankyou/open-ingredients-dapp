import { Injectable } from '@nestjs/common'
import Web3 from 'web3'
import * as dotenv from 'dotenv'
import { AbiItem } from 'web3-utils'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { MeilisearchService } from 'src/meilisearch/meilisearch.service'

import { abi, contractAddress } from '../util/polygon'
dotenv.config()

@Injectable()
export class PolygonService {
  private readonly web3: Web3
  private readonly contract: any

  constructor(
    private readonly prisma: PrismaService,
    private readonly meili: MeilisearchService,
  ) {
    console.log('WSS_URL ', process.env.WSS_POLYGON)
    this.web3 = new Web3(process.env.WSS_POLYGON)

    this.contract = new this.web3.eth.Contract(
      abi as AbiItem[],
      contractAddress,
    )

    this.testConnection()
    this.initializeListeners()
  }

  async isOwner(address: string): Promise<boolean> {
    const contractOwner = await this.contract?.methods.owner().call()
    return address === contractOwner
  }

  private async testConnection() {
    try {
      const blockNumber = await this.web3.eth.getBlockNumber()
      console.log('blockNumber ', blockNumber)
      console.log('Connected to blockchain, latest block number:', blockNumber)
    } catch (err) {
      console.log('failed?')
      console.error('Failed to connect to blockchain:', err)
    }
  }

  private initializeListeners() {
    this.contract.events
      .ProductCreated(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          console.log('ProductCreated ', event.returnValues)
        },
      )
      .on('connected', (str) =>
        console.log('📒 Event:ProductCreated listening...', str),
      )
      .on('error', console.error)

    this.contract.events
      .ProductPurchased(
        {
          fromBlock: 'latest',
        },
        async (error, event) => {
          console.log('ProductPurchased ', event.returnValues)
        },
      )
      .on('connected', (str) =>
        console.log('💁‍♂️ Event:ProductPurchased listening...', str),
      )
      .on('error', console.error)
  }
}
