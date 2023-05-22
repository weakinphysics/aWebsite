import React, {useState, useEffect} from 'react';
import axios from 'axios';
import classes from './Assignments.module.css'
import * as IoIcons from 'react-icons/io5';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';

const rawData = [];


const url = "http://127.0.0.1:5000/users/cookieCookie";


export default function Assignments(){
    

    const perPage = 15;



    const [maxPages, setMaxPages] = useState(4);
    const [pageData, setPageData] = useState([]);
    const [pageOptions, setPageOptions] = useState([1, 2, 3]);
    const [currPage, setCurrPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchReq, setSearchReq] = useState(false);
    const [sortQuery, setSortQuery] = useState("Name");
    const [sortDir, setSortDir] = useState(true);





    const handlesPageChange = (e)=>{
        console.log("Changing");
        setCurrPage(Number(e.target.textContent));
    }


    useEffect(()=>{
        axios.post(url, {
            thePage: currPage,
            perPage: perPage,
            searchParams: search,
            order: sortQuery,
            dir: (sortDir === true)?1:-1
        }).then((res)=>{
            setPageData((cur)=>{
                return res.data[0];
            })
            setMaxPages(res.data[1])
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
    }, [currPage]);


    useEffect(()=>{
        axios.post(url, {
            thePage: 1,
            perPage: perPage,
            searchParams: search,
            order: sortQuery,
            dir: (sortDir === true)?1:-1
        }).then((res)=>{
            console.log(res.data);
            if(res.data.length == 2)setPageData(res.data[0]);
            if(res.data.length == 2)setMaxPages(Number.parseInt(res.data[1]));
        })
    }, [sortQuery, searchReq, sortDir]);


    useEffect(()=>{
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
    }, [maxPages]);

    const sendsSearchRequest = (e)=>{
        if(search !== "") setSearchReq((c)=>!c);
    }


    const handlesSearch = (e)=>{
        setSearch(e.target.value);
        if(e.target.value === "") setSearchReq((c)=>!c);
    }

    



    return(
    <>
        <div className={classes["table-container"]}>
            <div className={classes["search-bar"]}>
                <input placeholder = "search" className={classes['search-input']} value = {search} onChange = {handlesSearch}/>
                <IoIcons.IoSearchOutline className = {classes['search-icon']} onClick = {sendsSearchRequest}/>
            </div>
            <div className = {classes["tableCard"]}>
                <table className={classes.table}>
                    <tr>
                        <th style = {{borderRight: "solid 1px lightgrey"}}>Name <BiIcons.BiSort onClick = {()=>{
                            if(sortQuery === "Name"){
                                setSortDir(!sortDir);
                            }
                            else{
                                setSortQuery("Name");
                                setSortDir(1);
                            }
                        }} style = {{cursor: "pointer"}}/></th>
                        <th style = {{borderRight: "solid 1px lightgrey"}}>Position <BiIcons.BiSort/></th>
                        <th style = {{borderRight: "solid 1px lightgrey"}}>Office <BiIcons.BiSort/></th>
                        <th style = {{borderRight: "solid 1px lightgrey"}}>Age <BiIcons.BiSort/></th>
                        <th>Start date <BiIcons.BiSort/></th>
                        <th style = {{borderLeft: "solid 1px lightgrey"}}>Salary <BiIcons.BiSort/></th>
                    </tr>
                    {pageData.map((item, index)=>{
                        return(<tr>
                            <td style = {{borderRight: "solid 1px lightgrey"}}>{item.Name}</td>
                            <td style = {{borderRight: "solid 1px lightgrey"}}>{item.Position}</td>
                            <td style = {{borderRight: "solid 1px lightgrey"}}>{item.Office}</td>
                            <td style = {{borderRight: "solid 1px lightgrey"}}>{item.Age}</td>
                            <td>{item["Start date"].substring(0, 10)}</td>
                            <td style = {{borderLeft: "solid 1px lightgrey"}}>{item.Salary}</td>
                        </tr>)
                    })}
                </table>
            </div>
            
            <div className = {classes.paginator}>
                <ul className = {classes['paginator-list']}>
                    <div className = {classes['paginator-list-item']}>
                        <BsIcons.BsChevronDoubleLeft onClick ={()=>{
                            console.log("left click");
                            setCurrPage(1);
                        }}/> 
                    </div>
                    <div className = {classes['paginator-list-item']}>
                        <BsIcons.BsChevronLeft  onClick ={()=>{
                            console.log("left click");
                            setCurrPage(Math.max(currPage-1, 1));
                        }}/>
                    </div>
                    {
                        pageOptions.map((item, index)=>{
                            if(item < 1) return <></>;
                            return (<div className = {classes['paginator-list-item']} onClick = {handlesPageChange} style = {{backgroundColor: (item === currPage)?"orange":""}} >{item}</div>);
                        })
                    }
                    {(currPage < maxPages) && <li className={classes['paginator-list-item']}>
                        of {maxPages}
                    </li>}
                    <div className = {classes['paginator-list-item']}>
                        <BsIcons.BsChevronRight  onClick = {(e)=>{
                            console.log("Changing");
                            setCurrPage(Math.min(currPage+1, maxPages));
                        }}/>
                    </div>
                    <div className = {classes['paginator-list-item']}>
                        <BsIcons.BsChevronDoubleRight  onClick = {(e)=>{
                            setCurrPage(maxPages);
                        }} />
                    </div>
                </ul>
            </div>
        </div>
    </>
    )



    
}