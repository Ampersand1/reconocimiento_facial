from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from fastapi.staticfiles import StaticFiles
import cv2
import numpy as np
import shutil
import os

app = FastAPI()
app.mount("/", StaticFiles(directory="static"), name="static")

# Configuración de CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:8000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexión a MongoDB
client = MongoClient("mongodb+srv://lawliet:klvcKTP0M7taFAxn@clusterusuarios.m9ihr5y.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUsuarios")
db = client["usuarios"]
collection = db["personas"]

# Configuración del directorio de subida
UPLOAD_FOLDER = 'uploads/'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.post("/agregar-usuario/")
async def agregar_usuario(nombre: str = Form(...), files: list[UploadFile] = File(...)):
    rutas_foto = []
    for file in files:
        file_location = f"{UPLOAD_FOLDER}/{file.filename}"
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(file.file, file_object)
        rutas_foto.append(file_location)

    nuevo_usuario = {"nombre": nombre, "fotos": rutas_foto}
    collection.insert_one(nuevo_usuario)
    return {"estado": "Usuario agregado exitosamente"}

def comparar_histogramas(img1, img2):
    # Convertir las imágenes a escala de grises
    gray_img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
    gray_img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

    # Calcular los histogramas de las imágenes
    hist_img1 = cv2.calcHist([gray_img1], [0], None, [256], [0, 256])
    hist_img2 = cv2.calcHist([gray_img2], [0], None, [256], [0, 256])

    # Normalizar los histogramas
    cv2.normalize(hist_img1, hist_img1, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    cv2.normalize(hist_img2, hist_img2, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)

    # Calcular la correlación entre los histogramas
    correlation = cv2.compareHist(hist_img1, hist_img2, cv2.HISTCMP_CORREL)

    return correlation

@app.get("/comparar-imagenes/")
async def comparar_imagenes():
    
    # Capturar imagen de la cámara en tiempo real
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    cap.release()

    if not ret:
        return {"error": "No se pudo capturar la imagen de la cámara."}
    
    # Procesar todas las imágenes almacenadas en la base de datos
    resultados = []
    for usuario in collection.find():
        for foto_path in usuario["fotos"]:
            foto = cv2.imread(foto_path)
            if foto is not None:
                # Utilizar la nueva función de comparación de histogramas
                score = comparar_histogramas(frame, foto)
                resultados.append({"usuario": usuario["nombre"], "score": score})

    # Ordenar los resultados por puntuación
    resultados = sorted(resultados, key=lambda x: x["score"], reverse=True)

    return {"resultados": resultados}

@app.get("/obtener-fotos/")
async def obtener_fotos():
    fotos = []
    for usuario in collection.find():
        for foto_path in usuario["fotos"]:
            fotos.append({"usuario": usuario["nombre"], "foto_path": foto_path})
    return {"fotos": fotos}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)