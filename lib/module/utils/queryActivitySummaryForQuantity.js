import ensureUnit from './ensureUnit';
import prepareOptions from './prepareOptions';
import Native from '../native-types';
import { HKQuantityTypeIdentifier } from '../native-types';
const queryActivitySummaryForQuantity = async options => {
  const energyUnit = await ensureUnit(HKQuantityTypeIdentifier.activeEnergyBurned, options.energyUnit);
  const timeUnit = await ensureUnit(HKQuantityTypeIdentifier.appleMoveTime, options.timeUnit);
  const opts = prepareOptions(options);
  const result = await Native.queryActivitySummaryForQuantity(energyUnit, timeUnit, opts.from, opts.to);
  return result.map(record => {
    record.startDate = new Date(record.startDate);
    return record;
  });
};
export default queryActivitySummaryForQuantity;
//# sourceMappingURL=queryActivitySummaryForQuantity.js.map