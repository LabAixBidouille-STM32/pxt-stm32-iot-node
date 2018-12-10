#include "pxt.h"
#include "axis.h"
#include "Pin.h"
#include "I2C.h"
#include "CoordinateSystem.h"


#ifdef CODAL_ACCELEROMETER

#ifdef CODAL_ACCELEROMETER_HEADER
#include CODAL_ACCELEROMETER_HEADER
#endif

#else
#include "LIS3DH.h"
#define CODAL_ACCELEROMETER codal::LIS3DH
#endif

namespace pxt {

// Wrapper classes
class WAccel {
    CoordinateSpace space;
  public:
    CODAL_ACCELEROMETER acc;
    WAccel()
        : space(ACC_SYSTEM, ACC_UPSIDEDOWN, ACC_ROTATION),
          acc(space)
    {
        acc.init();        
    }
};
}