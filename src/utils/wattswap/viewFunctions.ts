import { createViewPayload, createSurfClient } from '@thalalabs/surf';
import { WATTSWAP_HACKNIGHT_ABI } from '../hacknight_wattswap_abi';

type Client = ReturnType<typeof createSurfClient>;

export const getActiveSwaps = async (client: Client, accountAddress: `0x${string}`) => {
  const payload = createViewPayload(WATTSWAP_HACKNIGHT_ABI, {
    function: 'get_active_swaps',
    functionArguments: [accountAddress],
    typeArguments: [],
  });
  return client.view({ payload });
};

export const getAllActiveListings = async (client: Client, accountAddress: `0x${string}`) => {
  const payload = createViewPayload(WATTSWAP_HACKNIGHT_ABI, {
    function: 'get_all_active_listings',
    functionArguments: [accountAddress],
    typeArguments: [],
  });
  return client.view({ payload });
};

export const getJoinDate = async (client: Client, accountAddress: `0x${string}`) => {
  const payload = createViewPayload(WATTSWAP_HACKNIGHT_ABI, {
    function: 'get_join_date',
    functionArguments: [accountAddress],
    typeArguments: [],
  });
  return client.view({ payload });
};

export const getSwapDetails = async (client: Client, accountAddress: `0x${string}`, swapId: number) => {
  const payload = createViewPayload(WATTSWAP_HACKNIGHT_ABI, {
    function: 'get_swap_details',
    functionArguments: [accountAddress, swapId],
    typeArguments: [],
  });
  return client.view({ payload });
};

export const getSwaps = async (client: Client, accountAddress: `0x${string}`) => {
  const payload = createViewPayload(WATTSWAP_HACKNIGHT_ABI, {
    function: 'get_swaps',
    functionArguments: [accountAddress],
    typeArguments: [],
  });
  return client.view({ payload });
};
