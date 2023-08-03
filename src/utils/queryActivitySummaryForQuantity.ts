import ensureUnit from './ensureUnit'
import prepareOptions from './prepareOptions'
import Native from '../native-types'

import {
  HKQuantityTypeIdentifier, UnitOfEnergy, UnitOfTime,
} from '../native-types'
import type { GenericQueryOptions, HKQuantitySample, QueryActivitySummaryForQuantityRaw } from '../types'

export type QueryActivitySummaryForQuantityFn = <
  TEnergyUnit extends UnitOfEnergy,
  TTimeUnit extends UnitOfTime
>(
  options: Omit<GenericQueryOptions, 'anchor' | 'ascending' | 'limit'> & {
    readonly energyUnit?: TEnergyUnit,
    readonly timeUnit?: TTimeUnit
  }
) => Promise<QueryActivitySummaryForQuantityRaw<TEnergyUnit, TTimeUnit>>;

const queryActivitySummaryForQuantity: QueryActivitySummaryForQuantityFn = async (
  options,
) => {
  const energyUnit = await ensureUnit(HKQuantityTypeIdentifier.activeEnergyBurned, options.energyUnit)
  const timeUnit = await ensureUnit(HKQuantityTypeIdentifier.appleMoveTime, options.timeUnit)

  const opts = prepareOptions(options)

  const result = await Native.queryActivitySummaryForQuantity(
    energyUnit,
    timeUnit,
    opts.from,
    opts.to
  )

  return result.map((record) => {
    record.startDate = new Date(record.startDate)
    return record
  })
}

export default queryActivitySummaryForQuantity
