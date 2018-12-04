// Auto-generated. Do not edit.
declare namespace jacdac {

    /**
     * Starts the JacDac protocol
     */
    //% parts=jacdac shim=jacdac::start
    function start(): void;

    /**
     * Starts the JacDac protocol
     */
    //% parts=jacdac shim=jacdac::stop
    function stop(): void;

    /**
     * Indicates if JacDac is running
     */
    //% parts=jacdac shim=jacdac::isRunning
    function isRunning(): boolean;

    /**
     * Clears any existing bridge
     */
    //% parts=jacdac shim=jacdac::clearBridge
    function clearBridge(): void;

    /**
     * Gets a snapshot of the drivers registered on the bus. Array of JDDevice
     */
    //% parts=jacdac shim=jacdac::__internalDrivers
    function __internalDrivers(): Buffer;

    /**
    Internal
     */
    //% parts=jacdac shim=jacdac::__internalAddDriver
    function __internalAddDriver(driverType: int32, driverClass: int32, methods: MethodCollection, controlData: Buffer): JacDacDriverStatus;

    /**
     * Internal
     */
    //% parts=jacdac shim=jacdac::__internalSendPacket
    function __internalSendPacket(buf: Buffer, deviceAddress: int32): int32;
}


declare interface JacDacDriverStatus {
    /**
     * Returns the JDDevice instance
     */
    //% property shim=JacDacDriverStatusMethods::device
    device: Buffer;

    /** Check if driver is connected. */
    //% property shim=JacDacDriverStatusMethods::isConnected
    isConnected: boolean;

    /** Get device id for events. */
    //% property shim=JacDacDriverStatusMethods::id
    id: uint32;

    /** If paired, paired instance address */
    //% property shim=JacDacDriverStatusMethods::isPairedInstanceAddress
    isPairedInstanceAddress(address: uint8): boolean;

    /**
     * Set driver as bridge
     */
    //% shim=JacDacDriverStatusMethods::setBridge
    setBridge(): void;
}

// Auto-generated. Do not edit. Really.
