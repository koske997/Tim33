import React from 'react';


class ZakazivanjePregleda extends React.Component{

    render(){
        return(
            <div>
                <div class="ui form">
            <div class="fields">
                <div class="field">
                <label>First name</label>
                <input type="text" placeholder="First Name"/>
                </div>
                <div class="field">
                <label>Middle name</label>
                <input type="text" placeholder="Middle Name"/>
                </div>
                <div class="field">
                <label>Last name</label>
                <input type="text" placeholder="Last Name"/>
                </div>
            </div>
</div>
            </div>
        );
    }


}

export default ZakazivanjePregleda;