import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { useState, useEffect } from "react";

//Import visuals.
import 'react-big-calendar/lib/css/react-big-calendar.css';


function TrainingCalendar() {
    //URL for trainings.
    const REST_URL = 'http://traineeapp.azurewebsites.net/api/trainings';

    //State for saving trainings data from REST API.
    const [trainings, setTrainings] = useState([]);



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

    //UseEffect in order fetching training JSON -data
    //from REST api. Executes only once after the first render.
    useEffect(() => getTrainings(), []);

    //Locales will refer to calender.
    //E.g. will use American calender as the reference.
    const locales = {
        'en-US': 'date-fns/locale/en-US'
    }

    //Listing all calendar components.
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })

    //Events will handle 
    //all given days' events from JSON.

    //Credit for William Velazquez
    //for explaining how to insert trainings -stat
    //into bigcalendar events -format.

    //Source: https://www.appsloveworld.com/reactjs/200/236/trying-to-access-mapped-api-data-and-show-it-in-react-big-calendar-reactjs


    const events = trainings.map((reservation) => {
        return {
            //id: trainings.id,
            title: trainings.activity,
            start: new Date(trainings.date),
            end: new Date(trainings.date),
            allday: false
        }
    });

    return (
        <>

            <div>

                <Calendar

                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, margin: "50px" }}
                />


            </div>
        </>
    );
}

export default TrainingCalendar;