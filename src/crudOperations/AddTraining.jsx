import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { useState } from "react";

function AddTraining(props) {
    //State for adding new training.
    const [training, setTraining] = useState({
        activity: '',
        duration: '',
        date: '',

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
        props.addTraining(training);
        setOpen(false);
    }

    //Input -function, that handles and insert every new changes of the input
    //into new customer's state.
    const handleInputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }


    return (
        <>
            <Button
                onClick={() => setOpen(true)}>
                Insert new training
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}>

                <DialogTitle
                    new training application
                >
                </DialogTitle>

                <DialogContent>

                    <TextField
                        label='Activity'
                        name='activity'
                        value={training.activity}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <TextField
                        label='Duration length'
                        name='duration'
                        value={training.duration}
                        onChange={handleInputChanged}
                    >
                    </TextField>

                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                    >

                        <DateTimePicker
                            id="date"
                            name="date"
                            value={training.date}
                            onChange={(newDate) => setTraining({ ...training, date: newDate })}
                            required
                        />

                    </LocalizationProvider>

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

export default AddTraining;