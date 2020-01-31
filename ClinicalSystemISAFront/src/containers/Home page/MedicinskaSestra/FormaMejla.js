import React from 'react';


class FormaMejla extends React.Component{

    render(){
        return (
            <div className="ui form success">
                <div className="field">
                    <label>E-mail</label>
                    <input type="email" placeholder="nekimejl@gmail.com"/>
                </div>
                <div className="field">
                    <label>Text</label>
                    <textarea></textarea>
                </div>
                <div className="ui success message">
                    <div className="header">Form Completed</div>
                    <p>You're all signed up for the newsletter.</p>
                </div>
                <div className="ui submit button">Posalji zahtev</div>
            </div>
        );
    }

}

export default FormaMejla;