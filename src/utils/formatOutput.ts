import chalk from "chalk"

export const formatOutput = (type: "success" | "error" | "warning", out: string, title?: string) => {
	if (!title) {
		switch (type) {
			case "success":
				console.log(chalk.green(` ${out.trimEnd()} `))
				break
			case "error":
				console.log(chalk.red(` ${out.trimEnd()} `))
				break
			case "warning":
				console.log(chalk.yellow(` ${out.trimEnd()} `))
				break
		}
		return `\r\n${out}`
	} else {
		switch (type) {
			case "success":
				console.log("\r\n", chalk.bgGreen.white(` ${title} `), chalk.green(` ${out} `))
				break
			case "error":
				console.log("\r\n", chalk.bgRed.white(` ${title} `), chalk.red(` ${out} `))
				break
			case "warning":
				console.log("\r\n", chalk.bgYellow.white(` ${title} `), chalk.yellow(` ${out} `))
				break
		}
		return `\r\n${title} ${out}`
	}
}
