import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

function EditCustomer(props) {
    //State of current chosen customer data.
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' })

    //Pop up window -function. Check if dialougue window is open or not.
    const [open, setOpen] = useState(false);

    //Closing function for window
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    //Save function for edited customer data.
    const handleSave = () => {
        props.updateCustomer(props.currentCustomer.data.links[0].href, customer);
        setOpen(false);
    }

    //Handle all written inputs.
    const handleInputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }
    return (
        <>
            <Button
                onClick={() => {
                    setCustomer({
                        firstname: props.currentCustomer.data.firstname,
                        lastname: props.currentCustomer.data.lastname,
                        streetaddress: props.currentCustomer.data.streetaddress,
                        city: props.currentCustomer.data.city,
                        email: props.currentCustomer.data.email,
                        phone: props.currentCustomer.data.phone,
                    })
                    setOpen(true);
                }}
            >Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle
                    edit customer form
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
                    ></TextField>


                    <TextField
                        label='Address'
                        name='streetaddress'
                        value={customer.streetaddress}
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


                </DialogContent>

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
            </Dialog >
        </>
    );
}

export default EditCustomer;