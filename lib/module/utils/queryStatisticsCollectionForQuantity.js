import ensureUnit from './ensureUnit';
import Native, { EventEmitter } from '../native-types';
async function queryStatisticsCollectionForQuantity(identifier, options, from, to, unit, updateCallback) {
  const actualUnit = await ensureUnit(identifier, unit);
  const toDate = to || new Date();
  const subscribe = Boolean(updateCallback);
  const rawResponse = await Native.queryStatisticsCollectionForQuantity(identifier, actualUnit, from.toISOString(), toDate.toISOString(), options, subscribe);
  const response = {
    queryId: rawResponse.queryId,
    data: rawResponse.data.map(record => {
      record.startDate = new Date(record.startDate);
      record.endDate = new Date(record.endDate);
      return record;
    })
  };
  const onUpdate = update => {
    if (update.queryId === response.queryId) {
      updateCallback === null || updateCallback === void 0 ? void 0 : updateCallback("", update.data);
    }
  };
  if (subscribe) {
    const subscription = EventEmitter.addListener('onStatsCollectionUpdate', onUpdate);
    response.unsubscribe = async () => {
      subscription.remove();
      return Native.unsubscribeQuery(response.queryId);
    };
  }
  return response;
}
export default queryStatisticsCollectionForQuantity;
//# sourceMappingURL=queryStatisticsCollectionForQuantity.js.map