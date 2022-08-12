class calculator {
    constructor(layarUtama,layarAtas){
        this.layarUtamaElement = layarUtama
        this.layarAtasElement = layarAtas
        this.allClear()
    }

    allClear(){
        this.layarAtas = ''
        this.layarUtama = ''
        this.operator = undefined
    }

    ambilAngka(angka){
        if( angka === '.' && this.layarUtama.includes('.')){return}
        this.layarUtama = this.layarUtama + angka
    }

    ambilOperation(operator){
        this.operator = operator
        if(this.layarAtas) this.hitung()
        this.layarAtas = `${this.layarUtama} ${operator}`
        this.layarUtama = ''
    }

    hapus(){
        this.layarUtama = this.layarUtama.slice(0,-1)

    }

    hitung(){
        this.angkaHitungUtama = parseFloat(this.layarUtama)
        this.angkaHitungAtas = parseFloat(this.layarAtas)
        let hasilHitungan
        if(isNaN(this.angkaHitungAtas) || isNaN(this.angkaHitungUtama)) return
        switch(this.operator){
            case '+' :
                hasilHitungan = this.angkaHitungAtas + this.angkaHitungUtama
                break;
            case '-' :
                hasilHitungan = this.angkaHitungAtas - this.angkaHitungUtama
                break;
            case '*' :
                hasilHitungan = this.angkaHitungAtas * this.angkaHitungUtama
                break;
            case '/' :
                hasilHitungan = this.angkaHitungAtas / this.angkaHitungUtama
                break;
        }
    
        this.layarUtama = hasilHitungan
        this.operator = undefined;
        this.layarAtas = ''

    }

    updateTampilan(){
        this.layarUtamaElement.textContent = this.layarUtama
        this.layarAtasElement.textContent = this.layarAtas
    }

}


const layarUtama = document.querySelector('.current-operand')
const layarBawah = document.querySelector('.previous-operand')
const angka = document.querySelectorAll('[data-number]')
const operator = document.querySelectorAll('[data-operation]')
const jawab = document.querySelector('[data-equals]')
const hapus = document.querySelector('[data-delate]')
const allClear = document.querySelector('[data-allClear]')

const kalkulator = new calculator(layarUtama,layarBawah);

angka.forEach(e => {
    e.addEventListener('click',() => {
        kalkulator.ambilAngka(e.textContent)
        kalkulator.updateTampilan()
    })
})

operator.forEach(e => {
    e.addEventListener('click',() => {
        kalkulator.ambilOperation(e.textContent)
        kalkulator.updateTampilan()
    })
})

jawab.addEventListener('click', () => {
    kalkulator.hitung()
    kalkulator.updateTampilan()
})

allClear.addEventListener('click',() => {
    kalkulator.allClear()
    kalkulator.updateTampilan()
})

hapus.addEventListener('click',() => {
    kalkulator.hapus()
    kalkulator.updateTampilan()
})