# Getting Started

### Step 1 @fullscreen

Welcome, let's get started by making the led blink! Drag a ``||digital write pin||`` block from the ``Pin`` drawer into the ``||forever||`` block.

Hint:

```blocks
forever(() => {
    pins.LED.digitalWrite(true)
})
```

### Step 2

Next, drag another ``||digital write pin||`` block from the ``Pin`` drawer, place it below the first block, and change the selected color. Click the Hint button if you need help!

```blocks
forever(() => {
pins.LED.digitalWrite(true)
pins.LED.digitalWrite(false)
})
```

### Step 3

Open the ``Loops`` drawer and drag a ``||pause||`` block between the two ``||digital write pin||`` blocks. Set its argument to `1000`.

```blocks
forever(() => {
    pins.LED.digitalWrite(true)
    pause(1000)
    pins.LED.digitalWrite(false)
})
```

### Step 4

Open the ``Loops`` drawer and drag another ``||pause||`` below the two ``||digital write pin||`` blocks. Set its argument to `1000` as well.

```blocks
forever(() => {
    pins.LED.digitalWrite(true)
    pause(1000)
    pins.LED.digitalWrite(false)
    pause(1000)
})
```

### Step 6

If you have a @boardname@, connect a USB cable to it and click ``|Download|``. Save the program to the **@drivename@** drive. This transfers your code to the @boardname@!



## Step 7

Well done! You've completed your first Microsoft MakeCode activity.
