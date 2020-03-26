const exec = require('child_process').exec
const run = function (cmd) {
  return new Promise((resolve, reject) => {
    console.log(`run cmd: ${cmd}`)
    // const out = exec(cmd, {
    //   encoding: 'utf8'
    // })
    // console.log(out)
    const p = exec(cmd, {
      encoding: 'utf8'
    },
    function (error, stdout, stderr) {
      if (error) {
        console.error('error: ' + error)
        reject(error)
      }
      console.log('cmd end: ' + stdout)
      console.log('cmd err: ' + stderr)
      resolve()
    })

    p.stdout.on('data', (data) => {
      console.log(data)
    })
    // return out
  })
}
const archMaps = {
  arm64: 'arm64_v8',
  x64: 'amd64'
}
const env = process.env

async function buildImage (imageName, tag) {
  console.log('build', `${imageName}:${tag} `)
  await run(`docker build -t ${imageName}:${tag} -f docker/Dockerfile .`)
}

async function pushImage (imageName, tag) {
  //   try {
  await run(`docker push ${imageName}:${tag}`).catch((error) => {
    console.log(error)
  })
  //   } catch (error) {}
}

async function createDockerNameFile (arch, imageName, tag) {
  await run('mkdir docker/images')
  await run(`echo ${imageName}:${tag} > docker/images/${arch}`)
}

async function tagImage (imageName, oldTag, newTag) {
  await run(`docker tag ${imageName}:${oldTag} ${imageName}:${newTag}`)
}

const images = require('./../package.json').suanpan_imageName

async function work (imageName) {
  console.log('building', imageName)
  const version = require('./../package.json').version
  await buildImage(imageName, version)
  await tagImage(imageName, version, 'latest')

  if (env.DONTPUSH) {
    console.log('skip push images')
  } else {
    await pushImage(imageName, version)
    await pushImage(imageName, 'latest')
  }
}

if (env.CROSS_BUILD) console.log('cross build')
async function main () {
  await run('pwd')

  for (const [arch, imageName] of Object.entries(images)) {
    if (typeof imageName && imageName.length > 0) {
      if (env.CROSS_BUILD || archMaps[process.arch] === arch) {
        // createDockerNameFile(arch,imageName,"latest")
        await work(imageName)
      }
    }
  }
}
main()
