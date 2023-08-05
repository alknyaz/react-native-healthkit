"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ensureUnit = _interopRequireDefault(require("./ensureUnit"));
var _prepareOptions = _interopRequireDefault(require("./prepareOptions"));
var _nativeTypes = _interopRequireWildcard(require("../native-types"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const queryActivitySummaryForQuantity = async options => {
  try {
    const energyUnit = await (0, _ensureUnit.default)(_nativeTypes.HKQuantityTypeIdentifier.activeEnergyBurned, options.energyUnit);
  } catch (e) {
    console.error(e);
  }
  const energyUnit = await (0, _ensureUnit.default)(_nativeTypes.HKQuantityTypeIdentifier.activeEnergyBurned, options.energyUnit);
  const timeUnit = await (0, _ensureUnit.default)(_nativeTypes.HKQuantityTypeIdentifier.appleMoveTime, options.timeUnit);
  console.log("units:", energyUnit, timeUnit);
  console.log("preffered units:", JSON.stringify(await _nativeTypes.default.getPreferredUnits([_nativeTypes.HKQuantityTypeIdentifier.dietaryEnergyConsumed, _nativeTypes.HKQuantityTypeIdentifier.timeInDaylight]), undefined, 2));
  const opts = (0, _prepareOptions.default)(options);
  const result = await _nativeTypes.default.queryActivitySummaryForQuantity(energyUnit, timeUnit, opts.from, opts.to);
  return result.map(record => {
    record.startDate = new Date(record.startDate);
    return record;
  });
};
var _default = queryActivitySummaryForQuantity;
exports.default = _default;
//# sourceMappingURL=queryActivitySummaryForQuantity.js.map