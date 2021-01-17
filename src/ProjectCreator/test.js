// const latestVersion = require('latest-version');

// (async () => {
// 	console.log(await latestVersion('react'));
// 	//=> '0.18.0'

// 	console.log(await latestVersion('@sindresorhus/df'));
// 	//=> '1.0.1'

// 	// Also works with semver ranges and dist-tags
// 	console.log(await latestVersion('npm', {version: 'latest-5'}));
// 	//=> '5.5.1'
// })();
// const fs = require("fs");
// const path = require("path");

// // fs.existsSync(path.join(__dirname, "package.json"))
// // ? PackageJSON =  require(path.join(process.cwd(), "package.json")) 
// // 	: PackageJSON = fs.writeFileSync(process.cwd(), JSON.stringify({}, null, 2), "utf8");

// 	console.log(fs.existsSync(path.join(__dirname, "/package.json")))
// 	// console.log(fs.writeFileSync(process.cwd(), JSON.stringify({}, null, 2), "utf8"))
// 	console.log(__dirname)


const  init = require('init-package-json')
var path = require('path')

// a path to a promzard module.  In the event that this file is
// not found, one will be provided for you.
var initFile = path.resolve(process.env.HOME, '.npm-init')

// the dir where we're doin stuff.
var dir = process.cwd()

// extra stuff that gets put into the PromZard module's context.
// In npm, this is the resolved config object.  Exposed as 'config'
// Optional.
var configData = { some: 'extra stuff' }

// Any existing stuff from the package.json file is also exposed in the
// PromZard module as the `package` object.  There will also be free
// vars for:
// * `filename` path to the package.json file
// * `basename` the tip of the package dir
// * `dirname` the parent of the package dir

init(dir, initFile, configData, function (er, data) {
  // the data's already been written to {dir}/package.json
  // now you can do stuff with it
})