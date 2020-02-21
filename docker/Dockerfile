FROM registry.cn-shanghai.aliyuncs.com/shuzhi/nodejs_stream_base:12.15
WORKDIR /home/app/
COPY package.json package-lock.json .npmrc ./
RUN npm install --only=production
COPY index.js ./
CMD [ "bash" ]