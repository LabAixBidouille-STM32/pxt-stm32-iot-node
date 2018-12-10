#include "pxt.h"
#include "axis.h"
#include "Pin.h"
#include "I2C.h"
#include "CoordinateSystem.h"
#include "STM32IotNodeMagnetometer.h"

namespace pxt {

// Wrapper classes
class WCompas {
    CoordinateSpace space;
  public:
    codal::STM32IotNodeMagnetometer magnetometer;
    WCompas()
        : space(ACC_SYSTEM, ACC_UPSIDEDOWN, ACC_ROTATION),
          magnetometer(space)
    {
    }
};
}