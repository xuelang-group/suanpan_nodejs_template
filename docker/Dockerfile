FROM registry.cn-shanghai.aliyuncs.com/shuzhi/nodejs_stream_base:10.15
WORKDIR /home/app/
COPY package.json package-lock.json ./
RUN npm install --only=production --registry=https://registry.npm.taobao.org
COPY index.js lib.js ./
CMD [ "bash" ]