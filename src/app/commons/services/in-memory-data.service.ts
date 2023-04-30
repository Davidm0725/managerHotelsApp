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
        "bookings": [
          {
            "id": 123,
            "room": "101",
            "hotel": "Real plaza",
            "nameGuest": "David",
            "basisCost": 125,
            "typeRoom": "Standard",
            "totalCost": 147,
            "status": "checkin",
            "checkin": "25/05/2023",
            "checkout": "26/05/2023",
            "dateBooking": new Date()
          },
          {
            "id": 134,
            "room": "102",
            "nameGuest": "Yesika",
            "hotel": "Real plaza",
            "basisCost": 125,
            "typeRoom": "Standard",
            "totalCost": 147,
            "status": "checkin",
            "checkin": "25/05/2023",
            "checkout": "26/05/2023",
            "dateBooking": new Date()
          }
        ],
        "rooms": [
          {
            "id": "101",
            "room": "101",
            "basisCost": 0,
            "typeRoom": "",
            "location": "",
            "taxes": 0,
            "status": "available"
          },
          {
            "id": "102",
            "room": "102",
            "basisCost": 0,
            "typeRoom": "",
            "location": "",
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
            "id": "101",
            "room": "101",
            "basisCost": 0,
            "typeRoom": "",
            "location": "",
            "taxes": 0,
            "status": "disabled"
          },
          {
            "id": "102",
            "room": "102",
            "basisCost": 0,
            "typeRoom": "",
            "location": "",
            "taxes": 0,
            "status": "available"
          }
        ]
      }


    ];
    return { data };
  }
}