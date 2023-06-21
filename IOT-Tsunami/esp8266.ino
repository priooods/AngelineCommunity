#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include <Hash.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#define BUZZER_VAR 0.034

ESP8266WiFiMulti wifiMulti;
SocketIOclient socketIO;
const int trigPin = 14;
const int buzzer = 5;
const int echoPin = 12;
const int ledRed =  13;
const int ledGreen =  4;
long duration;
float distanceCm;
float distanceInch;

// variable for socket
unsigned long previousMillis = 0;
unsigned long currentMillis;
unsigned long interval=5000; // interval socket client sending to server 


void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Connected to url: %s\n", payload);
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
            Serial.printf("[IOc] get event: %s\n", payload);
            break;
        case sIOtype_ACK:
            Serial.printf("[IOACK] get ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}

void initWiFi() {
  WiFi.disconnect();
  // starting program
  for(uint8_t t = 5; t > 0; t--) {
      tone(buzzer, 780, 200);
      Serial.printf("[SETUP PROSESS] %d...\n", t);
      Serial.flush();
      delay(1000);
  }
  WiFi.mode(WIFI_STA); // setup mode wifi
  wifiMulti.addAP("Angeline", "sjmx9139"); // Primary WIFI
  wifiMulti.addAP("ZTE_2.4G_TdSxTz", "bPk6AzGD"); // Secondary WIFI
  wifiMulti.addAP("KJL", "Cigading2021"); // Optional WIFI
  Serial.print("Connecting to WIFI "); // logging
  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
    // make a connecting to wifi every 1 second
    // next wifi if cannot connected
    // process in looping
    digitalWrite(ledRed, HIGH);
    digitalWrite(ledGreen, LOW);
    tone(buzzer, 780, 200);
  }
  // logging result if success connected to wifi
  Serial.println("");
  Serial.print("Connected to : ");
  Serial.print(WiFi.SSID());
  Serial.print(" || IP Addres : ");
  Serial.print(WiFi.localIP());
  Serial.println("");
  noTone(buzzer);
  digitalWrite(ledGreen, HIGH);
  digitalWrite(ledRed, LOW);
}

void ReconnectWiFi(){
  unsigned long currentMillis = millis();
  if ((WiFi.status() != WL_CONNECTED) && (currentMillis - 0 >= 30000)) {
    Serial.println("Reconnecting to WiFi...");
    WiFi.disconnect();
    initWiFi();
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT);
  pinMode(ledRed, OUTPUT);
  pinMode(ledGreen, OUTPUT);
  digitalWrite(ledRed, HIGH);
  initWiFi();
  delay(2000);
  socketIO.begin("192.168.1.2", 8080, "/socket.io/?EIO=4");
  socketIO.onEvent(socketIOEvent);
  socketIO.setReconnectInterval(5000);
}


void loop() {
  ReconnectWiFi();
  socketIO.loop();

  currentMillis=millis();
  if(socketIO.isConnected()){
    if (abs(currentMillis - previousMillis) >= interval) {
      previousMillis = currentMillis;

      digitalWrite(trigPin, LOW);
      delayMicroseconds(10);
      digitalWrite(trigPin, HIGH);
      delayMicroseconds(10);
      digitalWrite(trigPin, LOW);
    
      duration = pulseIn(echoPin, HIGH);
      distanceCm = duration*0.034/2;
      distanceInch = distanceCm * 0.034 * 100;
    
      Serial.print("Duration : ");
      Serial.println(duration);
      Serial.print("Distance (cm): ");
      Serial.println(distanceCm);
      Serial.print("Distance (inch): ");
      Serial.println(distanceInch);
      if(distanceCm < 11) {
        tone(buzzer, 780, 200);
        digitalWrite(ledRed, HIGH);
        digitalWrite(ledGreen, LOW);
      } else {
        noTone(buzzer);
        digitalWrite(ledRed, LOW);
        digitalWrite(ledGreen, HIGH);
      }

      
      DynamicJsonDocument doc(1024);
      JsonArray array = doc.to<JsonArray>();
      array.add("broadcast");
  
      // add payload (parameters) for the event
      JsonObject params = array.createNestedObject();
      if(distanceCm < 11) { // if dintance < 11
        params["type"] = 4;
      } else if (distanceCm < 16) { // if dintance < 16
        params["type"] = 3;
      } else if (distanceCm < 21) { // if dintance < 21
        params["type"] = 2;
      } else { // if distance normal ( > 20 )
        params["type"] = 1;
      }
      params["key"] = "n0d3mcU";
      params["ketinggian"] = distanceCm;
  
      // JSON to String (serializion)
      String output;
      serializeJson(doc, output);
      socketIO.send(sIOtype_EVENT,output);
      Serial.print(" Kirim ke server via socket : ");
      Serial.print(output);
    }
  }
}