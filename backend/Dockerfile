FROM python:3.11-alpine3.18

# Çalışma dizini
WORKDIR /backend

# Gerekli paketlerin kurulumu
RUN apk add --no-cache gcc musl-dev libffi-dev openssl-dev && \
    pip install --upgrade pip

# Uygulama dosyalarının kopyalanması
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Uygulama başlatma komutu
CMD ["python", "app.py"]
