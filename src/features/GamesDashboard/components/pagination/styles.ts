import styled from 'styled-components';

export const  StyledPagination = styled.div`
    ul{
        display: flex;
        border: 1px solid black;
        border-radius: 5px;
        margin: 20px 0;
        overflow: hidden;
        li{
            flex:1;
            padding: 5px;
            border-left: 1px solid black;
            cursor: pointer;
            background: white;
            &:hover{
                background: lightgray;
            }
            &:first-child{
                border: none;
            }
            &.active{
                background: lightgray;
            }
        }
    }
`;
