echo updateBuildMachine
host=user@remote
port=22
keypath=~/.ssh/id_rsa
project=$(basename $PWD)
ssh -i ${keypath} -p ${port} ${host} "mkdir ~/remote_build/" 
rsync --delete -avhe "ssh -i ${keypath} -p ${port}" ./ ${host}:~/remote_build/${project}
ssh -i ${keypath} -p ${port} ${host} "cd ~/remote_build/${project}/ && npm run docker"
