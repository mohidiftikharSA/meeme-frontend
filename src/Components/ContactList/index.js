import React from 'react'
import { Accordion } from 'react-bootstrap'
import user from "../../Images/user44.png"
import classes from "./index.module.scss"
import Search from 'Components/Search'

const data = [
    {
        name: "Jaxson George",
        img : user,
        status: true
    },
    {
        name: "Cheyenne Gouse",
        img : user,
        status: true
    },
    {
        name: "Nolan Botosh",
        img : user,
        status: true
    },
    {
        name: "Ahmad Levin",
        img : user,
        status: true
    },
    {
        name: "Angel Vetrovs",
        img : user,
        status: true
    },
    {
        name: "Giana Curtis",
        img : user,
        status: true
    },
    {
        name: "Kadin Carder",
        img : user,
        status: true
    },
    {
        name: "Charlie Lubin",
        img : user,
        status: true
    },
    {
        name: "Omar Gouse",
        img : user,
        status: true
    },
    {
        name: "Martin Baptista",
        img : user,
        status: true
    },
    {
        name: "Brandon Dokidis",
        img : user,
        status: true
    },
]

const ContactList = () => {

    return (
        <Accordion.Body>
            <ul className={classes.prizeList}>
                {
                    data.map((item, ind) => {
                        return (
                            <li>
                                <img src={item.img} alt='icon' />
                                <p>{item.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
            <Search/>
        </Accordion.Body>
    )
}

export default ContactList