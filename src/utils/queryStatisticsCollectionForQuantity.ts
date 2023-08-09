import ensureUnit from './ensureUnit'
import Native, { EventEmitter } from '../native-types'

import type { HKQuantityTypeIdentifier, HKStatistics, HKStatisticsOptions, UnitForIdentifier } from '../native-types'
import { QueryStatisticsCollectionResponse } from '../types'

async function queryStatisticsCollectionForQuantity<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>>(
  identifier: TIdentifier,
  options: readonly HKStatisticsOptions[],
  from: Date,
  to?: Date,
  unit?: TUnit,
  updateCallback?: (
    error: string,
    data: { stats: HKStatistics<TIdentifier, TUnit>, statsCollection: HKStatistics<TIdentifier, TUnit>[] }
  ) => void
) {
  const actualUnit = await ensureUnit(identifier, unit)
  const toDate = to || new Date()
  const subscribe = Boolean(updateCallback)


  const rawResponse = await Native.queryStatisticsCollectionForQuantity(
    identifier,
    actualUnit,
    from.toISOString(),
    toDate.toISOString(),
    options,
    subscribe
  )

  const response: QueryStatisticsCollectionResponse<TIdentifier, TUnit> = {
    queryId: rawResponse.queryId,
    data: rawResponse.data.map((record) => {
      record.startDate = new Date(record.startDate)
      record.endDate = new Date(record.endDate)
      return record as Omit<HKStatistics<TIdentifier, TUnit>, "startDate" | "endDate"> & { startDate: Date; endDate: Date; }
    }),
  }

  const onUpdate = (
    update: {
      queryId: string,
      data: { stats: HKStatistics<TIdentifier, TUnit>, statsCollection: HKStatistics<TIdentifier, TUnit>[] }
    }
  ) => {
    if (update.queryId === response.queryId) {
      updateCallback?.("", update.data)
    }
  }

  if (subscribe) {
    const subscription = EventEmitter.addListener('onStatsCollectionUpdate', onUpdate)
    
    response.unsubscribe = async () => {
      subscription.remove()
      return Native.unsubscribeQuery(response.queryId)
    }
  }

  return response
}

export default queryStatisticsCollectionForQuantity
