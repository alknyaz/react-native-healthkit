import ensureUnit from './ensureUnit';
import prepareOptions from './prepareOptions';
import Native, { EventEmitter } from '../native-types';
import { HKQuantityTypeIdentifier, UnitOfEnergy, UnitOfTime } from '../native-types';
const queryActivitySummaryForQuantity = async options => {
  const subscribe = Boolean(options.updateCallback);
  const energyUnit = (await ensureUnit(HKQuantityTypeIdentifier.activeEnergyBurned, options.energyUnit)) ?? UnitOfEnergy.Joules;
  const timeUnit = (await ensureUnit(HKQuantityTypeIdentifier.appleMoveTime, options.timeUnit)) ?? UnitOfTime.Seconds;
  const opts = prepareOptions(options);
  const {
    queryId,
    data
  } = await Native.queryActivitySummaryForQuantity(energyUnit, timeUnit, opts.from, opts.to, subscribe);
  const result = {
    queryId,
    data: data.map(record => {
      record.startDate = new Date(record.startDate);
      return record;
    })
  };
  if (subscribe) {
    const onUpdate = update => {
      if (update.queryId === queryId) {
        var _options$updateCallba;
        (_options$updateCallba = options.updateCallback) === null || _options$updateCallba === void 0 ? void 0 : _options$updateCallba.call(options, update.data);
      }
    };
    const subscription = EventEmitter.addListener('onActivitySummaryUpdate', onUpdate);
    result.unsubscribe = async () => {
      subscription.remove();
      return Native.unsubscribeQuery(result.queryId);
    };
  }
  return result;
};
export default queryActivitySummaryForQuantity;
//# sourceMappingURL=queryActivitySummaryForQuantity.js.map