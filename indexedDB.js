        import { uid } from './uid.js';
        
        // const carsData = [
        //     { id: 1, name: "bmw", model: "X7", year: 2024 },
        //     { id: 2, name: "audi", model: "A4", year: 2023 },
        //     { id: 3, name: "lamborghini", model: "huracane", year: 2020 },
        //     { id: 4, name: "nissan", model: "gtr", year: 2021 },
        //     { id: 5, name: "rolls royce", model: "cullinan", year: 2020 },
        //     { id: 6, name: "rolls royce", model: "wraith", year: 2020 },
        //     { id: 7, name: "mercedes benz", model: "maybach", year: 2020 },
        // ];



        let db = null
        let objectStore  = null;
        let DBOpenReq = indexedDB.open('carsDB',29);

        DBOpenReq.addEventListener('error',(err)=>{
            console.log('error happen');
        });

        DBOpenReq.addEventListener('success',(ev)=>{
            db = ev.target.result;
            console.log("success open DB",db);
        });

        DBOpenReq.addEventListener('upgradeneeded',(ev)=>{
            db = ev.target.result;
            let oldVersion = ev.oldVersion;
            let newVersion = ev.newVersion || db.version;
            console.log('DB upgraded from',oldVersion,'to',newVersion);
            console.log('upgrade',db);

            if(!db.objectStoreNames.contains('carStore')){
                objectStore = db.createObjectStore('carStore',{
                keyPath:'id',
            });
            }

            //db.createObjectStore("bikeStore");
            if(db.objectStoreNames.contains('bikeStore')){
                db.deleteObjectStore('bikeStore');
             }
           
        });

        document.testForm.addEventListener('submit',(ev) => {
          ev.preventDefault();

          let name = document.getElementById('name').value.trim();
          let country = document.getElementById('country').value.trim();
          let age = parseInt(document.getElementById('age').value);
          let owned = document.getElementById('owned').checked;
          let data = {
            id:uid(),
            name,
            country,
            age,
            owned
        };

        let tx = db.transaction('carStore','readwrite');
        tx.oncomplete = (ev)=> {
            console.log(ev);
        }

        tx.onerror = (ev) => {
            console.warn(ev);
        }

        let store = tx.objectStore('carStore');
        let request = store.add(data);

        request.onsuccess = (ev) => {
            console.log('succesfully added data');
        };

        request.onerror = (ev) => {
            console.log('error while addding data');
        }

        });



        // let db;
        // const request = indexedDB.open("MyTestDatabase");

        // request.onerror = (event) => {
        //     console.error("Error", event);
        // };

        // request.onupgradeneeded = (event) => {
        //     db = event.target.result;

        //     const objectStore = db.createObjectStore("cars", { keyPath: "id" });
        //     objectStore.createIndex("name", "name", { unique: false });
        //     objectStore.createIndex("model", "model", { unique: true });
        // };

        // request.onsuccess = (event) => {
        //     db = event.target.result;
        //     console.log("Database open successfully", db);

        //     // Add records
        //     const carsObjectStore = db.transaction("cars", "readwrite").objectStore("cars");
        //     carsData.forEach((car) => {
        //         carsObjectStore.add(car);
        //     });

        //     // Delete record after adding
        //     const deleteRequest = db.transaction(["cars"], "readwrite").objectStore("cars").delete(1);

        //     deleteRequest.onsuccess = (e) => {
        //         console.log("Record with id 1 deleted successfully");
        //     };

        //     deleteRequest.onerror = (e) => {
        //         console.error("Error deleting record with id 1", e);
        //     };

        //     // const getrequest = db.transaction(["cars"]);
        //     // const objectStore =

        //     const getRequest = db.transaction("cars").objectStore("cars").get(1);

        //     getRequest.onsuccess = (event) => {
        //     const result = event.target.result;
        //     if (result) {
        //         console.log(`Data after deletion: ${result.name}`);
        //     } else {
        //         console.log("No data found after deletion");
        //     }
        // };

        // getRequest.onerror = (event) => {
        //     console.error("Error while getting data after deletion", event);
        // };
        // }
