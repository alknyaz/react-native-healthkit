import ensureUnit from './ensureUnit';
import Native from '../native-types';
async function queryStatisticsCollectionForQuantity(identifier, options, from, to, unit, updateCallback) {
  const actualUnit = await ensureUnit(identifier, unit);
  const toDate = to || new Date();
  const rawResponse = await Native.queryStatisticsCollectionForQuantity(identifier, actualUnit, from.toISOString(), toDate.toISOString(), options, updateCallback);
  const response = rawResponse.map(record => {
    record.startDate = new Date(record.startDate);
    record.endDate = new Date(record.endDate);
    return record;
  });
  return response;
}
export default queryStatisticsCollectionForQuantity;
//# sourceMappingURL=queryStatisticsCollectionForQuantity.js.map