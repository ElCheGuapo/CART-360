import serial

#Serial takes these two parameters: serial device and baudrate
arduinoSerialData = serial.Serial('/dev/cu.usbmodem14201', 9600)

tempVar = 0
msg = 0

def msg_on():
    #print("sending serial data")
    arduinoSerialData.write(msg.to_bytes(2, 'big'))

t  = 0
while (t <= 80000): #loop and send every 80000 frames
    if t >= 80000:
        if msg != 99: #99 is a value that makes this thing crash
            msg_on()
            t = 0
        else:
            t = 40000

    tempVar = msg
    f = open("heartRate.txt", "r")
    msg = int(f.read()) #string of txt to int
    t += 1

    if tempVar != msg: #only print with new heart rate value
        print(tempVar) #temp var is old heart rate value
        print('-----')
        print(msg) #new heart rate value