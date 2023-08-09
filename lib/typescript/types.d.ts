import type { EnergyUnit, HKCategorySampleRaw, HKCategoryTypeIdentifier, HKCorrelationRaw, HKCorrelationTypeIdentifier, HKDevice, HKHeartbeatSeriesSampleRaw, HKQuantityTypeIdentifier, HKSourceRevision, HKStatistics, HKUnit, HKWorkoutRaw, LengthUnit, MetadataMapperForQuantityIdentifier, QueryActivitySummaryForQuantityRaw, QueryStatisticsResponseRaw, TimeUnit, UnitForIdentifier } from './native-types';
export * from './native-types';
export interface QueryWorkoutsOptions<TEnergy extends HKUnit, TDistance extends HKUnit> extends GenericQueryOptions {
    readonly energyUnit?: TEnergy;
    readonly distanceUnit?: TDistance;
}
export interface HKCategorySample<T extends HKCategoryTypeIdentifier = HKCategoryTypeIdentifier> extends Omit<HKCategorySampleRaw<T>, 'endDate' | 'startDate'> {
    readonly startDate: Date;
    readonly endDate: Date;
}
export type GenericQueryOptions = {
    readonly from?: Date;
    readonly to?: Date;
    readonly limit?: number;
    readonly ascending?: boolean;
    readonly anchor?: string;
};
export interface HKWorkout<TEnergy extends EnergyUnit = EnergyUnit, TDistance extends LengthUnit = LengthUnit> extends Omit<HKWorkoutRaw<TEnergy, TDistance>, 'endDate' | 'startDate'> {
    readonly startDate: Date;
    readonly endDate: Date;
}
export interface HKHeartbeatSeriesSample extends Omit<HKHeartbeatSeriesSampleRaw, 'endDate' | 'startDate'> {
    readonly startDate: Date;
    readonly endDate: Date;
}
export interface HKQuantitySample<TIdentifier extends HKQuantityTypeIdentifier = HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>> {
    readonly uuid: string;
    readonly device?: HKDevice;
    readonly quantityType: TIdentifier;
    readonly quantity: number;
    readonly unit: TUnit;
    readonly metadata?: MetadataMapperForQuantityIdentifier<TIdentifier>;
    readonly sourceRevision?: HKSourceRevision;
    readonly startDate: Date;
    readonly endDate: Date;
}
export interface QueryStatisticsResponse<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>> extends Omit<QueryStatisticsResponseRaw<TIdentifier, TUnit>, 'mostRecentQuantityDateInterval'> {
    readonly mostRecentQuantityDateInterval?: {
        readonly from: Date;
        readonly to: Date;
    };
}
export type QueryStatisticsCollectionResponse<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>, Subscribe extends boolean> = {
    queryId: string;
    data: Omit<HKStatistics<TIdentifier, TUnit>, "startDate" | "endDate"> & {
        startDate: Date;
        endDate: Date;
    }[];
    unsubscribe?: () => void;
};
export type QueryActivitySummaryResponse<TEnergyUnit extends EnergyUnit, TTimeUnit extends TimeUnit> = (Omit<QueryActivitySummaryForQuantityRaw<TEnergyUnit, TTimeUnit>[number], "startDate"> & {
    startDate: Date;
})[];
export type HKCategorySampleForSaving = Omit<HKCategorySample, 'device' | 'endDate' | 'startDate' | 'uuid'>;
export type HKQuantitySampleForSaving = Omit<HKQuantitySample, 'device' | 'endDate' | 'startDate' | 'uuid'>;
export interface HKCorrelation<TIdentifier extends HKCorrelationTypeIdentifier> extends Omit<HKCorrelationRaw<TIdentifier>, 'endDate' | 'objects' | 'startDate'> {
    readonly objects: readonly (HKCategorySample | HKQuantitySample)[];
    readonly startDate: Date;
    readonly endDate: Date;
}
