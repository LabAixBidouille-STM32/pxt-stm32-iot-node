#include "pxt.h"

namespace pxt {

static void initRandomSeed() {
    int seed = 0xC0DA1;
    seedRandom(seed);
}

static void initSwdPins() {
}


void platform_init() {
    initSwdPins();
    initRandomSeed();
}

void cpu_clock_init() {
    // missing in Codal
}

}
