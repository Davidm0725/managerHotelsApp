import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const data = [
      {
        user: {
          user: "admin",
          pass: "1234",
          token: "eurowemdcdofuverlivuhadfasdkfhadkh"
        }
      },
      {
        "id": 1,
        "name": "Real plaza",
        "location": "cll 20",
        "phone": "236527356",
        "email": "plaza@correo.com",
        "country": "Colombia",
        "status": "available",
        "bookings": [],
        "rooms": [
          {
            "id": 101,
            "room": 101,
            "basisCost": 0,
            "typeRoom": "",
            "taxes": 0,
            "status": "available"
          },
          {
            "id": 102,
            "room": 102,
            "basisCost": 0,
            "typeRoom": "",
            "taxes": 0,
            "status": "available"
          }
        ]
      },
      {
        "id": 2,
        "name": "Real plaza",
        "location": "cll 20",
        "phone": "236527356",
        "email": "plaza@correo.com",
        "country": "Colombia",
        "status": "available",
        "bookings": [],
        "rooms": [
          {
            "id": 101,
            "room": 101,
            "basisCost": 0,
            "typeRoom": "",
            "taxes": 0,
            "status": "disabled"
          },
          {
            "id": 102,
            "room": 102,
            "basisCost": 0,
            "typeRoom": "",
            "taxes": 0,
            "status": "available"
          }
        ]
      }


    ];

    // { id: 12, name: 'Dr. Nice' },
    // { id: 13, name: 'Bombasto' },
    // { id: 14, name: 'Celeritas' },
    // { id: 15, name: 'Magneta' },
    // { id: 16, name: 'RubberMan' },
    // { id: 17, name: 'Dynama' },
    // { id: 18, name: 'Dr. IQ' },
    // { id: 19, name: 'Magma' },
    // { id: 20, name: 'Tornado' }

    return { data };
  }
}