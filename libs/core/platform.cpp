#include "pxt.h"

namespace pxt {

static void initRandomSeed() {
    int seed = 0xC0DA1;
    seedRandom(seed);
}

static codal::_mbed::Serial *serial;
void platformSendSerial(const char *data, int len) {
    if (!serial) {
        serial = new codal::_mbed::Serial(SERIAL_TX, SERIAL_RX);
        serial->baud(9600);
    }
    serial->send((uint8_t*)data, len);
}


void platform_init() {
    initRandomSeed();
    setSendToUART(platformSendSerial);
}

}

void cpu_clock_init() {
    
}