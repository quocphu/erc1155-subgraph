import { TransferBatch, TransferSingle } from './types/ERC1155/ATACard'
import { Transfer, CardOwner } from './types/schema'
import { BigInt, BigDecimal, Address, log } from '@graphprotocol/graph-ts'

export function handleTransferSingle(event: TransferSingle): void {
  let cardId = event.params.id
  let transfer = new Transfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + cardId.toString())
  transfer.operator = event.params.operator.toHexString()
  transfer.from = event.params.from.toHexString()
  transfer.to = event.params.to.toHexString()
  transfer.cardId = event.params.id
  transfer.amount = event.params.value
  transfer.save()

  updateCardOwner(event.params.from, cardId, event.params.value.times(BigInt.fromI32(-1)));
  updateCardOwner(event.params.to, cardId, event.params.value);
}

export function handleTransferBatch(event: TransferBatch): void {
  let ids = event.params.ids
  let values = event.params.values
  for (var i = 0; i < ids.length; i++) {
    let transfer = new Transfer(event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + i.toString())
    transfer.operator = event.params.operator.toHexString()
    transfer.from = event.params.from.toHexString()
    transfer.to = event.params.to.toHexString()
    transfer.cardId = ids[i]
    transfer.amount = values[i]
    transfer.save()

    updateCardOwner(event.params.from, ids[i], values[i].times(BigInt.fromI32(-1)));
    updateCardOwner(event.params.to, ids[i], values[i]);
  }
}


function updateCardOwner(owner: Address, cardId: BigInt, amount: BigInt): void {
  if (owner.toHexString() == "0x0000000000000000000000000000000000000000") {
    return
  }

  let id = owner.toHexString() + "_" + cardId.toHexString()
  let cardOwner = CardOwner.load(id)

  if (cardOwner == null) {
    cardOwner = new CardOwner(id)
    cardOwner.owner = owner.toHexString()
    cardOwner.amount = amount
    cardOwner.cardId = cardId
  } else {
    cardOwner.amount = cardOwner.amount.plus(amount)
  }

  cardOwner.save()

}