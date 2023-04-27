
function impar() {
    const number = Math.ceil(Math.random() * 10)
    console.log(number)
    if(number % 2) {
        console.log("é impar")
        // window.location("http://www.google.com.br")
    } else {
        console.log("não é impar")
        // window.location("http://www.facebook.com.br")
    }
}

impar()