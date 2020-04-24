echo updateBuildMachine
host=builder
# host=root@127.0.0.1
project=$(basename $PWD)
dir_prefixed=~/remote_build
ssh ${host} "mkdir ${dir_prefixed}" 
rsync --delete -avhe ./ ${host}:${dir_prefixed}/${project}
# please install node on your remote
# if node installed, but still find node command not found
# try edit .bashrc and comment out this line
# [ -z "$PS1" ] && return
ssh ${host} "cd ${dir_prefixed}/${project}/ && npm run docker"

