import { NativeEventEmitter } from 'react-native';
import type { EmitterSubscription } from 'react-native';
/**
 * See https://developer.apple.com/documentation/healthkit/hkworkouttypeidentifier
 */
export declare const HKWorkoutTypeIdentifier: "HKWorkoutTypeIdentifier";
export declare const HKAudiogramTypeIdentifier: "HKAudiogramTypeIdentifier";
/**
 * See https://developer.apple.com/documentation/healthkit/hkworkoutroutetypeidentifier
 */
export declare const HKWorkoutRouteTypeIdentifier: "HKWorkoutRouteTypeIdentifier";
export declare const HKDataTypeIdentifierHeartbeatSeries: "HKDataTypeIdentifierHeartbeatSeries";
/**
 * See https://developer.apple.com/documentation/healthkit/hkquantitytypeidentifier
 */
export declare enum HKQuantityTypeIdentifier {
    bodyMassIndex = "HKQuantityTypeIdentifierBodyMassIndex",
    bodyFatPercentage = "HKQuantityTypeIdentifierBodyFatPercentage",
    height = "HKQuantityTypeIdentifierHeight",
    bodyMass = "HKQuantityTypeIdentifierBodyMass",
    leanBodyMass = "HKQuantityTypeIdentifierLeanBodyMass",
    waistCircumference = "HKQuantityTypeIdentifierWaistCircumference",
    stepCount = "HKQuantityTypeIdentifierStepCount",
    distanceWalkingRunning = "HKQuantityTypeIdentifierDistanceWalkingRunning",
    distanceCycling = "HKQuantityTypeIdentifierDistanceCycling",
    distanceWheelchair = "HKQuantityTypeIdentifierDistanceWheelchair",
    basalEnergyBurned = "HKQuantityTypeIdentifierBasalEnergyBurned",
    activeEnergyBurned = "HKQuantityTypeIdentifierActiveEnergyBurned",
    flightsClimbed = "HKQuantityTypeIdentifierFlightsClimbed",
    nikeFuel = "HKQuantityTypeIdentifierNikeFuel",
    appleExerciseTime = "HKQuantityTypeIdentifierAppleExerciseTime",
    pushCount = "HKQuantityTypeIdentifierPushCount",
    distanceSwimming = "HKQuantityTypeIdentifierDistanceSwimming",
    swimmingStrokeCount = "HKQuantityTypeIdentifierSwimmingStrokeCount",
    vo2Max = "HKQuantityTypeIdentifierVO2Max",
    distanceDownhillSnowSports = "HKQuantityTypeIdentifierDistanceDownhillSnowSports",
    appleStandTime = "HKQuantityTypeIdentifierAppleStandTime",
    heartRate = "HKQuantityTypeIdentifierHeartRate",
    bodyTemperature = "HKQuantityTypeIdentifierBodyTemperature",
    basalBodyTemperature = "HKQuantityTypeIdentifierBasalBodyTemperature",
    bloodPressureSystolic = "HKQuantityTypeIdentifierBloodPressureSystolic",
    bloodPressureDiastolic = "HKQuantityTypeIdentifierBloodPressureDiastolic",
    respiratoryRate = "HKQuantityTypeIdentifierRespiratoryRate",
    restingHeartRate = "HKQuantityTypeIdentifierRestingHeartRate",
    walkingHeartRateAverage = "HKQuantityTypeIdentifierWalkingHeartRateAverage",
    heartRateVariabilitySDNN = "HKQuantityTypeIdentifierHeartRateVariabilitySDNN",
    oxygenSaturation = "HKQuantityTypeIdentifierOxygenSaturation",
    peripheralPerfusionIndex = "HKQuantityTypeIdentifierPeripheralPerfusionIndex",
    bloodGlucose = "HKQuantityTypeIdentifierBloodGlucose",
    numberOfTimesFallen = "HKQuantityTypeIdentifierNumberOfTimesFallen",
    electrodermalActivity = "HKQuantityTypeIdentifierElectrodermalActivity",
    inhalerUsage = "HKQuantityTypeIdentifierInhalerUsage",
    insulinDelivery = "HKQuantityTypeIdentifierInsulinDelivery",
    bloodAlcoholContent = "HKQuantityTypeIdentifierBloodAlcoholContent",
    forcedVitalCapacity = "HKQuantityTypeIdentifierForcedVitalCapacity",
    forcedExpiratoryVolume1 = "HKQuantityTypeIdentifierForcedExpiratoryVolume1",
    peakExpiratoryFlowRate = "HKQuantityTypeIdentifierPeakExpiratoryFlowRate",
    environmentalAudioExposure = "HKQuantityTypeIdentifierEnvironmentalAudioExposure",
    headphoneAudioExposure = "HKQuantityTypeIdentifierHeadphoneAudioExposure",
    dietaryFatTotal = "HKQuantityTypeIdentifierDietaryFatTotal",
    dietaryFatPolyunsaturated = "HKQuantityTypeIdentifierDietaryFatPolyunsaturated",
    dietaryFatMonounsaturated = "HKQuantityTypeIdentifierDietaryFatMonounsaturated",
    dietaryFatSaturated = "HKQuantityTypeIdentifierDietaryFatSaturated",
    dietaryCholesterol = "HKQuantityTypeIdentifierDietaryCholesterol",
    dietarySodium = "HKQuantityTypeIdentifierDietarySodium",
    dietaryCarbohydrates = "HKQuantityTypeIdentifierDietaryCarbohydrates",
    dietaryFiber = "HKQuantityTypeIdentifierDietaryFiber",
    dietarySugar = "HKQuantityTypeIdentifierDietarySugar",
    dietaryEnergyConsumed = "HKQuantityTypeIdentifierDietaryEnergyConsumed",
    dietaryProtein = "HKQuantityTypeIdentifierDietaryProtein",
    dietaryVitaminA = "HKQuantityTypeIdentifierDietaryVitaminA",
    dietaryVitaminB6 = "HKQuantityTypeIdentifierDietaryVitaminB6",
    dietaryVitaminB12 = "HKQuantityTypeIdentifierDietaryVitaminB12",
    dietaryVitaminC = "HKQuantityTypeIdentifierDietaryVitaminC",
    dietaryVitaminD = "HKQuantityTypeIdentifierDietaryVitaminD",
    dietaryVitaminE = "HKQuantityTypeIdentifierDietaryVitaminE",
    dietaryVitaminK = "HKQuantityTypeIdentifierDietaryVitaminK",
    dietaryCalcium = "HKQuantityTypeIdentifierDietaryCalcium",
    dietaryIron = "HKQuantityTypeIdentifierDietaryIron",
    dietaryThiamin = "HKQuantityTypeIdentifierDietaryThiamin",
    dietaryRiboflavin = "HKQuantityTypeIdentifierDietaryRiboflavin",
    dietaryNiacin = "HKQuantityTypeIdentifierDietaryNiacin",
    dietaryFolate = "HKQuantityTypeIdentifierDietaryFolate",
    dietaryBiotin = "HKQuantityTypeIdentifierDietaryBiotin",
    dietaryPantothenicAcid = "HKQuantityTypeIdentifierDietaryPantothenicAcid",
    dietaryPhosphorus = "HKQuantityTypeIdentifierDietaryPhosphorus",
    dietaryIodine = "HKQuantityTypeIdentifierDietaryIodine",
    dietaryMagnesium = "HKQuantityTypeIdentifierDietaryMagnesium",
    dietaryZinc = "HKQuantityTypeIdentifierDietaryZinc",
    dietarySelenium = "HKQuantityTypeIdentifierDietarySelenium",
    dietaryCopper = "HKQuantityTypeIdentifierDietaryCopper",
    dietaryManganese = "HKQuantityTypeIdentifierDietaryManganese",
    dietaryChromium = "HKQuantityTypeIdentifierDietaryChromium",
    dietaryMolybdenum = "HKQuantityTypeIdentifierDietaryMolybdenum",
    dietaryChloride = "HKQuantityTypeIdentifierDietaryChloride",
    dietaryPotassium = "HKQuantityTypeIdentifierDietaryPotassium",
    dietaryCaffeine = "HKQuantityTypeIdentifierDietaryCaffeine",
    dietaryWater = "HKQuantityTypeIdentifierDietaryWater",
    sixMinuteWalkTestDistance = "HKQuantityTypeIdentifierSixMinuteWalkTestDistance",
    walkingSpeed = "HKQuantityTypeIdentifierWalkingSpeed",
    walkingStepLength = "HKQuantityTypeIdentifierWalkingStepLength",
    walkingAsymmetryPercentage = "HKQuantityTypeIdentifierWalkingAsymmetryPercentage",
    walkingDoubleSupportPercentage = "HKQuantityTypeIdentifierWalkingDoubleSupportPercentage",
    stairAscentSpeed = "HKQuantityTypeIdentifierStairAscentSpeed",
    stairDescentSpeed = "HKQuantityTypeIdentifierStairDescentSpeed",
    uvExposure = "HKQuantityTypeIdentifierUVExposure",
    appleMoveTime = "HKQuantityTypeIdentifierAppleMoveTime",
    appleWalkingSteadiness = "HKQuantityTypeIdentifierAppleWalkingSteadiness",
    numberOfAlcoholicBeverages = "HKQuantityTypeIdentifierNumberOfAlcoholicBeverages",
    atrialFibrillationBurden = "HKQuantityTypeIdentifierAtrialFibrillationBurden",
    underwaterDepth = "HKQuantityTypeIdentifierUnderwaterDepth",
    waterTemperature = "HKQuantityTypeIdentifierWaterTemperature",
    appleSleepingWristTemperature = "HKQuantityTypeIdentifierAppleSleepingWristTemperature",
    timeInDaylight = "HKQuantityTypeIdentifierTimeInDaylight",
    physicalEffort = "HKQuantityTypeIdentifierPhysicalEffort",
    cyclingSpeed = "HKQuantityTypeIdentifierCyclingSpeed",
    cyclingPower = "HKQuantityTypeIdentifierCyclingPower",
    cyclingFunctionalThresholdPower = "HKQuantityTypeIdentifierCyclingFunctionalThresholdPower",
    cyclingCadence = "HKQuantityTypeIdentifierCyclingCadence",
    environmentalSoundReduction = "HKQuantityTypeIdentifierEnvironmentalSoundReduction",
    heartRateRecoveryOneMinute = "HKQuantityTypeIdentifierHeartRateRecoveryOneMinute"
}
export type TypeToUnitMapping = {
    readonly [key in HKQuantityTypeIdentifier]: HKUnit;
};
export declare enum HKCategoryValueLowCardioFitnessEvent {
    lowFitness = 1
}
export declare enum HKHeartRateMotionContext {
    active = 2,
    notSet = 0,
    sedentary = 1
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcorrelationtypeidentifier
 */
export declare enum HKCorrelationTypeIdentifier {
    bloodPressure = "HKCorrelationTypeIdentifierBloodPressure",
    food = "HKCorrelationTypeIdentifierFood"
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategorytypeidentifier
 */
export declare enum HKCategoryTypeIdentifier {
    sleepAnalysis = "HKCategoryTypeIdentifierSleepAnalysis",
    appleStandHour = "HKCategoryTypeIdentifierAppleStandHour",
    cervicalMucusQuality = "HKCategoryTypeIdentifierCervicalMucusQuality",
    ovulationTestResult = "HKCategoryTypeIdentifierOvulationTestResult",
    menstrualFlow = "HKCategoryTypeIdentifierMenstrualFlow",
    intermenstrualBleeding = "HKCategoryTypeIdentifierIntermenstrualBleeding",
    sexualActivity = "HKCategoryTypeIdentifierSexualActivity",
    mindfulSession = "HKCategoryTypeIdentifierMindfulSession",
    highHeartRateEvent = "HKCategoryTypeIdentifierHighHeartRateEvent",
    lowHeartRateEvent = "HKCategoryTypeIdentifierLowHeartRateEvent",
    irregularHeartRhythmEvent = "HKCategoryTypeIdentifierIrregularHeartRhythmEvent",
    /**
     * @deprecated Use environmentalAudioExposureEvent instead.
     */
    audioExposureEvent = "HKCategoryTypeIdentifierAudioExposureEvent",
    toothbrushingEvent = "HKCategoryTypeIdentifierToothbrushingEvent",
    lowCardioFitnessEvent = "HKCategoryTypeIdentifierLowCardioFitnessEvent",
    contraceptive = "HKCategoryTypeIdentifierContraceptive",
    lactation = "HKCategoryTypeIdentifierLactation",
    pregnancy = "HKCategoryTypeIdentifierPregnancy",
    pregnancyTestResult = "HKCategoryTypeIdentifierPregnancyTestResult",
    progesteroneTestResult = "HKCategoryTypeIdentifierProgesteroneTestResult",
    environmentalAudioExposureEvent = "HKCategoryTypeIdentifierEnvironmentalAudioExposureEvent",
    headphoneAudioExposureEvent = "HKCategoryTypeIdentifierHeadphoneAudioExposureEvent",
    appleWalkingSteadinessEvent = "HKCategoryTypeIdentifierAppleWalkingSteadinessEvent",
    handwashingEvent = "HKCategoryTypeIdentifierHandwashingEvent",
    abdominalCramps = "HKCategoryTypeIdentifierAbdominalCramps",
    acne = "HKCategoryTypeIdentifierAcne",
    appetiteChanges = "HKCategoryTypeIdentifierAppetiteChanges",
    bladderIncontinence = "HKCategoryTypeIdentifierBladderIncontinence",
    bloating = "HKCategoryTypeIdentifierBloating",
    breastPain = "HKCategoryTypeIdentifierBreastPain",
    chestTightnessOrPain = "HKCategoryTypeIdentifierChestTightnessOrPain",
    chills = "HKCategoryTypeIdentifierChills",
    constipation = "HKCategoryTypeIdentifierConstipation",
    coughing = "HKCategoryTypeIdentifierCoughing",
    diarrhea = "HKCategoryTypeIdentifierDiarrhea",
    dizziness = "HKCategoryTypeIdentifierDizziness",
    drySkin = "HKCategoryTypeIdentifierDrySkin",
    fainting = "HKCategoryTypeIdentifierFainting",
    fatigue = "HKCategoryTypeIdentifierFatigue",
    fever = "HKCategoryTypeIdentifierFever",
    generalizedBodyAche = "HKCategoryTypeIdentifierGeneralizedBodyAche",
    hairLoss = "HKCategoryTypeIdentifierHairLoss",
    headache = "HKCategoryTypeIdentifierHeadache",
    heartburn = "HKCategoryTypeIdentifierHeartburn",
    hotFlashes = "HKCategoryTypeIdentifierHotFlashes",
    lossOfSmell = "HKCategoryTypeIdentifierLossOfSmell",
    lossOfTaste = "HKCategoryTypeIdentifierLossOfTaste",
    lowerBackPain = "HKCategoryTypeIdentifierLowerBackPain",
    memoryLapse = "HKCategoryTypeIdentifierMemoryLapse",
    moodChanges = "HKCategoryTypeIdentifierMoodChanges",
    nausea = "HKCategoryTypeIdentifierNausea",
    nightSweats = "HKCategoryTypeIdentifierNightSweats",
    pelvicPain = "HKCategoryTypeIdentifierPelvicPain",
    rapidPoundingOrFlutteringHeartbeat = "HKCategoryTypeIdentifierRapidPoundingOrFlutteringHeartbeat",
    runnyNose = "HKCategoryTypeIdentifierRunnyNose",
    shortnessOfBreath = "HKCategoryTypeIdentifierShortnessOfBreath",
    sinusCongestion = "HKCategoryTypeIdentifierSinusCongestion",
    skippedHeartbeat = "HKCategoryTypeIdentifierSkippedHeartbeat",
    sleepChanges = "HKCategoryTypeIdentifierSleepChanges",
    soreThroat = "HKCategoryTypeIdentifierSoreThroat",
    vaginalDryness = "HKCategoryTypeIdentifierVaginalDryness",
    vomiting = "HKCategoryTypeIdentifierVomiting",
    wheezing = "HKCategoryTypeIdentifierWheezing"
}
export type HKSampleTypeIdentifier = HKCategoryTypeIdentifier | HKCorrelationTypeIdentifier | HKQuantityTypeIdentifier | typeof HKAudiogramTypeIdentifier | typeof HKDataTypeIdentifierHeartbeatSeries | typeof HKWorkoutRouteTypeIdentifier | typeof HKWorkoutTypeIdentifier | `${HKCategoryTypeIdentifier}` | `${HKCorrelationTypeIdentifier}` | `${HKQuantityTypeIdentifier}`;
export type HealthkitReadAuthorization = HKCharacteristicTypeIdentifier | HKSampleTypeIdentifier | `${HKCharacteristicTypeIdentifier}` | `${HKSampleTypeIdentifier}`;
export type HealthkitWriteAuthorization = HKSampleTypeIdentifier;
export declare enum HKCategoryValueAppleStandHour {
    stood = 0,
    idle = 1
}
export declare enum HKWorkoutActivityType {
    americanFootball = 1,
    archery = 2,
    australianFootball = 3,
    badminton = 4,
    baseball = 5,
    basketball = 6,
    bowling = 7,
    boxing = 8,
    climbing = 9,
    cricket = 10,
    crossTraining = 11,
    curling = 12,
    cycling = 13,
    dance = 14,
    danceInspiredTraining = 15,
    elliptical = 16,
    equestrianSports = 17,
    fencing = 18,
    fishing = 19,
    functionalStrengthTraining = 20,
    golf = 21,
    gymnastics = 22,
    handball = 23,
    hiking = 24,
    hockey = 25,
    hunting = 26,
    lacrosse = 27,
    martialArts = 28,
    mindAndBody = 29,
    mixedMetabolicCardioTraining = 30,
    paddleSports = 31,
    play = 32,
    preparationAndRecovery = 33,
    racquetball = 34,
    rowing = 35,
    rugby = 36,
    running = 37,
    sailing = 38,
    skatingSports = 39,
    snowSports = 40,
    soccer = 41,
    softball = 42,
    squash = 43,
    stairClimbing = 44,
    surfingSports = 45,
    swimming = 46,
    tableTennis = 47,
    tennis = 48,
    trackAndField = 49,
    traditionalStrengthTraining = 50,
    volleyball = 51,
    walking = 52,
    waterFitness = 53,
    waterPolo = 54,
    waterSports = 55,
    wrestling = 56,
    yoga = 57,
    barre = 58,
    coreTraining = 59,
    crossCountrySkiing = 60,
    downhillSkiing = 61,
    flexibility = 62,
    highIntensityIntervalTraining = 63,
    jumpRope = 64,
    kickboxing = 65,
    pilates = 66,
    snowboarding = 67,
    stairs = 68,
    stepTraining = 69,
    wheelchairWalkPace = 70,
    wheelchairRunPace = 71,
    taiChi = 72,
    mixedCardio = 73,
    handCycling = 74,
    discSports = 75,
    fitnessGaming = 76,
    other = 3000
}
export type HKGenericMetadata = {
    readonly [key: string]: HKQuantity | boolean | number | string | undefined;
    readonly HKExternalUUID?: string;
    readonly HKTimeZone?: string;
    readonly HKWasUserEntered?: boolean;
    readonly HKDeviceSerialNumber?: string;
    readonly HKUDIDeviceIdentifier?: string;
    readonly HKUDIProductionIdentifier?: string;
    readonly HKDigitalSignature?: string;
    readonly HKDeviceName?: string;
    readonly HKDeviceManufacturerName?: string;
    readonly HKSyncIdentifier?: string;
    readonly HKSyncVersion?: number;
    readonly HKWasTakenInLab?: boolean;
    readonly HKReferenceRangeLowerLimit?: number;
    readonly HKReferenceRangeUpperLimit?: number;
};
export declare enum HKWeatherCondition {
    none = 0,
    clear = 1,
    fair = 2,
    partlyCloudy = 3,
    mostlyCloudy = 4,
    cloudy = 5,
    foggy = 6,
    haze = 7,
    windy = 8,
    blustery = 9,
    smoky = 10,
    dust = 11,
    snow = 12,
    hail = 13,
    sleet = 14,
    freezingDrizzle = 15,
    freezingRain = 16,
    mixedRainAndHail = 17,
    mixedRainAndSnow = 18,
    mixedRainAndSleet = 19,
    mixedSnowAndSleet = 20,
    drizzle = 21,
    scatteredShowers = 22,
    showers = 23,
    thunderstorms = 24,
    tropicalStorm = 25,
    hurricane = 26,
    tornado = 27
}
declare enum HKIndoorWorkout {
    false = 0,
    true = 1
}
export interface HKWorkoutMetadata extends HKGenericMetadata {
    readonly HKWeatherCondition?: HKWeatherCondition;
    readonly HKWeatherHumidity?: HKQuantity<HKQuantityTypeIdentifier, HKUnits.Percent>;
    readonly HKAverageMETs?: HKQuantity<HKQuantityTypeIdentifier, HKUnit>;
    readonly HKElevationAscended?: HKQuantity<HKQuantityTypeIdentifier, LengthUnit>;
    readonly HKIndoorWorkout?: HKIndoorWorkout;
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkauthorizationrequeststatus
 */
export declare enum HKAuthorizationRequestStatus {
    unknown = 0,
    shouldRequest = 1,
    unnecessary = 2
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkauthorizationstatus
 */
export declare enum HKAuthorizationStatus {
    notDetermined = 0,
    sharingDenied = 1,
    sharingAuthorized = 2
}
export type HKQuantity<TIdentifier extends HKQuantityTypeIdentifier = HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier> = UnitForIdentifier<TIdentifier>> = {
    readonly unit: TUnit;
    readonly quantity: number;
};
/**
 * See https://developer.apple.com/documentation/healthkit/hkbloodtype
 */
export declare enum HKBloodType {
    notSet = 0,
    aPositive = 1,
    aNegative = 2,
    bPositive = 3,
    bNegative = 4,
    abPositive = 5,
    abNegative = 6,
    oPositive = 7,
    oNegative = 8
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkbiologicalsex
 */
export declare enum HKBiologicalSex {
    notSet = 0,
    female = 1,
    male = 2,
    other = 3
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkfitzpatrickskintype
 */
export declare enum HKFitzpatrickSkinType {
    notSet = 0,
    I = 1,
    II = 2,
    III = 3,
    IV = 4,
    V = 5,
    VI = 6
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkstatisticsoptions
 */
export declare enum HKStatisticsOptions {
    cumulativeSum = "cumulativeSum",
    discreteAverage = "discreteAverage",
    discreteMax = "discreteMax",
    discreteMin = "discreteMin",
    discreteMostRecent = "discreteMostRecent",
    duration = "duration",
    mostRecent = "mostRecent",
    separateBySource = "separateBySource"
}
export type QueryStatisticsResponseRaw<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>> = {
    readonly averageQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly maximumQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly minimumQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly sumQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly mostRecentQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly mostRecentQuantityDateInterval?: {
        readonly from: string;
        readonly to: string;
    };
    readonly duration?: HKQuantity<HKQuantityTypeIdentifier, TimeUnit>;
};
export type HKStatistics<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>> = {
    startDate: Date;
    endDate: Date;
    readonly averageQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly maximumQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly minimumQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly sumQuantity?: HKQuantity<TIdentifier, TUnit>;
    readonly duration?: HKQuantity<HKQuantityTypeIdentifier, TimeUnit>;
};
export type QueryStatisticsCollectionResponseRaw<TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>> = {
    queryId: string;
    data: HKStatistics<TIdentifier, TUnit>[];
};
export type HKActivitySummary<TEnergyUnit extends EnergyUnit, TTimeUnit extends TimeUnit> = {
    startDate: string | Date;
    readonly activeEnergyBurned: HKQuantity<HKQuantityTypeIdentifier.activeEnergyBurned, TEnergyUnit>;
    readonly activeEnergyBurnedGoal: HKQuantity<HKQuantityTypeIdentifier.activeEnergyBurned, TEnergyUnit>;
    readonly appleMoveTime: HKQuantity<HKQuantityTypeIdentifier.appleMoveTime, TTimeUnit>;
    readonly appleMoveTimeGoal: HKQuantity<HKQuantityTypeIdentifier.appleMoveTime, TTimeUnit>;
    readonly appleExerciseTime: HKQuantity<HKQuantityTypeIdentifier.appleExerciseTime, TTimeUnit>;
    readonly appleExerciseTimeGoal: HKQuantity<HKQuantityTypeIdentifier.appleExerciseTime, TTimeUnit>;
    readonly exerciseTimeGoal: HKQuantity<HKQuantityTypeIdentifier.appleExerciseTime, TTimeUnit>;
    readonly appleStandHours: HKQuantity<HKQuantityTypeIdentifier, HKUnits.Count>;
    readonly standHoursGoal: HKQuantity<HKQuantityTypeIdentifier, HKUnits.Count>;
    readonly appleStandHoursGoal: HKQuantity<HKQuantityTypeIdentifier, HKUnits.Count>;
};
export type QueryActivitySummaryForQuantityRaw<TEnergyUnit extends EnergyUnit, TTimeUnit extends TimeUnit> = {
    queryId: string;
    data: HKActivitySummary<TEnergyUnit, TTimeUnit>[];
};
/**
 * https://developer.apple.com/documentation/healthkit/hkcategoryvaluecervicalmucusquality
 */
export declare enum HKCategoryValueCervicalMucusQuality {
    dry = 1,
    sticky = 2,
    creamy = 3,
    watery = 4,
    eggWhite = 5
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategoryvaluemenstrualflow
 */
export declare enum HKCategoryValueMenstrualFlow {
    unspecified = 1,
    none = 5,
    light = 2,
    medium = 3,
    heavy = 4
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategoryvalueovulationtestresult
 */
export declare enum HKCategoryValueOvulationTestResult {
    negative = 1,
    luteinizingHormoneSurge = 2,
    indeterminate = 3,
    estrogenSurge = 4
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategoryvaluesleepanalysis
 */
export declare enum HKCategoryValueSleepAnalysis {
    inBed = 0,
    asleepUnspecified = 1,
    awake = 2,
    asleepCore = 3,
    asleepDeep = 4,
    asleepREM = 5
}
/**
 * https://developer.apple.com/documentation/healthkit/hkcategoryvalueappetitechanges
 */
export declare enum HKCategoryValueAppetiteChanges {
    decreased = 2,
    increased = 3,
    noChange = 1,
    unspecified = 0
}
/**
 * https://developer.apple.com/documentation/healthkit/hkcategoryvaluepresence
 */
export declare enum HKCategoryValuePresence {
    notPresent = 1,
    present = 0
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategoryvalueseverity
 */
export declare enum HKCategoryValueSeverity {
    notPresent = 1,
    mild = 2,
    moderate = 3,
    severe = 4,
    unspecified = 0
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategoryvalue/notapplicable
 */
export declare enum HKCategoryValueNotApplicable {
    notApplicable = 0
}
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategoryvalue
 */
export type HKCategoryValue = HKCategoryValueAppetiteChanges | HKCategoryValueCervicalMucusQuality | HKCategoryValueLowCardioFitnessEvent | HKCategoryValueMenstrualFlow | HKCategoryValueOvulationTestResult | HKCategoryValuePresence | HKCategoryValueSeverity | HKCategoryValueSleepAnalysis | number;
/**
 * See https://developer.apple.com/documentation/healthkit/hkinsulindeliveryreason
 */
export declare enum HKInsulinDeliveryReason {
    basal = 1,
    bolus = 2
}
export type MetadataMapperForQuantityIdentifier<TQuantityTypeIdentifier = HKQuantityTypeIdentifier> = TQuantityTypeIdentifier extends HKQuantityTypeIdentifier.insulinDelivery ? HKGenericMetadata & {
    readonly HKInsulinDeliveryReason: HKInsulinDeliveryReason;
} : TQuantityTypeIdentifier extends HKQuantityTypeIdentifier.bloodGlucose ? HKGenericMetadata & {
    readonly HKBloodGlucoseMealTime?: number;
} : TQuantityTypeIdentifier extends HKQuantityTypeIdentifier.heartRate ? HKGenericMetadata & {
    readonly HKHeartRateMotionContext?: HKHeartRateMotionContext;
} : HKGenericMetadata;
export type MetadataMapperForCorrelationIdentifier<TCorrelationTypeIdentifier = HKCorrelationTypeIdentifier> = TCorrelationTypeIdentifier extends HKCorrelationTypeIdentifier.food ? HKGenericMetadata & {
    readonly HKFoodType?: string;
} : HKGenericMetadata;
export type UnitForIdentifier<T extends HKQuantityTypeIdentifier> = T extends HKQuantityTypeIdentifier.bloodGlucose ? BloodGlucoseUnit : T extends HKQuantityTypeIdentifier.appleExerciseTime | HKQuantityTypeIdentifier.appleMoveTime | HKQuantityTypeIdentifier.appleStandTime ? TimeUnit : T extends HKQuantityTypeIdentifier.activeEnergyBurned | HKQuantityTypeIdentifier.basalEnergyBurned | HKQuantityTypeIdentifier.dietaryEnergyConsumed ? EnergyUnit : T extends HKQuantityTypeIdentifier.distanceCycling | HKQuantityTypeIdentifier.distanceDownhillSnowSports | HKQuantityTypeIdentifier.distanceSwimming | HKQuantityTypeIdentifier.distanceWalkingRunning | HKQuantityTypeIdentifier.distanceWheelchair | HKQuantityTypeIdentifier.sixMinuteWalkTestDistance | HKQuantityTypeIdentifier.waistCircumference ? LengthUnit : T extends HKQuantityTypeIdentifier.bodyFatPercentage | HKQuantityTypeIdentifier.oxygenSaturation | HKQuantityTypeIdentifier.walkingAsymmetryPercentage | HKQuantityTypeIdentifier.walkingDoubleSupportPercentage ? HKUnits.Percent : T extends HKQuantityTypeIdentifier.basalBodyTemperature | HKQuantityTypeIdentifier.basalBodyTemperature ? TemperatureUnit : T extends HKQuantityTypeIdentifier.stairAscentSpeed | HKQuantityTypeIdentifier.stairDescentSpeed | HKQuantityTypeIdentifier.walkingSpeed | HKQuantityTypeIdentifier.walkingSpeed ? SpeedUnit<LengthUnit, TimeUnit> : T extends HKQuantityTypeIdentifier.flightsClimbed | HKQuantityTypeIdentifier.numberOfAlcoholicBeverages | HKQuantityTypeIdentifier.numberOfTimesFallen | HKQuantityTypeIdentifier.pushCount | HKQuantityTypeIdentifier.stepCount | HKQuantityTypeIdentifier.swimmingStrokeCount ? HKUnits.Count : T extends HKQuantityTypeIdentifier.dietaryBiotin | HKQuantityTypeIdentifier.dietaryCaffeine | HKQuantityTypeIdentifier.dietaryCalcium | HKQuantityTypeIdentifier.dietaryCarbohydrates | HKQuantityTypeIdentifier.dietaryChloride | HKQuantityTypeIdentifier.dietaryCholesterol | HKQuantityTypeIdentifier.dietaryChromium | HKQuantityTypeIdentifier.dietaryCopper | HKQuantityTypeIdentifier.dietaryFatMonounsaturated | HKQuantityTypeIdentifier.dietaryFatPolyunsaturated | HKQuantityTypeIdentifier.dietaryFatSaturated | HKQuantityTypeIdentifier.dietaryFatTotal | HKQuantityTypeIdentifier.dietaryFiber | HKQuantityTypeIdentifier.dietaryFolate | HKQuantityTypeIdentifier.dietaryIodine | HKQuantityTypeIdentifier.dietaryIodine | HKQuantityTypeIdentifier.dietaryIron | HKQuantityTypeIdentifier.dietaryMagnesium | HKQuantityTypeIdentifier.dietaryManganese | HKQuantityTypeIdentifier.dietaryMolybdenum | HKQuantityTypeIdentifier.dietaryNiacin | HKQuantityTypeIdentifier.dietaryPantothenicAcid | HKQuantityTypeIdentifier.dietaryPhosphorus | HKQuantityTypeIdentifier.dietaryPotassium | HKQuantityTypeIdentifier.dietaryProtein | HKQuantityTypeIdentifier.dietaryRiboflavin | HKQuantityTypeIdentifier.dietarySelenium | HKQuantityTypeIdentifier.dietarySodium | HKQuantityTypeIdentifier.dietarySugar | HKQuantityTypeIdentifier.dietaryThiamin | HKQuantityTypeIdentifier.dietaryVitaminA | HKQuantityTypeIdentifier.dietaryVitaminB6 | HKQuantityTypeIdentifier.dietaryVitaminB12 | HKQuantityTypeIdentifier.dietaryVitaminC | HKQuantityTypeIdentifier.dietaryVitaminD | HKQuantityTypeIdentifier.dietaryVitaminE | HKQuantityTypeIdentifier.dietaryVitaminK | HKQuantityTypeIdentifier.dietaryZinc ? MassUnit : T extends HKQuantityTypeIdentifier.dietaryWater ? VolumeUnit : T extends HKQuantityTypeIdentifier.insulinDelivery ? HKUnits.InternationalUnit | `${HKUnits.InternationalUnit}` : T extends HKQuantityTypeIdentifier.heartRate | HKQuantityTypeIdentifier.restingHeartRate | HKQuantityTypeIdentifier.walkingHeartRateAverage ? CountPerTime<TimeUnit> : HKUnit;
export type HKCategoryValueForIdentifier<T extends HKCategoryTypeIdentifier> = T extends HKCategoryTypeIdentifier.cervicalMucusQuality ? HKCategoryValueCervicalMucusQuality : T extends HKCategoryTypeIdentifier.menstrualFlow ? HKCategoryValueMenstrualFlow : T extends HKCategoryTypeIdentifier.ovulationTestResult ? HKCategoryValueOvulationTestResult : T extends HKCategoryTypeIdentifier.sleepAnalysis ? HKCategoryValueSleepAnalysis : T extends HKCategoryTypeIdentifier.highHeartRateEvent | HKCategoryTypeIdentifier.intermenstrualBleeding | HKCategoryTypeIdentifier.mindfulSession | HKCategoryTypeIdentifier.sexualActivity ? HKCategoryValueNotApplicable : T extends HKCategoryTypeIdentifier.abdominalCramps | HKCategoryTypeIdentifier.abdominalCramps | HKCategoryTypeIdentifier.acne | HKCategoryTypeIdentifier.bladderIncontinence | HKCategoryTypeIdentifier.bloating | HKCategoryTypeIdentifier.breastPain | HKCategoryTypeIdentifier.chestTightnessOrPain | HKCategoryTypeIdentifier.chills | HKCategoryTypeIdentifier.constipation | HKCategoryTypeIdentifier.coughing | HKCategoryTypeIdentifier.diarrhea | HKCategoryTypeIdentifier.dizziness | HKCategoryTypeIdentifier.drySkin | HKCategoryTypeIdentifier.fainting | HKCategoryTypeIdentifier.fatigue | HKCategoryTypeIdentifier.fever | HKCategoryTypeIdentifier.generalizedBodyAche | HKCategoryTypeIdentifier.hairLoss | HKCategoryTypeIdentifier.headache | HKCategoryTypeIdentifier.heartburn | HKCategoryTypeIdentifier.hotFlashes | HKCategoryTypeIdentifier.lossOfSmell | HKCategoryTypeIdentifier.lossOfTaste | HKCategoryTypeIdentifier.lowerBackPain | HKCategoryTypeIdentifier.memoryLapse | HKCategoryTypeIdentifier.moodChanges | HKCategoryTypeIdentifier.nausea | HKCategoryTypeIdentifier.nightSweats | HKCategoryTypeIdentifier.pelvicPain | HKCategoryTypeIdentifier.rapidPoundingOrFlutteringHeartbeat | HKCategoryTypeIdentifier.runnyNose | HKCategoryTypeIdentifier.shortnessOfBreath | HKCategoryTypeIdentifier.sinusCongestion | HKCategoryTypeIdentifier.skippedHeartbeat | HKCategoryTypeIdentifier.soreThroat | HKCategoryTypeIdentifier.vaginalDryness | HKCategoryTypeIdentifier.vomiting | HKCategoryTypeIdentifier.wheezing ? HKCategoryValueSeverity : T extends HKCategoryTypeIdentifier.appetiteChanges | HKCategoryTypeIdentifier.sleepChanges ? HKCategoryValuePresence : T extends HKCategoryTypeIdentifier.lowCardioFitnessEvent ? HKCategoryValueLowCardioFitnessEvent : T extends HKCategoryTypeIdentifier.pregnancyTestResult ? HKCategoryValuePregnancyTestResult : T extends HKCategoryTypeIdentifier.pregnancyTestResult ? HKCategoryValuePregnancyTestResult : T extends HKCategoryTypeIdentifier.appleStandHour ? HKCategoryValueAppleStandHour : number;
/**
 * See https://developer.apple.com/documentation/healthkit/hkcategoryvaluepregnancytestresult
 */
declare enum HKCategoryValuePregnancyTestResult {
    positive = 2,
    negative = 1,
    indeterminate = 3
}
export type HKHeartbeatSeriesSampleMetadata = HKGenericMetadata & {
    readonly HKMetadataKeyAlgorithmVersion: string;
};
export type MetadataMapperForCategoryIdentifier<T extends HKCategoryTypeIdentifier> = T extends HKCategoryTypeIdentifier.sexualActivity ? HKGenericMetadata & {
    readonly HKSexualActivityProtectionUsed: boolean;
} : T extends HKCategoryTypeIdentifier.menstrualFlow ? HKGenericMetadata & {
    readonly HKMenstrualCycleStart: boolean;
} : HKGenericMetadata;
export declare enum HKWheelchairUse {
    notSet = 0,
    no = 1,
    yes = 2
}
export declare enum HKMetricPrefix {
    None = "",
    Pico = "p",
    Nano = "n",
    Micro = "mc",
    Milli = "m",
    Centi = "c",
    Deci = "d",
    Deca = "da",
    Hecto = "h",
    Kilo = "k",
    Mega = "M",
    Giga = "G",
    Tera = "T",
    Femto = "f"
}
export declare enum HKUnitMetric {
    Gram = "g",
    Joule = "J",
    Kelvin = "K",
    Liter = "l",
    Meter = "m",
    Pascal = "Pa",
    Second = "s",
    Siemen = "S",
    Hertz = "Hz",
    Volt = "V"
}
export declare enum HKUnits {
    DecibelHearingLevel = "dBHL",
    DecibelSoundPressureLevel = "dBASPL",
    Percent = "%",
    Count = "count",
    InternationalUnit = "IU"
}
export type MeterUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Meter}`;
export type LiterUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Liter}`;
export type GramUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Gram}`;
export type PascalUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Pascal}`;
export type SecondUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Second}`;
export type JouleUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Joule}`;
export type HertzUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Hertz}`;
export type VoltUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Volt}`;
export type SiemenUnit<Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}${HKUnitMetric.Siemen}`;
export type MoleUnit<MolarMass extends number> = `mol<${MolarMass}>`;
export type MoleUnitWith<MolarMass extends number, Prefix extends HKMetricPrefix = HKMetricPrefix.None> = `${Prefix}mol<${MolarMass}>`;
export type FrequencyUnit = HertzUnit<HKMetricPrefix>;
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'cm', 'km'
 */
export declare enum UnitOfLength {
    Feet = "ft",
    /**
     * More SI prefixes also available as literals, just type the string
     * @example 'cm', 'km'
     */
    Meter = "m",
    Inches = "in",
    Yards = "yd",
    Miles = "mi"
}
export type LengthUnit = MeterUnit<HKMetricPrefix> | UnitOfLength;
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'ml', 'cl'
 */
export declare enum UnitOfVolume {
    ImperialCup = "cup_imp",
    ImperialFluidOunces = "fl_oz_imp",
    ImperialPint = "pt_imp",
    USCup = "cup_us",
    USFluidOunces = "fl_oz_us",
    USPint = "pt_us",
    /**
     * More SI prefixes also available as literals, just type the string
     * @example 'ml', 'cl'
     */
    Liter = "l"
}
export type VolumeUnit = LiterUnit<HKMetricPrefix> | UnitOfVolume;
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'mg', 'kg'
 */
export declare enum UnitOfMass {
    Ounces = "oz",
    Stones = "st",
    Pounds = "lb",
    /**
     * More SI prefixes also available as literals, just type the string
     * @example 'mg', 'kg'
     */
    Gram = "g"
}
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'mg', 'kg'
 */
export type MassUnit = GramUnit<HKMetricPrefix> | UnitOfMass;
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'kPa', 'hPa'
 */
export declare enum UnitOfPressure {
    Atmospheres = "atm",
    CentimetersOfWater = "cmAq",
    MillimetersOfMercury = "mmHg",
    InchesOfMercury = "inHg",
    DecibelAWeightedSoundPressureLevel = "dBASPL",
    /**
     * More SI prefixes also available as literals, just type the string
     * @example 'kPa', 'hPa'
     */
    Pascals = "Pa"
}
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'kPa', 'hPa'
 */
export type PressureUnit = PascalUnit<HKMetricPrefix> | UnitOfPressure;
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'ms'
 */
export declare enum UnitOfTime {
    Days = "d",
    Minutes = "min",
    Hours = "hr",
    /**
     * More SI prefixes also available as literals, just type the string
     * @example 'ms'
     */
    Seconds = "s"
}
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'ms'
 */
export type TimeUnit = SecondUnit<HKMetricPrefix> | UnitOfTime;
export declare enum TemperatureUnit {
    DegreesCelsius = "degC",
    DegreesFahrenheit = "degF",
    Kelvin = "K"
}
/**
 * More SI prefixes also available as literals, just type the string
 * @example 'kJ'
 */
export declare enum UnitOfEnergy {
    Kilocalories = "kcal",
    LargeCalories = "Cal",
    SmallCalories = "cal",
    /**
     * More SI prefixes also available as literals, just type the string
     * @example 'kJ'
     */
    Joules = "J"
}
export type EnergyUnit = JouleUnit<HKMetricPrefix> | UnitOfEnergy;
export declare enum BloodGlucoseUnit {
    GlucoseMmolPerL = "mmol<180.15588000005408>/l",
    GlucoseMgPerDl = "mg/dL"
}
export type SpeedUnit<TLength extends LengthUnit, TTime extends TimeUnit> = `${TLength}/${TTime}`;
export type CountPerTime<TTime extends TimeUnit> = `count/${TTime}`;
export type HKUnit = BloodGlucoseUnit | CountPerTime<TimeUnit> | EnergyUnit | FrequencyUnit | HKUnits | LengthUnit | MassUnit | PressureUnit | SpeedUnit<LengthUnit, TimeUnit> | TemperatureUnit | TimeUnit | VolumeUnit | `${BloodGlucoseUnit}` | `${EnergyUnit}` | `${FrequencyUnit}` | `${HKUnits}` | `${LengthUnit}` | `${MassUnit}` | `${PressureUnit}` | `${TemperatureUnit}` | `${TimeUnit}` | `${VolumeUnit}`;
/**
 * See https://developer.apple.com/documentation/healthkit/hkdevice
 */
export type HKDevice = {
    readonly name: string;
    readonly firmwareVersion: string | null;
    readonly hardwareVersion: string;
    readonly localIdentifier: string | null;
    readonly manufacturer: string;
    readonly model: string;
    readonly softwareVersion: string;
    readonly udiDeviceIdentifier: string | null;
};
/**
 * See https://developer.apple.com/documentation/healthkit/hkobject/1615781-source
 */
export type HKSource = {
    readonly name: string;
    readonly bundleIdentifier: string;
};
/**
 * See https://developer.apple.com/documentation/healthkit/hkobject/1615483-sourcerevision
 */
export type HKSourceRevision = {
    readonly source: HKSource;
    readonly version: string;
    readonly operatingSystemVersion?: string;
    readonly productType?: string;
};
/**
 * See https://developer.apple.com/documentation/healthkit/hkquantitysample
 */
export type HKQuantitySampleRaw<TQuantityIdentifier extends HKQuantityTypeIdentifier = HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TQuantityIdentifier> = UnitForIdentifier<TQuantityIdentifier>> = {
    readonly uuid: string;
    readonly device?: HKDevice;
    readonly quantityType: TQuantityIdentifier;
    readonly startDate: string;
    readonly endDate: string;
    readonly quantity: number;
    readonly unit: TUnit;
    readonly metadata: MetadataMapperForQuantityIdentifier<TQuantityIdentifier>;
    readonly sourceRevision?: HKSourceRevision;
};
export type HKHeartbeatRaw = {
    readonly timeSinceSeriesStart: number;
    readonly precededByGap: boolean;
};
export type HKHeartbeatSeriesSampleRaw = {
    readonly uuid: string;
    readonly device?: HKDevice;
    readonly startDate: string;
    readonly endDate: string;
    readonly heartbeats: readonly HKHeartbeatRaw[];
    readonly metadata?: HKHeartbeatSeriesSampleMetadata;
    readonly sourceRevision?: HKSourceRevision;
};
export type HKQuantitySampleRawForSaving<TQuantityIdentifier extends HKQuantityTypeIdentifier = HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TQuantityIdentifier> = UnitForIdentifier<TQuantityIdentifier>> = Omit<HKQuantitySampleRaw<TQuantityIdentifier, TUnit>, 'device' | 'endDate' | 'startDate' | 'uuid'>;
export type HKCategorySampleRawForSaving<TCategory extends HKCategoryTypeIdentifier = HKCategoryTypeIdentifier> = Omit<HKCategorySampleRaw<TCategory>, 'device' | 'endDate' | 'startDate' | 'uuid'>;
export type HKWorkoutRaw<TEnergy extends EnergyUnit, TDistance extends LengthUnit> = {
    readonly uuid: string;
    readonly device?: HKDevice;
    readonly workoutActivityType: HKWorkoutActivityType;
    readonly duration: number;
    readonly totalDistance?: HKQuantity<HKQuantityTypeIdentifier, TDistance>;
    readonly totalEnergyBurned?: HKQuantity<HKQuantityTypeIdentifier, TEnergy>;
    readonly totalSwimmingStrokeCount?: HKQuantity<HKQuantityTypeIdentifier, HKUnits.Count>;
    readonly totalFlightsClimbed?: HKQuantity<HKQuantityTypeIdentifier, HKUnits.Count>;
    readonly startDate: string;
    readonly endDate: string;
    readonly metadata?: HKWorkoutMetadata;
    readonly sourceRevision?: HKSourceRevision;
};
export declare enum HKCharacteristicTypeIdentifier {
    fitzpatrickSkinType = "HKCharacteristicTypeIdentifierFitzpatrickSkinType",
    biologicalSex = "HKCharacteristicTypeIdentifierBiologicalSex",
    bloodType = "HKCharacteristicTypeIdentifierBloodType",
    dateOfBirth = "HKCharacteristicTypeIdentifierDateOfBirth",
    wheelchairUse = "HKCharacteristicTypeIdentifierWheelchairUse",
    activityMoveMode = "HKCharacteristicTypeIdentifierActivityMoveMode"
}
export type WritePermissions = {
    readonly [key in HKCategoryTypeIdentifier | HKCharacteristicTypeIdentifier | HKQuantityTypeIdentifier]: boolean;
};
export type ReadPermissions = {
    readonly [key in HKCategoryTypeIdentifier | HKCharacteristicTypeIdentifier | HKQuantityTypeIdentifier]: boolean;
};
export type HKCategorySampleRaw<T extends HKCategoryTypeIdentifier = HKCategoryTypeIdentifier> = {
    readonly uuid: string;
    readonly device?: HKDevice;
    readonly categoryType: T;
    readonly startDate: string;
    readonly endDate: string;
    readonly value: HKCategoryValueForIdentifier<T>;
    readonly metadata: MetadataMapperForCategoryIdentifier<T>;
    readonly sourceRevision?: HKSourceRevision;
};
export type DeletedCategorySampleRaw<T extends HKCategoryTypeIdentifier> = {
    readonly uuid: string;
    readonly metadata: MetadataMapperForCategoryIdentifier<T>;
};
export type DeletedHeartbeatSeriesSampleRaw = {
    readonly uuid: string;
    readonly metadata: HKHeartbeatSeriesSampleMetadata;
};
export type DeletedQuantitySampleRaw<T extends HKQuantityTypeIdentifier> = {
    readonly uuid: string;
    readonly metadata: MetadataMapperForQuantityIdentifier<T>;
};
export type DeletedWorkoutSampleRaw = {
    readonly uuid: string;
    readonly metadata: HKWorkoutMetadata;
};
export type QueryCategorySamplesResponseRaw<T extends HKCategoryTypeIdentifier> = {
    readonly samples: readonly HKCategorySampleRaw<T>[];
    readonly deletedSamples: readonly DeletedCategorySampleRaw<T>[];
    readonly newAnchor: string;
};
export type QueryHeartbeatSeriesSamplesResponseRaw = {
    readonly samples: readonly HKHeartbeatSeriesSampleRaw[];
    readonly deletedSamples: readonly DeletedHeartbeatSeriesSampleRaw[];
    readonly newAnchor: string;
};
export type QueryQuantitySamplesResponseRaw<T extends HKQuantityTypeIdentifier> = {
    readonly samples: readonly HKQuantitySampleRaw<T>[];
    readonly deletedSamples: readonly DeletedQuantitySampleRaw<T>[];
    readonly newAnchor: string;
};
export type HKCorrelationRaw<TIdentifier extends HKCorrelationTypeIdentifier> = {
    readonly correlationType: HKCorrelationTypeIdentifier;
    readonly objects: readonly (HKCategorySampleRaw | HKQuantitySampleRaw)[];
    readonly metadata: MetadataMapperForCorrelationIdentifier<TIdentifier>;
    readonly startDate: string;
    readonly endDate: string;
};
type QueryId = string;
/** See https://developer.apple.com/documentation/healthkit/hkupdatefrequency */
export declare enum HKUpdateFrequency {
    immediate = 1,
    hourly = 2,
    daily = 3,
    weekly = 4
}
export type WorkoutLocation = {
    readonly longitude: number;
    readonly latitude: number;
    readonly altitude: number;
    readonly speed: number;
    readonly timestamp: number;
    readonly horizontalAccuracy: number;
    readonly speedAccuracy: number;
    readonly verticalAccuracy: number;
    readonly distance: number | null;
};
export type WorkoutRoute = {
    readonly locations: readonly WorkoutLocation[];
    readonly HKMetadataKeySyncIdentifier?: string;
    readonly HKMetadataKeySyncVersion?: number;
};
type ReactNativeHealthkitTypeNative = {
    /** See https://developer.apple.com/documentation/healthkit/hkhealthstore/1614180-ishealthdataavailable */
    isHealthDataAvailable(): Promise<boolean>;
    canAccessProtectedData(): Promise<boolean>;
    getBloodType(): Promise<HKBloodType>;
    getDateOfBirth(): Promise<string>;
    getBiologicalSex(): Promise<HKBiologicalSex>;
    getFitzpatrickSkinType(): Promise<HKFitzpatrickSkinType>;
    readonly getWheelchairUse: () => Promise<HKWheelchairUse>;
    /** See https://developer.apple.com/documentation/healthkit/hkhealthstore/1614175-enablebackgrounddelivery */
    readonly enableBackgroundDelivery: (typeIdentifier: HKSampleTypeIdentifier, updateFrequency: HKUpdateFrequency) => Promise<boolean>;
    /** https://developer.apple.com/documentation/healthkit/hkhealthstore/1614177-disablebackgrounddelivery */
    readonly disableBackgroundDelivery: (typeIdentifier: HKSampleTypeIdentifier) => Promise<boolean>;
    /** See https://developer.apple.com/documentation/healthkit/hkhealthstore/1614158-disableallbackgrounddelivery */
    readonly disableAllBackgroundDelivery: () => Promise<boolean>;
    readonly saveCorrelationSample: <TIdentifier extends HKCorrelationTypeIdentifier, TSamples extends readonly (HKCategorySampleRawForSaving | HKQuantitySampleRawForSaving)[]>(typeIdentifier: TIdentifier, samples: TSamples, start: string, end: string, metadata: MetadataMapperForCorrelationIdentifier<TIdentifier>) => Promise<boolean>;
    readonly saveWorkoutSample: (typeIdentifier: HKWorkoutActivityType, quantities: readonly HKQuantitySampleRawForSaving[], start: string, end: string, metadata: HKWorkoutMetadata) => Promise<boolean>;
    readonly queryCorrelationSamples: <TIdentifier extends HKCorrelationTypeIdentifier>(typeIdentifier: TIdentifier, from: string, to: string) => Promise<readonly HKCorrelationRaw<TIdentifier>[]>;
    subscribeToObserverQuery(identifier: HKSampleTypeIdentifier): Promise<QueryId>;
    unsubscribeQuery(queryId: QueryId): Promise<boolean>;
    /** See https://developer.apple.com/documentation/healthkit/hkhealthstore/1614154-authorizationstatus */
    authorizationStatusFor(type: HealthkitReadAuthorization): Promise<HKAuthorizationStatus>;
    /** See https://developer.apple.com/documentation/healthkit/hkhealthstore/2994346-getrequeststatusforauthorization */
    getRequestStatusForAuthorization(write: WritePermissions, read: ReadPermissions): Promise<HKAuthorizationRequestStatus>;
    /** See https://developer.apple.com/documentation/healthkit/hkhealthstore/1614152-requestauthorization */
    requestAuthorization(write: WritePermissions, read: ReadPermissions): Promise<boolean>;
    readonly saveQuantitySample: <TType extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TType> = UnitForIdentifier<TType>>(identifier: TType, unit: TUnit, value: number, start: string, end: string, metadata: unknown) => Promise<boolean>;
    readonly deleteQuantitySample: <TIdentifier extends HKQuantityTypeIdentifier>(typeIdentifier: TIdentifier, uuid: string) => Promise<boolean>;
    readonly deleteSamples: <TIdentifier extends HKQuantityTypeIdentifier>(identifier: TIdentifier, start: string, end: string) => Promise<boolean>;
    readonly queryWorkoutSamples: <TEnergy extends EnergyUnit, TDistance extends LengthUnit>(energyUnit: TEnergy, distanceUnit: TDistance, from: string, to: string, limit: number, ascending: boolean) => Promise<readonly HKWorkoutRaw<TEnergy, TDistance>[]>;
    readonly queryWorkoutSamplesWithAnchor: <TEnergy extends EnergyUnit, TDistance extends LengthUnit>(energyUnit: TEnergy, distanceUnit: TDistance, from: string, to: string, limit: number, anchor: string) => Promise<{
        samples: readonly HKWorkoutRaw<TEnergy, TDistance>[];
        deletedSamples: readonly DeletedWorkoutSampleRaw[];
        newAnchor: string;
    }>;
    readonly queryCategorySamples: <T extends HKCategoryTypeIdentifier>(identifier: T, from: string, to: string, limit: number, ascending: boolean) => Promise<readonly HKCategorySampleRaw<T>[]>;
    readonly queryQuantitySamples: <TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>>(identifier: TIdentifier, unit: TUnit, from: string, to: string, limit: number, ascending: boolean) => Promise<readonly HKQuantitySampleRaw<TIdentifier>[]>;
    readonly queryCategorySamplesWithAnchor: <T extends HKCategoryTypeIdentifier>(identifier: T, from: string, to: string, limit: number, anchor: string) => Promise<QueryCategorySamplesResponseRaw<T>>;
    readonly queryQuantitySamplesWithAnchor: <TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>>(identifier: TIdentifier, unit: TUnit, from: string, to: string, limit: number, anchor: string) => Promise<QueryQuantitySamplesResponseRaw<TIdentifier>>;
    readonly queryHeartbeatSeriesSamples: (from: string, to: string, limit: number, ascending: boolean) => Promise<readonly HKHeartbeatSeriesSampleRaw[]>;
    readonly queryHeartbeatSeriesSamplesWithAnchor: (from: string, to: string, limit: number, anchor: string) => Promise<QueryHeartbeatSeriesSamplesResponseRaw>;
    readonly querySources: <TIdentifier extends HKCategoryTypeIdentifier | HKQuantityTypeIdentifier>(identifier: TIdentifier) => Promise<readonly HKSource[]>;
    readonly saveCategorySample: <T extends HKCategoryTypeIdentifier>(identifier: T, value: HKCategoryValueForIdentifier<T>, start: string, end: string, metadata: unknown) => Promise<boolean>;
    readonly queryStatisticsForQuantity: <TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>>(identifier: HKQuantityTypeIdentifier, unit: TUnit, from: string, to: string, options: readonly HKStatisticsOptions[]) => Promise<QueryStatisticsResponseRaw<TIdentifier, TUnit>>;
    readonly queryStatisticsCollectionForQuantity: <TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>>(identifier: HKQuantityTypeIdentifier, unit: TUnit, from: string, to: string, options: readonly HKStatisticsOptions[], subscribe: boolean) => Promise<QueryStatisticsCollectionResponseRaw<TIdentifier, TUnit>>;
    readonly queryActivitySummaryForQuantity: <TEnergyUnit extends EnergyUnit, TTimeUnit extends TimeUnit>(energyUnit: TEnergyUnit, timeUnit: TTimeUnit, from: string, to: string, subscribe: boolean) => Promise<QueryActivitySummaryForQuantityRaw<TEnergyUnit, TTimeUnit>>;
    readonly getPreferredUnits: (identifiers: readonly HKQuantityTypeIdentifier[]) => Promise<TypeToUnitMapping>;
    readonly getWorkoutRoutes: (workoutUUID: string) => Promise<readonly WorkoutRoute[]>;
};
declare const Native: ReactNativeHealthkitTypeNative;
export type EventCallback = {
    onChange: (res: {
        readonly typeIdentifier: HKSampleTypeIdentifier;
    }) => void;
    onStatsCollectionUpdate: <TIdentifier extends HKQuantityTypeIdentifier, TUnit extends UnitForIdentifier<TIdentifier>>(res: {
        queryId: string;
        data: {
            stats: HKStatistics<TIdentifier, TUnit>;
            statsCollection: HKStatistics<TIdentifier, TUnit>[];
        };
    }) => void;
    onActivitySummaryUpdate: <TEnergyUnit extends EnergyUnit, TTimeUnit extends TimeUnit>(res: {
        queryId: string;
        data: HKActivitySummary<TEnergyUnit, TTimeUnit>[];
    }) => void;
};
interface HealthkitEventEmitter extends NativeEventEmitter {
    addListener<T extends keyof EventCallback, C = EventCallback[T]>(eventType: T, callback: C): EmitterSubscription;
}
export declare const EventEmitter: HealthkitEventEmitter;
export default Native;
