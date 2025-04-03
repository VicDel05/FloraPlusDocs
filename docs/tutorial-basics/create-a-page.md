---
sidebar_position: 1
---

# Tutorial de Instalación
## 🌱 Construcción y Armado de componentes

Este tutorial te guiará paso a paso en **la construcción del sistema de riego automático con Arduino** y **la instalación de la app móvil para su control**.

## 🛠️ 1. Armado del Sistema en Arduino
### - 🔹 Materiales Necesarios
  - Arduino Uno R3

  - Módulo Bluetooth HC-05 o HC-06

  - Sensor de humedad del suelo (FC-28 o Hygrometer)

  - Bomba de agua (5V o 12V)

  - Relé (para controlar la bomba de agua si es de 12V)

  - Fuente de alimentación externa (5 a 9V)

  - Cables y protoboard


### - 📌 Diagrama de Conexión

Conéctalos de la siguiente manera:

- Sensor de humedad:

  - VCC → 5V de Arduino

  - GND → GND de Arduino

  - A0 → Pin A0 de Arduino

- Módulo Bluetooth HC-05/HC-06:

  - VCC → 5V de Arduino

  - GND → GND de Arduino

  - TX → Pin 10 de Arduino

  - RX → Pin 11 de Arduino (con divisor de voltaje 1K y 2K)

- Bomba de agua:

  - Conéctala al relé, que a su vez se conecta al Arduino:

  - IN del relé → Pin 7 de Arduino

  - VCC del relé → 5V de Arduino

  - GND del relé → GND de Arduino

  - COM del relé → GND de la bomba

  - NO del relé → VCC de la bomba

#### 💡 Nota: Si la bomba es de 12V, usa una fuente externa.

### Descargar [Software ARDUINO](https://www.arduino.cc/en/software)

## ⏳ Código para Arduino

Sube este código a tu placa:

```jsx title="Codigo_SistemaRiego"
#include <SoftwareSerial.h>

SoftwareSerial BT(10, 11);  // RX, TX para Bluetooth

int bomba = 8;
int humedad = 0;
bool modoManual = false;  // Control manual o automático

void setup() {
  Serial.begin(9600);
  BT.begin(9600);

  pinMode(bomba, OUTPUT);
  digitalWrite(bomba, HIGH);  // La bomba inicia apagada
}

void loop() {
  if (BT.available()) {
    String comando = BT.readString();
    comando.trim();

    if (comando == "MANUAL") {
      modoManual = true;
      Serial.println("Modo manual activado");
    } else if (comando == "AUTO") {
      modoManual = false;
      Serial.println("Modo automático activado");
    } else if (modoManual) {
      if (comando == "ON") {
        digitalWrite(bomba, LOW);
        Serial.println("Bomba ENCENDIDA (manual)");
      } else if (comando == "OFF") {
        digitalWrite(bomba, HIGH);
        Serial.println("Bomba APAGADA (manual)");
      }
    }
  }


  if (!modoManual) {
    humedad = analogRead(A0);

    if (humedad >= 721 && humedad <= 1024) {
      digitalWrite(bomba, LOW);
      Serial.println("Bomba ENCENDIDA (automático)");
    } else {
      digitalWrite(bomba, HIGH);
      Serial.println("Bomba APAGADA (automático)");
    }

    Serial.println(humedad);

    BT.print(humedad);  
    BT.print("\r");     

    delay(500);
  }
}

```

## 📱 2. Instalación y Configuración de la App

### 🔹 Descarga e Instalación

- Descarga la app de Riego-App desde [Repositorio en GitHub](https://github.com/VicDel05/FloraPlus.git).

- Instálala en tu dispositivo Android.

- Habilita Bluetooth en tu teléfono.

### 🔗 Conectar la App con Arduino

- Abre la app.

- Registrate en la APP, una vez creada la cuenta ingresa.

- Presiona "Buscar dispositivos Bluetooth" y selecciona HC-05 o HC-06.

- Conéctalo ingresando el PIN 1234 o 0000.

- Una vez conectado, usa los botones en la app para activar o desactivar la bomba.

#### ✅ ¡Listo! Ahora puedes regar tus plantas de forma automática o manual. 🌿💧
