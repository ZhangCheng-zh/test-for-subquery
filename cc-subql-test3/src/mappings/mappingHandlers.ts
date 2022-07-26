import { SubstrateEvent } from "@subql/types";
import { Transfer } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, balance]}} = event;
    // Get data from the event
    // The balances.transfer event has the following payload \[from, to, value\]
    // logger.info(JSON.stringify(event));
    const { event: { data: [from, to, amount] } } = event;
    logger.info(JSON.stringify(event));

    // create the new transfer entity
    const transfer = new Transfer(
        `${event.block.block.header.number.toNumber()}-${event.idx}`
    )
    transfer.blockNumber = event.block.block.header.number.toBigInt();
    transfer.from = from.toString();
    transfer.to = to.toString();
    transfer.amount = (amount as Balance).toBigInt();
    await transfer.save();
}


