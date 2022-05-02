import { Component, OnChanges, OnInit } from '@angular/core';


@Component({
  selector: 'app-soup-game',
  templateUrl: './soup-game.component.html',
  styleUrls: ['./soup-game.component.css']
})

export class SoupGameComponent implements OnInit {

  constructor(

  ) { }

  fue_agregada: boolean = false
  palabra: string = ''
  data_form: { [key: string]: any } = {
    palabras: [],
    filas: null,
    columnas: null
  }
  sopa_vacia: any[][] = []
  sopa_letras: any[][] = []
  status: string = 'iniciar'
  palabras_fragmentada_en_letras: any[][] = []
  fit: boolean
  reversar_palabra: number

  ngOnInit(): void {
  }

  agregar_palabra() {
    let nueva_palabra = this.palabra.trim();
    this.data_form['palabras'].push(nueva_palabra)
    this.palabra = ''
    this.fue_agregada = true

  }
  eliminar_palabra(palabra: string) {
    this.data_form['palabras'].forEach((element: string, index: number) => {
      if (element == palabra) {

        this.data_form['palabras'].splice(index, 1)
      }


    });
  }
  jugar() {
    this.status = 'jugando'
    let palabras = this.data_form['palabras']
    let fil = this.data_form['filas']
    let col = this.data_form['columnas']
    this.llenar_sopa(fil, col, palabras)

  }

  llenar_sopa(fil: number, col: number, palabras: any) {

    let palabras_desordenadas = palabras.sort()
    // console.log(palabras_desordenadas)
    this.distribuir_palabras(fil, col, palabras_desordenadas)
    this.rellenar_sopa(fil, col)
  }
  distribuir_palabras(fil: number, col: number, palabras_desordenadas: any) {
    //horizontal
    //Iniciar sopa  
    // var sopa_vacia:any[][]=[]
    this.iniciar_sopa(fil, col)
    var c = 0

    for (var i = 0; i < fil; i++) {
      if (palabras_desordenadas[i]) {

        this.palabras_fragmentada_en_letras[i] = palabras_desordenadas[i].split('')
        this.reversar_palabra = Math.floor(Math.random() * 2)
        if (this.reversar_palabra == 1) {
          this.palabras_fragmentada_en_letras[i].reverse()
          }
          var posicion_aletoria_horizontal = Math.floor(Math.random() * (fil - (this.palabras_fragmentada_en_letras[i].length)))
          var pos_aletoria_vertical = Math.floor(Math.random() * (col - (this.palabras_fragmentada_en_letras[i].length)))
          var pos_aleatoria = Math.floor(Math.random() * (col))
          //llenado vertical--------------------------
          console.log(this.palabras_fragmentada_en_letras)

          console.log(c)


        for (let j = 0; j < col; j++) {

          if ((this.palabras_fragmentada_en_letras[i].length == fil) && (!this.sopa_vacia[j][i + pos_aleatoria])) {
            this.sopa_vacia[j][i + pos_aleatoria] = this.palabras_fragmentada_en_letras[i][j]
            c++
            console.log('entre')
          }
          if ((this.palabras_fragmentada_en_letras[i].length != fil) && (!this.sopa_vacia[j][i + pos_aleatoria])) {
            this.sopa_vacia[j + pos_aletoria_vertical][i + posicion_aletoria_horizontal] = this.palabras_fragmentada_en_letras[i][j]
            c++




          }
        }
        console.log(c)
        //llenado horizontal-------------------------
        // for (let j = 0; j < col; j++) {

        //   if (this.palabras_fragmentada_en_letras[i].length = col) {
        //     this.sopa_vacia[i][j+pos_aletoria_vertical] = this.palabras_fragmentada_en_letras[i][j]
        //   } else {
        //     this.sopa_vacia[i+posicion_aletoria_horizontal][j+pos_aletoria_vertical] = this.palabras_fragmentada_en_letras[i][j]
        //   }
        // }
        //llenado en diagonal derecha-abajo--------------


        // var palabra = palabras_desordenadas[i]
        // console.log(palabra)
        // for (var j = 0; j < palabra.length + 1; j++) {

        //   if ((this.sopa_vacia[i][j]=='') && ((col - j)>palabra.length-1)) {
        //     this.sopa_vacia[i + j + pos_aletoria_vertical][j + posicion_aletoria_horizontal] = palabra[j - 1]

        //   }
        // }

        //console.log(this.sopa_vacia)







        //llenado en diagonal izquierda-abajo
      }
    }
    // this.sopa_vacia.reverse()
    //console.log(this.sopa_vacia)
  }

  rellenar_sopa(fil: number, col: number) {
    for (let i = 0; i < fil; i++) {
      this.sopa_letras[i] = []
      for (let j = 0; j < col; j++) {
        var characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this.sopa_letras[i][j] = (this.sopa_vacia[i][j]) ? this.sopa_vacia[i][j] : this.sopa_letras[i][j] = characters[Math.floor(Math.random() * 27)]
      }
    }
    console.log(this.sopa_letras)
  }
  iniciar_sopa(fil: number, col: number) {
    for (let i = 0; i < 100; i++) {
      this.sopa_vacia[i] = []
      for (let j = 0; j < 100; j++) {
        this.sopa_vacia[i][j] = null
      }
    }
  }
  resolver() {
    let fil = this.data_form['filas']
    let col = this.data_form['columnas']
    this.status = 'resuelto'
    // for (let i = 0; i < fil; i++) {
    //   for (let j = 0; j < col; j++) {
    //     if (this.sopa_vacia[i][j] == this.sopa_letras[i][j]) {
    //       this.sopa_letras[i][j] = '--'
    //         ;

    //     }

    //   }

    // }

  }
  reset() {
    this.fue_agregada = null
    this.palabra = null
    this.data_form = {
      palabras: [],
      filas: null,
      columnas: null
    }
    this.sopa_vacia = []
    this.sopa_letras = []
    this.status = 'iniciar'
    this.palabras_fragmentada_en_letras = []
    this.fit = false
    this.reversar_palabra = 0
  }
  // Only Integer Numbers
 // Only AlphaNumeric
 soloLetras(event) {

  var inp = String.fromCharCode(event.keyCode);

  if (/[a-zA-Z]/.test(inp)) {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
}
}
