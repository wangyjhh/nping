#!/usr/bin/env node

import { Command } from "commander"
import { getCurrentTime } from "./utils/getCurrentTime.js"
import { formatOutput } from "./utils/formatOutput.js"
import pkg from "../package.json"
import { spawn, ChildProcessWithoutNullStreams } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import iconv from "iconv-lite"

let ping: ChildProcessWithoutNullStreams

const program = new Command()

program
	.name("nping")
	.description("nping工具")
	.option("-f, --nolog", "不保存日志文件")
	.option("-a, --address", "将地址解析为主机名")
	.option("-n, --count <number>", "设置ping包个数")
	.option("-l, --length <number>", "设置ping包的大小")
	.option("-w, --wait <number>", "设置超时时间")
	.argument("[ip]", "IP地址/域名")
	.action((ip, options, command) => {
		if (!ip) {
			command.help({ error: true })
		} else {
			let reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g
			ip = ip.match(reg)
			if (ip == null) {
				formatOutput("参数错误", "请填入合法的IP地址/域名", "error")
			} else {
				let params = [`${ip}`]
				if (options.count) {
					params.push("-n", options.count)
				} else {
					params.push("-t")
				}

				if (options.length) {
					params.push("-l", options.length)
				} else if (options.address) {
					params.push("-a")
				} else if (options.wait) {
					params.push("-w", options.wait)
				}

				ping = spawn("ping", params)

				ping.stdout.on("data", (data: any) => {
					let str = iconv.decode(data, "gbk").trimStart()
					if (!options.nolog) {
						fs.appendFileSync(path.join(os.homedir(), "/Desktop/nping_log.txt"), formatOutput(getCurrentTime(), str, "success"))
					} else {
						formatOutput(getCurrentTime(), str, "success")
					}
				})
			}
		}
	})

program.version(pkg.version, "-v,--version", "输出版本号")

program.parse()

process.on("SIGINT", () => {
	ping.on("exit", () => {
		process.exit()
	})
})
