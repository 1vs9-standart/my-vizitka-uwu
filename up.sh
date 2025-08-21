#/bin/bash
sudo docker stop 1vs9-dev-uwu
sudo docker rm 1vs9-dev-uwu
sudo docker build -t 1vs9-dev-uwu .
sudo docker run -d --name 1vs9-dev-uwu --network host 1vs9-dev-uwu
