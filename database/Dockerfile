FROM mysql:latest

# Copier les scripts SQL dans le répertoire /docker-entrypoint-initdb.d/ à l'intérieur du conteneur
COPY ./ /docker-entrypoint-initdb.d/

EXPOSE 3306
