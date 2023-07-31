# Node_Ping

>nping命令基于windows原版ping命令，进行二次封装，除支持原ping命令部分功能外，还默认支持将命令行的输出打印日志到桌面的 `nping_log.txt` 文件，通过 `-f` 选项可关闭日志功能 。

## 安装
```bash
# npm
npm i nping -g

# pnpm
pnpm add nping -g

```



## 使用

```bash
Usage: nping [options] [ip]

nping工具

Arguments:
  ip                     IP地址/域名

Options:
  -f, --nolog            不保存日志文件
  -a, --address          将地址解析为主机名
  -n, --count <number>   设置ping包个数
  -l, --length <number>  设置ping包的大小
  -w, --wait <number>    设置超时时间
  -v,--version           输出版本号
  -h, --help             display help for command
```

## 截图

![nping1](https://yujiehh.top/nping1.png)

![nping2](https://yujiehh.top/nping2.png)

![nping3](https://yujiehh.top/nping3.png)

![nping4](https://yujiehh.top/nping4.png)

## 备注

本项目基于node环境运行，如没有请先安装[node](https://nodejs.org/en/)

