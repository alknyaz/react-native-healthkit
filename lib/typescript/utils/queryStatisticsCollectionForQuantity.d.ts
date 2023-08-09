import type { HKQuantityTypeIdentifier, HKStatistics, HKStatisticsOptions, UnitForIdentifier } from '../native-types';
import { QueryStatisticsCollectionResponse } from '../types';
declare function queryStatisticsCollectionForQuantity<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>>(identifier: TIdentifier, options: readonly HKStatisticsOptions[], from: Date, to?: Date, unit?: TUnit, updateCallback?: (data: {
    stats: HKStatistics<TIdentifier, TUnit>;
    statsCollection: HKStatistics<TIdentifier, TUnit>[];
}) => void): Promise<QueryStatisticsCollectionResponse<TIdentifier, TUnit>>;
export default queryStatisticsCollectionForQuantity;
