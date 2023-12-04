//Importing tools.

import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { format, parseISO } from "date-fns";
import { Button, Snackbar } from "@mui/material";

//Importing other files.

import AddTraining from "../crudOperations/AddTraining";


//Importing visual files.

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Training() {
    //State variables for ...
    // i. saving training data from REST API.
    // ii. saving customers' name from Traingings REST API links.2.href.
    //iii. saving messages of actions / reponses.
    //iv. aving visibility of pop window for add, edit, etc.
    const [trainings, setTrainings] = useState([]);
    const [names, setNames] = useState([]);
    const [messages, setMessages] = useState('');
    const [open, setOpen] = useState(false);

    //AG Grid Columns


    const columns = [

        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Duration (minutes)', field: 'duration', sortable: true, filter: true },
        {
            headerName: 'Date',

            //Alla oleva rivi oli kylla ohjeiden mukainen mutta saan silti "Invalid time value".
            //Varmistin, etta ensin hyodennetaan parsea ja sitten formattia.
            //Lisaksi argumenttin takia, parsen loppuun pitaa olla new Date().

            //field: 'date',
            //field: format(parseISO('date', "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date()), "dd.MM.yyyy"),

            //LOPULTA TOIMIVA RATKAISU: 

            cellRenderer: params => {
                console.log(params.data)
                return (
                    format(parseISO(params.data.date, "yyyy-MM-dd´T´HH:mm:ss.SSSxxx", new Date()), "dd.MM.yyyy HH:mm")
                )
            },

            //Syyt vaikeuksia taman cellRenderer kanssa: Ensiksi, jallen kerran, PITAA OLLA 'params' JA 'params.data', MUUT ARVOT EI HYVAKSYTAAN!
            //Toiseksi, cellRenderer pitaa palautaa arvo, eli se on FUNKTIO OPERAATORI. 

            width: '300px',
            sortable: true,
            filter: true

        },
        {
            headerName: 'Links to Customer info',
            field: 'links.2.href',

            //Field, joka on palautaa vain merkkijono,
            //ei ole minkalaista dynaamista toimintoa,
            //jolla hakisi toisen json tiedostoa linkin
            //kautta.

            //Siksi joutuu kaytamaan cellRenderer tai rendererCell
            //(joissakin ulkoisessa lahteissa hyodennettiin jalkeimasta),
            //saadakseen tai fetch:attua json tiedostoa

            /*
            cellRenderer: params => {
                //Haetaan ensin asiakkaan JSON tiedosto links kautta
                useEffect(() => {
                    fetch(params.data.links[2].href)
                        .then(response => response.json())
                        .then(responseData => {
                            setNames(responseData.content)
                        })
                        .catch(error => console.error(error))
                }, []);
                return (
                    names.firsname
                )
                },
                */

            //Valettavasti tama ongelmallinen koodi
            //silla se tekee "lopputomasti" tai jatkuvasti
            //get -pyyntoja kyseiselle linkille,
            //joka kuormittaa konetta.


            width: '500px',
            sortable: true,
            filter: true

        },
        //DELETE -painike.
        {
            cellRenderer: params =>

                <Button size="small" color="error" onClick={() => deleteTraining(params)}>
                    Delete
                </Button>,
            width: 120
        }


    ]

    //IMPORTANT!
    //The original URL source for trainings API.
    //Brought from Moodle site --> Front End --> Lopputyo
    //--> REST dokumentaatio.

    //Also, for fetching customer name in column,
    //we need 

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/trainings';


    //Need useEffect in order fetching training JSON -data
    //from REST api. Executed only once after the first render.
    useEffect(() => getTrainings(), []);

    //GET RESTrequest. I.e., fetching training data from REST API call
    //via getTrainings().

    const getTrainings = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData.content)
                console.log(trainings)
            }).catch(error => console.error(error))
    }

    //Yritin getTrainings -lohossa fetchata
    //ensimmaisen harjoituksen tehnyt asiakkaan nimen.

    //console.log(fetch(trainings[0].links[2].href)
    //.then(response => response.json())
    //.then(data => console.log(data.firstname + ' ' + data.lastname)))

    //Netissa ei jostain syysta ollut mitaan teoriaa eikä malliesimerkkeja,
    //miten haetaan json linkin kautta toista json tiedostoja 
    //(tassa tapauksessa, trainings.json -> links[2].href,
    //jossa on linkki harjoituksen tehnyt asiakkaan json tietoja).
    //Jouduin aikamoiseen trial & error (lahes brute force)
    // saada kyseista asiakaan nimea (kesti neljasosaa paivastani).

    //Ongelmana tassa tapauksessa, etta tulee eka renderointi sellainen
    //virhe ettei koodi loyda trainings[0].links[2].href.
    //Vasta kun tekee uusia muutoksia, niin sitten koodi ymmartaa
    //kyseisen arrayn arvoa, silla nyt trainings on tallennettu muistiin

    //Siksi haluaisin hyodontaa kolumnissa cellRenderer, joka suoritaa 
    //asiakkaan nimen tiedonhankintaa trainings[0].links[2].href
    //vasta kun ensimmainen useEffect on suoritettu.

    //Ongelmana on se, etten ihan viela pysty hallitsemaan cellRenderer.
    //Tarkemmin sanottuna, miten palautan cellRenderer tehty
    //fetch:attu JSON-tieto nyt kyseiseen field -lohkoon?



    //Add function for training.
    const addTraining = (training) => {
        fetch(REST_URL,
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(training)
            })
            .then(response => {
                if (response.ok) {
                    getTrainings();
                    setMessages('New training was added succesfully!');
                } else {
                    alert('Something went wrong.')
                }
            })
            .catch(err => console.error(err))
    }


    //Delete function for trainings.
    const deleteTraining = (params) => {
        //console.log("Parameters are " + params.data.links[1])

        //Adding a confirmation function in the first row,
        //in case user mistakenly pressed DELETE -button.
        if (window.confirm('Do really want delete this training?')) {
            fetch(params.data.links[1].href, { method: 'DELETE' })
                .then(response => {

                    setOpen(true);
                    getTrainings();

                    if (response.ok) {
                        getTrainings();
                        setMessages('Training was deleted succesfully!');
                    } else {
                        alert("Something went wrong!")
                    }
                })
                .catch(error => console.error(error));
        };
    }

    //Remember /trainings/{id} enpoint and use DELETE method.
    return (
        <div className="ag-theme-material"
            style={{ height: '700px', width: '95%', margin: 'auto' }}>

            <h1>Trainings List</h1>

            <AddTraining addTraining={addTraining} />

            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}>
            </AgGridReact>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={messages}
            >

            </Snackbar>
        </div>)
}

export default Training;