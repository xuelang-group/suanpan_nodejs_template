echo updateBuildMachine
host=user@remote
port=22
keypath=~/.ssh/id_rsa
project=$(basename $PWD)
dir_prefixed=~/remote_build
ssh -i ${keypath} -p ${port} ${host} "mkdir ${dir_prefixed}" 
rsync --delete -avhe "ssh -i ${keypath} -p ${port}" ./ ${host}:${dir_prefixed}/${project}
# please install node on your remote
# if node installed, but still find node command not found
# try edit .bashrc and comment out this line
# [ -z "$PS1" ] && return
ssh -i ${keypath} -p ${port} ${host} "cd ${dir_prefixed}/${project}/ && npm run docker"

