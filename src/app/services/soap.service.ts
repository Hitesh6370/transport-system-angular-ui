import { Injectable } from '@angular/core';
import { NgxSoapService, Client, ISoapMethodResponse } from 'ngx-soap';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  intA: number;
  intB: number;
  loading: boolean;
  showDiagnostic: boolean;
  message: string;
  xmlResponse: string;
  jsonResponse: string;
  resultLabel: string;
  client: Client;

  constructor(private soap: NgxSoapService) 
  {

  }

  soapCall() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://localhost:8085/ws/soap.wsdl', true);
    //const input_element = <HTMLInputElement> document.getElementById('choosenNumber');
    //console.log('chVal : ' + input_element.value);
    //const choosenNumberValue = input_element.value;
    // The following variable contains the xml SOAP request.
    const sr =
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://transportsystem.com/soap">
          <soapenv:Header/>
            <soapenv:Body>
              <soap:GetPathDetailsRequest>
                <soap:source>Earth</soap:source>
                <soap:destination>Uranus</soap:destination>
              </soap:GetPathDetailsRequest>
            </soapenv:Body>
          </soapenv:Envelope>`;

    xmlhttp.onreadystatechange =  () => {
            if (xmlhttp.status == 200) {
                const xml = xmlhttp.responseXML;
                // Here I'm getting the value contained by the <return> node.
                const response_number = parseFloat(xml.getElementsByTagName("ns2:PathDetails")[0].childNodes[3].nodeValue);
                // Print result square number.
                console.log("value is");
            }
      
    }
    // Send the POST request.
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    xmlhttp.send(sr);
  }

}
