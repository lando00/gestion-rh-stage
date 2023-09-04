var a = "24:10"
var b = "01:30"
a = a.split(":")
b = b.split(":")
var h = parseInt(a[0]) + parseInt(b[0])
var m = parseInt(a[1]) + parseInt(b[1])
var heure = h + Math.floor(m/60)
var minutes = m%60

var somme = (heure<=9?"0":"")+heure+":"+(minutes<=9?"0":"")+minutes
console.log(somme)
