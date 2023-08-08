import ensureUnit from './ensureUnit'
import Native from '../native-types'

import type { HKQuantityTypeIdentifier, HKStatisticsOptions, UnitForIdentifier } from '../native-types'

async function queryStatisticsCollectionForQuantity<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>>(
  identifier: TIdentifier,
  options: readonly HKStatisticsOptions[],
  from: Date,
  to?: Date,
  unit?: TUnit
) {
  const actualUnit = await ensureUnit(identifier, unit)
  const toDate = to || new Date()

  const rawResponse = await Native.queryStatisticsCollectionForQuantity(
    identifier,
    actualUnit,
    from.toISOString(),
    toDate.toISOString(),
    options,
    (error: string, data: any) => console.log(JSON.stringify(data))
  )

  const response = rawResponse.map((record) => {
    record.startDate = new Date(record.startDate)
    record.endDate = new Date(record.endDate)
    return record
  })

  return response
}

export default queryStatisticsCollectionForQuantity
