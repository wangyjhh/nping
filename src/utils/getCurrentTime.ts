// 获取当前时间的函数
export function getCurrentTime() {
	let d = new Date()
	let YYYY = d.getFullYear()
	let MM = d.getMonth() + 1
	let DD = d.getDate()
	let h = d.getHours()
	let m = d.getMinutes()
	let s = d.getSeconds()
	return `${YYYY}-${MM < 10 ? "0" + MM : MM}-${DD < 10 ? "0" + DD : DD} ${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s} `
}
