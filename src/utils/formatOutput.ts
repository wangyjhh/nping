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
		return `${out}`
	} else {
		switch (type) {
			case "success":
				console.log(chalk.bgGreen.white(` ${title} `), chalk.green(` ${out} `), "\r\n")
				break
			case "error":
				console.log(chalk.bgRed.white(` ${title} `), chalk.red(` ${out} `), "\r\n")
				break
			case "warning":
				console.log(chalk.bgYellow.white(` ${title} `), chalk.yellow(` ${out} `), "\r\n")
				break
		}
		return `${title} ${out}\r\n`
	}
}
