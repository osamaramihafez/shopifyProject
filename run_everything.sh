cd db; docker-compose down; docker-compose up --build -d; cd ..;
docker kill local_frontend_html; docker rm local_frontend_html; docker rmi local_frontend -f; 
cd html; docker build . -t local_frontend; docker run --name=local_frontend_html -d -p 80:80 local_frontend;
cd ..; node index.js;