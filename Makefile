dev:
	HOST=0.0.0.0 \
	PORT=3001 \
	PROXY_TARGET=http://localhost:8080 \
	APP_URL=http://localhost:3000 \
	yarn dev