import type { HKQuantityTypeIdentifier, HKStatisticsOptions, UnitForIdentifier } from '../native-types';
declare function queryStatisticsCollectionForQuantity<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>>(identifier: TIdentifier, options: readonly HKStatisticsOptions[], from: Date, to?: Date, unit?: TUnit): Promise<{
    startDate: string | Date;
    endDate: string | Date;
    readonly averageQuantity?: import("../native-types").HKQuantity<HKQuantityTypeIdentifier, TUnit> | undefined;
    readonly maximumQuantity?: import("../native-types").HKQuantity<HKQuantityTypeIdentifier, TUnit> | undefined;
    readonly minimumQuantity?: import("../native-types").HKQuantity<HKQuantityTypeIdentifier, TUnit> | undefined;
    readonly sumQuantity?: import("../native-types").HKQuantity<HKQuantityTypeIdentifier, TUnit> | undefined;
    readonly duration?: import("../native-types").HKQuantity<HKQuantityTypeIdentifier, import("../native-types").TimeUnit> | undefined;
}[]>;
export default queryStatisticsCollectionForQuantity;
