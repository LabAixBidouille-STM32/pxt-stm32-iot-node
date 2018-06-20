#include "pxt.h"

using namespace pxt;

/**
 * Support for additional Bluetooth services.
 */
//% color=#0082FB weight=96 icon="\uf294"
namespace bluetooth {

    /**
    *  Starts the Bluetooth accelerometer service
    */
    //% help=bluetooth/start-accelerometer-service
    //% blockId=bluetooth_start_accelerometer_service block="bluetooth accelerometer service"
    //% parts="bluetooth" weight=90 blockGap=8
    void startAccelerometerService() {       
    }   

    /**
    *  Starts the Bluetooth button service
    */
    //% help=bluetooth/start-button-service
    //% blockId=bluetooth_start_button_service block="bluetooth button service" blockGap=8
    //% parts="bluetooth" weight=89
    void startButtonService() {     
    }

    /**
    *  Starts the Bluetooth IO pin service.
    */
    //% help=bluetooth/start-io-pin-service
    //% blockId=bluetooth_start_io_pin_service block="bluetooth io pin service" blockGap=8
    //% parts="bluetooth" weight=88
    void startIOPinService() {
    }

    /**
    *  Starts the Bluetooth LED service
    */
    //% help=bluetooth/start-led-service
    //% blockId=bluetooth_start_led_service block="bluetooth led service" blockGap=8
    //% parts="bluetooth" weight=87
    void startLEDService() {
    }

    /**
    *  Starts the Bluetooth temperature service
    */
    //% help=bluetooth/start-temperature-service
    //% blockId=bluetooth_start_temperature_service block="bluetooth temperature service" blockGap=8
    //% parts="bluetooth" weight=86
    void startTemperatureService() {            
    }

    /**
    *  Starts the Bluetooth magnetometer service
    */
    //% help=bluetooth/start-magnetometer-service
    //% blockId=bluetooth_start_magnetometer_service block="bluetooth magnetometer service"
    //% parts="bluetooth" weight=85
    void startMagnetometerService() {    
    }  

    /**
    * Registers an event to be fired when one of the delimiter is matched.
    * @param delimiters the characters to match received characters against.
    */
    //% help=bluetooth/on-uart-data-received
    //% weight=18 blockId=bluetooth_on_data_received block="bluetooth|on data received %delimiters=serial_delimiter_conv"
    void onUartDataReceived(StringData* delimiters, Action body) {
    }

    /**
     * Register code to run when the micro:bit is connected to over Bluetooth
     * @param body Code to run when a Bluetooth connection is established
     */
    //% help=bluetooth/on-bluetooth-connected weight=20
    //% blockId=bluetooth_on_connected block="on bluetooth connected" blockGap=8
    //% parts="bluetooth"
    void onBluetoothConnected(Action body) {
    }    

     /**
     * Register code to run when a bluetooth connection to the micro:bit is lost
     * @param body Code to run when a Bluetooth connection is lost
     */
    //% help=bluetooth/on-bluetooth-disconnected weight=19
    //% blockId=bluetooth_on_disconnected block="on bluetooth disconnected"
    //% parts="bluetooth"
    void onBluetoothDisconnected(Action body) {
    } 

    /**
    * Sets the bluetooth transmit power between 0 (minimal) and 7 (maximum).
    * @param power power level between 0 (minimal) and 7 (maximum), eg: 7.
    */
    //% parts=bluetooth weight=5 help=bluetooth/set-transmit-power advanced=true
    //% blockId=bluetooth_settransmitpower block="bluetooth set transmit power %power"
    void setTransmitPower(int power) {
    }
}