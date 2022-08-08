import { BlockTransactionString } from 'web3-eth';
import { Controller, Get, HttpException } from '@nestjs/common';
import Web3 from 'web3';
import { BigNumber, bignumber, multiply } from 'mathjs';

interface Result {
  is_node_running: boolean;
  has_peers: boolean;
  is_synced: boolean;
}

interface NRR {
  node_status: boolean;
  data?: any;
}

@Controller('/')
export class HomeController {
  @Get('latestblocks')
  async home() {
    const w3 = new Web3(
      new Web3.providers.WebsocketProvider('ws://localhost:5566'),
    );

    const result: NRR = {
      node_status: false,
      data: [],
    };

    try {
      const last_block = await w3.eth.getBlockNumber();
      const last_10_blocks_data: BlockTransactionString[] = [];

      for (let i = 0; i <= 9; i++) {
        last_10_blocks_data[i] = await w3.eth.getBlock(last_block - i);
      }
      for (let i = 0; i <= 9; i++) {
        result.data[i] = {
          number: last_10_blocks_data[i].number,
          txs_count: last_10_blocks_data[i].transactions.length,
          burnt:
            last_10_blocks_data[i].baseFeePerGas *
            last_10_blocks_data[i].gasUsed,
        };
      }
    } catch (e) {
      return {
        node_status: false,
      };
    }
    result.node_status = true;
    return result;
  }

  @Get('gasprice')
  async getGasPrice() {
    const result: NRR = {
      node_status: false,
    };
    const w3 = new Web3(
      new Web3.providers.WebsocketProvider('ws://localhost:5566'),
    );
    let gp: BigNumber;
    try {
      gp = bignumber(await w3.eth.getGasPrice());
    } catch (e) {
      return result;
    }
    result.node_status = true;
    result.data = multiply(gp, bignumber(10e-10)).toString();
    return result;
  }

  @Get('status')
  async checkStatus() {
    const result: Result = {
      is_node_running: false,
      has_peers: false,
      is_synced: false,
    };

    const w3 = new Web3(
      new Web3.providers.WebsocketProvider('ws://localhost:5566'),
    );

    try {
      await w3.eth.getBlockNumber();
      result.is_node_running = true;
    } catch (e) {
      return result;
    }

    try {
      const peers_count = await w3.eth.net.getPeerCount();
      if (peers_count === 0) {
        return result;
      } else {
        result.has_peers = true;
      }
    } catch (e) {
      return {
        is_node_running: false,
        has_peers: false,
        is_synced: false,
      };
    }

    try {
      const is_syncing = await w3.eth.isSyncing();
      if (is_syncing === false) {
        result.is_synced = true;
      } else {
        return result;
      }
    } catch (e) {
      return {
        is_node_running: false,
        has_peers: false,
        is_synced: false,
      };
    }

    return result;
  }
}
