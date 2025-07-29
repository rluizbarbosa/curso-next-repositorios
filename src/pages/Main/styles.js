import styled, {keyframes, css} from 'styled-components'

export const Container = styled.div`
    max-width: 700px;
    background-color: #fff;
    border-radius: 4px;

    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    padding: 30px;
    margin: 80px auto;
    h1{
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }
`;
export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        & + li {
            border-top: 1px solid #eee;
        }

        a{
            color: #0d2636;
            text-decoration: none;
        }
    }

`;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    input{
        flex: 1;
        border: 1px solid ${props => (props.error ? '#ff0000' : '#eee')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 17px;
    }
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    background:transparent;
    padding: 8px 7px;
    color: #0D2636;
    outline: 0;
    border-radius:4px;
    border:0;
`;


const animate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;


export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
    background-color: #0d2636;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0px 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading && css`
        svg{
            animation: ${animate} 2s linear infinite;
        }
    `};
`;

