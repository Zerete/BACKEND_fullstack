# Sanos y Salvos - Plataforma de Reporte de Mascotas

Este proyecto es una aplicación full-stack basada en una **arquitectura de microservicios**, diseñada para la gestión y reporte de mascotas perdidas o encontradas. Desarrollado como parte de la Evaluación 2 para la carrera de Ingeniería en Informática.

## 🚀 Arquitectura del Sistema

La solución se divide en cuatro componentes principales que interactúan a través de una red local:

1. **Frontend (React + Vite):** Interfaz de usuario dinámica con mapas georreferenciados.
2. **BFF / API Gateway (Django):** Orquestador que centraliza las peticiones del frontend y las deriva a los servicios correspondientes.
3. **MS Seguridad (Django):** Servicio encargado de la autenticación JWT, registro de usuarios y gestión de roles (RBAC).
4. **MS Mascotas (Django):** Servicio de persistencia y lógica de negocio para los reportes de mascotas.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React, Tailwind CSS, Leaflet (Mapas).
* **Backend:** Python 3.14+, Django, Django REST Framework.
* **Autenticación:** JSON Web Tokens (JWT).
* **Control de Versiones:** Git & GitHub.

## 📋 Requisitos Previos

* Python y Node.js instalados en el sistema.
* Instalar las dependencias globales de Python para los servicios del Backend:
    ```bash
    python -m pip install django django-cors-headers djangorestframework djangorestframework-simplejwt requests
    ```

## 🔧 Configuración, Inicialización y Ejecución

Para levantar el sistema completo, primero se deben preparar las bases de datos ejecutando las migraciones, luego crear el administrador del sistema y finalmente iniciar todos los servicios en paralelo (se recomienda abrir terminales separadas para cada uno):

```bash
# 1. Configurar, Crear Administrador y Levantar el Microservicio de Seguridad (Puerto 8002)
cd ms_seguridad
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8002

# 2. Configurar y Levantar el Microservicio de Mascotas (Puerto 8001)
cd ..
cd ms_mascotas
python manage.py migrate
python manage.py runserver 8001

# 3. Configurar y Levantar el BFF / Gateway (Puerto 8000)
cd ..
cd bff_web
python manage.py migrate
python manage.py runserver 8000

# 4. Levantar el Frontend (React)
cd ..
cd frontend
npm install
npm run dev