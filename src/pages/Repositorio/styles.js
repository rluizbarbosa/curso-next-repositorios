import { Link } from "react-router-dom";
import styled from "styled-components";

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    padding: 30px;
    margin: 80px auto;
`;

export const Owner = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0D2636;
    }
     p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
     }
`;

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display: flex;
        padding: 15px 10px;

        & + li{
            margin-top: 12px;
        }

        img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #0D2636;
        }
        div{

            flex: 1;
            margin-left: 12px;

            strong{
                font-size: 15px;

                a{
                    text-decoration: none;
                    color: #222;
                    transition: .3s;
                    &:hover{
                        color: #0071db;
                    }
                }

                span{
                    background: #222;
                    color: #fff;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 5px 7px;
                    margin-left: 10px;
                }
            }

            p{
                margin-top: 10px;
                font-size: 12px;
                color: #000;
            }

        }
    }
`;


export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
        outline: 0;
        border: 0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;
export const FilterList = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 15px;
    button{
        outline: 0;
        border: 0;
        background: #ccc;
        color: #000;
        padding: 5px 10px;
        border-radius: 4px;
        &:disabled{
            cursor: not-allowed;
            opacity:1;
            background: #0D2636;
            color: #fff;
        }
    }
`;

