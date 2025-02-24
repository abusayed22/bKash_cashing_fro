


export function formatBangladeshiAmount(amount) {
    if (amount == undefined) {
        return 0
    } else {
        const amountStr = amount?.toString();

        // Split into integer and decimal parts
        const [integerPart, decimalPart] = amountStr.split('.');

        // Group the integer part by Bangladeshi style (first group of 3, subsequent groups of 2)
        const firstGroup = integerPart.slice(0, integerPart.length % 3 || 3);
        const remainingGroups = integerPart.slice(integerPart.length % 3 || 3);

        // Check if remainingGroups is a valid string and match groups of two digits
        const groupedInteger = [firstGroup, ...(remainingGroups ? remainingGroups.match(/.{2}/g) || [] : [])].join(',');

        // Combine integer part with decimal part (if exists)
        const formattedAmount = decimalPart ? `${groupedInteger}.${decimalPart}` : groupedInteger;

        return `৳${formattedAmount}`;
    }
}

