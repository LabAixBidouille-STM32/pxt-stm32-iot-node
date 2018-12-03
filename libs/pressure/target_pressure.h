#include "pxt.h"
#include "Pin.h"
#include "I2C.h"
#include "STM32IotNodePressure.h"
#include "AnalogSensor.h"

namespace pxt {
class WPres {
  public:
    codal::STM32IotNodePressure sensor;
    WPres(): sensor()
    {
    }
};
}