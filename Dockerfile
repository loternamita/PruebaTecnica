# Etapa de construcción: Usa una imagen de node como base
#Aquí estamos usando la versión 18.
FROM node:alpine AS build

WORKDIR /app

# Copiando 'package.json' y 'package-lock.json'
COPY package*.json ./

# Instalando dependencias del proyecto
RUN npm install

# Copiando los archivos y carpetas del proyecto al directorio de trabajo actual (es decir, la carpeta 'app' dentro de la imagen)
COPY . .

# Construyendo la aplicación para producción con optimizaciones de Angular
RUN npm run build --prod

# Etapa de ejecución: Usa una imagen de nginx para servir la aplicación
FROM nginx:stable-alpine AS production

# Eliminando la configuración predeterminada de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiando la configuración personalizada de Nginx si tienes una. Si no, omite este paso.
# COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copiando los archivos de construcción desde la etapa de 'build' a la carpeta de contenido de Nginx
COPY --from=build /app/dist/my-app /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

# Exponiendo el puerto 80 para acceder a la aplicación desde un navegador
EXPOSE 80

# Ejecutando Nginx en primer plano para mantener el contenedor en ejecución
CMD ["nginx", "-g", "daemon off;"]
