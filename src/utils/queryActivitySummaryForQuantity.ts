import ensureUnit from './ensureUnit'
import prepareOptions from './prepareOptions'
import Native, { EventEmitter } from '../native-types'

import {
  HKQuantityTypeIdentifier, UnitOfEnergy, UnitOfTime,
} from '../native-types'
import type { GenericQueryOptions, HKActivitySummary, QueryActivitySummaryResponse } from '../types'

const queryActivitySummaryForQuantity = async <
TEnergyUnit extends UnitOfEnergy,
TTimeUnit extends UnitOfTime
>(
  options: Omit<GenericQueryOptions, 'anchor' | 'ascending' | 'limit'> & {
    readonly energyUnit?: TEnergyUnit,
    readonly timeUnit?: TTimeUnit,
    readonly updateCallback?: (data: HKActivitySummary<TEnergyUnit, TTimeUnit>[]) => void
  },
) => {
  const subscribe = Boolean(options.updateCallback)
  const energyUnit = await ensureUnit(HKQuantityTypeIdentifier.activeEnergyBurned, options.energyUnit)
    ?? UnitOfEnergy.Joules
  const timeUnit = await ensureUnit(HKQuantityTypeIdentifier.appleMoveTime, options.timeUnit)
    ?? UnitOfTime.Seconds

  const opts = prepareOptions(options)

  const { queryId, data } = await Native.queryActivitySummaryForQuantity(
    energyUnit,
    timeUnit,
    opts.from,
    opts.to,
    subscribe
  )

  const result: QueryActivitySummaryResponse<TEnergyUnit, TTimeUnit> = {
    queryId,
    data: data.map((record) => {
      record.startDate = new Date(record.startDate)
      return record as  (Omit<HKActivitySummary<TEnergyUnit, TTimeUnit>, "startDate"> & { startDate: Date })
    })
  }

  if (subscribe) {
    const onUpdate = (
      update: { queryId: string, data: HKActivitySummary<TEnergyUnit, TTimeUnit>[] }
    ) => {
      if (update.queryId === queryId) {
        options.updateCallback?.(update.data)
      }
    }
    const subscription = EventEmitter.addListener('onActivitySummaryUpdate', onUpdate)
    
    result.unsubscribe = async () => {
      subscription.remove()
      return Native.unsubscribeQuery(result.queryId)
    }
  }

  return result
}

export default queryActivitySummaryForQuantity
