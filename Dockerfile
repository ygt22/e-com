# Dockerfile
FROM nginx:alpine

# SSL sertifikalarını ve nginx konfigürasyon dosyasını container içerisine kopyala
COPY ./nginx-selfsigned.crt /etc/nginx/ssl/nginx-selfsigned.crt
COPY ./nginx-selfsigned.key /etc/nginx/ssl/nginx-selfsigned.key
COPY ./nginx.conf /etc/nginx/nginx.conf

# Web dosyalarını nginx'in varsayılan dizinine kopyala
# (Opsiyonel olarak kullanılabilir, gerekli statik dosyalar buraya taşınabilir.)
#COPY app /usr/share/nginx/html

# HTTPS (443) portunu expose et
EXPOSE 443

# Nginx başlatma
CMD ["nginx", "-g", "daemon off;"]
