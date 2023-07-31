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
				formatOutput("error", "请填入合法的IP地址/域名", "参数错误")
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
					const reg =
						/(?:来自\s(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[\w.-]+)\s的回复:\s字节=\d+\s时间[<=>]\d+ms\sTTL=\d+)|(?:来自\s(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[\w.-]+)\s的回复:\s无法访问目标主机。)|(?:PING：传输失败。常见故障。)|(?:请求超时。)/g
					let ping_str = str.match(reg) === null ? "" : str.match(reg)![0]
					let ping_end = str.split(reg).filter((item) => item !== "" && item !== "\r\n")[0]
						? str
								.split(reg)
								.filter((item) => item !== "" && item !== "\r\n")[0]
								.trimStart()
						: str.split(reg).filter((item) => item !== "" && item !== "\r\n")[0]

					if (!options.nolog) {
						if (ping_str !== "") {
							fs.appendFileSync(path.join(os.homedir(), "/Desktop/nping_log.txt"), formatOutput("success", ping_str, getCurrentTime()))
						}
						if (ping_end) {
							fs.appendFileSync(path.join(os.homedir(), "/Desktop/nping_log.txt"), formatOutput("success", ping_end))
						}
					} else {
						if (ping_str) {
							formatOutput("success", ping_str, getCurrentTime())
						}
						if (ping_end) {
							formatOutput("success", ping_end)
						}
					}
				})

				ping.stdout.on("error", (chunk: any) => {
					console.log(chunk)
				})
				ping.stdout.on("end", () => {
					fs.appendFileSync(path.join(os.homedir(), "/Desktop/nping_log.txt"), "\r\n\r\n\r\n")
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
