


export function formatBangladeshiAmount(value) {
    // bangla format 
    // const numberAmount = Number(amount)
    // return new Intl.NumberFormat('bn-BD', {
    //     style: 'currency',
    //     currency: 'BDT',
    //     minimumFractionDigits: 2,
    // }).format(numberAmount);

    // indian format 
    if(!value) return 0;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\d+),(\d{2})$/, "$1,$2");
}

