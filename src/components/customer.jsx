//Importing tools from libraries.

import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";

//Importing other classes or endpoints.

import AddCustomer from "../crudOperations/AddCustomer";
import EditCustomer from "../crudOperations/EditCustomer";

//Importing visuals files.

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function Customer() {
    //State variables for ...
    // i. saving customers data from REST API.
    // ii. saving messages of actions / reponses.
    // iii. saving visibility of pop window for add, edit, etc.

    const [customers, setCustomers] = useState([]);
    const [messages, setMessages] = useState('');
    const [open, setOpen] = useState(false);

    //AG Grid Columns

    //In the assignment, it was required that customers full name will
    //be also displayed in training list. Having name separated as firstname
    //and lastname is little bit reduntant. Therefore I want to connect
    //one customers all names (first, sub and last) as one fullname -entity

    //User LuDeveloper from Stackoverflow had a simple, yet excellent solution
    //for connecting names together, or more specifically connecting two columns
    //field together.

    //Source: https://stackoverflow.com/questions/64462830/ag-grid-how-to-display-two-columns-as-single-column-in-the-header-display

    const columns = [

        {
            headerName: 'Name', field: 'fullname', valueGetter(params) {
                return params.data.firstname + ' ' + params.data.lastname;
            },
            sortable: true, filter: true
        },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'E-mail', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone number', field: 'phone', sortable: true, filter: true },

        //EDIT -painike.
        {
            cellRenderer: params => {
                console.log(params.data)
                return (
                    <EditCustomer updateCustomer={updateCustomer} currentCustomer={params} />
                );
            }, width: 120
        },

        //DELETE -painike.
        {
            cellRenderer: params =>

                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>,
            width: 120
        }

    ]

    //IMPORTANT!
    //The original URL source for customers API.
    //Brought from Moodle site --> Front End --> Lopputyo
    //--> REST dokumentaatio.

    const REST_URL = 'https://traineeapp.azurewebsites.net/api/customers';

    //Need useEffect in order fetching customers JSON
    //from REST api. Executed only once after the first render.
    useEffect(() => getCustomers(), []);


    //GET RESTrequest. I.e., fetching customer data from REST API call
    //via getCustomers().
    const getCustomers = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(error => console.error(error))
    }

    //Add function for customer.
    //Remember to call /customers -endpoint and use POST -method.
    const addCustomer = (customer) => {
        fetch(REST_URL,
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(customer)
            })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                    setMessages('New customer was added succesfully!');
                } else {
                    alert('Something went wrong.')
                }
            })
            .catch(err => console.error(err))
    }


    //Update function for edited customer's data.
    const updateCustomer = (REST_URL, currentCustomerEdited) => {
        fetch(REST_URL,
            {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(currentCustomerEdited)

            })
            .then(response => {
                if (response.ok) {
                    setMsq('Current customer data is edited successfully!');
                    setOpen(true);
                    getCustomers();
                }
                else
                    alert('Something went wrong during editing. Responsetext: ' + response.statusText);
            })
            .catch(error => console.error(error))
    }

    //Delete function for customer.
    //Note the /customers/{id} -endpoint and use DELETE -method.

    //Let's check api's json format from REST_URL.
    //Since the customer info in the api is saved
    //in links -> 1 and links is an array, then correct fetch format
    //for links is links[1]. 

    const deleteCustomer = (params) => {
        //console.log("Parameters are " + params.data.links[1])

        //Adding a confirmation function in the first row,
        //in case user mistakenly pressed DELETE -button.
        if (window.confirm('Do really want delete this customer?')) {
            fetch(params.data.links[1].href, { method: 'DELETE' })
                .then(response => {

                    setOpen(true);
                    getCustomers();

                    if (response.ok) {
                        getCustomers();
                        setMessages('Customer was deleted succesfully!');
                    } else {
                        alert("Something went wrong!")
                    }
                })
                .catch(error => console.error(error));
        };
    }

    //Export -function that saves all customers
    //data in a CSV -file.
    const gridRef = useRef();

    const exportCustomer = useCallback(() => {
        gridRef.current.api.exportDataAsCsv({ skipColumnHeaders: true });
    }, []);

    return (
        <>


            <div className="ag-theme-material"
                style={{ height: '700px', widt: '95%', margin: 'auto' }}>
                <h1>Customer List</h1>

                <AddCustomer addCustomer={addCustomer} />
                <Button
                    onClick={exportCustomer}
                >
                    Export customer as CSV
                </Button>

                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    ref={gridRef}
                    suppressExcelExport={true}
                >
                </AgGridReact>

                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={messages}
                >

                </Snackbar>
            </div>
        </>)

}

export default Customer;