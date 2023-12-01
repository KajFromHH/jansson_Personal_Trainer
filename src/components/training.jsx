import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from 'dayjs';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Training() {
    //State variables for ...
    // i. saving training data from REST API.
    // ii.
    const [trainings, setTrainings] = useState([]);

    //AG Grid Columns


    const columns = [

        //{
        //    headerName: 'Name', field: 'fullname', valueGetter(params) {
        //        return params.data.firstname + ' ' + params.data.lastname;
        //    }
        //},
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Duration (minutes)', field: 'duration', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        { hearderName: 'Person', field: 'links.href.{id}.customer.firstname' }, //Todo -> fix person name shown in training
        {
            cellRenderer: params => {
                formatDate(params)
            }
        }

    ]

    //IMPORTANT!
    //The original URL source for trainings API.
    //Brought from Moodle site --> Front End --> Lopputyo
    //--> REST dokumentaatio.

    const REST_URL = 'http://traineeapp.azurewebsites.net/api/trainings';

    //Need useEffect in order fetching customers JSON
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
            })
            .catch(error => console.error(error))
    }

    //Cellrenderoinnin funktio paivamaarian formatointiin.
    const formatDate = (params) => {
        console.log("Date parameters: " + params.data.content.date)
        //return (
        //  dayjs(params.data.content.date).format('DD/MM/YYYY')
        //)
    };

    //Delete function for trainings.
    //Remember /trainings/{id} enpoint and use DELETE method.
    return (
        <div className="ag-theme-material"
            style={{ height: '700px', widt: '95%', margin: 'auto' }}>
            <h1>Trainings List</h1>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}>
            </AgGridReact>
        </div>)
}

export default Training;