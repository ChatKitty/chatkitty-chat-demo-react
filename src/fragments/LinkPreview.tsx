import { MessageLink } from "chatkitty"
import React from "react"
import { StyledBox } from "react-chat-ui-kit"





interface LinkPreviewProp{
    links: MessageLink[]
}

const LinkPreview : React.FC<LinkPreviewProp> = ({links}: LinkPreviewProp) =>{

    return <div> 
                {links.map((link) => ( <StyledBox key={link.source} style={{width:'400px', borderLeft: '5px solid grey'}}>

                    <div style={{marginLeft:'2px'}}>
                        <a href={link.source}>
                            <p style={{color:'blue'}}>
                                {link.preview ? (link.preview.title):(link.source)}
                            </p>
                        </a>
                    </div>
                    {link.preview && <div style={{marginLeft:'2px'}}>
                        <StyledBox >{link.preview.description}</StyledBox>
                        <img src={link.preview.image.source } style={{width:'400px', borderRadius:'5%'}}/>    
                    </div>}

                </StyledBox>))}
            </div>
}

export default LinkPreview;