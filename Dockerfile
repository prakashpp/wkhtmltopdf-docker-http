FROM node
MAINTAINER Prakash Pandey <prakash.pandey@fulfil.io>

RUN cd /tmp \
	&& apt-get update \
	&& apt-get install -y \
		xfonts-base \
		xfonts-75dpi \
		xserver-common \
	&& curl -SLO "http://download.gna.org/wkhtmltopdf/0.12/0.12.2.1/wkhtmltox-0.12.2.1_linux-jessie-amd64.deb" \
	&& dpkg -i wkhtmltox-0.12.2.1_linux-jessie-amd64.deb

ENV NODE_PATH /usr/local/lib/node_modules

ADD server.js /opt/server.js
RUN npm install -g forever wkhtmltopdf

EXPOSE 5001
ENTRYPOINT ["forever"]
CMD ["/opt/server.js"]
