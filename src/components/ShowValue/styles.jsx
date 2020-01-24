import styled from 'styled-components'

const ValueText = styled.span`
    color: ${props => props.color || '#e2e2e2'};
    font-weight: bold;
    font-size: 30px;
    display: block;
`

const Title = styled.span`
    margin-bottom: 10px;
    display: block;
    color: #696969;
`

export { ValueText, Title }
