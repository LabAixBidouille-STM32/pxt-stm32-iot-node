# Magic Glow

Control the brightness of an LED with a light sensor.

```blocks
forever(function () {
    let brightness = pins.A1.analogRead();
    pins.D5.analogWrite(brightness);
})
```

```package
stm32-iot-node
```