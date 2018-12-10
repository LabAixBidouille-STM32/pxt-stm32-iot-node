#include "pxt.h"
#include "stm32l4xxSimpleSerial.h"
#include "stm32l4xxI2C.h"

namespace pxt {

static codal::STM32L4xxSimpleSerial *serial;
static codal::STM32L4xxI2C *i2c2;

static void initRandomSeed() {
    int seed = 0xC0DA1;
    seedRandom(seed);
}

void platformSendSerial(const char *data, int len) {
    
    if (!serial) {
        serial = new STM32L4xxSimpleSerial(*LOOKUP_PIN(RX), *LOOKUP_PIN(TX)) ;
        serial->init();
    }
    serial->send((uint8_t*)data, len);
}

void platform_init() {
    initRandomSeed();
    setSendToUART(platformSendSerial);
    i2c2 = new STM32L4xxI2C(*LOOKUP_PIN(ACCELEROMETER_SDA), *LOOKUP_PIN(ACCELEROMETER_SCL));
    i2c2->init();
    codal::default_i2c_sensors_bus = i2c2->getHandle();
}

}

void cpu_clock_init() {
   devTimer.init(); 
}