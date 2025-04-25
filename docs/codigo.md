---
title: Codigo
sidebar_position: 3
---

# Codigo
En esta sección, se explicará detalladamente el código y las interfaces utilizadas en el desarrollo de la aplicación AR centrada en plantas. Se abordarán los aspectos clave de la funcionalidad, como la interacción con modelos 3D de plantas, la gestión de la interfaz de usuario, la integración con la realidad aumentada y las opciones para capturar y compartir el entorno AR. A través de la descripción de las clases y métodos utilizados, se mostrará cómo cada componente contribuye a la experiencia interactiva y educativa que ofrece la aplicación.
## Unity

1. ### Home Unity
<div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
![Int1](/img/Int1.png)
<p>Al ingresar a Unity Hub seleccionamos el proyecto en el cual vamos a trabajar (en este caso es el de fecha más reciente ya que estuvimos realizando pruebas con las configuraciones).</p>
</div>

2. ### Unity Interface
<div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
![Int1](/img/Int2.png)
<p>AUna vez dentro del proyecto podemos visualizar diferentes apartados como pueden ser el directorio donde se encuentran los archivos, una vista de desarrollo para visualizar los cambios que se van agregando, una ventana para ver la ejecución de la aplicación a nivel de proyecto (sin ejecutar el comando build), el menú de herramientas que nos proporciona todas las opciones para desarrollar la aplicación.</p>
</div>

3. ### App Settings
<div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
![Int1](/img/Int3.png)
<p>Aqui tenemos las configuraciones para construir la aplicación una vez esté terminada (o para realizar pruebas en los dispositivos), es la parte donde se elige a que plataforma está dirigido y para este proyecto se usó Android como objetivo..</p>
</div>

4. ### Structure
<div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
![Int1](/img/Int4.png)
<p>Dentro de la carpeta Assets que contiene todos los recursos necesarios para que la aplicación funcione correctamente, se encuentra el directorio llamado scripts el cual contiene cada uno de los archivos codificados con el lenguaje C# y es donde se aplica la arquitectura del proyecto.</p>
</div>

5. ### Code Preview
<div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
![Int1](/img/Int5.png)
<p>Al seleccionar un archivo script se mostrará una pequeña previsualización del código, además de, algunas características adicionales.</p>
</div>
## Visual Studio Code 

### 1. ARInteractionsManager.cs


Este código en C# es un script de Unity diseñado para gestionar interacciones en una aplicación de realidad aumentada (AR) utilizando ARFoundation. Su objetivo principal es permitir al usuario colocar, mover, rotar y eliminar un modelo 3D sobre una superficie detectada en el mundo real a través de la cámara del dispositivo.

Aquí te explico las partes clave y para qué sirve cada una:

🧩 Propósitos Generales del Script
Detectar planos AR y posicionar un puntero sobre ellos.

1. *Colocar un modelo 3D en ese plano.*

2. *Mover el modelo 3D arrastrando con un dedo.*

3. *Rotar el modelo 3D usando dos dedos.*

4. *Eliminar el modelo 3D cuando se desee.*


```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using UnityEngine.EventSystems;

public class ARInteractionsManager : MonoBehaviour
{
    [SerializeField] private Camera aRCamera;
    private ARRaycastManager aRRaycastManager;
    private List<ARRaycastHit> hits = new List<ARRaycastHit>();

    private GameObject aRPointer;
    private GameObject item3DModel;
    private GameObject itemSelected;

    private bool isInitialPosition;
    private bool isOverUI;
    private bool isOver3DModel;

    private Vector2 initialTouchPos;

    public GameObject Item3DModel
    {
        set
        {
            item3DModel = value;
            item3DModel.transform.position = aRPointer.transform.position;
            item3DModel.transform.parent = aRPointer.transform;
            isInitialPosition = true;
        }
    }

    void Start()
    {
        aRPointer = transform.GetChild(0).gameObject;
        aRRaycastManager = FindObjectOfType<ARRaycastManager>();
        GameManager.instance.OnMainMenu += SetItemPosition;
    }

    void Update()
    {
        if (isInitialPosition)
        {
            Vector2 middlePointScreen = new Vector2(Screen.width / 2, Screen.height / 2);
            aRRaycastManager.Raycast(middlePointScreen, hits, TrackableType.Planes);
            if (hits.Count > 0)
            {
                transform.position = hits[0].pose.position;
                transform.rotation = hits[0].pose.rotation;
                aRPointer.SetActive(true);
                isInitialPosition = false;
            }
        }

        if (Input.touchCount > 0)
        {
            Touch touchOne = Input.GetTouch(0);
            if (touchOne.phase == TouchPhase.Began)
            {
                var touchPosition = touchOne.position;
                isOverUI = IsTapOverUI(touchPosition);
                isOver3DModel = IsTapOver3DModel(touchPosition);
            }

            if (touchOne.phase == TouchPhase.Moved)
            {
                if (aRRaycastManager.Raycast(touchOne.position, hits, TrackableType.Planes))
                {
                    Pose hitPose = hits[0].pose;
                    if (!isOverUI && isOver3DModel)
                    {
                        transform.position = hitPose.position;
                    }
                }
            }

            if (Input.touchCount == 2)
            {
                Touch touchTwo = Input.GetTouch(1);
                if (touchOne.phase == TouchPhase.Began || touchTwo.phase == TouchPhase.Began)
                {
                    initialTouchPos = touchTwo.position - touchOne.position;
                }

                if (touchOne.phase == TouchPhase.Moved || touchTwo.phase == TouchPhase.Moved)
                {
                    Vector2 currentTouchPos = touchTwo.position - touchOne.position;
                    float angle = Vector2.SignedAngle(initialTouchPos, currentTouchPos);
                    item3DModel.transform.rotation = Quaternion.Euler(0, item3DModel.transform.eulerAngles.y - angle, 0);
                    initialTouchPos = currentTouchPos;
                }
            }
        }

        if (isOver3DModel && item3DModel == null && !isOverUI)
        {
            GameManager.instance.ARPosition();
            Item3DModel = itemSelected;
            item3DModel = null;
            aRPointer.SetActive(true);
            transform.position = item3DModel.transform.position;
            item3DModel.transform.parent = aRPointer.transform;
        }
    }

    private bool IsTapOver3DModel(Vector2 touchPosition)
    {
        Ray ray = aRCamera.ScreenPointToRay(touchPosition);
        if (Physics.Raycast(ray, out RaycastHit hit3DModel))
        {
            if (hit3DModel.collider.CompareTag("Item"))
            {
                itemSelected = hit3DModel.transform.gameObject;
                return true;
            }
        }
        return false;
    }

    private bool IsTapOverUI(Vector2 touchPosition)
    {
        PointerEventData eventData = new PointerEventData(EventSystem.current);
        eventData.position = new Vector2(touchPosition.x, touchPosition.y);

        List<RaycastResult> result = new List<RaycastResult>();
        EventSystem.current.RaycastAll(eventData, result);

        return result.Count > 0;
    }

    private void SetItemPosition()
    {
        if (item3DModel != null)
        {
            item3DModel.transform.parent = null;
            aRPointer.SetActive(false);
            item3DModel = null;
        }
    }

    public void DeleteItem()
    {
        if (item3DModel != null)
        {
            Destroy(item3DModel);
            aRPointer.SetActive(false);
            GameManager.instance.MainMenu();
        }
    }
}
```

### 2. DataManager.cs

Forma parte del sistema de interfaz para un menú de selección de objetos en una aplicación, probablemente de realidad aumentada o similar. Su objetivo principal es crear dinámicamente botones en el menú basados en una lista de objetos (ítems), cada uno con su nombre, descripción, imagen y modelo 3D.

🎯 ¿Para qué sirve este código?
El script DataManager se encarga de:

1. *Tomar una lista de objetos (items).*

2. *Crear un botón para cada objeto cuando el usuario abre el menú de ítems.*

3. *Asociar a cada botón la información visual y funcional del objeto (texto, imagen, modelo 3D).*

4. *Asegurarse de que los botones se creen una sola vez, usando un evento del GameManager*
```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DataManager : MonoBehaviour
{
    [SerializeField] private List<Item> items = new List<Item>();
    [SerializeField] private GameObject buttonContainer;
    [SerializeField] private ItemButtonManager itemButtonManager;

    // Start is called before the first frame update
    void Start()
    {
        GameManager.instance.OnItemsMenu += CreateButtons;

    }
    private void CreateButtons()
    {
        foreach (var item in items)
        {
            ItemButtonManager itemButton;
            itemButton = Instantiate(itemButtonManager, buttonContainer.transform);
            itemButton.ItemName = item.ItemName;
            itemButton.ItemDescription = item.ItemDescription;
            itemButton.ItemImage = item.ItemImage;

            itemButton.Item3DModel = item.Item3DModel;
            itemButton.name = item.ItemName;


        }
        GameManager.instance.OnItemsMenu -= CreateButtons;
    }
}
```


### 3. GameManager.cs

Este código en C# define la clase GameManager, que actúa como controlador principal del flujo del juego o aplicación. Se trata de un singleton, lo que significa que solo puede haber una instancia activa a la vez, y ofrece una forma centralizada de emitir eventos que otros scripts pueden suscribirse para reaccionar a cambios en el estado de la aplicación.

🎯 ¿Para qué sirve este código?
Sirve para:

1. *Coordinar transiciones entre menús (por ejemplo, principal, selección de ítems, posición en AR).*

2. *Enviar eventos a otros scripts para que realicen acciones específicas cuando cambia el estado del juego.*

3. *Actuar como gestor global accesible desde cualquier parte mediante GameManager.instance.*



```csharp 
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class GameManager : MonoBehaviour
{
    public event Action OnMainMenu;
    public event Action OnItemsMenu;
    public event Action OnARPosition;

    public static GameManager instance;

    private void Awake()
    {
        if (instance != null && instance != this)
        {
            Destroy(gameObject);
        }
        else
        {
            instance = this;
        }
    }
    // Start is called before the first frame update
    void Start()
    {
        MainMenu();
    }

    public void MainMenu()
    {
        OnMainMenu?.Invoke();
        Debug.Log("Main Menu Actived");
    }

    public void ItemsMenu()
    {
        OnItemsMenu?.Invoke();
        Debug.Log("Items Menu Actived");
    }

    public void ARPosition()
    {
        OnARPosition?.Invoke();
        Debug.Log("AR Position Actived");
    }

    public void CloseAPP()
    {
        Application.Quit();
    }
}
```


### 4. Item.cs 

Este sistema permite a los usuarios seleccionar objetos 3D desde una galería interactiva y colocarlos en el mundo real usando realidad aumentada (AR)

1. *Ingrese al menú de ítems.*

2. *Vea una galería con nombre, descripción e imagen.*

3. *Seleccione un objeto con un botón.*

4. *El objeto 3D aparezca y pueda colocarse en el entorno AR.*
```csharp 
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu]
public class Item : ScriptableObject
{
    public string ItemName;
    public Sprite ItemImage;
    public string ItemDescription;
    public GameObject Item3DModel;
}

```

### 5. ItemButtonManager.cs

La funcionalidad de este script es gestionar cada botón que representa un ítem 3D en la interfaz de usuario. Cada botón permite a los usuarios seleccionar un ítem y mostrar su modelo 3D en el espacio de realidad aumentada (AR). Para lograr esto, se instancian ciertos objetos y se asignan propiedades a la UI de manera dinámica.
```csharp 
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ItemButtonManager : MonoBehaviour
{
    private string itemName;
    private string itemDescription;
    private Sprite itemImage;
    private GameObject item3DModel;
    private ARInteractionsManager interactionsManager;

    public string ItemName
    {
        set
        {
            itemName = value;
        }
    }
    public string ItemDescription { set => itemDescription = value;}

    public Sprite ItemImage { set => itemImage = value; }

    public GameObject Item3DModel { set => item3DModel = value;}

    // Start is called before the first frame update
    void Start()
    {

        transform.GetChild(0).GetComponent<Text>().text = itemName;
        transform.GetChild(1).GetComponent<RawImage>().texture = itemImage.texture;
        transform.GetChild(2).GetComponent<Text>().text = itemDescription;

        var button = GetComponent<Button>();
        button.onClick.AddListener(GameManager.instance.ARPosition);
        button.onClick.AddListener(Create3DModel);

        interactionsManager = FindObjectOfType<ARInteractionsManager>();


    }

    private void Create3DModel()
    {
        interactionsManager.Item3DModel = Instantiate(item3DModel);
    }

}

```

### 6. ShareScreenShot.cs
Este script se encarga de capturar una screenshot de la pantalla actual de la aplicación y compartirla usando el sistema NativeShare. Además, realiza algunas manipulaciones de la interfaz, como activar o desactivar ciertos contenidos de AR y el menú principal.
```csharp 
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation; // A�ade esta l�nea
using System.IO; // Necesario para Path y File
using NativeShareNamespace; // Si est�s usando NativeShare

public class ShareScreenShot : MonoBehaviour
{
    [SerializeField] private GameObject mainMenuCanvas;
    private ARPointCloudManager aRPointCloudManager;

    void Start()
    {
        aRPointCloudManager = FindObjectOfType<ARPointCloudManager>();
    }

    public void TakeScreenShot()
    {
        TurnOnOffARContents();
        StartCoroutine(TakeScreenshotAndShare());
    }

    private void TurnOnOffARContents()
    {
        if (aRPointCloudManager == null) return; // Protecci�n contra null reference

        var points = aRPointCloudManager.trackables;
        foreach (var point in points)
        {
            point.gameObject.SetActive(!point.gameObject.activeSelf);
        }
        mainMenuCanvas.SetActive(!mainMenuCanvas.activeSelf);
    }

    private IEnumerator TakeScreenshotAndShare()
    {
        yield return new WaitForEndOfFrame();

        Texture2D ss = new Texture2D(Screen.width, Screen.height, TextureFormat.RGB24, false);
        ss.ReadPixels(new Rect(0, 0, Screen.width, Screen.height), 0, 0);
        ss.Apply();

        string filePath = Path.Combine(Application.temporaryCachePath, "shared img.png");
        File.WriteAllBytes(filePath, ss.EncodeToPNG());

        Destroy(ss);

        new NativeShare().AddFile(filePath)
            .SetSubject("Subject goes here").SetText("Hey.... ")
            .SetCallback((result, shareTarget) => Debug.Log("Share result: " + result + ", selected app: " + shareTarget))
            .Share();

        TurnOnOffARContents();
    }
}
```
### 7. UIManager.cs
Este script controla la animación de las pantallas dentro de la interfaz de usuario de la aplicación. Usando el framework DOTween, se manejan animaciones de escala y movimiento de los distintos Canvas (pantallas) según el estado de la aplicación.
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;

public class UIManager : MonoBehaviour
{
    [SerializeField] private GameObject mainManuCanvas;
    [SerializeField] private GameObject itemsManuCanvas;
    [SerializeField] private GameObject ARPositionCanvas;
    // Start is called before the first frame update
    void Start()
    {
        GameManager.instance.OnMainMenu += ActivateMainMenu;
        GameManager.instance.OnItemsMenu += ActivateItemsMenu;
        GameManager.instance.OnARPosition += ActivateARPosition;
    }

    private void ActivateMainMenu()
    {
        mainManuCanvas.transform.GetChild(0).transform.DOScale(new Vector3(1, 1, 1), 0.3f);
        mainManuCanvas.transform.GetChild(1).transform.DOScale(new Vector3(1, 1, 1), 0.3f);
        mainManuCanvas.transform.GetChild(2).transform.DOScale(new Vector3(1, 1, 1), 0.3f);

        itemsManuCanvas.transform.GetChild(0).transform.DOScale(new Vector3(0, 0, 0), 0.5f);
        itemsManuCanvas.transform.GetChild(1).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
        itemsManuCanvas.transform.GetChild(1).transform.DOMoveY(180, 0.3f);

        ARPositionCanvas.transform.GetChild(0).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
        ARPositionCanvas.transform.GetChild(1).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
    }

    private void ActivateItemsMenu()
    {
        mainManuCanvas.transform.GetChild(0).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
        mainManuCanvas.transform.GetChild(1).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
        mainManuCanvas.transform.GetChild(2).transform.DOScale(new Vector3(0, 0, 0), 0.3f);

        itemsManuCanvas.transform.GetChild(0).transform.DOScale(new Vector3(1, 1, 1), 0.5f);
        itemsManuCanvas.transform.GetChild(1).transform.DOScale(new Vector3(1, 1, 1), 0.3f);
        itemsManuCanvas.transform.GetChild(1).transform.DOMoveY(300, 0.3f);
    }

    private void ActivateARPosition()
    {
        mainManuCanvas.transform.GetChild(0).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
        mainManuCanvas.transform.GetChild(1).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
        mainManuCanvas.transform.GetChild(2).transform.DOScale(new Vector3(0, 0, 0), 0.3f);

        itemsManuCanvas.transform.GetChild(0).transform.DOScale(new Vector3(0, 0, 0), 0.5f);
        itemsManuCanvas.transform.GetChild(1).transform.DOScale(new Vector3(0, 0, 0), 0.3f);
        itemsManuCanvas.transform.GetChild(1).transform.DOMoveY(180, 0.3f);

        ARPositionCanvas.transform.GetChild(0).transform.DOScale(new Vector3(1, 1, 1), 0.3f);
        ARPositionCanvas.transform.GetChild(1).transform.DOScale(new Vector3(1, 1, 1), 0.3f);
    }

}

```
