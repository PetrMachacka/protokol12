radio.set_group(1)
radio.set_transmit_power(7)
radio.on_received_value(data_received)
radio.set_transmit_serial_number(True)
learn = 0
alarm = 0
data_list = [0]
send_learn = 0
# FOREVER
def on_forever():
    pass
basic.forever(on_forever)
# Main
def data_received(name, value):
    global learn
    serial1 = radio.received_packet(RadioPacketProperty.SERIAL_NUMBER)
    if name == "send" and value == 1 and learn == 1:
        data_list.append(serial1)
        print(data_list)
    if name == "remove" and value == 1 and learn == 1:
        data_list.remove(serial1)
        print(data_list)
    if name == "alarm" and value == 1:
        if serial1 in data_list:
            music.play_tone(Note.C,0)
    if name == "alarm" and value == 0:
        if serial1 in data_list:
            music.stop_all_sounds()
# Alarm
def alarm_on():
    radio.send_value("alarm", 1)
input.on_button_pressed(Button.A, alarm_on)

def alarm_off():
    radio.send_value("alarm", 0)
input.on_button_pressed(Button.B, alarm_off)
# Learn
def learn1():
    global learn
    if learn == 0:
        learn = 1
    else:
        learn = 0
    print(learn)
input.on_logo_event(TouchButtonEvent.LONG_PRESSED, learn1)
# Send
def send():
    radio.send_value("send", 1)
input.on_logo_event(TouchButtonEvent.PRESSED, send)

def remove():
    radio.send_value("remove", 1)
input.on_button_pressed(Button.AB, remove)