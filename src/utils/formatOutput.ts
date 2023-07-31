import chalk from "chalk"

export const formatOutput = (title: string, out: string, type: "success" | "error" | "warning") => {
	switch (type) {
		case "success":
			console.log(chalk.bgGreen.white(` ${title} `), chalk.green(` ${out} `))
			break
		case "error":
			console.log(chalk.bgRed.white(` ${title} `), chalk.red(` ${out} `))
			break
		case "warning":
			console.log(chalk.bgYellow.white(` ${title} `), chalk.yellow(` ${out} `))
			break
	}
	return `${title} ${out}`
}
