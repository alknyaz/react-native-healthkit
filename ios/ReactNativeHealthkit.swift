import HealthKit
import CoreLocation

@objc(ReactNativeHealthkit)
@available(iOS 10.0, *)
class ReactNativeHealthkit: RCTEventEmitter {
    var _store: HKHealthStore?
    var _runningQueries: [String: HKQuery]
    var _dateFormatter: ISO8601DateFormatter
    var _hasListeners = false

    override init() {
        self._runningQueries = [String: HKQuery]()
        self._dateFormatter = ISO8601DateFormatter()

        if HKHealthStore.isHealthDataAvailable() {
            self._store = HKHealthStore.init()
        }
        super.init()
    }

    deinit {
        if let store = _store {
                for query in self._runningQueries {
                    store.stop(query.value)
                }
        }
    }

    override func stopObserving() {
        self._hasListeners = false
        if let store = _store {
                for query in self._runningQueries {
                    store.stop(query.value)
                }
        }
    }

    override func startObserving() {
        self._hasListeners = true
    }

    @objc(canAccessProtectedData:withRejecter:)
    func canAccessProtectedData(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        resolve(UIApplication.shared.isProtectedDataAvailable)
    }

    @objc(isHealthDataAvailable:withRejecter:)
    func isHealthDataAvailable(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        resolve(HKHealthStore.isHealthDataAvailable())
    }

    @available(iOS 12.0, *)
    @objc(supportsHealthRecords:withRejecter:)
    func supportsHealthRecords(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }
        resolve(store.supportsHealthRecords())
    }

    @available(iOS 12.0, *)
    @objc(getRequestStatusForAuthorization:read:resolve:withRejecter:)
    func getRequestStatusForAuthorization(toShare: NSDictionary, read: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }
        let share = sampleTypesFromDictionary(typeIdentifiers: toShare)
        let toRead = objectTypesFromDictionary(typeIdentifiers: read)
        store.getRequestStatusForAuthorization(toShare: share, read: toRead) { (status: HKAuthorizationRequestStatus, error: Error?) in
            guard let err = error else {
                return resolve(status.rawValue)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }
    }

    @objc(getPreferredUnits:resolve:reject:)
    func getPreferredUnits(forIdentifiers: NSArray, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }
        var quantityTypes = Set<HKQuantityType>()
        for identifierString in forIdentifiers {
            let identifier = HKQuantityTypeIdentifier.init(rawValue: identifierString as! String)
            let type = HKSampleType.quantityType(forIdentifier: identifier)
            if type != nil {
                quantityTypes.insert(type!)
            }
        }

        store.preferredUnits(for: quantityTypes) { (typePerUnits: [HKQuantityType: HKUnit], _: Error?) in
            let dic: NSMutableDictionary = NSMutableDictionary()

            for typePerUnit in typePerUnits {
                dic.setObject(typePerUnit.value.unitString, forKey: typePerUnit.key.identifier as NSCopying)
            }

            resolve(dic)
        }
    }

    @objc(getBiologicalSex:withRejecter:)
    func getBiologicalSex(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        do {
            let bioSex = try store.biologicalSex()
            resolve(bioSex.biologicalSex.rawValue)
        } catch {
            reject(GENERIC_ERROR, error.localizedDescription, error)
        }
    }

    @objc(getDateOfBirth:withRejecter:)
    func getDateOfBirth(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        do {
            let dateOfBirth = try store.dateOfBirthComponents()
            
            resolve(_dateFormatter.string(from: dateOfBirth.date!))
        } catch {
            reject(GENERIC_ERROR, error.localizedDescription, error)
        }
    }

    @objc(getBloodType:withRejecter:)
    func getBloodType(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        do {
            let bloodType = try store.bloodType()
            resolve(bloodType.bloodType.rawValue)
        } catch {
            reject(GENERIC_ERROR, error.localizedDescription, error)
        }
    }

    @objc(getFitzpatrickSkinType:withRejecter:)
    func getFitzpatrickSkinType(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        do {
            let fitzpatrickSkinType = try store.fitzpatrickSkinType()
            resolve(fitzpatrickSkinType.skinType.rawValue)
        } catch {
            reject(GENERIC_ERROR, error.localizedDescription, error)
        }
    }

    @available(iOS 10.0, *)
    @objc(getWheelchairUse:withRejecter:)
    func getWheelchairUse(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        do {
            let wheelchairUse = try store.wheelchairUse()
            resolve(wheelchairUse.wheelchairUse.rawValue)
        } catch {
            reject(GENERIC_ERROR, error.localizedDescription, error)
        }
    }

    @objc(authorizationStatusFor:withResolver:withRejecter:)
    func authorizationStatusFor(typeIdentifier: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let objectType = objectTypeFromString(typeIdentifier: typeIdentifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let authStatus = store.authorizationStatus(for: objectType)
        resolve(authStatus.rawValue)
    }

    @objc(saveQuantitySample:unitString:value:start:end:metadata:resolve:reject:)
    func saveQuantitySample(typeIdentifier: String, unitString: String, value: Double, start: Date, end: Date, metadata: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKQuantityTypeIdentifier.init(rawValue: typeIdentifier)

        guard let type = HKObjectType.quantityType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let unit = HKUnit.init(from: unitString)
        let quantity = HKQuantity.init(unit: unit, doubleValue: value)
        let sample = HKQuantitySample.init(
            type: type,
            quantity: quantity,
            start: start,
            end: end,
            metadata: metadata
        )

        store.save(sample) { (success: Bool, error: Error?) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, error)
        }
    }

    @objc(deleteQuantitySample:uuid:resolve:reject:)
    func deleteQuantitySample(typeIdentifier: String, uuid: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKQuantityTypeIdentifier.init(rawValue: typeIdentifier)
        let sampleUuid = UUID.init(uuidString: uuid)!

        guard let sampleType = HKObjectType.quantityType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let samplePredicate = HKQuery.predicateForObject(with: sampleUuid)

        store.deleteObjects(of: sampleType, predicate: samplePredicate) { (success: Bool, _: Int, error: Error?) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, error)
        }
    }

    @objc(deleteSamples:start:end:resolve:reject:)
    func deleteSamples(typeIdentifier: String, start: Date, end: Date, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKQuantityTypeIdentifier.init(rawValue: typeIdentifier)

        guard let sampleType = HKObjectType.quantityType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let samplePredicate = HKQuery.predicateForSamples(withStart: start, end: end, options: HKQueryOptions.strictStartDate)

        store.deleteObjects(of: sampleType, predicate: samplePredicate) { (success: Bool, _: Int, error: Error?) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, error)
        }
    }

    @objc(saveCorrelationSample:samples:start:end:metadata:resolve:reject:)
    func saveCorrelationSample(typeIdentifier: String, samples: [[String: Any]], start: Date, end: Date, metadata: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKCorrelationTypeIdentifier.init(rawValue: typeIdentifier)

        guard let type = HKObjectType.correlationType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        var initializedSamples = Set<HKSample>()
        for sample in samples {
            if sample.keys.contains("quantityType") {
                let typeId = HKQuantityTypeIdentifier.init(rawValue: sample["quantityType"] as! String)
                if let type = HKSampleType.quantityType(forIdentifier: typeId) {
                    let unitStr = sample["unit"] as! String
                    let quantityVal = sample["quantity"] as! Double
                    let metadata = sample["metadata"] as? [String: Any]

                    let unit = HKUnit.init(from: unitStr)
                    let quantity = HKQuantity.init(unit: unit, doubleValue: quantityVal)
                    let quantitySample = HKQuantitySample.init(type: type, quantity: quantity, start: start, end: end, metadata: metadata)
                    initializedSamples.insert(quantitySample)
                }
            } else if sample.keys.contains("categoryType") {
               let typeId = HKCategoryTypeIdentifier.init(rawValue: sample["categoryType"] as! String)
               if let type = HKSampleType.categoryType(forIdentifier: typeId) {
                   let value = sample["value"] as! Int
                   let metadata = sample["metadata"] as? [String: Any]

                   let categorySample = HKCategorySample.init(type: type, value: value, start: start, end: end, metadata: metadata)
                   initializedSamples.insert(categorySample)
               }
            }

        }

        let correlation = HKCorrelation.init(type: type, start: start, end: end, objects: initializedSamples, metadata: metadata)

        store.save(correlation) { (success: Bool, error: Error?) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, error)
        }
    }

    @objc(saveWorkoutSample:quantities:start:end:metadata:resolve:reject:)
    func saveWorkoutSample(typeIdentifier: UInt, quantities: [[String: Any]], start: Date, end: Date, metadata: [String: Any], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let type = HKWorkoutActivityType.init(rawValue: typeIdentifier) else {
          return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize HKWorkoutActivityType " + typeIdentifier.description, nil)
        }

        var initializedSamples = [HKSample]()
        var totalEnergyBurned: HKQuantity?
        var totalDistance: HKQuantity?
        var totalSwimmingStrokeCount: HKQuantity?
        var totalFlightsClimbed: HKQuantity?

        for quantity in quantities {
            let typeId = HKQuantityTypeIdentifier.init(rawValue: quantity["quantityType"] as! String)
            if let type = HKSampleType.quantityType(forIdentifier: typeId) {
                let unitStr = quantity["unit"] as! String
                let quantityVal = quantity["quantity"] as! Double
                let metadata = quantity["metadata"] as? [String: Any]

                let unit = HKUnit.init(from: unitStr)
                let quantity = HKQuantity.init(unit: unit, doubleValue: quantityVal)
                if quantity.is(compatibleWith: HKUnit.kilocalorie()) {
                    totalEnergyBurned = quantity
                }
                if quantity.is(compatibleWith: HKUnit.meter()) {
                    totalDistance = quantity
                }
                if typeId == HKQuantityTypeIdentifier.swimmingStrokeCount {
                    totalSwimmingStrokeCount = quantity
                }
                if typeId == HKQuantityTypeIdentifier.flightsClimbed {
                    totalFlightsClimbed = quantity
                }
                let quantitySample = HKQuantitySample.init(type: type, quantity: quantity, start: start, end: end, metadata: metadata)
                initializedSamples.append(quantitySample)
            }
        }

        var workout: HKWorkout?

        if totalSwimmingStrokeCount != nil {
            workout = HKWorkout.init(activityType: type, start: start, end: end, workoutEvents: nil, totalEnergyBurned: totalEnergyBurned, totalDistance: totalDistance, totalSwimmingStrokeCount: totalSwimmingStrokeCount, device: nil, metadata: metadata)
        } else {
                if #available(iOS 11, *) {
                    if totalFlightsClimbed != nil {
                        workout = HKWorkout.init(activityType: type, start: start, end: end, workoutEvents: nil, totalEnergyBurned: totalEnergyBurned, totalDistance: totalDistance, totalFlightsClimbed: totalFlightsClimbed, device: nil, metadata: metadata)
                    }
                }
        }

        if workout == nil {
            workout = HKWorkout.init(activityType: type, start: start, end: end, workoutEvents: nil, totalEnergyBurned: totalEnergyBurned, totalDistance: totalDistance, metadata: metadata)
        }

        store.save(workout!) { (success: Bool, error: Error?) in
            guard let err = error else {
                if success {
                    store.add(initializedSamples, to: workout!) { (success, error: Error?) in
                        guard let err = error else {
                            return resolve(success)
                        }
                        reject(GENERIC_ERROR, err.localizedDescription, error)
                    }
                    return
                }
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, error)
        }

    }

    @objc(saveCategorySample:value:start:end:metadata:resolve:reject:)
    func saveCategorySample(typeIdentifier: String, value: Double, start: Date, end: Date, metadata: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKCategoryTypeIdentifier.init(rawValue: typeIdentifier)

        guard let type = HKObjectType.categoryType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let sample = HKCategorySample.init(type: type, value: Int(value), start: start, end: end, metadata: metadata as? [String: Any])

        store.save(sample) { (success: Bool, error: Error?) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, error)
        }
    }

    override func supportedEvents() -> [String]! {
      return ["onChange", "onStatsCollectionUpdate", "onActivitySummaryUpdate", "onWorkoutUpdate"]
    }

    @objc(enableBackgroundDelivery:updateFrequency:resolve:reject:)
    func enableBackgroundDelivery(typeIdentifier: String, updateFrequency: Int, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let sampleType = objectTypeFromString(typeIdentifier: typeIdentifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        guard let frequency = HKUpdateFrequency.init(rawValue: updateFrequency) else {
            return reject("UpdateFrequency not valid", "UpdateFrequency not valid", nil)
        }

        store.enableBackgroundDelivery(for: sampleType, frequency: frequency ) { (success, error) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }
    }

    @objc(disableAllBackgroundDelivery:reject:)
    func disableAllBackgroundDelivery(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        store.disableAllBackgroundDelivery(completion: { (success, error) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        })
    }

    @objc(disableBackgroundDelivery:resolve:reject:)
    func disableBackgroundDelivery(typeIdentifier: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let sampleType = objectTypeFromString(typeIdentifier: typeIdentifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        store.disableBackgroundDelivery(for: sampleType) { (success, error) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }
    }

    @objc(subscribeToObserverQuery:resolve:reject:)
    func subscribeToObserverQuery(typeIdentifier: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let sampleType = sampleTypeFromString(typeIdentifier: typeIdentifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let predicate = HKQuery.predicateForSamples(withStart: Date.init(), end: nil, options: HKQueryOptions.strictStartDate)

        let queryId = UUID().uuidString

        func responder(query: HKObserverQuery, handler: @escaping HKObserverQueryCompletionHandler, error: Error?) {
            if error == nil {
                DispatchQueue.main.async {
                    if self.bridge != nil && self.bridge.isValid {
                        self.sendEvent(withName: "onChange", body: [
                            "typeIdentifier": typeIdentifier
                        ])
                    }

                }
                handler()
            }
        }

        let query = HKObserverQuery(sampleType: sampleType, predicate: predicate) { (query: HKObserverQuery, handler: @escaping HKObserverQueryCompletionHandler, error: Error?) in
            guard let err = error else {
                return responder(query: query, handler: handler, error: error)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(query)

        self._runningQueries.updateValue(query, forKey: queryId)
    }

    @objc(unsubscribeQuery:resolve:reject:)
    func unsubscribeQuery(queryId: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let query = self._runningQueries[queryId] else {
            reject("Error", "Query with id " + queryId + " not found", nil)
            return
        }

        store.stop(query)

        self._runningQueries.removeValue(forKey: queryId)

        resolve(true)
    }

    static override func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc(queryStatisticsForQuantity:unitString:from:to:options:resolve:reject:)
    func queryStatisticsForQuantity(typeIdentifier: String, unitString: String, from: Date, to: Date, options: NSArray, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKQuantityTypeIdentifier.init(rawValue: typeIdentifier)
        guard let quantityType = HKObjectType.quantityType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let predicate = HKQuery.predicateForSamples(withStart: from, end: to, options: HKQueryOptions.strictEndDate)

        var opts = HKStatisticsOptions.init()

        for o in options {
            let str = o as! String
            if str == "cumulativeSum" {
                opts.insert(HKStatisticsOptions.cumulativeSum)
            } else if str == "discreteAverage" {
                opts.insert(HKStatisticsOptions.discreteAverage)
            } else if str == "discreteMax" {
                opts.insert(HKStatisticsOptions.discreteMax)
            } else if str == "discreteMin" {
                opts.insert(HKStatisticsOptions.discreteMin)
            }
            if #available(iOS 12, *) {
                    if str == "discreteMostRecent" {
                        opts.insert(HKStatisticsOptions.discreteMostRecent)
                    }
            }
            if #available(iOS 13, *) {
                if str == "duration" {
                    opts.insert(HKStatisticsOptions.duration)
                }
                if str == "mostRecent" {
                    opts.insert(HKStatisticsOptions.mostRecent)
                }
            }

            if str == "separateBySource" {
                opts.insert(HKStatisticsOptions.separateBySource)
            }
        }

        let query = HKStatisticsQuery.init(quantityType: quantityType, quantitySamplePredicate: predicate, options: opts) { (_, stats: HKStatistics?, err: Error?) in
            if let error = err {
                reject(GENERIC_ERROR, error.localizedDescription, error)
            }

            if let gottenStats = stats {
                var dic = [String: [String: Any]?]()
                let unit = HKUnit.init(from: unitString)
                if let averageQuantity = gottenStats.averageQuantity() {
                    dic.updateValue(serializeQuantity(unit: unit, quantity: averageQuantity), forKey: "averageQuantity")
                }
                if let maximumQuantity = gottenStats.maximumQuantity() {
                    dic.updateValue(serializeQuantity(unit: unit, quantity: maximumQuantity), forKey: "maximumQuantity")
                }
                if let minimumQuantity = gottenStats.minimumQuantity() {
                    dic.updateValue(serializeQuantity(unit: unit, quantity: minimumQuantity), forKey: "minimumQuantity")
                }
                if let sumQuantity = gottenStats.sumQuantity() {
                    dic.updateValue(serializeQuantity(unit: unit, quantity: sumQuantity), forKey: "sumQuantity")
                }
                if #available(iOS 12, *) {
                    if let mostRecent = gottenStats.mostRecentQuantity() {
                        dic.updateValue(serializeQuantity(unit: unit, quantity: mostRecent), forKey: "mostRecentQuantity")
                    }

                    if let mostRecentDateInterval = gottenStats.mostRecentQuantityDateInterval() {
                        dic.updateValue([
                            "start": self._dateFormatter.string(from: mostRecentDateInterval.start),
                            "end": self._dateFormatter.string(from: mostRecentDateInterval.end)
                        ], forKey: "mostRecentQuantityDateInterval")
                    }
                }
                if #available(iOS 13, *) {
                    let durationUnit = HKUnit.second()
                    if let duration = gottenStats.duration() {
                        dic.updateValue(serializeQuantity(unit: durationUnit, quantity: duration), forKey: "duration")
                    }
                }

                resolve(dic)
            }
        }

        store.execute(query)
    }

    @objc(queryWorkoutSamples:distanceUnitString:from:to:limit:ascending:resolve:reject:)
    func queryWorkoutSamples(energyUnitString: String, distanceUnitString: String, from: Date, to: Date, limit: Int, ascending: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let from = dateOrNilIfZero(date: from)
        let to = dateOrNilIfZero(date: to)

        let predicate = createPredicate(from: from, to: to)

        let limit = limitOrNilIfZero(limit: limit)

        let energyUnit = HKUnit.init(from: energyUnitString)
        let distanceUnit = HKUnit.init(from: distanceUnitString)

        let q = HKSampleQuery(sampleType: .workoutType(), predicate: predicate, limit: limit, sortDescriptors: getSortDescriptors(ascending: ascending)) { (_: HKSampleQuery, sample: [HKSample]?, error: Error?) in
            guard let err = error else {
                guard let samples = sample else {
                    return resolve([])
                }
                let arr: NSMutableArray = []

                for s in samples {
                    if let workout = s as? HKWorkout {
                        let serialized = serializeWorkout(
                            workout: workout,
                            energyUnit: energyUnit,
                            distanceUnit: distanceUnit
                        )
                        arr.add(serialized)
                    }
                }

                return resolve(arr)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(q)
    }

  @objc(queryQuantitySamples:unitString:from:to:limit:ascending:resolve:reject:)
  func queryQuantitySamples(
    typeIdentifier: String,
    unitString: String,
    from: Date,
    to: Date,
    limit: Int,
    ascending: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKQuantityTypeIdentifier.init(rawValue: typeIdentifier)
        guard let sampleType = HKSampleType.quantityType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let from = dateOrNilIfZero(date: from)
        let to = dateOrNilIfZero(date: to)
        let predicate = createPredicate(from: from, to: to)
        let limit = limitOrNilIfZero(limit: limit)

        let q = HKSampleQuery(sampleType: sampleType, predicate: predicate, limit: limit, sortDescriptors: getSortDescriptors(ascending: ascending)) { (_: HKSampleQuery, sample: [HKSample]?, error: Error?) in
            guard let err = error else {
                guard let samples = sample else {
                    return resolve([])
                }
                let arr: NSMutableArray = []

                for s in samples {
                    if let sample = s as? HKQuantitySample {
                        let serialized = serializeQuantitySample(sample: sample, unit: HKUnit.init(from: unitString))

                        arr.add(serialized)
                    }
                }

                return resolve(arr)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(q)
    }

    @objc(queryCorrelationSamples:from:to:resolve:reject:)
    func queryCorrelationSamples(typeIdentifier: String, from: Date, to: Date, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKCorrelationTypeIdentifier.init(rawValue: typeIdentifier)
        guard let sampleType = HKSampleType.correlationType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let from = from.timeIntervalSince1970 >= 0 ? from : nil
        let to = to.timeIntervalSince1970 >= 0 ? to : nil

        let predicate = createPredicate(from: from, to: to)

        let q = HKCorrelationQuery(type: sampleType, predicate: predicate, samplePredicates: nil) { (_: HKCorrelationQuery, _correlations: [HKCorrelation]?, error: Error?) in
            guard let err = error else {
                guard let correlations = _correlations else {
                    return resolve([])
                }

                var qts = Set<HKQuantityType>()
                for c in correlations {
                    for object in c.objects {
                        if let quantitySample = object as? HKQuantitySample {
                            qts.insert(quantitySample.quantityType)
                        }
                    }
                }
                return store.preferredUnits(for: qts) { (map: [HKQuantityType: HKUnit], error: Error?) in
                    guard let e = error else {
                        let collerationsToReturn: NSMutableArray = []
                        for c in correlations {
                            let objects = NSMutableArray()
                            for o in c.objects {
                                if let quantitySample = o as? HKQuantitySample {
                                    objects.add(serializeQuantitySample(sample: quantitySample, unit: map[quantitySample.quantityType]!))
                                }
                                if let categorySample = o as? HKCategorySample {
                                    objects.add(serializeCategorySample(sample: categorySample))
                                }
                            }

                            collerationsToReturn.add([
                                "uuid": c.uuid.uuidString,
                                "device": serializeDevice(_device: c.device) as Any,
                                "correlationType": c.correlationType.identifier,
                                "objects": objects,
                                "metadata": serializeMetadata(metadata: c.metadata),
                                "startDate": self._dateFormatter.string(from: c.startDate),
                                "endDate": self._dateFormatter.string(from: c.endDate)
                            ])
                        }

                        return resolve(collerationsToReturn)
                    }
                    reject(GENERIC_ERROR, e.localizedDescription, e)
                }
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(q)
    }

  @objc(queryCategorySamples:from:to:limit:ascending:resolve:reject:)
  func queryCategorySamples(typeIdentifier: String, from: Date, to: Date, limit: Int, ascending: Bool, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKCategoryTypeIdentifier.init(rawValue: typeIdentifier)
        guard let sampleType = HKSampleType.categoryType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let from = dateOrNilIfZero(date: from)
        let to = dateOrNilIfZero(date: to)
        let predicate = createPredicate(from: from, to: to)
        let limit = limitOrNilIfZero(limit: limit)

        let q = HKSampleQuery(sampleType: sampleType, predicate: predicate, limit: limit, sortDescriptors: getSortDescriptors(ascending: ascending)) { (_: HKSampleQuery, sample: [HKSample]?, error: Error?) in
            guard let err = error else {
                guard let samples = sample else {
                    return resolve([])
                }
                let arr: NSMutableArray = []

                for s in samples {
                    if let sample = s as? HKCategorySample {
                        let serialized = serializeCategorySample(sample: sample)

                        arr.add(serialized)
                    }
                }
              return resolve(arr)
            }

          reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(q)
    }

  @objc(queryQuantitySamplesWithAnchor:unitString:from:to:limit:anchor:resolve:reject:)
  func queryQuantitySamplesWithAnchor(
    typeIdentifier: String,
    unitString: String,
    from: Date,
    to: Date,
    limit: Int,
    anchor: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKQuantityTypeIdentifier.init(rawValue: typeIdentifier)
        guard let sampleType = HKSampleType.quantityType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let from = dateOrNilIfZero(date: from)
        let to = dateOrNilIfZero(date: to)
        let predicate = createPredicate(from: from, to: to)
        let limit = limitOrNilIfZero(limit: limit)

        let actualAnchor = deserializeHKQueryAnchor(anchor: anchor)

        let q = HKAnchoredObjectQuery(
          type: sampleType,
          predicate: predicate,
          anchor: actualAnchor,
          limit: limit
        ) { (
          _: HKAnchoredObjectQuery,
          s: [HKSample]?,
          deletedSamples: [HKDeletedObject]?,
          newAnchor: HKQueryAnchor?,
          error: Error?
        ) in
          guard let err = error else {
              guard let samples = s else {
                  return resolve([])
              }

            return resolve([
              "samples": samples.map({ sample in
                let serialized = serializeQuantitySample(sample: sample as! HKQuantitySample, unit: HKUnit.init(from: unitString))

                return serialized
              }) as Any,
              "deletedSamples": deletedSamples?.map({ sample in
                return serializeDeletedSample(sample: sample)
              }) as Any,
              "newAnchor": serializeAnchor(anchor: newAnchor) as Any
            ])
          }
          reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(q)
    }

    @objc(queryWorkoutSamplesWithAnchor:distanceUnitString:from:to:limit:anchor:resolve:reject:)
    func queryWorkoutSamplesWithAnchor(
        energyUnitString: String,
        distanceUnitString: String,
        from: Date,
        to: Date,
        limit: Int,
        anchor: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let from = dateOrNilIfZero(date: from)
        let to = dateOrNilIfZero(date: to)
        let predicate = createPredicate(from: from, to: to)
        let limit = limitOrNilIfZero(limit: limit)

        let actualAnchor = deserializeHKQueryAnchor(anchor: anchor)

        let energyUnit = HKUnit.init(from: energyUnitString)
        let distanceUnit = HKUnit.init(from: distanceUnitString)

        let q = HKAnchoredObjectQuery(
          type: .workoutType(),
          predicate: predicate,
          anchor: actualAnchor,
          limit: limit
        ) { (
          _: HKAnchoredObjectQuery,
          s: [HKSample]?,
          deletedSamples: [HKDeletedObject]?,
          newAnchor: HKQueryAnchor?,
          error: Error?
        ) in
          guard let err = error else {
              guard let samples = s else {
                  return resolve([])
              }

            var serializedSamples: NSMutableArray = []

            for sample in samples {
                if let workout = sample as? HKWorkout {
                    let serialized = serializeWorkout(
                        workout: workout,
                        energyUnit: energyUnit,
                        distanceUnit: distanceUnit
                    )
                    serializedSamples.add(serialized)
                }
            }

            return resolve([
              "samples": serializedSamples,
              "deletedSamples": deletedSamples?.map({ sample in
                return serializeDeletedSample(sample: sample)
              }) as Any,
              "newAnchor": serializeAnchor(anchor: newAnchor) as Any
            ])
          }
          reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(q)
    }

  @objc(queryCategorySamplesWithAnchor:from:to:limit:anchor:resolve:reject:)
  func queryCategorySamplesWithAnchor(typeIdentifier: String, from: Date, to: Date, limit: Int, anchor: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let identifier = HKCategoryTypeIdentifier.init(rawValue: typeIdentifier)
        guard let sampleType = HKSampleType.categoryType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let from = dateOrNilIfZero(date: from)
        let to = dateOrNilIfZero(date: to)
        let predicate = createPredicate(from: from, to: to)
        let limit = limitOrNilIfZero(limit: limit)

        let q = HKAnchoredObjectQuery(
          type: sampleType,
          predicate: predicate,
          anchor: anchor != "" ? base64StringToHKQueryAnchor(base64String: anchor) : nil,
          limit: limit
        ) { (
          _: HKAnchoredObjectQuery,
          s: [HKSample]?,
          deletedSamples: [HKDeletedObject]?,
          newAnchor: HKQueryAnchor?,
          error: Error?
        ) in
          guard let err = error else {
            guard let samples = s else {
                return resolve([])
            }

            let arr: NSMutableArray = []

            for s in samples {
                if let sample = s as? HKCategorySample {
                    let serialized = serializeCategorySample(sample: sample)

                    arr.add(serialized)
                }
            }

            return resolve([
              "samples": arr,
              "deletedSamples": deletedSamples?.map({ sample in
                return serializeDeletedSample(sample: sample)
              }) as Any,
              "newAnchor": serializeAnchor(anchor: newAnchor) as Any
            ])
          }
          reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        store.execute(q)
    }

    @objc(querySources:resolve:reject:)
    func querySources(typeIdentifier: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {

        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let type = objectTypeFromString(typeIdentifier: typeIdentifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let query = HKSourceQuery(sampleType: type as! HKSampleType, samplePredicate: nil) { (_: HKSourceQuery, source: Set<HKSource>?, error: Error?) in
            guard let err = error else {
                guard let sources = source else {
                    return resolve([])
                }
                let arr: NSMutableArray = []

                for s in sources {
                    if let source = s as? HKSource {
                        let serialized = serializeSource(source: source)

                        arr.add(serialized)
                    }
                }

                return resolve(arr)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)

        }

        store.execute(query)
    }

    @objc(requestAuthorization:read:resolve:withRejecter:)
    func requestAuthorization(toShare: NSDictionary, read: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let share = sampleTypesFromDictionary(typeIdentifiers: toShare)
        let toRead = objectTypesFromDictionary(typeIdentifiers: read)

        store.requestAuthorization(toShare: share, read: toRead) { (success: Bool, error: Error?) in
            guard let err = error else {
                return resolve(success)
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }
    }

    @available(iOS 13.0.0, *)
    func getWorkoutByID(store: HKHealthStore,
                        workoutUUID: UUID) async -> HKWorkout? {
        let workoutPredicate = HKQuery.predicateForObject(with: workoutUUID)

        let samples = try! await withCheckedThrowingContinuation {
            (continuation: CheckedContinuation<[HKSample], Error>) in
                let query = HKAnchoredObjectQuery(type: HKSeriesType.workoutType(),
                                                predicate: workoutPredicate,
                                                anchor: nil,
                                                limit: 1) {
                (_, samples, _, _, error) in

                if let hasError = error {
                    continuation.resume(throwing: hasError)
                    return
                }

                guard let samples = samples else {
                    fatalError("Should not fail")
                }

                continuation.resume(returning: samples)
            }
            store.execute(query)
        }

        guard let workouts = samples as? [HKWorkout] else {
            return nil
        }

        return workouts.first ?? nil
    }

    @available(iOS 13.0.0, *)
    func _getWorkoutRoutes(store: HKHealthStore, workoutUUID: UUID) async -> [HKWorkoutRoute]? {
        guard let workout = await getWorkoutByID(store: store, workoutUUID: workoutUUID) else {
            return nil
        }

        let workoutPredicate = HKQuery.predicateForObjects(from: workout)
        let samples = try! await withCheckedThrowingContinuation {
            (continuation: CheckedContinuation<[HKSample], Error>) in
                let query = HKAnchoredObjectQuery(type: HKSeriesType.workoutRoute(),
                                                predicate: workoutPredicate,
                                                anchor: nil,
                                                limit: HKObjectQueryNoLimit) {
                (_, samples, _, _, error) in

                if let hasError = error {
                    continuation.resume(throwing: hasError)
                    return
                }

                guard let samples = samples else {
                    fatalError("Should not fail")
                }

                continuation.resume(returning: samples)
            }
            store.execute(query)
        }

        guard let routes = samples as? [HKWorkoutRoute] else {
            return nil
        }

        return routes
    }

    @available(iOS 13.0.0, *)
    func getRouteLocations(store: HKHealthStore, route: HKWorkoutRoute) async -> [CLLocation] {
        let locations = try! await withCheckedThrowingContinuation {
            (continuation: CheckedContinuation<[CLLocation], Error>) in
            var allLocations: [CLLocation] = []

            let query = HKWorkoutRouteQuery(route: route) {
                (_, locationsOrNil, done, errorOrNil) in

                if let error = errorOrNil {
                    continuation.resume(throwing: error)
                    return
                }

                guard let currentLocationBatch = locationsOrNil else {
                    fatalError("Should not fail")
                }

                allLocations.append(contentsOf: currentLocationBatch)

                if done {
                    continuation.resume(returning: allLocations)
                }
            }

            store.execute(query)
        }

        return locations
    }

    @available(iOS 13.0.0, *)
    func getSerializedWorkoutLocations(store: HKHealthStore, workoutUUID: UUID) async -> [Dictionary<String, Any>]? {
        let routes = await _getWorkoutRoutes(store: store, workoutUUID: workoutUUID)

        var allRoutes: [Dictionary<String, Any>] = []
        guard let _routes = routes else {
            return nil
        }
        for route in _routes {
            let routeMetadata = serializeMetadata(metadata: route.metadata) as! [String: Any]
            let routeCLLocations = (await getRouteLocations(store: store, route: route))
            let routeLocations = routeCLLocations.enumerated().map {(i, loc) in serializeLocation(location: loc, previousLocation: i == 0 ? nil: routeCLLocations[i - 1])}
            let routeInfos: [String: Any] = ["locations": routeLocations]
            allRoutes.append(routeInfos.merging(routeMetadata) { (current, _) in current })
        }
        return allRoutes
    }

    func serializeLocation(location: CLLocation, previousLocation: CLLocation?) -> [String: Any] {
        var distance: CLLocationDistance?
        if let previousLocation = previousLocation {
            distance = location.distance(from: previousLocation)
        } else {
            distance = nil
        }
        return [
            "longitude": location.coordinate.longitude,
            "latitude": location.coordinate.latitude,
            "altitude": location.altitude,
            "speed": location.speed,
            "timestamp": location.timestamp.timeIntervalSince1970,
            "horizontalAccuracy": location.horizontalAccuracy,
            "speedAccuracy": location.speedAccuracy,
            "verticalAccuracy": location.verticalAccuracy,
            "distance": distance as Any
        ]
    }

    @available(iOS 13.0.0, *)
    @objc(getWorkoutRoutes:resolve:reject:)
    func getWorkoutRoutes(
        workoutUUID: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock) {

        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        guard let _workoutUUID = UUID(uuidString: workoutUUID) else {
            return reject("INVALID_UUID_ERROR", "Invalid UUID received", nil)
        }

        Task {
            do {
                let locations = await getSerializedWorkoutLocations(store: store, workoutUUID: _workoutUUID)
                resolve(locations)
            } catch {
                reject("WORKOUT_LOCATION_ERROR", "Failed to retrieve workout locations", nil)
            }
        }
    }

    typealias HKAnchoredObjectQueryResult = (samples: [HKSample], deletedSamples: [HKDeletedObject]?, newAnchor: HKQueryAnchor?)

    @available(iOS 13.0.0, *)
    func _queryHeartbeatSeriesSamplesWithAnchor(
        store: HKHealthStore,
        predicate: NSPredicate?,
        limit: Int,
        anchor: HKQueryAnchor?
    ) async throws -> HKAnchoredObjectQueryResult {
        let queryResult = try await withCheckedThrowingContinuation {
            (continuation: CheckedContinuation<HKAnchoredObjectQueryResult, Error>) in
            let query = HKAnchoredObjectQuery(
                type: HKSeriesType.heartbeat(),
                predicate: predicate,
                anchor: anchor,
                limit: limit
            ) { (
                _: HKAnchoredObjectQuery,
                s: [HKSample]?,
                deletedSamples: [HKDeletedObject]?,
                newAnchor: HKQueryAnchor?,
                error: Error?
            ) in
                if let err = error {
                    continuation.resume(throwing: err)
                }

                guard let samples = s else {
                    fatalError("Should not fail")
                }

                continuation.resume(returning: HKAnchoredObjectQueryResult(samples: samples, deletedSamples: deletedSamples, newAnchor: newAnchor))
            }

            store.execute(query)
        }

        return queryResult
    }

    @available(iOS 13.0.0, *)
    func getHeartbeatSeriesHeartbeats(store: HKHealthStore, sample: HKHeartbeatSeriesSample) async throws -> [Dictionary<String, Any>] {
        let beatTimes = try await withCheckedThrowingContinuation {
            (continuation: CheckedContinuation<[Dictionary<String, Any>], Error>) in
            var allBeats: [Dictionary<String, Any>] = []

            let query = HKHeartbeatSeriesQuery(heartbeatSeries: sample) { (
                _: HKHeartbeatSeriesQuery,
                timeSinceSeriesStart: TimeInterval,
                precededByGap: Bool,
                done: Bool,
                error: Error?
            ) in
                if let err = error {
                    continuation.resume(throwing: err)
                }

                let timeDict: [String: Any] = [
                    "timeSinceSeriesStart": timeSinceSeriesStart,
                    "precededByGap": precededByGap
                ]

                allBeats.append(timeDict)

                if done {
                    continuation.resume(returning: allBeats)
                }
            }

            store.execute(query)
        }

        return beatTimes
    }

    @available(iOS 13.0.0, *)
    func getSerializedHeartbeatSeriesSample(store: HKHealthStore, sample: HKHeartbeatSeriesSample) async throws -> [String: Any] {
        let sampleMetadata = serializeMetadata(metadata: sample.metadata) as! [String: Any]
        let sampleHeartbeats = try await getHeartbeatSeriesHeartbeats(store: store, sample: sample)

        return [
            "uuid": sample.uuid.uuidString,
            "device": serializeDevice(_device: sample.device) as Any,
            "startDate": self._dateFormatter.string(from: sample.startDate),
            "endDate": self._dateFormatter.string(from: sample.endDate),
            "heartbeats": sampleHeartbeats as Any,
            "metadata": serializeMetadata(metadata: sample.metadata),
            "sourceRevision": serializeSourceRevision(_sourceRevision: sample.sourceRevision) as Any
        ]
    }

    @available(iOS 13.0.0, *)
    @objc(queryHeartbeatSeriesSamplesWithAnchor:to:limit:anchor:resolve:reject:)
    func queryHeartbeatSeriesSamplesWithAnchor(
        from: Date,
        to: Date,
        limit: Int,
        anchor: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        Task {
            do {
                let from = dateOrNilIfZero(date: from)
                let to = dateOrNilIfZero(date: to)

                let predicate = createPredicate(from: from, to: to)

                let limit = limitOrNilIfZero(limit: limit)

                let actualAnchor = deserializeHKQueryAnchor(anchor: anchor)

                let queryResult = try await _queryHeartbeatSeriesSamplesWithAnchor(store: store, predicate: predicate, limit: limit, anchor: actualAnchor)

                var allHeartbeatSamples: [Dictionary<String, Any>] = []
                for sample in queryResult.samples as! [HKHeartbeatSeriesSample] {
                    allHeartbeatSamples.append(try await getSerializedHeartbeatSeriesSample(store: store, sample: sample))
                }

                resolve([
                  "samples": allHeartbeatSamples as Any,
                  "deletedSamples": queryResult.deletedSamples?.map({ sample in
                    return serializeDeletedSample(sample: sample)
                  }) as Any,
                  "newAnchor": serializeAnchor(anchor: queryResult.newAnchor) as Any
                ])
            } catch {
                reject(GENERIC_ERROR, error.localizedDescription, error)
            }
        }
    }

  @available(iOS 13.0.0, *)
  func _queryHeartbeatSeriesSamples(
      store: HKHealthStore,
      predicate: NSPredicate?,
      limit: Int,
      ascending: Bool
  ) async throws -> [HKSample] {
      let samples = try await withCheckedThrowingContinuation {
          (continuation: CheckedContinuation<[HKSample], Error>) in

          let query = HKSampleQuery(
              sampleType: HKSeriesType.heartbeat(),
              predicate: predicate,
              limit: limit,
              sortDescriptors: [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: ascending)]
          ) { (_: HKSampleQuery, sample: [HKSample]?, error: Error?) in
              if let err = error {
                  continuation.resume(throwing: err)
              } else {
                  guard let actualSamples = sample else {
                      fatalError("Should not fail")
                  }
                  continuation.resume(returning: actualSamples)
              }
          }

          store.execute(query)
      }

      return samples
  }

  @available(iOS 13.0.0, *)
  @objc(queryHeartbeatSeriesSamples:to:limit:ascending:resolve:reject:)
  func queryHeartbeatSeriesSamples(
      from: Date,
      to: Date,
      limit: Int,
      ascending: Bool,
      resolve: @escaping RCTPromiseResolveBlock,
      reject: @escaping RCTPromiseRejectBlock
  ) {
      guard let store = _store else {
          return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
      }

      Task {
          do {
              let from = dateOrNilIfZero(date: from)
              let to = dateOrNilIfZero(date: to)

              let predicate = createPredicate(from: from, to: to)

              let limit = limitOrNilIfZero(limit: limit)

              let samples = try await _queryHeartbeatSeriesSamples(store: store, predicate: predicate, limit: limit, ascending: ascending)

              var allHeartbeatSamples: [Dictionary<String, Any>] = []
              for sample in samples as! [HKHeartbeatSeriesSample] {
                  allHeartbeatSamples.append(try await getSerializedHeartbeatSeriesSample(store: store, sample: sample))
              }

              resolve(allHeartbeatSamples as Any)
          } catch {
              reject(GENERIC_ERROR, error.localizedDescription, error)
          }
      }
  }

    @objc(queryStatisticsCollectionForQuantity:unitString:from:to:options:subscribe:resolve:reject:)
    func queryStatisticsCollectionForQuantity(
        typeIdentifier: String,
        unitString: String,
        from: Date,
        to: Date,
        options: NSArray,
        subscribe: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let calendar = Calendar.current
        let interval = DateComponents(day: 1)
        var components = DateComponents(calendar: calendar,
                                        timeZone: calendar.timeZone,
                                        hour: 0,
                                        minute: 0,
                                        second: 0)

        guard let anchorDate = calendar.nextDate(after: Date(),
                                                matching: components,
                                                matchingPolicy: .nextTime,
                                                repeatedTimePolicy: .first,
                                                direction: .backward) else {
            fatalError("*** unable to find the previous day. ***")
        }

        let predicate = HKQuery.predicateForSamples(withStart: from, end: to, options: [.strictStartDate])

        let identifier = HKQuantityTypeIdentifier.init(rawValue: typeIdentifier)
        guard let quantityType = HKSampleType.quantityType(forIdentifier: identifier) else {
            return reject(TYPE_IDENTIFIER_ERROR, "Failed to initialize " + typeIdentifier, nil)
        }

        let opts: HKStatisticsOptions = parseStatisticsOptions(options: options)

        let unit = HKUnit.init(from: unitString)

        let queryId = subscribe ? UUID().uuidString : ""

        let q = HKStatisticsCollectionQuery.init(quantityType: quantityType,
                                        quantitySamplePredicate: predicate,
                                        options: opts,
                                        anchorDate: anchorDate,
                                        intervalComponents: interval)
        q.initialResultsHandler = {
            (_, results, error) in

            guard let err = error else {
                guard let statsCollection = results else {
                    return resolve([
                        "queryId": queryId,
                        "data": []
                    ])
                }
                let arr: NSMutableArray = []
                
                for s in statsCollection.statistics() {
                    if let stats = s as? HKStatistics {
                        let serialized = serializeStatsFromCollection(stats: stats, unit: unit)
                        arr.add(serialized)
                    }
                }

                return resolve([
                    "queryId": queryId,
                    "data": arr
                ])
            }
            reject(GENERIC_ERROR, err.localizedDescription, err)
        }

        if subscribe {
            q.statisticsUpdateHandler = {
                (q, stats: HKStatistics?, statsCollection: HKStatisticsCollection?, error) in

                if let err = error {
                    fatalError(err.localizedDescription)
                }

                var serializedStats: [String : Any?]?
                var serializedStatsCollection: NSMutableArray = []

                if let stats = stats {
                    serializedStats = serializeStatsFromCollection(stats: stats, unit: unit)
                }

                if let statsCollection = statsCollection {
                    for s in statsCollection.statistics() {
                        if let stats = s as? HKStatistics {
                            let serialized = serializeStatsFromCollection(stats: stats, unit: unit)
                            serializedStatsCollection.add(serialized)
                        }
                    }
                }

                let data = [
                    "stats": serializedStats,
                    "statsCollection": serializedStatsCollection
                ]

                DispatchQueue.main.async {
                    if self.bridge != nil && self.bridge.isValid {
                        self.sendEvent(withName: "onStatsCollectionUpdate", body: [
                            "queryId": queryId,
                            "data": data
                        ])
                    }
                }
            }
            self._runningQueries[queryId] = q
        }

        store.execute(q)
    }

    @objc(queryActivitySummaryForQuantity:timeUnitString:from:to:subscribe:resolve:reject:)
    func queryActivitySummaryForQuantity(
        energyUnitString: String,
        timeUnitString: String,
        from: Date,
        to: Date,
        subscribe: Bool,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let store = _store else {
            return reject(INIT_ERROR, INIT_ERROR_MESSAGE, nil)
        }

        let calendar = NSCalendar.current

        let units: Set<Calendar.Component> = [.day, .month, .year, .era]

        var startDateComponents = calendar.dateComponents(units, from: from)
        startDateComponents.calendar = calendar

        var endDateComponents = calendar.dateComponents(units, from: to)
        endDateComponents.calendar = calendar

        let summariesWithinRange = HKQuery.predicate(
            forActivitySummariesBetweenStart: startDateComponents,
            end: endDateComponents
        )

        let timeUnit = HKUnit.init(from: timeUnitString)
        let energyUnit = HKUnit.init(from: energyUnitString)

        let queryId = subscribe ? UUID().uuidString : ""

        let q: HKActivitySummaryQuery = HKActivitySummaryQuery(predicate: summariesWithinRange) {
            (query, summariesOrNil, errorOrNil) in
    
            if let err = errorOrNil {
                return reject(GENERIC_ERROR, err.localizedDescription, err)
            }

            guard let summaries = summariesOrNil else {
                return resolve([])
            }
            
            var arr: NSMutableArray = []

            for s in summaries {
                if let summary = s as? HKActivitySummary {
                    let serialized = serializeActivitySummary(
                        summary: summary,
                        energyUnit: energyUnit,
                        timeUnit: timeUnit,
                        calendar: calendar
                    )
                    arr.add(serialized)
                }
            }

            let res: NSDictionary = [
                "queryId": queryId,
                "data": arr
            ]

            return resolve(res)
        }

        if subscribe {
            q.updateHandler = {
                (q, activitySummaries: [HKActivitySummary]?, error) in

                if let err = error {
                    fatalError(err.localizedDescription)
                    return
                }
                guard let activitySummaries = activitySummaries else {
                    return
                }

                var arr: NSMutableArray = []

                for summary in activitySummaries {
                    let serialized = serializeActivitySummary(
                        summary: summary,
                        energyUnit: energyUnit,
                        timeUnit: timeUnit,
                        calendar: calendar
                    )
                    arr.add(serialized)
                }

                DispatchQueue.main.async {
                    if self.bridge != nil && self.bridge.isValid {
                        self.sendEvent(withName: "onActivitySummaryUpdate", body: [
                            "queryId": queryId,
                            "data": arr
                        ])
                    }
                }
            }
            self._runningQueries[queryId] = q
        }

        store.execute(q)
    }
}
