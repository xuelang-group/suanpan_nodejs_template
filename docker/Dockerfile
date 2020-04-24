ARG ARCH="amd64"
FROM registry.cn-shanghai.aliyuncs.com/shuzhi-$ARCH/node_sdk_base:node12 AS deps
RUN apt-get update && apt-get install -y jq
COPY package.json /tmp
RUN jq '{ dependencies, devDependencies }' < /tmp/package.json > /tmp/deps.json

FROM registry.cn-shanghai.aliyuncs.com/shuzhi-$ARCH/node_sdk_base:node12
WORKDIR /home/app/
COPY --from=deps /tmp/deps.json ./package.json
COPY package-lock.json .npmrc ./
RUN npm install --only=production
COPY . ./
CMD [ "bash" ]