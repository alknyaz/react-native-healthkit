import { UnitOfEnergy, UnitOfTime } from '../native-types';
import type { GenericQueryOptions, HKActivitySummary, QueryActivitySummaryResponse } from '../types';
declare const queryActivitySummaryForQuantity: <TEnergyUnit extends UnitOfEnergy, TTimeUnit extends UnitOfTime>(options: Omit<GenericQueryOptions, "anchor" | "limit" | "ascending"> & {
    readonly energyUnit?: TEnergyUnit | undefined;
    readonly timeUnit?: TTimeUnit | undefined;
    readonly updateCallback?: ((data: HKActivitySummary<TEnergyUnit, TTimeUnit>[]) => void) | undefined;
}) => Promise<QueryActivitySummaryResponse<TEnergyUnit, TTimeUnit>>;
export default queryActivitySummaryForQuantity;
