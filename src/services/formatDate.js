export function formatDate(timestamp, input = null) {
	const allDate = new Date(timestamp);
	const dia = allDate.getDate() > 10 ? allDate.getDate() : "0" + allDate.getDate();
	const mes = (allDate.getMonth() + 1) > 10 ? allDate.getMonth() + 1 : "0" + (allDate.getMonth() + 1);
	const ano = allDate.getFullYear() > 1000 ?
		allDate.getFullYear() :
		allDate.getFullYear() > 99 ?
			"0" + allDate.getFullYear() :
			allDate.getFullYear() > 9 ?
				"00" + allDate.getFullYear() :
				"000" + allDate.getFullYear();
	if (input)
		return ano + "-" + mes + "-" + dia;
	return dia + "/" + mes + "/" + ano;
}