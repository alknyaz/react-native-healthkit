import { UnitOfEnergy, UnitOfTime } from '../native-types';
import type { GenericQueryOptions, QueryActivitySummaryForQuantityRaw } from '../types';
export type QueryActivitySummaryForQuantityFn = <TEnergyUnit extends UnitOfEnergy, TTimeUnit extends UnitOfTime>(options: Omit<GenericQueryOptions, 'anchor' | 'ascending' | 'limit'> & {
    readonly energyUnit?: TEnergyUnit;
    readonly timeUnit?: TTimeUnit;
}) => Promise<QueryActivitySummaryForQuantityRaw<TEnergyUnit, TTimeUnit>>;
declare const queryActivitySummaryForQuantity: QueryActivitySummaryForQuantityFn;
export default queryActivitySummaryForQuantity;
