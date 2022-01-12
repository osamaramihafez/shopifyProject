docker build . -t local_frontend
docker run -p 80:80 local_frontend