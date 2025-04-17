---
sidebar_position: 5
---

# Riego-App: Sistema de Riego Automático con Arduino y App

## Introducción 
Descubre cómo **automatizar el riego de tus plantas** con Arduino y una aplicación móvil.

## 🎯 Objetivo del Proyecto
El objetivo de Riego-App es desarrollar un sistema de riego automático y manual basado en Arduino y controlado mediante una aplicación móvil. Este sistema optimiza el uso del agua al medir la humedad del suelo y activar la bomba solo cuando sea necesario, permitiendo también el control remoto del riego a través de Bluetooth.

Esto ayuda a mejorar la eficiencia del riego en jardines, huertos o cultivos, reduciendo el desperdicio de agua y facilitando su gestión de manera inteligente. 🌱💧

## Componentes Necesarios

- Arduino Uno R3.

- Módulo Bluetooth HC-05 o HC-06.

- Sensor de humedad del suelo (FC-28 o Hygrometer).

- Bomba de agua (5V o 12V).

- Relé para la bomba de agua.

- Fuente de alimentación externa (5 a 9V).

- Cables y protoboard.

![Example image](../static/img/LOGO-APPRIEGO.jpg)

## Descargar Aplicación 
Para descargar la versión 1.0v de la aplicación dando clic en el botón de descarga

export const Btndownload = ({children, color}) => (
    <div 
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1rem'
        }}>
        <span
            style={{
                backgroundColor: color,
                borderRadius: '1.5rem',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                padding: '1rem',
                width: '12rem',
                cursor: 'pointer',
                textAlign: 'center',
            }}
            onClick={() => {
                window.location.href = 'https://github.com/VicDel05/FloraPlusDocs/releases/download/v1.0.0/GardenPlus.apk'
            }}>
            {children}
        </span>
    </div>
);

<Btndownload color="#00cdac">Descargar</Btndownload>
## 🌿 Más información sobre el riego de plantas  
Si quieres conocer más sobre las mejores técnicas de riego, visita [Guía de Riego Eficiente](https://www.gob.mx/siap/articulos/en-la-agricultura-los-sistemas-de-riego-son-utilizados-para-un-aprovechamiento-optimo-del-agua?idiom=es).

## ❓ Preguntas Frecuentes (FAQ)  
**¿Cómo funciona el sensor de humedad?**  
El sensor mide la cantidad de agua en el suelo y envía datos a Arduino para activar el riego.  

**¿Puedo ajustar los niveles de humedad?**  
Sí, desde la app puedes configurar el umbral de riego automático.  

📌 **Código fuente:** [Repositorio en GitHub](https://github.com/VicDel05/FloraPlus.git)
