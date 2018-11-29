#include "pxt.h"
#include "Pin.h"
#include "I2C.h"
#include "STM32IotNodeHumidity.h"
#include "AnalogSensor.h"

namespace pxt {
class WHum {
  public:
    codal::STM32IotNodeHumidity sensor;
    WHum(): sensor()
    {
    }
};
}