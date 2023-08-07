import Native from '../native-types';
import type { HKQuantityTypeIdentifier, HKStatisticsOptions, UnitForIdentifier } from '../native-types';
declare function queryStatisticsCollectionForQuantity<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>>(identifier: TIdentifier, options: readonly HKStatisticsOptions[], from: Date, to?: Date, unit?: TUnit, updateCallback?: (error: string, results: [
    Awaited<ReturnType<typeof Native.queryStatisticsCollectionForQuantity>>[number],
    Awaited<ReturnType<typeof Native.queryStatisticsCollectionForQuantity>>
]) => void): Promise<import("../native-types").HKStatistics<HKQuantityTypeIdentifier, TUnit>[]>;
export default queryStatisticsCollectionForQuantity;
