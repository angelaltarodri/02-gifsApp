import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
  //angular con providedIn: 'root' eleva nuestro servicio a un nivel global de acceso
})
export class GifsService {

  private servicioUrl : string = "https://api.giphy.com/v1/gifs"
  private apiKey: string = "fd1MpTuKfdxPOjyZ7ARYfaRn2pBs4l7t";
  private _historial: string [] = [];

  //TO DO: cambiar any por su tipo
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query)

    console.log(params)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((res) => {
      console.log(res.data);
      this.resultados = res.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    })



  }
}
