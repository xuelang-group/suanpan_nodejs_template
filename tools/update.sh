echo updateBuildMachine
host=user@ma.ch.ine.ip
port=22
keypath=~/.ssh/id_rsa
project=$(basename $PWD)
rsync -delete -avhe "ssh -i ${keypath} -p ${port}" ./ ${host}:~/build_suanpan/${project}
ssh -i ${keypath} -p ${port} ${host} "cd ~/build_suanpan/${project}/ && bash ./docker/build.sh"
