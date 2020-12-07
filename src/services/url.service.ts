import {Injectable} from "@angular/core";

@Injectable()
export class UrlService {

  getLocal() {

    //API LARAVEL
   //return 'http://localhost:8888/crmback/public';

    //API NODEJS
    return 'http://localhost:3000/api';
  }


}
