//定义grunt 自动执行的任务
//需要导出一个函数
//函数接受一个grunt形参，grunt是一个对象，内部提供一些api,快速创建构造任务
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    //配置选项
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/js/app.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/scss/*.css'],
                tasks: ['sass']
            }
        },
        clean: {
            // temp: 'temp/*txt'
            temp: 'temp/**' //清楚temp下所有的

        },
        orange: {
            name: 'orange-lin'
        },
        build: {
            options: {
                orange: 'lin'
            },
            js: 1,
            css: 2
        }
    })

    //sass
    // grunt.loadNpmTasks('grunt-sass')

    //插件
    // grunt.loadNpmTasks('grunt-contrib-clean')

    //多目标任务
    grunt.registerMultiTask('build', function () {
        console.log(this.options())
        console.log(`target: ${this.target}, data: ${this.data}`)
    })


    //取配置项
    grunt.registerTask('config-task', () => {
        console.log(grunt.config('orange.name'))
    })
    //注册任务
    grunt.registerTask('foo', () => {
        console.log("hello grunt")
    })
    grunt.registerTask('bar', '任务描述', () => {
        console.log("other task~~")
    })
    // grunt.registerTask('default', '默认任务', () => {
    //     console.log("默认 task~~")
    // })
    grunt.registerTask('bad', () => {
        console.log("bad task~~")
        return false
    })
    grunt.registerTask('bad-async', function () {
        const done = this.async(false);
        setTimeout(() => {
            console.log("async task working~~")
            done(false)
        }, 3000)
    })

    //异步任务
    grunt.registerTask('async-task', function () {
        const done = this.async();
        setTimeout(() => {
            console.log("async task working~~")
            done()
        }, 3000)
    })

    //数组传入 default映射默认任务 默认执行数组中的任务
    grunt.registerTask('default', ['sass', 'babel', 'watch'])

    //自动加载所有grunt插件的任务
    loadGruntTasks(grunt)
}