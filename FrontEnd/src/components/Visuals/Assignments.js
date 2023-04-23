import React, {useState, useEffect} from 'react';
import classes from './Assignments.module.css'
import FormField from '../Form/FormField';
import * as IoIcons from 'react-icons/io5';
import * as BsIcons from 'react-icons/bs'

const rawData = [];

for(let i = 0; i < 97; i++){
    let obj = new Object({
        company: "Ishaan",
        contact: "9818896338",
        country: "India",
        email: "weakinphysics@gmail.com" 
    })
    rawData.push(obj);
}

rawData[0].company = "c company";
rawData[10].company = "d company";
rawData[20].company = "e company";

export default function Assignments(){
    const perPage = 15;
    const maxPages = Math.ceil(rawData.length/perPage);
    const [pageOptions, setPageOptions] = useState([1, 2,3]);
    const [currPage, setCurrPage] = useState(1);
    const [data, setData] = useState(rawData);
    const [search, setSearch] = useState("");

    const handlesPageChange = (e)=>{
        console.log("Changing");
        setCurrPage(Number(e.target.textContent));
    }
    
    useEffect(()=>{
        setData((prevData)=>{
            let nextData = rawData.slice((currPage - 1)*15, (currPage)*15);
            nextData = nextData.filter((item)=>item.company.includes(search));
            return nextData;
        });
        setPageOptions((xyz)=>{
            if(currPage === maxPages && currPage === 1) return [currPage];
            if(currPage === maxPages){
                return [currPage-2, currPage-1, currPage];
            }
            else if(currPage === 1){
                return [currPage, currPage + 1, currPage + 2];
            }
            else{
                return [currPage-1, currPage, currPage+1];
            }
        })
    }, [currPage, maxPages, search]);


    

    const handlesSearch = (e)=>{
        setSearch(e.target.value);
    }

    return(
    <>
        <div className={classes["table-container"]}>
            <div className={classes["search-bar"]}>
                <input placeholder = "search" className={classes['search-input']} value = {search} onChange = {handlesSearch}/>
                <IoIcons.IoSearchOutline className = {classes['search-icon']}/>
            </div>
            <div className = {classes["tableCard"]}>
                <table className={classes.table}>
                    <tr>
                        <th style = {{borderRight: "solid 1px lightgrey"}}>Company</th>
                        <th style = {{borderRight: "solid 1px lightgrey"}}>Contact</th>
                        <th>Email</th>
                        <th style = {{borderLeft: "solid 1px lightgrey"}}>Country</th>
                    </tr>
                    
                    {data.map((item, index)=>{
                        return(<tr>
                            <td style = {{borderRight: "solid 1px lightgrey"}}>{item.company}</td>
                            <td style = {{borderRight: "solid 1px lightgrey"}}>{item.contact}</td>
                            <td>{item.email}</td>
                            <td style = {{borderLeft: "solid 1px lightgrey"}}>{item.country}</td>
                        </tr>)
                    })}
                </table>
            </div>
            <div className = {classes.paginator}>
                <ul className = {classes['paginator-list']}>
                    <l1>
                        <BsIcons.BsChevronDoubleLeft className = {classes['paginator-list-item']} onClick ={()=>{
                            console.log("left click");
                            setCurrPage(1);
                        }}/> 
                    </l1>
                    <li>
                        <BsIcons.BsChevronLeft className = {classes['paginator-list-item']} onClick ={()=>{
                            console.log("left click");
                            setCurrPage(Math.max(currPage-1, 1));
                        }}/>
                    </li>
                    {
                        pageOptions.map((item, index)=>{
                            if(item < 1) return <></>;
                            return (<li className = {classes['paginator-list-item']} onClick = {handlesPageChange} style = {{textDecoration: (item === currPage)?"underline":"none"}} >{item}</li>);
                        })
                    }
                    {(currPage < 6) && <li className={classes['paginator-list-item']}>
                        ... 7
                    </li>}
                    <li>
                        <BsIcons.BsChevronRight className = {classes['paginator-list-item']} onClick = {(e)=>{
                            console.log("Changing");
                            setCurrPage(Math.min(currPage+1, maxPages));
                        }}/>
                    </li>
                    <li>
                        <BsIcons.BsChevronDoubleRight className = {classes['paginator-list-item']} onClick = {(e)=>{
                            setCurrPage(maxPages);
                        }} />
                    </li>
                </ul>
            </div>
        </div>
    </>
    )
}