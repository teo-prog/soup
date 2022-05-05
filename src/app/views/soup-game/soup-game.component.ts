import { identifierName } from '@angular/compiler';
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
  sopa_letras_replica:any[][]=[]

  posicion_inicial: any
  posicion_final: any
  palabras_fragmentada_en_letras: any[][] = []
  fit: boolean
  reversar_palabra: number
  palabra_buscar: string
  ngOnInit(): void {
  }
  buscar_palabra() {
    
    this.status='buscar'
    this.posicion_inicial = 0
    this.posicion_final = 0
    var sopa_letras = this.sopa_letras
    var palabra = this.palabra_buscar;
    // si la palabra esta vacia
    // const busqueda_palabra = (sopa_letras = [], palabra = '') => {
    if (sopa_letras.length === 0) {
      return false;
    };
    // declaro dimensiones
    const height = this.data_form['columnas'];
    const width = this.data_form['filas'];
    // declaro  direcciones 
    const direcciones = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ];

    var explorar_letra = (x: number, y: number, k: number) => {
      

      if (sopa_letras[x][y] !== palabra[k]) {
        return false;
      }

      if (k === palabra.length - 1) {
        let posicion_final = [x + 1, y + 1]
        this.posicion_final = posicion_final
        this.sopa_letras[x][y]='XXX'
      
        // la replica no cambia
        
        return true;
      }
      this.sopa_letras[x][y]='XXX'
      
      
    

      for (const [dx, dy] of direcciones) {
        const i = x + dx;
        const j = y + dy;
        if (i >= 0 && i < height && j >= 0 && j < width) {
          //  this.sopa_letras[x][y] = palabra[k]

          if (explorar_letra(i, j, k + 1)) {
            return true;
          }
        }
      }
     
      sopa_letras[x][y] = palabra[k]; // reset

      return false;
    };
    for (let i = 0; i < height; i++) {
      this.sopa_busqueda[i]

      for (let j = 0; j < width; j++) {

        if (explorar_letra(i, j, 0)) {
          let posicion_inical = [i + 1, j + 1]
          
          this.posicion_inicial = posicion_inical
          return true;
        }

      }

    }
    return false;
    // };

    // console.log(busqueda_palabra(sopa_letras, palabra));


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
        for (let j = 0; j < col; j++) {

          if ((this.palabras_fragmentada_en_letras[i].length == fil) && (this.sopa_vacia[j][i + pos_aleatoria] == null)) {
            this.sopa_vacia[j][i + pos_aleatoria] = this.palabras_fragmentada_en_letras[i][j]

            console.log(' palabra misma dimension...')
          }
          if ((this.palabras_fragmentada_en_letras[i].length != fil) && (this.sopa_vacia[j][i + pos_aleatoria] == null)) {

            this.sopa_vacia[j + pos_aletoria_vertical][i + posicion_aletoria_horizontal] = this.palabras_fragmentada_en_letras[i][j]
            console.log('llenando sopa...')
          }
          if (this.sopa_vacia[j][i + pos_aleatoria] != null) {
            console.log('posicion llena, devolviendo el ciclo..')
            i--
            break;
          }

        }

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


        // var palabra = palabras_desordenadas[i]
        // console.log(palabra)
        // for (var j = 0; j < palabra.length + 1; j++) {
        //   if ((this.sopa_vacia[i][j] == null) && ((col - j) > palabra.length - 1)) {
        //     this.sopa_vacia[i + j + pos_aletoria_vertical][j + posicion_aletoria_horizontal] = palabra[j - 1]
        //     this.sopa_vacia[j ][j +i] = palabra[j - 1]
        //   }
        // }

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
      this.sopa_letras_replica[i]=[]
      for (let j = 0; j < col; j++) {
        var characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this.sopa_letras[i][j] = (this.sopa_vacia[i][j]) ? this.sopa_vacia[i][j] : this.sopa_letras[i][j] = characters[Math.floor(Math.random() * 27)]
        this.sopa_letras_replica[i][j] = this.sopa_letras[i][j]
      }
    }
    // console.log(this.sopa_letras)
  }
  iniciar_sopa(fil: number, col: number) {
    for (let i = 0; i < 26; i++) {
      this.sopa_vacia[i] = []
      this.sopa_letras[i] = []
      this.sopa_letras_replica[i]=[]
      for (let j = 0; j < 26  ; j++) {
        this.sopa_vacia[i][j] = null
        this.sopa_letras[i][j] =null 
      this.sopa_letras_replica[i][j]=null
      }
    }
  }
  resolver() {
    let fil = this.data_form['filas']
    let col = this.data_form['columnas']
    this.status = 'resuelto'



  }
 
  reset() {
    this.status = 'iniciar'
    this.fue_agregada = null
    this.palabra = null
    this.data_form = {
      palabras: [],
      filas: null,
      columnas: null
    }
    this.sopa_vacia = []
    this.sopa_letras = []
    this.sopa_letras_replica = []
   
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
