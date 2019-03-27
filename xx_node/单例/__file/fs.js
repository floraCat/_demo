readFile(url,code,callback);
readFileSync(url,code );


writeFile(filename, data[, options], callback)
writeFileSync(filename, data[, options])


watchfile()
unwatchfile()


fs.unlink(path, callback) // 删除文件
fs.unlinkSync(path)


fs.open(path, flags[, mode], callback) // 打开文件
fs.openSync(path, flags, [mode])


fs.close(fd, callback) // 关闭文件
fs.closeSync(fd)


fs.ftruncate(fd, len, callback) // 截取文件
fs.truncateSync(path, len)


fs.appendFile(name,str,encode,callback); // 向文件中追加写入
fs.appendFileSync(filename, data, [options])

-----------------

mkdir(path[, mode], callback) // 创建目录
mkdirSync()


readdir(path, callback) // 查看目录
readdirSync()


fs.rmdir(path, callback) // 删除目录
fs.rmdirSync(path)

-----------------

exists(path, callback) // 判断文件路径是否存在
stat() // 获取文件信息


fs.rename(oldName，newName，callback(err)) // 改变文件名
fs.renameSync(oldPath, newPath) 


createReadStream(path, [options]) // 创建一个读取操作的数据流


createWriteStream(path, [options]) // 创建一个写入数据流对象