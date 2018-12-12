#ifndef __PXT_PLATFORM_H
#define __PXT_PLATFORM_H

#include "Image.h"
#include "MultiButton.h"
#include "CodalCompat.h"
#include "stm32l4xxSPI.h"
#include "stm32l4xxI2C.h"
#include "stm32l4xxPin.h"
#include "stm32l4xxTimer.h"

#include "pinmap.h"

#define PAGE_SIZE 1024 // not really

#define DEV_NUM_PINS 64

#define DEV_PWM_PINS 0b1111011111110001110111001111011100000001111000000000000000001111ULL
#define DEV_AIN_PINS 0b1111111100000000110000000000000011111100000000000000000000000000ULL
            
// Codal doesn't yet distinguish between PWM and AIN
#define DEV_ANALOG_PINS (DEV_PWM_PINS | DEV_AIN_PINS)

#define CODAL_MBED codal
#define CODAL_SPI codal::STM32L4xxSPI
#define CODAL_I2C codal::STM32L4xxI2C
#define CODAL_PIN codal::STM32L4xxPin
#define CODAL_TIMER codal::STM32L4xxTimer
#define CODAL_SERIAL codal::STM32L4xxSimpleSerial

#define CODAL_ACCELEROMETER codal::STM32IotNodeAccelerometer
#define CODAL_ACCELEROMETER_HEADER "STM32IotNodeAccelerometer.h"

#define PERF_NOW() (TIM5->CNT)

#define IMAGE_BITS 4
/* 
 * @param nominalValue The value (in SI units) of a nominal position.
 * @param nominalReading The raw reading from the sensor at the nominal position.
 * @param beta The Steinhart-Hart Beta constant for the device
 * @param seriesResistor The value (in ohms) of the resistor in series with the sensor.
 * @param zeroOffset Optional zero offset applied to all SI units (e.g. 273.15 for temperature
 * sensing in C vs Kelvin).
 */

#define TEMPERATURE_NOMINAL_VALUE 25
#define TEMPERATURE_NOMINAL_READING 10000
#define TEMPERATURE_BETA 3380
#define TEMPERATURE_SERIES_RESISTOR 10000
#define TEMPERATURE_ZERO_OFFSET 273.5

#define LIGHTSENSOR_SENSITIVITY 868 // codal has 912 now
#define LIGHTSENSOR_LOW_THRESHOLD 128
#define LIGHTSENSOR_HIGH_THRESHOLD 896

#ifndef IMAGE_BITS
#define IMAGE_BITS 1
#endif

#ifdef JUST_FOR_DAL_D_TS_CPP_WILL_IGNORE
#define PA_0 0
#define PA_1 1
#define PA_2 2
#define PA_3 3
#define PA_4 4
#define PA_5 5
#define PA_6 6
#define PA_7 7
#define PA_8 8
#define PA_9 9
#define PA_10 10
#define PA_11 11
#define PA_12 12
#define PA_13 13
#define PA_14 14
#define PA_15 15

#define PB_0 16
#define PB_1 17
#define PB_2 18
#define PB_3 19
#define PB_4 20
#define PB_5 21
#define PB_6 22
#define PB_7 23
#define PB_8 24
#define PB_9 25
#define PB_10 26
#define PB_11 27
#define PB_12 28
#define PB_13 29
#define PB_14 30
#define PB_15 31

#define PC_0 32
#define PC_1 33
#define PC_2 34
#define PC_3 35
#define PC_4 36
#define PC_5 37
#define PC_6 38
#define PC_7 39
#define PC_8 40
#define PC_9 41
#define PC_10 42
#define PC_11 43
#define PC_12 44
#define PC_13 45
#define PC_14 46
#define PC_15 47

#define PD_0 48
#define PD_1 49
#define PD_2 50
#define PD_3 51
#define PD_4 52
#define PD_5 53
#define PD_6 54
#define PD_7 55
#define PD_8 56
#define PD_9 57
#define PD_10 58
#define PD_11 59
#define PD_12 60
#define PD_13 61
#define PD_14 62
#define PD_15 63

#define PE_0 64
#define PE_1 65
#define PE_2 66
#define PE_3 67
#define PE_4 68
#define PE_5 69
#define PE_6 70
#define PE_7 71
#define PE_8 72
#define PE_9 73
#define PE_10 74
#define PE_11 75
#define PE_12 76
#define PE_13 77
#define PE_14 78
#define PE_15 79

#define PH_0 128
#define PH_1 129

#endif

#endif
