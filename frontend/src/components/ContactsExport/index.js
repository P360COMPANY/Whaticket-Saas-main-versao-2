import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

import { Box, Chip } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import toastError from "../../errors/toastError";
/**/
import { CSVLink } from "react-csv";
import { isArray, isString } from "lodash";


const useStyles = makeStyles(theme => ({
    screen: {
        // backgroundColor: "red",

    },
    container: {
        backgroundColor: "#FAFAFA",
        padding: "20px",
        borderRadius: "6px"
    },
    textField: {
        marginRight: theme.spacing(1),
        flex: 1,
    },

    extraAttr: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    btnWrapper: {
        position: "relative",
        backgroundColor: "#1E90FF",
        color: "white",
        border: "none",
        textDecorationLine: "none"
    },

    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },

}));

const ContactsExport = (props) => {
    const classes = useStyles()

    const [queues, setQueues] = useState([]);
    const [queueSelected, setQueueSelected] = useState([]);

    const [tags, setTags] = useState([]);
    const [selecteds, setSelecteds] = useState([]);

    const [tickets, setTicket] = useState([])
    const [planilha, setPlanilha] = useState([])


    /* select tag */
    useEffect(() => {
        async function fetchData() {
            await loadContacts();
            await loadTags();
            await loadQueues();
            await loadTickets();
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (selecteds.length === 0 && queueSelected.length === 0) {
            setPlanilha(planilha)
        } else {
            // Filtra tickets por tags e setores
            console.log("Abaixo estão o resultado de tickets da api, esses dados não contem nenhum tipo de tratamento:");
            console.log("Tickets");
            console.log(tickets);
            console.log("tags");
            console.log(selecteds);
            console.log("Filas");
            console.log(queueSelected);
            let tempTickets = []
            if(selecteds.length){
                tempTickets = tickets.filter(ticket => filterTickets(ticket, selecteds, 'tags'))
            }
            if(queueSelected.length){
                tempTickets = tempTickets.filter(ticket => filterTickets(ticket, queueSelected, 'queue'))
            }

            /* 
            Mapeia cada ticket e concatena com a variavel
            "finalTempTickets" e pula de linha para formar uma tabela
            */
            let finalTempTickets = ""
            for (let contact of tempTickets) {
                const t = contact
                finalTempTickets +=
                    `${t.contact.name},${t.contact.number},${t.contact.email},${t.tags.map(tag => tag.name)},${t.queue !== null ? (t.queue.map(queue => queue.name)) : ""}\n`
            }
            tempTickets = "Nome, Numero, E-mail, Setores, Tags\n" + finalTempTickets
            setPlanilha(tempTickets)
        }
    }, [selecteds, queueSelected])

    //Filtra tiquet por tags ou queues
    const filterTickets = (ticket, filter, typeFilter) => {
        if (ticket[typeFilter].length) {
            if (ticket[typeFilter].filter(opgParaFiltrar => filter.filter(tag => tag.name === opgParaFiltrar.name).length >= 1).length >= 1) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }

    }




    const loadTickets = async () => {
        try {
            const { data } = await api.get(`/tickets`);
            setTicket(data.tickets)
        } catch (err) {
            toastError(err);
        }
    };

    //Pega Tags
    const loadTags = async () => {
        try {
            const { data } = await api.get(`/tags/list`);
            setTags(data)
        } catch (err) {
            toastError(err);
        }
    };


    //Pega filas
    const loadQueues = async () => {
        try {
            const { data } = await api.get(`/queue`);
            setQueues(data)
        } catch (err) {
            toastError(err);
        }
    }



    const onChangeTags = async (value, reason) => {
        let optionsChanged = []
        if (reason === 'create-option') {
            if (isArray(value)) {
                for (let item of value) {
                    optionsChanged.push(item);
                }
            }
            await loadTags();
        } else {
            optionsChanged = value;
        }
        setSelecteds(optionsChanged);
    }

    const onChangeQueues = async (value, reason) => {
        let optionsChanged = []
        if (reason === 'create-option') {
            if (isArray(value)) {
                for (let item of value) {
                    optionsChanged.push(item);
                }
            }
            await loadQueues();
        } else {
            optionsChanged = value;
        }
        setQueueSelected(optionsChanged);
    }



    /* Get contacts */
    const loadContacts = async () => {
        try {
            const { data } = await api.get(`/contacts`);
            const apiData = data.contacts
            let finalTempTickets = ""
            for (let contact of apiData) {
                finalTempTickets += `${contact.name},${contact.number},${contact.email},,\n`
            }
            let tempTickets = "Nome, Numero, E-mail, Tags, Setores\n" + finalTempTickets
            await setPlanilha(tempTickets)

        } catch (err) {
            toastError(err);
        }
    };


    return (
        <div className={classes.screen}>
            <div className={classes.container}>
                <div>
                    <p>Deseja selecionar algum filtro?</p>

                    <Box style={{ padding: 10 }}>
                        <Autocomplete
                            multiple
                            size="small"
                            options={tags}
                            value={selecteds}
                            getOptionLabel={(option) => option.name}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        style={{ backgroundColor: option.color || '#eee', textShadow: '1px 1px 1px #000', color: 'white' }}
                                        label={option.name}
                                        {...getTagProps({ index })}
                                        size="small"
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Filtro por Tags"
                                />
                            )}
                            onChange={(e, value, acao) => onChangeTags(value, acao)}
                        />
                    </Box>



                    <Box style={{ padding: 10 }}>
                        <Autocomplete
                            multiple
                            size="small"
                            options={queues}
                            value={queueSelected}
                            getOptionLabel={(option) => option.name}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        style={{ backgroundColor: option.color || '#eee', textShadow: '1px 1px 1px #000', color: 'white' }}
                                        label={option.name}
                                        {...getTagProps({ index })}
                                        size="small"
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    placeholder="Filtro por Setores"
                                />
                            )}
                            onChange={(e, value, acao) => onChangeQueues(value, acao)}
                        />
                    </Box>


                    <hr style={{
                        color: "rgb(230, 230, 230)"
                    }} />

                </div>


                <div>
                    <DialogActions>
                        <Button
                            onClick={props.handleClose}
                            color="secondary"
                            variant="outlined"
                        >
                            {i18n.t("contactModal.buttons.cancel")}
                        </Button>

                        <CSVLink
                            separator=";"
                            filename={'pressticket-contacts.csv'}
                            data={planilha}
                            className={classes.btnWrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.buttonEnvi}
                            >
                                EXPORTAR
                            </Button>

                        </CSVLink>
                    </DialogActions>
                </div>

            </div>
        </div>
    )
}


export default ContactsExport;