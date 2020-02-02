import React from 'react';


class KarticaKorisnika extends React.Component {

    constructor(props){
        super(props);
    }
    
    render(){
            return (
                    <div className="card">
                        <div className="image">
                            <img alt="da" src="https://react.semantic-ui.com/images/avatar/large/matthew.png"/>
                        </div>
                    <div className="content">
                        <div className="header">{this.props.slika.firstName} {this.props.slika.lastName}</div>
                        <div className="meta">
                            <a>{this.props.slika.role}</a>
                        </div>
                        <div className="description">
                            {this.props.slika.address}, {this.props.slika.city}, {this.props.slika.country} 
                        </div>
                    </div>
                    <div className="extra content">
                        <span className="right floated">
                        {this.props.slika.phoneNumber}
                        </span>
                        <span>
                            <i className="user icon"></i>
                            {this.props.slika.username}
                        </span>
                    </div>
                    </div>
            );
    }
}

export default KarticaKorisnika;