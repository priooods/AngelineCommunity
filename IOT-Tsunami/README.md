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
  - [**Baileys**](https://github.com/adiwajshing/Baileys)
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
  PORT=8080
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=
  DB_DATABASE=your_database
  MAX_RETRIES=2
  RECONNECT_INTERVAL=500000
  LOGTIME=./log/log_time.json
```

Export Database

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


