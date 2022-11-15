const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE',{
        style:'currency',
        currency:'EUR'
    }).format(value)
}

export default formatCurrency