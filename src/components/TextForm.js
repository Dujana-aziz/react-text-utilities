import React, {useState} from 'react'


export default function TextForm(props) {

    const [speaking, setSpeaking] = useState(false);
    const [text, setText] = useState('');
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to UpperCase","success")
    }
    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to LowerCase","success")
    }
    const handleClearClick = ()=>{
        setText('')
        props.showAlert("Whole text is cleared","success")
    }
    const handleSpeakClick = () => {
        if (!speaking) {
            let msg = new SpeechSynthesisUtterance();
            msg.text = text;
            msg.onend = () => {
                setSpeaking(false);
            };
            window.speechSynthesis.speak(msg);
            setSpeaking(true);
        } else {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    };
    const handleCopy = ()=>{
        navigator.clipboard.writeText(text)
        props.showAlert("Copied to clipboard!","success")
    }
    const handleExtraSpaces = ()=>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra Spaces are removed","success")
    }

    const handleOnChange = (event)=>{
        setText(event.target.value)
    }
    return (
        <>
            <div style={{color:props.mode==='dark'?'white':'black'}} className='container'>
                <h1 >{props.heading}</h1>
                <div className="mb-3">
                    <textarea style={
                        {
                            backgroundColor:props.mode==='dark'?'darkgray':'white',
                             color:props.mode==='dark'?'white':'black',
                             }} value={text} onChange={handleOnChange} className="form-control" id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length===0} className="btn btn-success mx-2 my-1" onClick={handleUpClick}>Convert to UpperCase</button>
                <button disabled={text.length===0} className="btn btn-success mx-2 my-1" onClick={handleLoClick}>Convert to LowerCase</button>
                <button disabled={text.length===0} className="btn btn-success mx-2 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length===0} className="btn btn-success mx-2 my-1" onClick={handleSpeakClick}>{speaking ? 'Stop' : 'Speak'}</button>
                <button disabled={text.length===0} className="btn btn-success mx-2 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className="btn btn-success mx-2 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            </div>
            <div className="container my-3" style={{color:props.mode==='dark'?'white':'black'}}>
                <h2>Your text summary</h2>
                <p>{text.length === 0 ? 0 :(text.trim().split(/\s+/).filter((element)=>{return element.length!==0}).length)} words and {text.trim().length} characters</p>
                <p>{text.length === 0 ? 0 : ((0.008 * text.trim().split(/\s+/).filter((element)=>{return element.length!==0}).length).toFixed(2))} Minutes to read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : 'Enter Text Above to preview'}</p>
            </div>
        </>
    )
}
