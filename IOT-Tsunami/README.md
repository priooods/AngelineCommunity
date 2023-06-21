# Tsunami Potential Warning System

<p align="left">
    <a href="https://www.npmjs.com/package/npm-auto-version">
        <img src="https://img.shields.io/badge/NodeJs-1.0.0-success"
            alt="NodeJs"></a>
    <a href="https://www.npmjs.com/package/socket.io">
        <img src="https://img.shields.io/badge/socket.io-4.5.2-blueviolet"
            alt="Socket.Io"></a>
    <a href="https://github.com/adiwajshing/Baileys">
        <img src="https://img.shields.io/badge/whatsapp%20baileys-4.2.0-success"
            alt="Baileys"></a>
</p>

## Information

**Tsunami Potential Warning System** is a project aimed at making observations in coastal areas and analyzing the results so that they can provide information on Tsunami Potential.

The tool adapted to the system in making observations is still a prototype with a method of observing sea water levels. While the server used in sending warnings uses the `WhatsApp Broadcast` method and utilizes `socket` technology between the server and the device to communicate.


## Tech Stack

**Server:** 
  - [**NodeJs**](https://nodejs.org/en/)
  - [**Express Js**](https://expressjs.com/)
  - [**wppconnect**](https://github.com/wppconnect-team/wppconnect)
  - [**Socket.io**](https://socket.io/)
  - [**Mysql**](https://www.mysql.com/)

**Client App:** 
  - **Native Web | HTML, CSS, Javascript**
  - [**TailwindCSS**](https://tailwindcss.com/)

**Tools:** 
  - **NodeMcu - ESP8266**
  - [**Arduino IDE**](https://www.arduino.cc/en/software/)
  - [**Arduino Web Socket**](https://github.com/Links2004/arduinoWebSockets)
  - [**ESP8266 Wifi Module**](https://arduino-esp8266.readthedocs.io/en/latest/esp8266wifi/readme.html)



## 🛠 Run Locally

Clone the project

```bash
  git clone https://github.com/priooods/AngelineCommunity
```

### 💻 Server setup

Go to the project directory

```bash
  cd IOT-Tsunami/Server
```

Install dependencies

```bash
  npm install
```

Create new `.env` file inside folder `IOT-Tsunami/Server` and copy below environment

``` bash
  PORT=80  
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=
  DB_DATABASE=my_databse
  MAX_RETRIES=2
  RECONNECT_INTERVAL=500000
  LOGTIME=./log/log_time.json
  URL_CCTV_1=my_RTSP_1
  URL_CCTV_2=my_RTSP_2
```

**Import Database**

Import database to Sql Tools, you can use example database in `IOT-Tsunami/Server`

Start the server

```bash
  npm start
```

### 🪩 Website setup

Go to the project directory



```bash
  cd IOT-Tsunami/Website
```
Recomended open on `Visual Studio Code` and running with `Live Server`

## API Reference

#### Add Users

```http
  POST /user/add
```

| Parameter | Type    | Description                |
| :-------- | :-------| :------------------------- |
| `name`    | `string`| Your name                  |
| `phone`   | `int`   | Your whatsapp numbers, this number with prefix `62`. so you must input number like this `ex : 812 3333 4444`           |
| `latitude`    | `string`| Your Latitude location    |
| `longitude`    | `string`| Your Longitude location    |

## Microcontroller Setup

### Download Libraries

  You must download zip from project github in `https://github.com/Links2004/arduinoWebSockets`. this project for libraries `socket` in NodeMCU

### Tool Required

  - HC-SR04
  - 1 buzzer
  - 2 LEDs
  - 2 resistors 1K Ohm
  - 1 resistor 470 Ohm
  - 1 transistor NPN BC337
  - ESP8266

### Copy & Paste ESP8266 code

  You can copy all my code in file `esp8266.ino` and paste in your IDE. There are several things you should pay attention to, namely:

    - PIN GPIO 

      ```c
        const int trigPin = 14; // PIN D5
        const int buzzer = 5; // PIN D1
        const int echoPin = 12; // PIN D6
        const int ledRed =  13; // PIN D7
        const int ledGreen =  4; // PIN D2
      ```


    - WiFi Setup

      ```c
        wifiMulti.addAP("SSID", "password"); // Primary WIFI
        // ... another your wifi
      ```


    - Socket Address

      ```c
        socketIO.begin("your socket IP", PORT_SOCKET_NUMBER, "/socket.io/?EIO=4");
      ```

The above are the most basic and important things for you to follow or rearrange. the rest you can customize according to your needs.

## Finish Setup

The above are the most basic and important things for you to follow or rearrange. the rest you can customize according to your needs.


## Authors

- [@priooods](https://www.instagram.com/priooods)
