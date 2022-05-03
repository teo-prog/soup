import { ParseFlags } from '@angular/compiler';
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
  status: string = 'iniciar'
  palabra: string = ''
  data_form: { [key: string]: any } = {
    palabras: [],
    filas: null,
    columnas: null
  }
  sopa_vacia: any[][] = []
  sopa_letras: any[][] = []
  sopa_busqueda: any[][] = []
  sopa_vertical: any[][] = []
  sopa_diagonal: any[][] = []

  palabras_fragmentada_en_letras: any[][] = []
  fit: boolean
  reversar_palabra: number
  palabra_buscar: any
  palabra_separada: any[] = []
  palabra_separada_reversa: any[] = []
  posicion_palabra: any[] = []

  ngOnInit(): void {
  }

  agregar_palabra() {
    let nueva_palabra = this.palabra.trim();
    this.data_form['palabras'].push(nueva_palabra)
    this.palabra = ''
    this.fue_agregada = true

  }
  buscar_palabra() {
    // dimensiones
    this.status = 'buscar'
    let fil = this.data_form['filas']
    let col = this.data_form['columnas']
    this.posicion_palabra = []
    // separacion de palabras
    let palabra = this.palabra_buscar
    let palabra_reversa = ((palabra.split('')).reverse()).join('')




    for (let i = 0; i < fil; i++) {
      // inicar matriz donde van las busqueda

      this.sopa_vertical[i] = []
      this.sopa_busqueda[i] = []
      this.sopa_diagonal[i] = []
      //// unir una fila como una sola palabra
      let fila = this.sopa_letras[i].join('')
      this.palabra_separada = palabra.split('')
      let busqueda = fila.indexOf(palabra)
      //console.log(fila)
      // console.log(palabra)
      // console.log(busqueda)

      // /////////////   busqueda horizontal  /////////////////////////////////////////////////////////////////   

      // // extraer la posicion donde haye la palabra busqueda 


      // console.log(busqueda)

      if (busqueda != -1) {
        for (let k = busqueda; k < busqueda + palabra.length; k++) {
          this.sopa_busqueda[i][k] = this.palabra_separada[k - busqueda]

          if (k == busqueda) {
            this.posicion_palabra[k] = [i + 1, k + 1]
          } if (k == busqueda + palabra.length - 1) {
            this.posicion_palabra[k] = [i + 1, k + 1]
          }

        }
      }

      // console.log(this.posicion_palabra)

      // //////////////    busqueda  horizontal reversa    ///////////////////////////////////////////////////


      ////procesar la palabras

      this.palabra_separada_reversa = palabra_reversa.split('')
      console.log(this.palabra_separada_reversa)
      ////sacar la posicion donde hayo la palabara
      let busqueda_reversa = fila.indexOf(palabra_reversa)
      console.log(busqueda_reversa)
      console.log(palabra_reversa.length)

      if (busqueda_reversa != -1) {
        for (let k = busqueda_reversa; k < busqueda_reversa + palabra.length; k++) {
          this.sopa_busqueda[i][k] = this.palabra_separada_reversa[k - busqueda_reversa]
          if (k == busqueda_reversa) {
            this.posicion_palabra[k] = [i + 1, k + 1]
          } if (k == busqueda_reversa + palabra.length - 1) {
            this.posicion_palabra[k] = [i + 1, k + 1]
          }
        }
        this.posicion_palabra.reverse()
      }

      ////////////////         busqueda  vertical   ///////////////////////////////////////////////////////////

      ////// cambiar la forma de lectura ahora la columnas son filas
      for (let j = 0; j < col; j++) {
        this.sopa_vertical[i][j] = this.sopa_letras[j][i]

        
        var fila_vertical = this.sopa_vertical[i].join('')
        var busqueda_vertical = fila_vertical.indexOf(palabra)

        if (busqueda_vertical != -1) {
          console.log()
          for (let k = 0; k < busqueda_vertical + palabra.length; k++) {
            this.sopa_busqueda[k][i] = this.palabra_separada[k - busqueda_vertical]
          

            if (k == busqueda_vertical) {
              this.posicion_palabra[k] = [k + 1, i + 1]
            } if (k == busqueda_vertical + palabra.length - 1) {
              this.posicion_palabra[k] = [k + 1, i + 1]
            }

          }
        }
      }

      console.log(fila_vertical)
      console.log(busqueda_vertical)
      console.log(palabra.length)
      console.log(this.palabra_separada)

      ////////////////         busqueda  vertical reversa   ///////////////////////////////////////////////////////////
    
      ////////////////         busqueda  diagonal  de arriba izquiera hacia bajo derecha  ///////////////////////////////////////////////////////////
     


      // leer diagonales como filas
  
     
        // for (let j = 0; j < col-i; j++) {

        //   this.sopa_diagonal[i][j]=this.sopa_letras[i+j][j]
        //   var fila_diagonal= this.sopa_diagonal[i].join('')
        //   var busqueda_diagonal= fila_diagonal.indexOf(palabra)
          
        //     if(busqueda_diagonal!=-1){
        //       // this.sopa_busqueda[i+j][j]= this.palabra_separada[]
        //     }

        // }
        // console.log(busqueda_diagonal)
        // //    for (let j = 0; j < col-i; j++) {

        // //   this.sopa_diagonal[i][j]=this.sopa_letras[i+j][j]
        // //   var fila_diagonal= this.sopa_diagonal[i].join('')
        // //   var busqueda_diagonal= fila_diagonal.indexOf(palabra)
        // //     if(busqueda_diagonal!=-1){
  
        // //     }

        // // }

        // console.log(fila_diagonal)
      
      


      ////////////////         busqueda  diagonal  de abajo derecha hacia arriba izquiera///////////////////////////////////////////////////////////

      this.posicion_palabra = this.posicion_palabra.filter(entry => /\S/.test(entry))
    }


    console.log(this.sopa_busqueda)
    console.log(this.sopa_vertical)

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


    for (var i = 0; i < fil; i++) {
      this.sopa_busqueda[i] = []
      var p = 0
      if (palabras_desordenadas[i]) {
        this.palabras_fragmentada_en_letras[i] = palabras_desordenadas[i].split('')
        var posicion_aletoria_horizontal = Math.floor(Math.random() * (fil - (this.palabras_fragmentada_en_letras[i].length)))
        var pos_aletoria_vertical = Math.floor(Math.random() * (col - (this.palabras_fragmentada_en_letras[i].length)))
        var pos_aleatoria = Math.floor(Math.random() * (col))

        this.reversar_palabra = Math.floor(Math.random() * 2)
        if (this.reversar_palabra == 1) {
          this.palabras_fragmentada_en_letras[i].reverse()
        }

        //llenado vertical--------------------------
        // console.log(this.palabras_fragmentada_en_letras)
        // for (let j = 0; j < col; j++) {

        //   if ((this.palabras_fragmentada_en_letras[i].length == fil) && (this.sopa_vacia[j][i + pos_aleatoria] == null)) {
        //     this.sopa_vacia[j][i + pos_aleatoria] = this.palabras_fragmentada_en_letras[i][j]

        //     console.log(' palabra misma dimension...')
        //   }
        //   if ((this.palabras_fragmentada_en_letras[i].length != fil) && (this.sopa_vacia[j][i + pos_aleatoria] == null)) {

        //     this.sopa_vacia[j + pos_aletoria_vertical][i + posicion_aletoria_horizontal] = this.palabras_fragmentada_en_letras[i][j]
        //     console.log('llenando sopa...')
        //   }
        //   if(this.sopa_vacia[j][i + pos_aleatoria]!= null){
        //     console.log('posicion llena, devolviendo el ciclo..')
        //     i--
        //     break;
        //   }

        // }

        //llenado horizontal-------------------------
        // for (let j = 0; j < col; j++) {

        //   if (this.palabras_fragmentada_en_letras[i].length == col) {
        //     this.sopa_vacia[i][j + pos_aletoria_vertical] = this.palabras_fragmentada_en_letras[i][j]
        //   } else {
        //     // console.log('else')
        //     this.sopa_vacia[i + posicion_aletoria_horizontal][j + pos_aletoria_vertical] = this.palabras_fragmentada_en_letras[i][j]
        //   }
        // }
        //llenado en diagonal derecha-abajo--------------


        var palabra = palabras_desordenadas[i]
        // console.log(palabra)
        for (var j = 0; j < palabra.length + 1; j++) {
          if ((this.sopa_vacia[i][j] == null) && ((col - j) > palabra.length - 1)) {
            this.sopa_vacia[i + j + pos_aletoria_vertical][j + posicion_aletoria_horizontal] = palabra[j - 1]
            // this.sopa_vacia[j ][j +i] = palabra[j - 1]
          }
        }

        // console.log(this.sopa_vacia)







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
    // console.log(this.sopa_letras)
  }
  iniciar_sopa(fil: number, col: number) {
    for (let i = 0; i < 26; i++) {
      this.sopa_vacia[i] = []
      for (let j = 0; j < 26; j++) {
        this.sopa_vacia[i][j] = null
      }
    }
  }
  resolver() {
    let fil = this.data_form['filas']
    let col = this.data_form['columnas']
    this.status = 'resuelto'



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
