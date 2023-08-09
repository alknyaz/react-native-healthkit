"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ensureUnit = _interopRequireDefault(require("./ensureUnit"));
var _nativeTypes = _interopRequireWildcard(require("../native-types"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function queryStatisticsCollectionForQuantity(identifier, options, from, to, unit, updateCallback) {
  const actualUnit = await (0, _ensureUnit.default)(identifier, unit);
  const toDate = to || new Date();
  const subscribe = Boolean(updateCallback);
  const rawResponse = await _nativeTypes.default.queryStatisticsCollectionForQuantity(identifier, actualUnit, from.toISOString(), toDate.toISOString(), options, subscribe);
  const response = {
    queryId: rawResponse.queryId,
    data: rawResponse.data.map(record => {
      record.startDate = new Date(record.startDate);
      record.endDate = new Date(record.endDate);
      return record;
    })
  };
  if (subscribe) {
    const onUpdate = update => {
      if (update.queryId === response.queryId) {
        updateCallback === null || updateCallback === void 0 ? void 0 : updateCallback(update.data);
      }
    };
    const subscription = _nativeTypes.EventEmitter.addListener('onStatsCollectionUpdate', onUpdate);
    response.unsubscribe = async () => {
      subscription.remove();
      return _nativeTypes.default.unsubscribeQuery(response.queryId);
    };
  }
  return response;
}
var _default = queryStatisticsCollectionForQuantity;
exports.default = _default;
//# sourceMappingURL=queryStatisticsCollectionForQuantity.js.map