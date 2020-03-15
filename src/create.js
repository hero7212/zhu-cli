const axios = require('axios')
const ora = require('ora')
const inquirer = require('inquirer')
// create 的所有的逻辑

// create功能是创建项目
// 拉取你自己的所有项目列出来，让用户选 安装哪个项目
// 选完后，显示所有版本号 1.0


// 1) 获取项目列表
const fetchRepoList = async () => {
    let { data } = await axios.get()
    return data
}

// 可能还需要用户配置一些数据 来结合渲染我的项目
module.exports = async (projectName) => {
    // 1) 获取项目的所有模板
    const spinner = ora('fetching template....')
    spinner.start()
    let repos = await fetchRepoList()
    spinner.succeed()
    repos = repos.map(item => item.name)
    console.log(repos)

    // 获取之前 显示loading, 关闭loading
    // 选择模板 inquirer
    let { repo } = await inquirer.prompt({
        name: 'repo',   // 获取选择后的结果
        type: 'list',
        message: 'please choise a template to create project',
        choices: repos
    })
    console.log(repo)
}


