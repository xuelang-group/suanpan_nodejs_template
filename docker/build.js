const exec = require('child_process').execSync;
let run = function (cmd) {
    console.log(`run cmd: ${cmd}`)
    let out = exec(cmd, {
        encoding: 'utf8',
    })
    console.log(out)
    console.log(typeof out)
    return out
}
const arch_maps = {
    arm64: "arm64v8",
    x64: "amd64"
}
let env = process.env

function buildImage(image_name, tag) {
    run(`docker build -t ${image_name}:${tag} -f docker/Dockerfile .`)
}

function pushImage(image_name, tag) {
    try {
        run(`docker push ${image_name}:${tag}`)
    } catch (error) {
    }

}
function createDockerNameFile(arch,image_name, tag){
    run(`mkdir docker/images`)
    run(`echo ${image_name}:${tag} > docker/images/${arch}`)
}
function tagImage(image_name, old_tag, new_tag) {
    run(`docker tag ${image_name}:${old_tag} ${image_name}:${new_tag}`)
}

let images = require('./../package.json').suanpan_image_name

function work(image_name) {
    let version = require('./../package.json').version
    buildImage(image_name, version)
    tagImage(image_name, version, "latest")
    
    if (env.DONTPUSH) {
        console.log('skip push images')
    } else {
        pushImage(image_name, version)
        pushImage(image_name, "latest")
    }
}


if (env.CROSS_BUILD) console.log('cross build')
run('pwd')
for (let [arch, image_name] of Object.entries(images)) {
    if (typeof image_name && image_name.length > 0) {
        if (env.CROSS_BUILD || arch_maps[process.arch] === arch) {
            // createDockerNameFile(arch,image_name,"latest")
            work(image_name)
        }
    }
}