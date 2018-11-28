#include "pxt.h"
#include "Pin.h"
#include "I2C.h"
#include "STM32IotNodeTemperature.h"
#include "AnalogSensor.h"

namespace pxt {
class WTemp {
  public:
    codal::STM32IotNodeTemperature sensor;
    WTemp(): sensor()
    {
    }
};
}