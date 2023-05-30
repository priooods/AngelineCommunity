#include <SocketIOclient.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <Hash.h>

ESP8266WiFiMulti wifiMulti;
SocketIOclient socketIO;

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            Serial.printf("[IOc] Disconnected!\n");
            break;
        case sIOtype_CONNECT:
            Serial.printf("[IOc] Connected to url: %s\n", payload);
            socketIO.send(sIOtype_CONNECT, "/");
            break;
    }
}

void initWiFi() {
  for(uint8_t t = 5; t > 0; t--) {
      Serial.printf("[SETUP PROSESS] %d...\n", t);
      Serial.flush();
      delay(1000);
  }
  WiFi.mode(WIFI_STA);
  wifiMulti.addAP("Angeline", "sjmx9139");
  wifiMulti.addAP("ZTE_2.4G_TdSxTz", "bPk6AzGD");
  wifiMulti.addAP("KJL", "Cigading2021");
  Serial.print("Connecting ");
  while (wifiMulti.run() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println("");
  Serial.print("Connected to : ");
  Serial.print(WiFi.SSID());
  Serial.print(" || IP Addres : ");
  Serial.print(WiFi.localIP());
  Serial.println("");
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
  initWiFi();
  delay(2000);
  socketIO.begin("192.168.25.105", 8080,"/socket.io/?EIO=4");
  socketIO.onEvent(socketIOEvent);
  socketIO.setReconnectInterval(5000);
}

unsigned long messageTimestamp = 0;
void loop() {
  ReconnectWiFi();
  socketIO.loop();

  uint64_t now = millis();
  if(now - messageTimestamp > 30 * 1000ul) {
    messageTimestamp = now;
    
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    array.add("broadcast");
  
    JsonObject params = array.createNestedObject();

    // kalau misalnya ketinggian 5
    if() {
      params["ketinggian"] = 4;
    // kalau misalnya ketinggian 15
    } else if () {
      params["ketinggian"] = 3;
    // kalau misalnya ketinggian 25
    } else if () {
      params["ketinggian"] = 2;
    // kalau misalnya ketinggian 30  
    } else if () {
      params["ketinggian"] = 1;
    }
    
  
    String output;
    serializeJson(doc, output);
    socketIO.sendEVENT(output);
    Serial.println("Socket send event");
    Serial.println(messageTimestamp);
  }
}