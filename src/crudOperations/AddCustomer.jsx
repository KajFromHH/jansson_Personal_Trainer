import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

function AddCustomer(props) {
    //State for adding new customer
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''

    })

    //State for checking if dialog window is open or not.
    //I.e., true means 'open dialog window',
    //while false is 'close dialog windows'. 
    const [open, setOpen] = useState(false);

    //Close -function.
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick')
            setOpen(false);
    }

    //Save -function.
    const handleSave = () => {
        props.addCustomer(customer);
        setOpen(false);
    }

    //Input -function, that handles and insert every new changes of the input
    //into new customer's state.
    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }
    return (
        <>
            <Button
                onClick={() => setOpen(true)}>
                Insert new customer
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}>

                <DialogTitle
                    new customer application
                >
                </DialogTitle>

                <DialogContent>

                    <TextField
                        label='First name'
                        name='firstname'
                        value={customer.firstname}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <TextField
                        label='Last name'
                        name='lastname'
                        value={customer.lastname}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <TextField
                        label='Street address'
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <TextField
                        label='Postcode'
                        name='postcode'
                        value={customer.postcode}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <TextField
                        label='City'
                        name='city'
                        value={customer.city}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <TextField
                        label='E-mail'
                        name='email'
                        value={customer.email}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <TextField
                        label='Phone number'
                        name='phone'
                        value={customer.phone}
                        onChange={handleInputChanged}
                    >
                    </TextField>




                    <DialogActions>

                        <Button
                            onClick={handleSave}>
                            Save
                        </Button>

                        <Button
                            onClick={handleClose}>
                            Close
                        </Button>

                    </DialogActions>

                </DialogContent>


            </Dialog >
        </>
    );
}

export default AddCustomer;