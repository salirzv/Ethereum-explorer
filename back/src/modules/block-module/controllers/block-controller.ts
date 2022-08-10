import { BlockTransactionString } from 'web3-eth';
import { Controller, Get, Param } from '@nestjs/common';
import Web3 from 'web3';

interface BlockDataResult {
  hasError: boolean;
  data?: BlockTransactionString | null;
}

@Controller('block')
class BlockController {
  @Get('/:identifier')
  async getBlockData(@Param() params: { identifier: string }) {
    const result: BlockDataResult = {
      hasError: true,
      data: null,
    };
    const pattern_number = /^\d+$/;
    const w3 = new Web3(
      new Web3.providers.WebsocketProvider('ws://localhost:5566'),
    );
    if (pattern_number.test(params.identifier)) {
      try {
        const block_data = await w3.eth.getBlock(parseInt(params.identifier));
        result.hasError = false;
        result.data = block_data;
        return result;
      } catch (e) {
        return result;
      }
    } else {
      if (
        params.identifier.substring(0, 2).toLowerCase() === '0x' &&
        params.identifier.length === 66
      ) {
        try {
          const block_data = await w3.eth.getBlock(params.identifier);
          result.hasError = false;
          result.data = block_data;
          return result;
        } catch (e) {
          return result;
        }
      } else {
        return result;
      }
    }
  }
}

export default BlockController;
