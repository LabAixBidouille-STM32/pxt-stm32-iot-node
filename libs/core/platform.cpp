#include "pxt.h"
#include "stm32l4xxSimpleSerial.h"

namespace pxt {

static void initRandomSeed() {
    int seed = 0xC0DA1;
    seedRandom(seed);
}

static codal::SimpleSerial *serial;

void platformSendSerial(const char *data, int len) {
    
    if (!serial) {
        serial = new STM32L4xxSimpleSerial(*LOOKUP_PIN(RX), *LOOKUP_PIN(TX)) ;
        
    }
    serial->send((uint8_t*)data, len);
}

void platform_init() {
    initRandomSeed();
    setSendToUART(platformSendSerial);
}

}

void cpu_clock_init() {
   devTimer.init(); 
}