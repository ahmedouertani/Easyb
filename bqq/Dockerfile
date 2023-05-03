# Étape de construction
FROM node:14
WORKDIR /app
# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./
# Installer les dépendances
#RUN npm ci
COPY . .
RUN npm install
RUN npm run build --prod

# Étape 2 : Utiliser une image Nginx pour servir l'application Angular construite
#FROM nginx:1.21.3-alpine

# Copier les fichiers de configuration Nginx
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers construits de l'application Angular à partir de l'étape précédente
#COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application
#EXPOSE 80

# Lancer Nginx pour servir l'application Angular
#CMD ["nginx", "-g", "daemon off;"]

CMD ["ng", "serve"]
