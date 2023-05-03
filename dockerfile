FROM ubuntu:20.04
USER root
RUN apt-get update -y && \
    apt-get -y upgrade 
RUN apt-get install -y curl
COPY bqq /bqq
RUN curl -sL https://deb.nodesource.com/setup_15.x -o setup_14.sh && \
    sh ./setup_14.sh && \
    apt update -y && \
    apt install nodejs
WORKDIR /bqq
RUN npm install -g @angular/cli
RUN npm install --global yarn && \
    yarn install && \
    ng build
COPY startup.sh /bqq
WORKDIR /bqq
RUN chmod 777 ./startup.sh
CMD [ "/bin/bash","startup.sh" ]
