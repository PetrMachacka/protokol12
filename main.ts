radio.setGroup(1)
radio.setTransmitPower(7)
radio.onReceivedValue(function data_received(name: string, value: number) {
    
    let serial1 = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    if (name == "send" && value == 1 && learn == 1) {
        data_list.push(serial1)
        console.log(data_list)
    }
    
    if (name == "remove" && value == 1 && learn == 1) {
        data_list.removeElement(serial1)
        console.log(data_list)
    }
    
    if (name == "alarm" && value == 1) {
        if (data_list.indexOf(serial1) >= 0) {
            music.playTone(Note.C, 0)
        }
        
    }
    
    if (name == "alarm" && value == 0) {
        if (data_list.indexOf(serial1) >= 0) {
            music.stopAllSounds()
        }
        
    }
    
})
radio.setTransmitSerialNumber(true)
let learn = 0
let alarm = 0
let data_list = [0]
let send_learn = 0
//  FOREVER
basic.forever(function on_forever() {
    
})
//  Main
//  Alarm
input.onButtonPressed(Button.A, function alarm_on() {
    radio.sendValue("alarm", 1)
})
input.onButtonPressed(Button.B, function alarm_off() {
    radio.sendValue("alarm", 0)
})
//  Learn
input.onLogoEvent(TouchButtonEvent.LongPressed, function learn1() {
    
    if (learn == 0) {
        learn = 1
    } else {
        learn = 0
    }
    
    console.log(learn)
})
//  Send
input.onLogoEvent(TouchButtonEvent.Pressed, function send() {
    radio.sendValue("send", 1)
})
input.onButtonPressed(Button.AB, function remove() {
    radio.sendValue("remove", 1)
})
