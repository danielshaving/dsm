---
title: Using iOS CoreMotion to call gyroscope and accelerometer
categories: [iOS, CoreMotion, Gyroscope, Accelerometer]
tag: Gyroscope and accelerometer of iOS
abstract: This article is to introduce the API of gyroscope and acceleromter for developping an iOS applcation. iOS developers will know how to use these meters after reading this blog.
titleimg: /dsm/img/201410/AcceGyro.png
---
### 1. CoreMotion Framework
Core Motion reports motion- and environment-related data from the onboard hardware of iOS devices, including from the accelerometers and gyroscopes, and from the pedometer, magnetometer, and barometer. You use this framework to access hardware-generated data so that you can use it in your app. For example, a game might use accelerometer and gyroscope data to control onscreen game behavior.

You may access this Framework in the following scenarios of one application:
* Navigation or orientation in a map-kit function, to help the user get known of his orientation.
* Sporting applications to record the distance of a user's displacement.
* Rotate MVC and responsive UI in a game.(like <font color="#0073aa">Temple Run</font>)
* Shakehand in some social network applications
* ...

In fact, all of these scenarios applied <font color="#0073aa">CoreMotion.framework</font>

The purpose of <font color="#0073aa">CoreMotion.framework</font> provided by iOS is to help developers to capture the data from gyroscope and accelerometer. It not only provide the speed value or rotation value, more importantly, iOS integrates plenty of algorithms in it, which can directly output the gravity acceleration component in different orientation and dimensions.

[CoreMotion Framework](https://developer.apple.com/documentation/coremotion)

### 2. Accelerometer
It was very simple to understand accelerometer, which was divided by x,y,z axis, separatedly measures proper acceleration.

Proper acceleration, being the acceleration (or rate of change of velocity) of a body in its own instantaneous rest frame, is not the same as coordinate acceleration, being the acceleration in a fixed coordinate system.

For example, an accelerometer at rest on the surface of the Earth will measure an acceleration due to Earth's gravity, straight upwards (by definition) of g ≈ 9.81 m/s2. By contrast, accelerometers in free fall (falling toward the center of the Earth at a rate of about 9.81 m/s2) will measure zero.

![Accemeter](/dsm/img/201410/Accemeter.png)

### 3. Gyroscope
A gyroscope is a device used for mearsuring or maintaining orientation and angular velocity.

It is a spinning wheel in which x,y,z three axis of rotation is free to assume any orientation by itself.

When rotating, the orientation of this axis is unaffected by tilting or rotation of the mounting.

![Gyrometer](/dsm/img/201410/Gyrometer.png)

### 4. Usage of CoreMotion

![CMFramework](/dsm/img/201410/CMFramework.png)

CoreMotion principly provides three kinds of data:
* Acceleration Velocity Data <font color="#0073aa">CMAccelerometerData</font>
* Angular Velocity Data <font color="#0073aa">CMGryoData</font>
* Device Motion Data <font color="#0073aa">CMDeviceMotion</font>

![CMDeviceMotion](/dsm/img/201410/CMDeviceMotion.png)

Attributes of CMDeviceMotion:
* <font color="#0073aa">attitude</font> The attitude of the device
* <font color="#0073aa">gravity</font> The gravity acceleration vector expressed in the device's reference frame.
* <font color="#0073aa">userAcceleration</font> The acceleration that the user is giving to the device.
* <font color="#0073aa">RotationRate</font>The rotation rate of the device.

### 5. Procedures of calling coremotion

* Initiate the attributes of <font color="#0073aa">CMMotionManager</font>
* Call the managed objects and objective-oriented functions
* Processing the data
* Stopping getting data from Hardware devices, like this:

```C
-(void)stopAccelerometerUpdates;//Stopping getting data from the accelerometer
-(void)stopGyroUpdates;//Stopping getting data from the Gyroscope
-(void)stopDeviceMotionUpdates;//Stopping getting data from the Device motion
```

### 5. Using Push Method to get data from CoreMotion Framework

The push method provides one operation queue manager and calling back block, CoreMotion will recall the block for every simultaneously collected data and to process it.

* Using Push Method to get data from the acceleromter

```C
- (void)useAccelerometerPush{
    //Initiate the global manager object
    CMMotionManager* manager = [[CMMotionManager alloc] init];
    self.motionManager = manager;
    //Check if the accelerometer is available
    if ([manager isAccelerometerAvailable] && ![manager isAccelerometerActive]){
        //Tell the manager, the frequency of update is 100Hz
        manager.accelerometerUpdateInterval = 0.01;
        NSOperationQueue* queue = [[NSOperationQueue alloc] init];
        //Get the data by push-method and process it
        [manager startAccelerometerUpdatesToQueue:queue
                 withHandler:^(CMAccelerometerData* accelerometerData, NSError* error)
         {
             NSLog(@"X = %.04f",accelerometerData.acceleration.x);
             NSLog(@"Y = %.04f",accelerometerData.acceleration.y);
             NSLog(@"Z = %.04f",accelerometerData.acceleration.z);
         }];
    }
}
```

* Using Push Method to get data from the gyrometer

```C
- (void)useGyroPush{
    //Initiate the global manager object
    CMMotionManager* manager = [[CMMotionManager alloc] init];
    self.motionManager = manager;
    //Check if the accelerometer is available
    if ([manager isGyroAvailable] && ![manager isGyroActive]){

        NSOperationQueue* queue = [[NSOperationQueue alloc] init];
        //Tell the manager, the frequency of update is 100Hz
        manager.gyroUpdateInterval = 0.01;
        //Get the data by push-method and process it
        [manager startGyroUpdatesToQueue:queue
                             withHandler:^(CMGyroData* gyroData, NSError* error)
        {
            NSLog(@"Gyro Rotation x = %.04f", gyroData.rotationRate.x);
            NSLog(@"Gyro Rotation y = %.04f", gyroData.rotationRate.y);
            NSLog(@"Gyro Rotation z = %.04f", gyroData.rotationRate.z);
        }];
    }
}
```

### 6. Using Pull Method to get data from CoreMotion Framework

If you want to use Pull Methor to get data, you need to ask <font color="#0073aa">CMMotionManager</font> for data, this data is the last updated one. If you do not ask the data, <font color="#0073aa">CMMotionManager</font> would not provide the data by itself.

* Using Pull Method to get data from the acceleromter

```C
- (void)useAccelerometerPull{
    //Initiate the global manager object
    CMMotionManager* manager = [[CMMotionManager alloc] init];
    self.motionManager = manager;
    //Check if the accelerometer is available
    if ([manager isAccelerometerAvailable] && ![manager isAccelerometerActive]){
    //Tell the manager, the frequency of update is 100Hz
        manager.accelerometerUpdateInterval = 0.01;
    //Update
        [manager startAccelerometerUpdates];
    }
    //Get data and start to process it
    CMAccelerometerData* newestAccel = self.motionManager.accelerometerData;
    NSLog(@"X = %.04f",newestAccel.acceleration.x);
    NSLog(@"Y = %.04f",newestAccel.acceleration.y);
    NSLog(@"Z = %.04f",newestAccel.acceleration.z);
}
```

* Using Pull Method to get data from the gyroscope

```C
- (void)useGyroPull{
    //Initiate the global manager object
    CMMotionManager* manager = [[CMMotionManager alloc] init];
    self.motionManager = manager;
    //Check if the gyrometer is available
    if ([manager isGyroAvailable] && ![manager isGyrometerActive]){
    //Tell the manager, the frequency of update is 100Hz
        manager.gyrometerUpdateInterval = 0.01;
    //Update
        [manager startGyrometerUpdates];
    }
    //Get data and start to process it
    CMGyrometerData* newestGyro = self.motionManager.gyrometerData;
    NSLog(@"X = %.04f",newestGyro.rotationRate.x);
    NSLog(@"Y = %.04f",newestGyro.rotationRate.y);
    NSLog(@"Z = %.04f",newestGyro.rotationRate.z);
}
```

### 7. An Example: to keep the image balance for your iPhone

```
- (void)keepBalance {
    if (self.manager.isDeviceMotionAvailable) {
        self.manager.deviceMotionUpdateInterval = 0.05f;
        [self.manager startDeviceMotionUpdatesToQueue:[NSOperationQueue mainQueue] withHandler:^(CMDeviceMotion* _Nullable motion, NSError* _Nullable error) {
            double rotation = atan2(motion.gravity.x, motion.gravity.y) - M_PI;
            self.imageView.transform = CGAffineTransformMakeRotation(rotation);
        }];
    }
}
```
![Rotate1](/dsm/img/201410/rotate1.gif)
![Rotate2](/dsm/img/201410/rotate2.gif)
