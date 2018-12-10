#include "pxt.h"
#include "Pin.h"
#include "I2C.h"
#include "STM32IotNodeDistance.h"
#include "AnalogSensor.h"

namespace pxt {
class WDistance {
  public:
    codal::STM32IotNodeDistance sensor;
    WDistance(): sensor()
    {
    }
};
}