import React, { useState, useEffect, useReducer } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import moment from "moment";
/*
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import DescriptionIcon from "@material-ui/icons/Description";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

import api from "../../services/api";
*/

const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
moment.updateLocale("pt", {
    months: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ],
});

const useStyles = makeStyles((theme) => ({
    days: {
        height: "10px",
        border: "10px 0 0 0",
        textAlign: "center",
    },
    day: {
        textAlign: "center",
    },
    line: {
        textAlign: "center",
        height: "150px",
    },
}))


const Calendar = (props) => {
    const classes = useStyles();



    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        </TableCell>
                        <TableCell colSpan={5} >
                            <Button>
                                <KeyboardArrowLeftIcon />
                            </Button>
                            <Button>
                                <KeyboardArrowRightIcon />
                            </Button>
                            Fevereiro 2023
                        </TableCell>
                        <TableCell>
                            <Button>
                                create
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell className={classes.days}>
                            DOM
                        </TableCell>
                        <TableCell className={classes.days}>
                            SEG
                        </TableCell >
                        <TableCell className={classes.days}>
                            TER
                        </TableCell>
                        <TableCell className={classes.days}>
                            QUA
                        </TableCell>
                        <TableCell className={classes.days}>
                            QUI
                        </TableCell>
                        <TableCell className={classes.days}>
                            SEX
                        </TableCell>
                        <TableCell className={classes.days}>
                            SAB
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.line}>
                        <TableCell className={classes.day}>
                            01
                        </TableCell>
                        <TableCell className={classes.day}>
                            02
                        </TableCell>
                        <TableCell className={classes.day}>
                            03
                        </TableCell>
                        <TableCell className={classes.day}>
                            04
                        </TableCell>
                        <TableCell className={classes.day}>
                            05
                        </TableCell>
                        <TableCell className={classes.day}>
                            06
                        </TableCell>
                        <TableCell className={classes.day}>
                            07
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.line}>
                        <TableCell className={classes.day}>
                            08
                        </TableCell>
                        <TableCell className={classes.day}>
                            09
                        </TableCell>
                        <TableCell className={classes.day}>
                            10
                        </TableCell>
                        <TableCell className={classes.day}>
                            11
                        </TableCell>
                        <TableCell className={classes.day}>
                            12
                        </TableCell>
                        <TableCell className={classes.day}>
                            13
                        </TableCell>
                        <TableCell className={classes.day}>
                            14
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.line}>
                        <TableCell className={classes.day}>
                            08
                        </TableCell>
                        <TableCell className={classes.day}>
                            09
                        </TableCell>
                        <TableCell className={classes.day}>
                            10
                        </TableCell>
                        <TableCell className={classes.day}>
                            11
                        </TableCell>
                        <TableCell className={classes.day}>
                            12
                        </TableCell>
                        <TableCell className={classes.day}>
                            13
                        </TableCell>
                        <TableCell className={classes.day}>
                            14
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.line}>
                        <TableCell className={classes.day}>
                            08
                        </TableCell>
                        <TableCell className={classes.day}>
                            09
                        </TableCell>
                        <TableCell className={classes.day}>
                            10
                        </TableCell>
                        <TableCell className={classes.day}>
                            11
                        </TableCell>
                        <TableCell className={classes.day}>
                            12
                        </TableCell>
                        <TableCell className={classes.day}>
                            13
                        </TableCell>
                        <TableCell className={classes.day}>
                            14
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
};

function calendarBuild(value) {
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");

    const calendar = [];

    while (day.isBefore(endDay, "day")) {
        calendar.push(
            Array(7)
                .fill(0)
                .map(() => day.add(1, "day").clone())
        );
    }

    return calendar;
}


export default Calendar

