#include "pxt.h"
#include "axis.h"
#include "Pin.h"
#include "I2C.h"
#include "CoordinateSystem.h"
#include "STM32IotNodeGyroscope.h"

namespace pxt {

// Wrapper classes
class WGyro {
    CoordinateSpace space;
  public:
    codal::STM32IotNodeGyroscope gyroscope;
    WGyro()
        : space(ACC_SYSTEM, ACC_UPSIDEDOWN, ACC_ROTATION),
          gyroscope(space)
    {
    }
};
}